import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import {
  evaluateAnswerAndContinue,
  generateFirstQuestion,
  generateSessionSummary,
  getMockInterviewAIStatus,
  loadResumeContextForUser,
  type MockDifficulty,
  type MockInterviewType
} from "@/lib/ai/mock-interview";
import { getElevenLabsTtsStatus } from "@/lib/ai/elevenlabs-tts";
import { listAvailableVoices } from "@/lib/ai/elevenlabs-voices";
import { isTranscriptionAvailable } from "@/lib/ai/transcribe";
import {
  completeMockSession,
  createMockSession,
  getMockSession,
  listMockSessions,
  updateMockSession,
  type MockTurnRecord
} from "@/lib/data/mock-interviews";
import {
  mockInterviewAnswerSchema,
  mockInterviewCompleteSchema,
  mockInterviewEndSchema,
  mockInterviewStartSchema
} from "@/lib/validations";

function isLocalSessionId(id: string) {
  return id.startsWith("local-");
}

function sttStatus() {
  const whisper = isTranscriptionAvailable();
  return {
    available: true,
    whisper,
    message: whisper
      ? "Live captions via browser speech; Whisper refine available"
      : "Live captions via browser speech (Web Speech API). Add GROQ_API_KEY for Whisper fallback."
  };
}

function sessionMeta() {
  const tts = getElevenLabsTtsStatus();
  return {
    ai: getMockInterviewAIStatus(),
    stt: sttStatus(),
    tts,
    voices: listAvailableVoices(tts.available)
  };
}

export async function GET(request: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(request.url);

    if (searchParams.get("status") === "1") {
      return NextResponse.json(sessionMeta());
    }

    try {
      const sessions = await listMockSessions(userId);
      return NextResponse.json({ sessions, ...sessionMeta() });
    } catch {
      return NextResponse.json({
        sessions: [],
        ...sessionMeta()
      });
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load sessions";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await request.json();
    const action = body?.action as string | undefined;

    if (action === "answer") {
      return handleAnswer(userId, body);
    }

    if (action === "end") {
      return handleEnd(userId, body);
    }

    if (action === "complete") {
      const input = mockInterviewCompleteSchema.parse(body);
      try {
        const session = await completeMockSession(
          userId,
          input.sessionId,
          input.durationSeconds
        );
        return NextResponse.json({ session });
      } catch {
        return NextResponse.json({
          session: {
            id: input.sessionId,
            durationSeconds: input.durationSeconds,
            completedAt: new Date().toISOString()
          }
        });
      }
    }

    // Default: start (action omitted or "start")
    return handleStart(userId, body);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues.map((i) => i.message).join(". ") },
        { status: 400 }
      );
    }
    const message =
      error instanceof Error ? error.message : "Unable to run mock interview";
    const status =
      message === "Unauthorized"
        ? 401
        : message.includes("not found")
          ? 404
          : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

async function handleStart(userId: string, body: unknown) {
  const input = mockInterviewStartSchema.parse(body);
  const ai = getMockInterviewAIStatus();

  if (!ai.available && !input.allowDemo) {
    return NextResponse.json(
      {
        error:
          "Add GEMINI_API_KEY to enable the live AI interviewer (or GROQ_API_KEY as fallback). You can also start Demo mode.",
        ai,
        stt: sttStatus(),
        code: "AI_UNAVAILABLE"
      },
      { status: 503 }
    );
  }

  const resumeContext = await loadResumeContextForUser(userId);
  const totalQuestions = input.totalQuestions;

  const first = await generateFirstQuestion({
    company: input.company,
    role: input.role,
    interviewType: input.interviewType,
    difficulty: input.difficulty,
    totalQuestions,
    resumeContext,
    jobDescription: input.jobDescription,
    includeCoding: input.includeCoding,
    languageCode: input.languageCode
  });

  const turns: MockTurnRecord[] = [
    {
      question: first.question.question,
      category: first.question.category,
      codeProblem: first.question.codeProblem
    }
  ];

  const payload = {
    company: input.company,
    role: input.role,
    jobDescription: input.jobDescription ?? "",
    interviewType: input.interviewType as MockInterviewType,
    difficulty: input.difficulty as MockDifficulty,
    includeCoding: input.includeCoding ?? false,
    languageCode: input.languageCode ?? "en",
    voiceId: input.voiceId ?? "",
    totalQuestions,
    turns,
    questions: [
      {
        question: first.question.question,
        tip: "",
        sampleAnswer: "",
        category: first.question.category
      }
    ],
    provider: first.provider,
    demoMode: first.demoMode
  };

  const meta = {
    turn: turns[0],
    questionIndex: 0,
    totalQuestions,
    provider: first.provider,
    demoMode: first.demoMode,
    ai,
    stt: sttStatus(),
    resumeContextAvailable: resumeContext.length >= 80,
    // Client may send this back on answer/end; server also reloads if omitted.
    resumeContext: resumeContext.slice(0, 12000)
  };

  try {
    const session = await createMockSession(userId, payload);
    return NextResponse.json({ session, ...meta }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        session: {
          id: `local-${Date.now()}`,
          userId,
          ...payload,
          durationSeconds: 0,
          createdAt: new Date().toISOString()
        },
        ...meta,
        persisted: false
      },
      { status: 201 }
    );
  }
}

async function handleAnswer(userId: string, body: unknown) {
  const input = mockInterviewAnswerSchema.parse(body);
  const ai = getMockInterviewAIStatus();

  let company = input.company ?? "";
  let role = input.role ?? "";
  let interviewType = (input.interviewType ?? "mixed") as MockInterviewType;
  let difficulty = (input.difficulty ?? "medium") as MockDifficulty;
  let totalQuestions = input.totalQuestions ?? 6;
  let turns: MockTurnRecord[] = input.turns ?? [];
  let resumeContext = input.resumeContext ?? "";

  if (!isLocalSessionId(input.sessionId)) {
    try {
      const existing = await getMockSession(userId, input.sessionId);
      if (existing) {
        company = existing.company;
        role = existing.role;
        interviewType = existing.interviewType;
        difficulty = existing.difficulty;
        totalQuestions = existing.totalQuestions;
        turns = existing.turns.length ? existing.turns : turns;
      }
    } catch {
      /* use client payload */
    }
  }

  if (!company || !role) {
    return NextResponse.json(
      { error: "Session context missing — restart the interview." },
      { status: 400 }
    );
  }

  if (!resumeContext) {
    resumeContext = await loadResumeContextForUser(userId);
  }

  const questionIndex =
    input.questionIndex ??
    Math.max(
      0,
      turns.findIndex((t) => !t.answer?.trim())
    );
  const current =
    input.currentQuestion ??
    turns[questionIndex]?.question ??
    turns[turns.length - 1]?.question;

  if (!current) {
    return NextResponse.json(
      { error: "No active question in this session." },
      { status: 400 }
    );
  }

  const history = turns.slice(0, questionIndex).map((t) => ({
    question: t.question,
    answer: t.answer,
    category: t.category
  }));

  const evaluation = await evaluateAnswerAndContinue({
    ctx: {
      company,
      role,
      interviewType,
      difficulty,
      totalQuestions,
      resumeContext,
      jobDescription: input.jobDescription,
      includeCoding: input.includeCoding,
      languageCode: input.languageCode
    },
    history,
    currentQuestion: current,
    answer: input.answer,
    questionIndex
  });

  const updatedTurns: MockTurnRecord[] = [...turns];
  updatedTurns[questionIndex] = {
    ...updatedTurns[questionIndex],
    question: current,
    category: updatedTurns[questionIndex]?.category ?? "general",
    answer: input.answer,
    strengths: evaluation.result.feedback.strengths,
    improvements: evaluation.result.feedback.improvements,
    score: evaluation.result.feedback.score
  };

  let nextTurn: MockTurnRecord | null = null;
  if (!evaluation.result.done && evaluation.result.nextQuestion) {
    nextTurn = {
      question: evaluation.result.nextQuestion.question,
      category: evaluation.result.nextQuestion.category,
      codeProblem: evaluation.result.nextQuestion.codeProblem
    };
    updatedTurns.push(nextTurn);
  }

  if (!isLocalSessionId(input.sessionId)) {
    try {
      await updateMockSession(userId, input.sessionId, {
        turns: updatedTurns,
        questions: updatedTurns.map((t) => ({
          question: t.question,
          tip: t.tip ?? "",
          sampleAnswer: t.sampleAnswer ?? "",
          category: t.category ?? "general"
        })),
        provider: evaluation.provider,
        demoMode: evaluation.demoMode
      });
    } catch {
      /* persist best-effort */
    }
  }

  return NextResponse.json({
    feedback: evaluation.result.feedback,
    nextTurn,
    done: evaluation.result.done,
    turns: updatedTurns,
    questionIndex: nextTurn ? questionIndex + 1 : questionIndex,
    totalQuestions,
    provider: evaluation.provider,
    demoMode: evaluation.demoMode,
    ai,
    stt: sttStatus()
  });
}

async function handleEnd(userId: string, body: unknown) {
  const input = mockInterviewEndSchema.parse(body);
  const ai = getMockInterviewAIStatus();

  let company = input.company ?? "";
  let role = input.role ?? "";
  let interviewType = (input.interviewType ?? "mixed") as MockInterviewType;
  let difficulty = (input.difficulty ?? "medium") as MockDifficulty;
  let totalQuestions = input.totalQuestions ?? 6;
  let turns: MockTurnRecord[] = input.turns ?? [];
  let resumeContext = input.resumeContext ?? "";

  if (!isLocalSessionId(input.sessionId)) {
    try {
      const existing = await getMockSession(userId, input.sessionId);
      if (existing) {
        company = existing.company || company;
        role = existing.role || role;
        interviewType = existing.interviewType;
        difficulty = existing.difficulty;
        totalQuestions = existing.totalQuestions;
        turns = existing.turns.length ? existing.turns : turns;
      }
    } catch {
      /* use client payload */
    }
  }

  if (!resumeContext) {
    resumeContext = await loadResumeContextForUser(userId);
  }

  const summary = await generateSessionSummary({
    ctx: {
      company: company || "Company",
      role: role || "Role",
      interviewType,
      difficulty,
      totalQuestions,
      resumeContext
    },
    history: turns.map((t) => ({
      question: t.question,
      answer: t.answer,
      category: t.category
    })),
    turnScores: turns
      .map((t) => t.score)
      .filter((s): s is number => typeof s === "number")
  });

  const sessionPayload = {
    turns,
    durationSeconds: input.durationSeconds,
    overallScore: summary.summary.overallScore,
    tips: summary.summary.tips,
    highlights: summary.summary.highlights,
    provider: summary.provider,
    demoMode: summary.demoMode,
    completed: true
  };

  if (!isLocalSessionId(input.sessionId)) {
    try {
      const session = await updateMockSession(
        userId,
        input.sessionId,
        sessionPayload
      );
      return NextResponse.json({
        session,
        summary: summary.summary,
        provider: summary.provider,
        demoMode: summary.demoMode,
        ai
      });
    } catch {
      /* fall through to local response */
    }
  }

  return NextResponse.json({
    session: {
      id: input.sessionId,
      company,
      role,
      interviewType,
      difficulty,
      totalQuestions,
      turns,
      durationSeconds: input.durationSeconds,
      overallScore: summary.summary.overallScore,
      tips: summary.summary.tips,
      highlights: summary.summary.highlights,
      provider: summary.provider,
      demoMode: summary.demoMode,
      completedAt: new Date().toISOString()
    },
    summary: summary.summary,
    provider: summary.provider,
    demoMode: summary.demoMode,
    ai,
    persisted: false
  });
}
