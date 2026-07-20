import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  mockInterviewSessions,
  type MockQuestionJson,
  type MockTurnJson
} from "@/packages/db/schema";
import type {
  MockDifficulty,
  MockInterviewType,
  MockAIProvider
} from "@/lib/ai/mock-interview";
import { normalizeQuestionCount } from "@/lib/mock-interview/flow";

export type MockQuestion = {
  question: string;
  tip: string;
  sampleAnswer: string;
  category: string;
};

export type MockCodeProblem = {
  title: string;
  description: string;
  starterCode: string;
  testCases: Array<{ input: string; expected: string; label?: string }>;
};

export type MockTurnRecord = {
  question: string;
  tip?: string;
  sampleAnswer?: string;
  category?: string;
  answer?: string;
  strengths?: string[];
  improvements?: string[];
  score?: number;
  codeProblem?: MockCodeProblem;
  codePassed?: boolean;
};

export type MockInterviewSessionRecord = {
  id: string;
  userId: string;
  company: string;
  role: string;
  interviewType: MockInterviewType;
  difficulty: MockDifficulty;
  totalQuestions: number;
  questions: MockQuestion[];
  turns: MockTurnRecord[];
  provider?: string;
  demoMode?: boolean;
  overallScore?: number;
  tips?: string[];
  highlights?: string[];
  durationSeconds: number;
  completedAt?: string;
  createdAt: string;
};

type CreateSessionInput = {
  company: string;
  role: string;
  jobDescription?: string;
  interviewType?: MockInterviewType;
  difficulty?: MockDifficulty;
  includeCoding?: boolean;
  languageCode?: string;
  voiceId?: string;
  totalQuestions?: number;
  questions?: MockQuestion[];
  turns?: MockTurnRecord[];
  provider?: MockAIProvider | string;
  demoMode?: boolean;
  durationSeconds?: number;
  completed?: boolean;
};

type UpdateSessionInput = {
  turns?: MockTurnRecord[];
  questions?: MockQuestion[];
  durationSeconds?: number;
  overallScore?: number;
  tips?: string[];
  highlights?: string[];
  provider?: string;
  demoMode?: boolean;
  completed?: boolean;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUuid(id: string) {
  return UUID_RE.test(id);
}

function serialize(
  row: typeof mockInterviewSessions.$inferSelect
): MockInterviewSessionRecord {
  return {
    id: row.id,
    userId: row.userId,
    company: row.company,
    role: row.role,
    interviewType: (row.interviewType as MockInterviewType) || "mixed",
    difficulty: (row.difficulty as MockDifficulty) || "medium",
    totalQuestions: normalizeQuestionCount(row.totalQuestions),
    questions: (row.questions as MockQuestion[]) ?? [],
    turns: (row.turns as MockTurnRecord[]) ?? [],
    provider: row.provider,
    demoMode: row.demoMode,
    overallScore: row.overallScore ?? undefined,
    tips: row.tips ?? [],
    highlights: row.highlights ?? [],
    durationSeconds: row.durationSeconds ?? 0,
    completedAt: row.completedAt
      ? new Date(row.completedAt).toISOString()
      : undefined,
    createdAt: (row.createdAt ?? new Date()).toISOString()
  };
}

/** Deterministic practice pack — labeled demo / offline fallback only. */
export function buildMockQuestions(company: string, role: string): MockQuestion[] {
  const c = company.trim() || "the company";
  const r = role.trim() || "this role";

  return [
    {
      category: "intro",
      question: `Tell me about yourself and why you are interested in the ${r} role at ${c}.`,
      tip: "Keep it to 60–90 seconds: present → past → future, tailored to this company.",
      sampleAnswer: `I am a student/early-career engineer focused on ${r}. Recently I built projects that map to this role. I am excited about ${c} because of the work and the chance to grow here.`
    },
    {
      category: "behavioral",
      question: `Describe a project you are proud of that relates to ${r}. What was your contribution?`,
      tip: "Use STAR: Situation, Task, Action, Result — quantify impact if you can.",
      sampleAnswer:
        "Situation: I owned a feature for a campus project. Task: ship it under a deadline. Action: scoped MVP, wrote tests, shipped. Result: used by peers / reduced manual work."
    },
    {
      category: "technical",
      question: `Walk me through how you would approach a common technical problem for a ${r} interview.`,
      tip: "Clarify requirements, outline approach, discuss trade-offs, mention testing.",
      sampleAnswer:
        "I would restate the problem, ask constraints, propose a baseline approach, then optimize and discuss edge cases and complexity."
    },
    {
      category: "company",
      question: `What do you know about ${c}, and how would you contribute in the first 90 days?`,
      tip: "Show research: products, users, recent news — then a realistic ramp plan.",
      sampleAnswer: `I researched ${c}'s products and hiring focus for ${r}. In 90 days I would learn the codebase, ship a small improvement, and ask good questions early.`
    },
    {
      category: "behavioral",
      question: "Tell me about a time you failed or got stuck. What did you learn?",
      tip: "Own the failure, show learning, and end on what you do differently now.",
      sampleAnswer:
        "I underestimated scope once, missed a soft deadline, then started breaking work into smaller milestones and asking for feedback earlier."
    },
    {
      category: "closing",
      question: `Do you have questions for us about the ${r} team at ${c}?`,
      tip: "Ask about mentorship, success metrics for the role, and the team’s current priorities.",
      sampleAnswer:
        "What does success look like in the first six months? How does the team handle mentorship for early-career hires?"
    }
  ];
}

export async function listMockSessions(userId: string, limit = 5) {
  const rows = await db
    .select()
    .from(mockInterviewSessions)
    .where(eq(mockInterviewSessions.userId, userId))
    .orderBy(desc(mockInterviewSessions.createdAt))
    .limit(limit);
  return rows.map(serialize);
}

export async function getMockSession(userId: string, id: string) {
  if (!isUuid(id)) return null;
  const row = await db.query.mockInterviewSessions.findFirst({
    where: and(
      eq(mockInterviewSessions.id, id),
      eq(mockInterviewSessions.userId, userId)
    )
  });
  if (!row) return null;
  return serialize(row);
}

export async function createMockSession(
  userId: string,
  input: CreateSessionInput
) {
  const [created] = await db
    .insert(mockInterviewSessions)
    .values({
      userId,
      company: input.company.trim(),
      role: input.role.trim(),
      interviewType: input.interviewType ?? "mixed",
      difficulty: input.difficulty ?? "medium",
      totalQuestions: normalizeQuestionCount(input.totalQuestions),
      questions: (input.questions ?? []) as MockQuestionJson[],
      turns: (input.turns ?? []) as MockTurnJson[],
      provider: input.provider ?? "",
      demoMode: input.demoMode ?? false,
      durationSeconds: input.durationSeconds ?? 0,
      completedAt: input.completed ? new Date() : undefined
    })
    .returning();
  return serialize(created);
}

export async function updateMockSession(
  userId: string,
  id: string,
  input: UpdateSessionInput
) {
  if (!isUuid(id)) {
    throw new Error("Session not found");
  }

  const $set: Partial<typeof mockInterviewSessions.$inferInsert> = {
    updatedAt: new Date()
  };
  if (input.turns) $set.turns = input.turns as MockTurnJson[];
  if (input.questions) $set.questions = input.questions as MockQuestionJson[];
  if (input.durationSeconds !== undefined) {
    $set.durationSeconds = input.durationSeconds;
  }
  if (input.overallScore !== undefined) $set.overallScore = input.overallScore;
  if (input.tips) $set.tips = input.tips;
  if (input.highlights) $set.highlights = input.highlights;
  if (input.provider !== undefined) $set.provider = input.provider;
  if (input.demoMode !== undefined) $set.demoMode = input.demoMode;
  if (input.completed) $set.completedAt = new Date();

  const [updated] = await db
    .update(mockInterviewSessions)
    .set($set)
    .where(
      and(
        eq(mockInterviewSessions.id, id),
        eq(mockInterviewSessions.userId, userId)
      )
    )
    .returning();

  if (!updated) {
    throw new Error("Session not found");
  }

  return serialize(updated);
}

export async function completeMockSession(
  userId: string,
  id: string,
  durationSeconds: number
) {
  return updateMockSession(userId, id, {
    durationSeconds,
    completed: true
  });
}
