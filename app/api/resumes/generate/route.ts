import { NextResponse } from "next/server";
import { generateTailoredResume } from "@/lib/ai/resume-engine";
import { generateResumeSchema } from "@/lib/validations";
import { getCurrentUserId } from "@/lib/auth";
import { createGeneratedResume } from "@/lib/data/resumes";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = generateResumeSchema.parse(body);
    const userId = await getCurrentUserId();
    const generatedContent = await generateTailoredResume(input);
    const resume = await createGeneratedResume(userId, input, generatedContent);

    return NextResponse.json({
      resume
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to generate resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
