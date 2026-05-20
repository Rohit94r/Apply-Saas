import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { generateInterviewGuide } from "@/lib/ai/resume-engine";
import { interviewGuideSchema } from "@/lib/validations";
import { getCurrentUserId } from "@/lib/auth";
import { createInterviewGuide } from "@/lib/data/resumes";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = interviewGuideSchema.parse(body);
    const userId = await getCurrentUserId();
    const generatedGuide = await generateInterviewGuide(input);
    const guide = await createInterviewGuide(userId, input, generatedGuide);

    return NextResponse.json({
      guide
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.issues
        .map((issue) => issue.message)
        .filter(Boolean)
        .join(". ");

      return NextResponse.json(
        { error: message || "Please add enough details to create a prep plan" },
        { status: 400 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Unable to generate interview guide";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
