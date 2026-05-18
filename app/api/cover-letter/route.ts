import { NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/ai/resume-engine";
import { coverLetterSchema } from "@/lib/validations";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = coverLetterSchema.parse(body);
    await getCurrentUserId();
    const result = await generateCoverLetter(input);

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to generate cover letter";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
