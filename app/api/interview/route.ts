import { NextResponse } from "next/server";
import { generateInterviewGuide } from "@/lib/ai/resume-engine";
import { interviewGuideSchema } from "@/lib/validations";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = interviewGuideSchema.parse(body);
    const userId = await getCurrentUserId();
    const guide = await generateInterviewGuide(input);

    return NextResponse.json({
      guide: {
        id: crypto.randomUUID(),
        userId,
        company: input.company,
        role: input.role,
        ...guide,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to generate interview guide";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
