import { connectToDatabase } from "@/lib/mongodb";
import { MockInterviewSession } from "@/models/MockInterviewSession";

export type MockQuestion = {
  question: string;
  tip: string;
  sampleAnswer: string;
  category: string;
};

export type MockInterviewSessionRecord = {
  id: string;
  userId: string;
  company: string;
  role: string;
  questions: MockQuestion[];
  durationSeconds: number;
  completedAt?: string;
  createdAt: string;
};

type CreateSessionInput = {
  company: string;
  role: string;
  questions: MockQuestion[];
  durationSeconds?: number;
  completed?: boolean;
};

function serialize(doc: {
  _id: { toString(): string };
  userId: string;
  company: string;
  role: string;
  questions?: MockQuestion[];
  durationSeconds?: number;
  completedAt?: Date | null;
  createdAt?: Date;
}): MockInterviewSessionRecord {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    company: doc.company,
    role: doc.role,
    questions: doc.questions ?? [],
    durationSeconds: doc.durationSeconds ?? 0,
    completedAt: doc.completedAt
      ? new Date(doc.completedAt).toISOString()
      : undefined,
    createdAt: (doc.createdAt ?? new Date()).toISOString()
  };
}

/** Deterministic practice pack — works without AI for reliable MVP. */
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

export async function listMockSessions(userId: string, limit = 10) {
  await connectToDatabase();
  const rows = await MockInterviewSession.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return rows.map((row) =>
    serialize(row as unknown as Parameters<typeof serialize>[0])
  );
}

export async function createMockSession(
  userId: string,
  input: CreateSessionInput
) {
  await connectToDatabase();
  const created = await MockInterviewSession.create({
    userId,
    company: input.company.trim(),
    role: input.role.trim(),
    questions: input.questions,
    durationSeconds: input.durationSeconds ?? 0,
    completedAt: input.completed ? new Date() : undefined
  });
  return serialize(created.toObject() as Parameters<typeof serialize>[0]);
}

export async function completeMockSession(
  userId: string,
  id: string,
  durationSeconds: number
) {
  await connectToDatabase();
  const updated = await MockInterviewSession.findOneAndUpdate(
    { _id: id, userId },
    {
      $set: {
        durationSeconds,
        completedAt: new Date()
      }
    },
    { new: true }
  ).lean();

  if (!updated) {
    throw new Error("Session not found");
  }

  return serialize(updated as unknown as Parameters<typeof serialize>[0]);
}
