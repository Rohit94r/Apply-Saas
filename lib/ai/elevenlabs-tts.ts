/**
 * ElevenLabs text-to-speech for mock interview questions.
 * API key stays server-side — never expose to the client.
 */

import { getInterviewLanguage } from "@/lib/ai/elevenlabs-voices";
import { getInterviewPersona } from "@/lib/ai/interview-personas";

/** Rachel — clear English female voice (ElevenLabs default catalog) */
export const DEFAULT_ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

/** Natural conversational model — slower, clearer delivery */
export const DEFAULT_ELEVENLABS_MODEL_ID = "eleven_turbo_v2_5";

export type SynthesizeSpeechOptions = {
  voiceId?: string;
  languageCode?: string;
  speed?: number;
};

export function isElevenLabsConfigured() {
  return Boolean(process.env.ELEVENLABS_API_KEY?.trim());
}

export function getElevenLabsVoiceId(override?: string) {
  return (
    override?.trim() ||
    process.env.ELEVENLABS_VOICE_ID?.trim() ||
    DEFAULT_ELEVENLABS_VOICE_ID
  );
}

export function getElevenLabsModelId(languageCode?: string) {
  const lang = getInterviewLanguage(languageCode);
  return (
    process.env.ELEVENLABS_MODEL_ID?.trim() || lang.elevenLabsModel
  );
}

export function getElevenLabsTtsStatus() {
  const available = isElevenLabsConfigured();
  return {
    available,
    message: available
      ? "ElevenLabs voice ready"
      : "ElevenLabs TTS unavailable — browser voice fallback"
  };
}

export async function synthesizeSpeech(
  text: string,
  options: SynthesizeSpeechOptions = {}
): Promise<ArrayBuffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY is not configured");
  }

  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("Nothing to speak");
  }

  // Accept persona id, OpenAI voice alias, or raw ElevenLabs id
  const persona = getInterviewPersona(options.voiceId);
  const resolvedVoiceId =
    options.voiceId &&
    (options.voiceId === persona.elevenLabsVoiceId ||
      options.voiceId.length > 20)
      ? getElevenLabsVoiceId(options.voiceId)
      : persona.elevenLabsVoiceId;
  const voiceId = getElevenLabsVoiceId(resolvedVoiceId);
  const lang = getInterviewLanguage(options.languageCode);
  const modelId = getElevenLabsModelId(options.languageCode);
  const speed = options.speed ?? 0.88;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey
      },
      body: JSON.stringify({
        text: trimmed.slice(0, 2500),
        model_id: modelId,
        language_code: lang.code !== "en" ? lang.code : undefined,
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.82,
          style: 0.22,
          use_speaker_boost: true,
          speed
        }
      })
    }
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `ElevenLabs TTS failed (${response.status})${detail ? `: ${detail.slice(0, 200)}` : ""}`
    );
  }

  return response.arrayBuffer();
}
