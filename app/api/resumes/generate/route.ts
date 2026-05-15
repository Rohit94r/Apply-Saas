import { NextResponse } from "next/server";
import { generateTailoredResume } from "@/lib/ai/resume-engine";
import { generateResumeSchema } from "@/lib/validations";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = generateResumeSchema.parse(body);
    const userId = await getCurrentUserId();
    const generatedContent = await generateTailoredResume(input);

    return NextResponse.json({
      resume: {
        id: crypto.randomUUID(),
        userId,
        company: input.company,
        role: input.role,
        atsScore: generatedContent.atsScore,
        keywords: generatedContent.keywords,
        status: "ready",
        generatedContent,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to generate resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
