import { NextResponse } from "next/server";
import { generateResumeCritique } from "@/lib/ai/resume-engine";
import { getCurrentUserId } from "@/lib/auth";
import { resumeCritiqueSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = resumeCritiqueSchema.parse(body);
    await getCurrentUserId();
    const critique = await generateResumeCritique(input);

    return NextResponse.json({ critique });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to critique resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
