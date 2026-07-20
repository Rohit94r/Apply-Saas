/**
 * OpenAI TTS for mock interview questions (tts-1-hd).
 * Prefer this for the curated James / Michael / Sarah / Priya personas.
 */

import OpenAI from "openai";
import { getInterviewPersona } from "@/lib/ai/interview-personas";

const OPENAI_TTS_VOICES = new Set([
  "alloy",
  "ash",
  "coral",
  "echo",
  "fable",
  "onyx",
  "nova",
  "sage",
  "shimmer"
]);

let client: OpenAI | null = null;

export function isOpenAiTtsConfigured() {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export function getOpenAiTtsStatus() {
  const available = isOpenAiTtsConfigured();
  return {
    available,
    provider: "openai" as const,
    message: available
      ? "OpenAI HD voice ready"
      : "OpenAI TTS unavailable — trying ElevenLabs / browser fallback"
  };
}

function getClient() {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return null;
  client ??= new OpenAI({ apiKey: key });
  return client;
}

/** Soften delivery so questions sound more conversational */
export function addNaturalPauses(text: string): string {
  return text
    .replace(/\?/g, "?...")
    .replace(/,/g, ", ")
    .replace(/\. /g, ".  ")
    .replace(/\bTell me about\b/gi, "Tell me... tell me about")
    .replace(/\bWhat would you\b/gi, "Hmm, what would you")
    .replace(/\bCan you\b/gi, "Can you")
    .trim();
}

export function resolveOpenAiVoiceId(voiceId?: string): string {
  const raw = voiceId?.trim() || "";
  if (OPENAI_TTS_VOICES.has(raw)) return raw;
  return getInterviewPersona(raw).openaiVoice;
}

export async function synthesizeOpenAiSpeech(
  text: string,
  options: { voiceId?: string; speed?: number } = {}
): Promise<ArrayBuffer> {
  const openai = getClient();
  if (!openai) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("Nothing to speak");
  }

  const voice = resolveOpenAiVoiceId(options.voiceId) as
    | "alloy"
    | "ash"
    | "coral"
    | "echo"
    | "fable"
    | "onyx"
    | "nova"
    | "sage"
    | "shimmer";

  const input = addNaturalPauses(trimmed).slice(0, 2500);

  const audio = await openai.audio.speech.create({
    model: "tts-1-hd",
    voice,
    input,
    speed: options.speed ?? 0.95,
    response_format: "mp3"
  });

  return audio.arrayBuffer();
}
