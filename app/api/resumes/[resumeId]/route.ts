import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { updateGeneratedResume } from "@/lib/data/resumes";
import { updateGeneratedResumeSchema } from "@/lib/validations";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const { resumeId } = await params;
    const body = await request.json();
    const input = updateGeneratedResumeSchema.parse(body);
    const userId = await getCurrentUserId();
    const resume = await updateGeneratedResume(userId, resumeId, input);

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
