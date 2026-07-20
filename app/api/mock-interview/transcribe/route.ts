import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { getInterviewLanguage } from "@/lib/ai/interview-personas";
import {
  isTranscriptionAvailable,
  transcribeAudioBuffer
} from "@/lib/ai/transcribe";

export const runtime = "nodejs";

const MAX_AUDIO_BYTES = 12 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    await getCurrentUserId();

    if (!isTranscriptionAvailable()) {
      return NextResponse.json(
        {
          error:
            "Voice needs GROQ_API_KEY for Whisper transcription. Type your answer until the key is set.",
          code: "STT_UNAVAILABLE"
        },
        { status: 503 }
      );
    }

    const form = await request.formData();
    const file = form.get("audio");
    const languageRaw = form.get("language");
    const languageCode =
      typeof languageRaw === "string" ? languageRaw.trim() : "en";
    const lang = getInterviewLanguage(languageCode);

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Upload an audio recording as field `audio`." },
        { status: 400 }
      );
    }

    if (file.size > MAX_AUDIO_BYTES) {
      return NextResponse.json(
        { error: "Recording is too long — keep answers under ~2 minutes." },
        { status: 400 }
      );
    }

    if (file.size < 800) {
      return NextResponse.json(
        { error: "Recording too short — hold the mic and speak clearly." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension =
      file.name.split(".").pop()?.toLowerCase() ||
      (file.type.includes("mp4") ? "mp4" : "webm");

    const { text, model } = await transcribeAudioBuffer({
      buffer,
      filename: `mock-answer.${extension}`,
      mimeType: file.type || "audio/webm",
      language: lang.code
    });

    return NextResponse.json({ text, model, language: lang.code });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Transcription failed";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
