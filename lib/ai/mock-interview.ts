import { getGeminiClient } from "@/lib/ai/gemini";
import { getTextAIClient } from "@/lib/ai/openai";
import { getTextAIForTask } from "@/lib/ai/router";
import {
  hasReachedQuestionLimit,
  normalizeQuestionCount
} from "@/lib/mock-interview/flow";
import {
  buildCompanyPromptSnippet,
  resolveCompanyIntelligence,
  type ResolvedCompanyIntelligence
} from "@/lib/mock-interview/company-question-bank";
import { pickCodeProblem } from "@/lib/mock-interview/coding-problems";
import {
  phaseCategoryHint,
  phaseFromIndex,
  phaseLabel,
  type InterviewPhase
} from "@/lib/mock-interview/phases";

export type MockInterviewType = "hr" | "technical" | "mixed";
export type MockDifficulty = "easy" | "medium" | "hard";
export type MockAIProvider = "gemini" | "groq" | "openai" | "demo";

export type MockTurnFeedback = {
  strengths: string[];
  improvements: string[];
  score: number;
};

export type MockCodeProblem = {
  title: string;
  description: string;
  starterCode: string;
  testCases: Array<{ input: string; expected: string; label?: string }>;
};

export type MockQuestionOut = {
  question: string;
  category: string;
  codeProblem?: MockCodeProblem;
};

export type MockAnswerResult = {
  feedback: MockTurnFeedback;
  nextQuestion: MockQuestionOut | null;
  done: boolean;
};

export type MockEndSummary = {
  overallScore: number;
  tips: string[];
  highlights: string[];
};

export type MockInterviewAIStatus = {
  available: boolean;
  provider: MockAIProvider | null;
  message: string;
};

type TurnHistoryItem = {
  question: string;
  answer?: string;
  category?: string;
};

type SessionContext = {
  company: string;
  role: string;
  interviewType: MockInterviewType;
  difficulty: MockDifficulty;
  totalQuestions: number;
  resumeContext?: string;
  jobDescription?: string;
  includeCoding?: boolean;
  languageCode?: string;
};

function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    const trimmed = value
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    return JSON.parse(trimmed) as T;
  } catch {
    return fallback;
  }
}

function clampScore(score: number) {
  if (!Number.isFinite(score)) return 5;
  return Math.max(1, Math.min(10, Math.round(score)));
}

async function completeJson<T>(
  systemContent: string,
  userContent: string,
  fallback: T
): Promise<{ parsed: T; provider: MockAIProvider } | null> {
  const provider = getTextAIForTask("mock-interview");
  if (!provider) return null;

  try {
    const completion = await provider.client.chat.completions.create({
      model: provider.model,
      response_format: { type: "json_object" },
      temperature: 0.7,
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userContent }
      ]
    });
    const content = completion.choices[0]?.message.content;
    const parsed = safeJsonParse<T>(content, fallback);
    if (!content) return null;
    return { parsed, provider: provider.provider };
  } catch {
    try {
      const completion = await provider.client.chat.completions.create({
        model: provider.model,
        temperature: 0.5,
        messages: [
          { role: "system", content: systemContent },
          {
            role: "user",
            content: `${userContent}\n\nReturn ONLY valid JSON. No markdown fences.`
          }
        ]
      });
      const content = completion.choices[0]?.message.content;
      const parsed = safeJsonParse<T>(content, fallback);
      if (!content) return null;
      return { parsed, provider: provider.provider };
    } catch {
      return null;
    }
  }
}

export function getMockInterviewAIStatus(): MockInterviewAIStatus {
  const gemini = getGeminiClient();
  if (gemini) {
    return {
      available: true,
      provider: "gemini",
      message: "Live AI interviewer powered by Gemini"
    };
  }

  const groqOrOpenAI = getTextAIClient();
  if (groqOrOpenAI) {
    return {
      available: true,
      provider: groqOrOpenAI.provider,
      message: `Live AI interviewer powered by ${groqOrOpenAI.provider === "groq" ? "Groq" : "OpenAI"} (add GEMINI_API_KEY for Gemini)`
    };
  }

  return {
    available: false,
    provider: null,
    message:
      "Add GEMINI_API_KEY to enable the live AI interviewer (or GROQ_API_KEY as fallback)"
  };
}

function resumeSnippet(resumeContext?: string) {
  const text = resumeContext?.trim() ?? "";
  if (!text) return "No resume on file — ask general role-fit questions.";
  return text.slice(0, 3500);
}

function typeGuidance(type: MockInterviewType) {
  if (type === "hr") {
    return "Focus on behavioral, motivation, communication, and culture-fit questions. Avoid deep coding.";
  }
  if (type === "technical") {
    return "Focus on role-relevant technical depth, problem-solving, systems thinking, and past project details.";
  }
  return "Mix HR/behavioral (~40%) and technical (~60%) questions across the session.";
}

function jobDescriptionBlock(jobDescription?: string) {
  const text = jobDescription?.trim() ?? "";
  if (!text) return "";
  return `\nJob description / interview notes from candidate:\n${text.slice(0, 2000)}\n`;
}

function codingGuidance(
  includeCoding: boolean | undefined,
  difficulty: MockDifficulty | undefined,
  phase: InterviewPhase
) {
  if (!includeCoding) return "";
  if (phase !== "coding-basic" && phase !== "coding-company") {
    return `
Coding is enabled for this session, but this turn is NOT a coding turn.
Do not ask a coding exercise yet. Stay in the current interview phase.`;
  }
  const flavor =
    phase === "coding-basic"
      ? "Ask a BASIC coding warm-up (category must be \"coding\")."
      : "Ask a COMPANY-FLAVORED coding exercise inspired by reported OA patterns (category must be \"coding\"). Phrase as practice inspired by patterns — never claim an exact copyrighted PYQ.";
  return `
This turn IS a coding turn. ${flavor}
Coding difficulty target: ${difficulty ?? "medium"}.
The application attaches a safe, locally evaluated JavaScript problem with Run tests.
Do not claim code was executed, compiled, or tested by you.
Keep the spoken question to 1–2 sentences inviting them to solve in the editor/terminal panel.`;
}

function sessionPhase(
  questionIndex: number,
  ctx: SessionContext
): InterviewPhase {
  return phaseFromIndex(questionIndex, ctx.totalQuestions, {
    includeCoding: ctx.includeCoding,
    interviewType: ctx.interviewType
  });
}

function intelligenceFor(ctx: SessionContext): ResolvedCompanyIntelligence {
  return resolveCompanyIntelligence(ctx.company);
}

function attachCodeProblem(
  question: MockQuestionOut,
  ctx: SessionContext,
  phase: InterviewPhase,
  intelligence: ResolvedCompanyIntelligence
): MockQuestionOut {
  if (question.category !== "coding") {
    return { ...question, codeProblem: undefined };
  }
  if (!ctx.includeCoding || ctx.interviewType === "hr") {
    return { ...question, category: "technical", codeProblem: undefined };
  }
  const flavor = phase === "coding-company" ? "company" : "basic";
  return {
    ...question,
    codeProblem: pickCodeProblem({
      difficulty: ctx.difficulty,
      flavor,
      company: intelligence.primary
    })
  };
}

function normalizeQuestion(
  question: MockQuestionOut,
  ctx: SessionContext,
  phase: InterviewPhase,
  intelligence: ResolvedCompanyIntelligence
): MockQuestionOut {
  const category =
    question.category?.trim() ||
    (phase === "coding-basic" || phase === "coding-company"
      ? "coding"
      : phaseCategoryHint(phase));

  // Force coding category on coding phases when includeCoding is on.
  if (
    (phase === "coding-basic" || phase === "coding-company") &&
    ctx.includeCoding &&
    ctx.interviewType !== "hr"
  ) {
    return attachCodeProblem(
      { ...question, category: "coding" },
      ctx,
      phase,
      intelligence
    );
  }

  return attachCodeProblem(
    { ...question, category },
    ctx,
    phase,
    intelligence
  );
}

function phasePromptBlock(
  phase: InterviewPhase,
  ctx: SessionContext,
  intelligence: ResolvedCompanyIntelligence
) {
  return `Interview phase for this turn: ${phase} (${phaseLabel(phase)}).
Progress through intro → role → company-specific across the session. Do not skip ahead or repeat a finished phase.
${buildCompanyPromptSnippet(intelligence, phase)}
${codingGuidance(ctx.includeCoding, ctx.difficulty, phase)}`;
}

function languageGuidance(languageCode?: string) {
  const names: Record<string, string> = {
    en: "English",
    hi: "Hindi",
    ta: "Tamil",
    te: "Telugu",
    mr: "Marathi"
  };
  const language = names[languageCode ?? "en"] ?? "English";
  return `Conduct the interview in ${language}. Keep technical terms in English when that is clearer.`;
}

function difficultyGuidance(difficulty: MockDifficulty) {
  if (difficulty === "easy") {
    return "Keep questions approachable for early-career / campus candidates.";
  }
  if (difficulty === "hard") {
    return "Push for depth, trade-offs, metrics, and follow-up pressure.";
  }
  return "Balanced difficulty for early-career to mid-level candidates.";
}

function demoQuestionForPhase(
  ctx: SessionContext,
  phase: InterviewPhase,
  intelligence: ResolvedCompanyIntelligence
): MockQuestionOut {
  const c = ctx.company;
  const r = ctx.role;
  const hint = intelligence.primary;

  if (phase === "coding-basic" || phase === "coding-company") {
    return normalizeQuestion(
      {
        category: "coding",
        question:
          phase === "coding-basic"
            ? "Let's start with a short coding warm-up. Open the editor, implement solve(input), then run the local tests."
            : `Next is a ${c}-style coding practice question inspired by reported OA patterns. Implement solve(input) in the editor and run the tests.`
      },
      ctx,
      phase,
      intelligence
    );
  }

  if (phase === "intro") {
    return {
      category: "intro",
      question:
        hint.introHints[0]
          ? `Introduce yourself for the ${r} role at ${c}. ${hint.introHints[0]}.`
          : `Introduce yourself and how your background fits ${r} at ${c}.`
    };
  }

  if (phase === "role") {
    const topic = hint.roleHints[0] ?? hint.technicalTopics[0];
    return {
      category: ctx.interviewType === "hr" ? "behavioral" : "technical",
      question: topic
        ? `For ${r} at ${c}: ${topic}. Walk me through a concrete example.`
        : `Walk me through a project or skill that makes you a strong fit for ${r} at ${c}.`
    };
  }

  if (phase === "company") {
    const behavioral = hint.companyBehavioral[0];
    return {
      category: "company",
      question: behavioral
        ? `${c} interviewers often probe: ${behavioral}. Share a specific story relevant to ${r}.`
        : `What do you know about ${c}, and how would you contribute in your first 90 days as a ${r}?`
    };
  }

  return {
    category: "closing",
    question: `Before we wrap up, what questions do you have about the ${r} team at ${c}?`
  };
}

function demoFirstQuestion(ctx: SessionContext): MockQuestionOut {
  const intelligence = intelligenceFor(ctx);
  const phase = sessionPhase(0, ctx);
  return demoQuestionForPhase(ctx, phase, intelligence);
}

function demoAnswerResult(
  ctx: SessionContext,
  questionIndex: number,
  answer: string
): MockAnswerResult {
  const answered = answer.trim().length;
  const score = clampScore(
    answered < 40 ? 4 : answered < 120 ? 6 : answered < 280 ? 7 : 8
  );
  const done = hasReachedQuestionLimit(questionIndex, ctx.totalQuestions);
  const intelligence = intelligenceFor(ctx);
  const nextPhase = sessionPhase(questionIndex + 1, ctx);
  const next = done
    ? null
    : demoQuestionForPhase(ctx, nextPhase, intelligence);

  return {
    feedback: {
      strengths: answered
        ? [
            "You answered in your own words and stayed on topic.",
            "Structure is readable enough for a practice round."
          ]
        : ["You submitted a response so we can keep practicing."],
      improvements: [
        "Add one concrete example with a metric or outcome.",
        "Tie the answer more directly to this company and role."
      ],
      score
    },
    nextQuestion: next,
    done
  };
}

function demoEndSummary(turns: TurnHistoryItem[]): MockEndSummary {
  const answered = turns.filter((t) => (t.answer ?? "").trim().length > 0);
  const overallScore = clampScore(
    answered.length === 0 ? 4 : 5 + Math.min(answered.length, 4)
  );
  return {
    overallScore,
    tips: [
      "Practice out loud with STAR structure (Situation, Task, Action, Result).",
      "Keep company research specific — products, users, recent news.",
      "For technical answers: clarify, outline, trade-offs, then test plan."
    ],
    highlights: [
      "Demo mode used static coaching — add GEMINI_API_KEY for live AI feedback.",
      `You completed ${answered.length} answered turn(s).`
    ]
  };
}

export async function generateFirstQuestion(
  ctx: SessionContext
): Promise<{ question: MockQuestionOut; provider: MockAIProvider; demoMode: boolean }> {
  const status = getMockInterviewAIStatus();
  const intelligence = intelligenceFor(ctx);
  const phase = sessionPhase(0, ctx);
  const fallback = demoFirstQuestion(ctx);

  if (!status.available) {
    return {
      question: fallback,
      provider: "demo",
      demoMode: true
    };
  }

  const result = await completeJson<{
    question?: string;
    category?: string;
    codeProblem?: MockCodeProblem;
  }>(
    "You are Apply Interviewer — a warm, attentive professional interviewer. Sound human, not scripted. Never claim personal experience, company knowledge, or actions you did not actually perform. Return only valid JSON.",
    `Start a ${ctx.totalQuestions}-question mock interview.

Company: ${ctx.company}
Role: ${ctx.role}
Interview type: ${ctx.interviewType}
Difficulty: ${ctx.difficulty}
Question index: 1 of ${ctx.totalQuestions}
${typeGuidance(ctx.interviewType)}
${difficultyGuidance(ctx.difficulty)}
${languageGuidance(ctx.languageCode)}
${jobDescriptionBlock(ctx.jobDescription)}
${phasePromptBlock(phase, ctx, intelligence)}

Candidate resume context:
${resumeSnippet(ctx.resumeContext)}

Ask the FIRST question only in one or two concise sentences. Begin naturally,
without a long welcome or generic filler. Stay strictly in the current phase.
Do not answer it and do not stack multiple questions.

Return JSON:
{ "question": string, "category": "intro" | "behavioral" | "technical" | "coding" | "company" | "closing" | "general" }`,
    fallback
  );

  if (!result?.parsed.question?.trim()) {
    return { question: fallback, provider: status.provider ?? "demo", demoMode: false };
  }

  return {
    question: normalizeQuestion(
      {
        question: result.parsed.question.trim(),
        category: result.parsed.category?.trim() || phaseCategoryHint(phase),
        codeProblem: result.parsed.codeProblem
      },
      ctx,
      phase,
      intelligence
    ),
    provider: result.provider,
    demoMode: false
  };
}

export async function evaluateAnswerAndContinue(input: {
  ctx: SessionContext;
  history: TurnHistoryItem[];
  currentQuestion: string;
  answer: string;
  questionIndex: number;
  currentCodePassed?: boolean;
}): Promise<{
  result: MockAnswerResult;
  provider: MockAIProvider;
  demoMode: boolean;
}> {
  const {
    ctx,
    history,
    currentQuestion,
    answer,
    questionIndex,
    currentCodePassed
  } = input;
  const status = getMockInterviewAIStatus();
  const totalQuestions = normalizeQuestionCount(ctx.totalQuestions);
  const remaining = totalQuestions - (questionIndex + 1);
  const intelligence = intelligenceFor(ctx);
  const nextPhase = sessionPhase(questionIndex + 1, ctx);
  const fallback = demoAnswerResult(ctx, questionIndex, answer);

  if (!status.available) {
    return {
      result: fallback,
      provider: "demo",
      demoMode: true
    };
  }

  const historyBlock = history
    .map(
      (t, i) =>
        `Q${i + 1}: ${t.question}\nA${i + 1}: ${(t.answer ?? "").trim() || "(unanswered)"}`
    )
    .join("\n\n");

  const result = await completeJson<{
    strengths?: string[];
    improvements?: string[];
    score?: number;
    nextQuestion?: string | null;
    nextCategory?: string;
    nextCodeProblem?: MockCodeProblem;
    done?: boolean;
  }>(
    "You are Apply Interviewer. Respond like an attentive human interviewer: acknowledge only what the candidate actually said, give brief actionable coaching, and never invent praise, facts, test results, or personal/company claims. Return only valid JSON.",
    `Mock interview in progress for ${ctx.role} at ${ctx.company}.
Type: ${ctx.interviewType}. Difficulty: ${ctx.difficulty}.
Questions planned: ${totalQuestions}. This was question ${questionIndex + 1}.
Remaining after this: ${remaining}.
${languageGuidance(ctx.languageCode)}
${jobDescriptionBlock(ctx.jobDescription)}
${
  remaining > 0
    ? phasePromptBlock(nextPhase, ctx, intelligence)
    : "This was the final planned question — set done=true."
}

Resume context:
${resumeSnippet(ctx.resumeContext)}

Prior turns:
${historyBlock || "(none)"}

Current question:
${currentQuestion}

Candidate answer:
${answer}

Local deterministic coding-test status:
${currentCodePassed === undefined ? "Not run or not a coding question" : currentCodePassed ? "All visible tests passed" : "One or more visible tests failed"}

Return JSON:
{
  "strengths": string[] (1-3 short bullets),
  "improvements": string[] (1-3 short bullets),
  "score": number (1-10),
  "done": boolean (true if this should be the last question OR remaining is 0),
  "nextQuestion": string | null (required if done is false; null if done),
  "nextCategory": string
}

If done or remaining is 0, set done=true and nextQuestion=null.
Otherwise ask one concise, distinct question for the NEXT phase listed above.
Prefer a relevant follow-up on a specific detail in the latest answer only if it
still fits that next phase; otherwise progress cleanly. Do not repeat, stack
questions, use canned praise, or claim facts not present above.`,
    {
      strengths: fallback.feedback.strengths,
      improvements: fallback.feedback.improvements,
      score: fallback.feedback.score,
      done: fallback.done,
      nextQuestion: fallback.nextQuestion?.question ?? null,
      nextCategory: fallback.nextQuestion?.category
    }
  );

  if (!result) {
    return { result: fallback, provider: status.provider ?? "demo", demoMode: false };
  }

  const done =
    Boolean(result.parsed.done) ||
    hasReachedQuestionLimit(questionIndex, totalQuestions) ||
    remaining <= 0 ||
    !result.parsed.nextQuestion?.trim();

  return {
    result: {
      feedback: {
        strengths:
          result.parsed.strengths?.filter(Boolean).slice(0, 3) ??
          fallback.feedback.strengths,
        improvements:
          result.parsed.improvements?.filter(Boolean).slice(0, 3) ??
          fallback.feedback.improvements,
        score: clampScore(result.parsed.score ?? fallback.feedback.score)
      },
      nextQuestion:
        done || !result.parsed.nextQuestion?.trim()
          ? null
          : normalizeQuestion(
              {
                question: result.parsed.nextQuestion.trim(),
                category:
                  result.parsed.nextCategory?.trim() ||
                  phaseCategoryHint(nextPhase),
                codeProblem: result.parsed.nextCodeProblem
              },
              ctx,
              nextPhase,
              intelligence
            ),
      done
    },
    provider: result.provider,
    demoMode: false
  };
}

export async function generateSessionSummary(input: {
  ctx: SessionContext;
  history: TurnHistoryItem[];
  turnScores: number[];
}): Promise<{ summary: MockEndSummary; provider: MockAIProvider; demoMode: boolean }> {
  const { ctx, history, turnScores } = input;
  const status = getMockInterviewAIStatus();

  if (!status.available) {
    return {
      summary: demoEndSummary(history),
      provider: "demo",
      demoMode: true
    };
  }

  const avg =
    turnScores.length > 0
      ? turnScores.reduce((a, b) => a + b, 0) / turnScores.length
      : 5;
  const fallback: MockEndSummary = {
    overallScore: clampScore(avg),
    tips: [
      "Tighten openings to 60–90 seconds with present → past → future.",
      "Add one quantified outcome in every behavioral story.",
      `Rehearse 2–3 ${ctx.company}-specific reasons you want this ${ctx.role}.`
    ],
    highlights: [
      `Average turn score about ${clampScore(avg)}/10.`,
      "Keep practicing aloud with timed answers."
    ]
  };

  const historyBlock = history
    .map(
      (t, i) =>
        `Q${i + 1}: ${t.question}\nA${i + 1}: ${(t.answer ?? "").trim() || "(unanswered)"}\nScore: ${turnScores[i] ?? "n/a"}`
    )
    .join("\n\n");

  const result = await completeJson<MockEndSummary>(
    "You are Apply Interviewer wrapping up a practice session. Be honest and useful. Return only valid JSON.",
    `Summarize this mock interview for ${ctx.role} at ${ctx.company}.

Type: ${ctx.interviewType}. Difficulty: ${ctx.difficulty}.

Turns:
${historyBlock}

Return JSON:
{
  "overallScore": number (1-10),
  "tips": string[] (3 concrete next-practice tips),
  "highlights": string[] (2-4 short session takeaways)
}`,
    fallback
  );

  if (!result) {
    return { summary: fallback, provider: status.provider ?? "demo", demoMode: false };
  }

  return {
    summary: {
      overallScore: clampScore(result.parsed.overallScore ?? fallback.overallScore),
      tips: result.parsed.tips?.length ? result.parsed.tips.slice(0, 5) : fallback.tips,
      highlights: result.parsed.highlights?.length
        ? result.parsed.highlights.slice(0, 5)
        : fallback.highlights
    },
    provider: result.provider,
    demoMode: false
  };
}

export async function loadResumeContextForUser(userId: string): Promise<string> {
  try {
    const { getLatestMasterResume, getGeneratedResumes } = await import(
      "@/lib/data/resumes"
    );
    const [master, generated] = await Promise.all([
      getLatestMasterResume(userId).catch(() => null),
      getGeneratedResumes(userId, 1).catch(() => [])
    ]);

    const masterText = master?.rawText?.trim() ?? "";
    if (masterText.length >= 80) return masterText;

    const latest = generated[0];
    if (!latest) return masterText;

    const parts = [
      latest.generatedContent?.summary,
      (latest.generatedContent?.skills ?? []).join(", "),
      (latest.generatedContent?.bullets ?? []).join("\n"),
      latest.generatedContent?.afterText,
      latest.generatedContent?.beforeText
    ].filter(Boolean);

    return parts.join("\n").trim() || masterText;
  } catch {
    return "";
  }
}
