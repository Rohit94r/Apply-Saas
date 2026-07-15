import { connectToDatabase } from "@/lib/mongodb";
import { CoverLetter } from "@/models/CoverLetter";

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

function serialize(doc: {
  _id: { toString(): string };
  userId: string;
  company: string;
  role: string;
  resumeId?: string;
  tone?: string;
  coverLetter: string;
  jobDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}): CoverLetterRecord {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    company: doc.company,
    role: doc.role,
    resumeId: doc.resumeId ?? "",
    tone: doc.tone ?? "confident",
    coverLetter: doc.coverLetter,
    jobDescription: doc.jobDescription ?? "",
    createdAt: (doc.createdAt ?? new Date()).toISOString(),
    updatedAt: (doc.updatedAt ?? new Date()).toISOString()
  };
}

export async function listCoverLetters(userId: string, limit = 20) {
  await connectToDatabase();
  const rows = await CoverLetter.find({ userId })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean();
  return rows.map((row) =>
    serialize(row as unknown as Parameters<typeof serialize>[0])
  );
}

export async function createCoverLetter(
  userId: string,
  input: CreateCoverLetterInput
) {
  await connectToDatabase();
  const created = await CoverLetter.create({
    userId,
    company: input.company.trim(),
    role: input.role.trim(),
    resumeId: input.resumeId?.trim() ?? "",
    tone: input.tone?.trim() ?? "confident",
    coverLetter: input.coverLetter,
    jobDescription: input.jobDescription?.trim() ?? ""
  });
  return serialize(created.toObject() as Parameters<typeof serialize>[0]);
}

export async function deleteCoverLetter(userId: string, id: string) {
  await connectToDatabase();
  const result = await CoverLetter.deleteOne({ _id: id, userId });
  if (result.deletedCount === 0) {
    throw new Error("Cover letter not found");
  }
}
