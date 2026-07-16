import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { coverLetters } from "@/packages/db/schema";

export type CoverLetterRecord = {
  id: string;
  userId: string;
  company: string;
  role: string;
  resumeId: string;
  tone: string;
  coverLetter: string;
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
};

type CreateCoverLetterInput = {
  company: string;
  role: string;
  resumeId?: string;
  tone?: string;
  coverLetter: string;
  jobDescription?: string;
};

function serialize(row: typeof coverLetters.$inferSelect): CoverLetterRecord {
  return {
    id: row.id,
    userId: row.userId,
    company: row.company,
    role: row.role,
    resumeId: row.resumeId ?? "",
    tone: row.tone ?? "confident",
    coverLetter: row.coverLetter,
    jobDescription: row.jobDescription ?? "",
    createdAt: (row.createdAt ?? new Date()).toISOString(),
    updatedAt: (row.updatedAt ?? new Date()).toISOString()
  };
}

export async function listCoverLetters(userId: string, limit = 20) {
  const rows = await db
    .select()
    .from(coverLetters)
    .where(eq(coverLetters.userId, userId))
    .orderBy(desc(coverLetters.updatedAt))
    .limit(limit);
  return rows.map(serialize);
}

export async function createCoverLetter(
  userId: string,
  input: CreateCoverLetterInput
) {
  const [created] = await db
    .insert(coverLetters)
    .values({
      userId,
      company: input.company.trim(),
      role: input.role.trim(),
      resumeId: input.resumeId?.trim() ?? "",
      tone: input.tone?.trim() ?? "confident",
      coverLetter: input.coverLetter,
      jobDescription: input.jobDescription?.trim() ?? ""
    })
    .returning();
  return serialize(created);
}

export async function deleteCoverLetter(userId: string, id: string) {
  const deleted = await db
    .delete(coverLetters)
    .where(and(eq(coverLetters.id, id), eq(coverLetters.userId, userId)))
    .returning({ id: coverLetters.id });

  if (deleted.length === 0) {
    throw new Error("Cover letter not found");
  }
}
