import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import {
  getLatestMasterResume,
  upsertMasterResume
} from "@/lib/data/resumes";
import { masterResumeSchema } from "@/lib/validations";

function emptyToUndefined(value: unknown) {
  return typeof value === "string" && !value.trim() ? undefined : value;
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    const masterResume = await getLatestMasterResume(userId);

    return NextResponse.json({ masterResume });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load master resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = masterResumeSchema.parse({
      title: emptyToUndefined(body.title),
      sourceName: emptyToUndefined(body.sourceName),
      sourceUrl: emptyToUndefined(body.sourceUrl),
      rawText: body.rawText
    });
    const userId = await getCurrentUserId();
    const masterResume = await upsertMasterResume(userId, input);

    return NextResponse.json({ masterResume });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save master resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
