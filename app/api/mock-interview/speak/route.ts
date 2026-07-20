import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import {
  getUnifiedTtsStatus,
  synthesizeInterviewSpeech
} from "@/lib/ai/interview-tts";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 2500;

export async function GET() {
  try {
    await getCurrentUserId();
    return NextResponse.json({ tts: getUnifiedTtsStatus() });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to check TTS status";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    await getCurrentUserId();

    const tts = getUnifiedTtsStatus();
    if (!tts.available) {
      return NextResponse.json(
        {
          error: "Cloud TTS is not configured",
          code: "TTS_UNAVAILABLE",
          tts
        },
        { status: 503 }
      );
    }

    const body = (await request.json()) as {
      text?: unknown;
      voiceId?: unknown;
      languageCode?: unknown;
    };
    const text = typeof body.text === "string" ? body.text.trim() : "";
    const voiceId =
      typeof body.voiceId === "string" ? body.voiceId.trim() : undefined;
    const languageCode =
      typeof body.languageCode === "string"
        ? body.languageCode.trim()
        : undefined;

    if (!text) {
      return NextResponse.json(
        { error: "Provide text to speak." },
        { status: 400 }
      );
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: "Text is too long to speak." },
        { status: 400 }
      );
    }

    const { audio, provider } = await synthesizeInterviewSpeech(text, {
      voiceId,
      languageCode
    });

    return new NextResponse(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
        "Content-Length": String(audio.byteLength),
        "X-TTS-Provider": provider
      }
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Speech synthesis failed";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
