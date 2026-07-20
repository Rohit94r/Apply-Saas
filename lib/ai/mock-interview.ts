import { getGeminiClient } from "@/lib/ai/gemini";
import { getTextAIClient } from "@/lib/ai/openai";
import { getTextAIForTask } from "@/lib/ai/router";
import {
  hasReachedQuestionLimit,
  normalizeQuestionCount
} from "@/lib/mock-interview/flow";

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

function codingGuidance(includeCoding?: boolean, difficulty?: MockDifficulty) {
  if (!includeCoding) return "";
  return `
Include at most two coding questions in this session when the interview type allows.
Coding difficulty: ${difficulty ?? "medium"}.
When asking one, set category to "coding". The application will attach a
safe, locally evaluated JavaScript problem. Do not claim code was executed,
compiled, or tested by you.`;
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

function supportedCodeProblem(difficulty: MockDifficulty): MockCodeProblem {
  if (difficulty === "easy") {
    return {
      title: "Reverse a string",
      description:
        "Return the trimmed input string in reverse order. Use the supported local JavaScript subset.",
      starterCode: `function solve(input) {
  return input.trim();
}`,
      testCases: [
        { input: "hello", expected: "olleh", label: "Basic word" },
        { input: "racecar", expected: "racecar", label: "Palindrome" },
        { input: " apply ", expected: "ylppa", label: "Trim spaces" }
      ]
    };
  }
  if (difficulty === "hard") {
    return {
      title: "Square a number",
      description:
        "Parse the trimmed numeric input and return its square. The local evaluator supports Number(input.trim()) ** 2.",
      starterCode: `function solve(input) {
  return Number(input.trim());
}`,
      testCases: [
        { input: "7", expected: "49", label: "Positive" },
        { input: "-4", expected: "16", label: "Negative" },
        { input: " 12 ", expected: "144", label: "Trimmed input" }
      ]
    };
  }
  return {
    title: "Count words",
    description:
      "Return the number of whitespace-separated words in the trimmed input. Use split(/\\s+/).",
    starterCode: `function solve(input) {
  return input.trim().length;
}`,
    testCases: [
      { input: "one two three", expected: "3", label: "Three words" },
      { input: "single", expected: "1", label: "Single word" },
      { input: "space   between", expected: "2", label: "Repeated spaces" }
    ]
  };
}

function normalizeQuestion(
  question: MockQuestionOut,
  ctx: SessionContext
): MockQuestionOut {
  if (question.category !== "coding") return { ...question, codeProblem: undefined };
  if (!ctx.includeCoding || ctx.interviewType === "hr") {
    return { ...question, category: "technical", codeProblem: undefined };
  }
  return { ...question, codeProblem: supportedCodeProblem(ctx.difficulty) };
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

function demoFirstQuestion(ctx: SessionContext): MockQuestionOut {
  const c = ctx.company;
  const r = ctx.role;
  if (ctx.interviewType === "technical") {
    return {
      category: "technical",
      question: `Walk me through a technical project or problem you solved that would matter for a ${r} role at ${c}.`
    };
  }
  if (ctx.interviewType === "hr") {
    return {
      category: "intro",
      question: `Tell me about yourself and why you want the ${r} role at ${c}.`
    };
  }
  return {
    category: "intro",
    question: `Introduce yourself and how your background fits ${r} at ${c}.`
  };
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
  const questionNumber = questionIndex + 1;
  const done = hasReachedQuestionLimit(questionIndex, ctx.totalQuestions);

  const bank: MockQuestionOut[] = [
    {
      category: "behavioral",
      question: `Describe a time you collaborated under pressure. How would that help you at ${ctx.company}?`
    },
    {
      category: "technical",
      question: `For a ${ctx.role} interview, how would you approach debugging a production issue end-to-end?`
    },
    {
      category: "company",
      question: `What do you know about ${ctx.company}, and how would you contribute in your first 90 days as a ${ctx.role}?`
    },
    {
      category: "behavioral",
      question: "Tell me about a failure or stuck moment. What changed in how you work?"
    },
    {
      category: "closing",
      question: `What questions do you have for us about the ${ctx.role} team at ${ctx.company}?`
    },
    {
      category: "technical",
      question: `Explain a core concept from your toolkit as if I were a teammate starting on day one.`
    },
    {
      category: "behavioral",
      question: "Tell me about a decision you made with incomplete information. What did you learn?"
    },
    {
      category: "technical",
      question: `How would you improve the reliability of a system used by ${ctx.company}'s customers?`
    },
    {
      category: "closing",
      question: `Before we wrap up, what would you like to ask about the ${ctx.role} role or team?`
    }
  ];
  const nextIndex = Math.min(questionNumber - 1, bank.length - 1);
  const next =
    ctx.includeCoding &&
    ctx.interviewType !== "hr" &&
    questionNumber === Math.min(3, normalizeQuestionCount(ctx.totalQuestions) - 1)
      ? normalizeQuestion(
          {
            category: "coding",
            question:
              "Let's do a short coding exercise. Talk me through your approach, then run the local tests.",
            codeProblem: supportedCodeProblem(ctx.difficulty)
          },
          ctx
        )
      : bank[nextIndex];

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
    nextQuestion: done ? null : next,
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
  if (!status.available) {
    return {
      question: demoFirstQuestion(ctx),
      provider: "demo",
      demoMode: true
    };
  }

  const fallback = demoFirstQuestion(ctx);
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
${typeGuidance(ctx.interviewType)}
${difficultyGuidance(ctx.difficulty)}
${languageGuidance(ctx.languageCode)}
${jobDescriptionBlock(ctx.jobDescription)}
${codingGuidance(ctx.includeCoding, ctx.difficulty)}

Candidate resume context:
${resumeSnippet(ctx.resumeContext)}

Ask the FIRST question only in one or two concise sentences. Begin naturally,
without a long welcome or generic filler. Make it specific to company + role.
Do not answer it and do not stack multiple questions.

Return JSON:
{ "question": string, "category": "intro" | "behavioral" | "technical" | "coding" | "company" | "closing" | "general", "codeProblem"?: { "title": string, "description": string, "starterCode": string, "testCases": [{ "input": string, "expected": string, "label"?: string }] } }`,
    fallback
  );

  if (!result?.parsed.question?.trim()) {
    return { question: fallback, provider: status.provider ?? "demo", demoMode: false };
  }

  return {
    question: normalizeQuestion({
      question: result.parsed.question.trim(),
      category: result.parsed.category?.trim() || "general",
      codeProblem: result.parsed.codeProblem
    }, ctx),
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

  if (!status.available) {
    return {
      result: demoAnswerResult(ctx, questionIndex, answer),
      provider: "demo",
      demoMode: true
    };
  }

  const fallback = demoAnswerResult(ctx, questionIndex, answer);
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
Questions planned: ${ctx.totalQuestions}. This was question ${questionIndex + 1}.
Remaining after this: ${remaining}.
${languageGuidance(ctx.languageCode)}
${jobDescriptionBlock(ctx.jobDescription)}
${codingGuidance(ctx.includeCoding, ctx.difficulty)}

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
  "nextCategory": string,
  "nextCodeProblem"?: { "title": string, "description": string, "starterCode": string, "testCases": [{ "input": string, "expected": string, "label"?: string }] }
}

If done or remaining is 0, set done=true and nextQuestion=null.
Otherwise ask one concise, distinct question. Prefer a relevant follow-up on a
specific detail in the latest answer; if there is no useful detail, progress to
a new competency. Do not repeat, stack questions, use canned praise, or claim
to know facts not present above. Move from introduction to evidence, depth,
role/company fit, then closing.`,
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
          : normalizeQuestion({
              question: result.parsed.nextQuestion.trim(),
              category: result.parsed.nextCategory?.trim() || "general",
              codeProblem: result.parsed.nextCodeProblem
            }, ctx),
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
