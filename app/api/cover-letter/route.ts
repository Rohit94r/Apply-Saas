import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { generateCoverLetter } from "@/lib/ai/resume-engine";
import { coverLetterSchema } from "@/lib/validations";
import { getCurrentUserId } from "@/lib/auth";
import { createCoverLetter, listCoverLetters } from "@/lib/data/cover-letters";

function isDbDown(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  return (
    message.includes("Database connection failed") ||
    message.includes("MONGODB_URI") ||
    message.includes("ECONNREFUSED") ||
    message.includes("Server selection timed out")
  );
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    try {
      const coverLetters = await listCoverLetters(userId);
      return NextResponse.json({ coverLetters });
    } catch (error) {
      if (isDbDown(error)) {
        return NextResponse.json({ coverLetters: [], offline: true });
      }
      throw error;
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load cover letters";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = coverLetterSchema.parse(body);
    const userId = await getCurrentUserId();
    const result = await generateCoverLetter(input);

    let savedId: string | undefined;
    try {
      const saved = await createCoverLetter(userId, {
        company: input.company,
        role: input.role,
        resumeId: body.resumeId,
        tone: input.tone,
        coverLetter: result.coverLetter,
        jobDescription: input.jobDescription
      });
      savedId = saved.id;
    } catch {
      // Generation still succeeds even if DB is down
    }

    return NextResponse.json({ ...result, id: savedId });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues.map((i) => i.message).join(". ") },
        { status: 400 }
      );
    }
    const message =
      error instanceof Error ? error.message : "Unable to generate cover letter";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
