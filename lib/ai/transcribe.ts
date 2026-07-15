/**
 * Speech-to-text via Groq Whisper (OpenAI-compatible audio API).
 * Used by web mock interview voice answers.
 */

import OpenAI from "openai";
import { toFile } from "openai/uploads";

let groqAudioClient: OpenAI | null = null;

const DEFAULT_WHISPER_MODEL = "whisper-large-v3-turbo";

export function isTranscriptionAvailable() {
  return Boolean(process.env.GROQ_API_KEY?.trim());
}

function getGroqAudioClient() {
  const key = process.env.GROQ_API_KEY?.trim();
  if (!key) return null;

  groqAudioClient ??= new OpenAI({
    apiKey: key,
    baseURL: "https://api.groq.com/openai/v1"
  });

  return groqAudioClient;
}

export async function transcribeAudioBuffer(input: {
  buffer: Buffer;
  filename: string;
  mimeType?: string;
  language?: string;
}) {
  const client = getGroqAudioClient();
  if (!client) {
    throw new Error("GROQ_API_KEY is required for voice transcription");
  }

  const model =
    process.env.GROQ_WHISPER_MODEL?.trim() || DEFAULT_WHISPER_MODEL;

  const file = await toFile(input.buffer, input.filename, {
    type: input.mimeType || "audio/webm"
  });

  const transcription = await client.audio.transcriptions.create({
    file,
    model,
    language: input.language || "en",
    response_format: "json",
    temperature: 0
  });

  const text = transcription.text?.trim() ?? "";
  if (!text) {
    throw new Error("Could not hear clear speech — try again");
  }

  return { text, model };
}
