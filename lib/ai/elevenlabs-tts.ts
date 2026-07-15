/**
 * ElevenLabs text-to-speech for mock interview questions.
 * API key stays server-side — never expose to the client.
 */

/** Rachel — clear English female voice (ElevenLabs default catalog) */
export const DEFAULT_ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

/** Turbo model — lower latency for conversational interview turns */
export const DEFAULT_ELEVENLABS_MODEL_ID = "eleven_turbo_v2_5";

export function isElevenLabsConfigured() {
  return Boolean(process.env.ELEVENLABS_API_KEY?.trim());
}

export function getElevenLabsVoiceId() {
  return (
    process.env.ELEVENLABS_VOICE_ID?.trim() || DEFAULT_ELEVENLABS_VOICE_ID
  );
}

export function getElevenLabsModelId() {
  return (
    process.env.ELEVENLABS_MODEL_ID?.trim() || DEFAULT_ELEVENLABS_MODEL_ID
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

export async function synthesizeSpeech(text: string): Promise<ArrayBuffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY is not configured");
  }

  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("Nothing to speak");
  }

  const voiceId = getElevenLabsVoiceId();
  const modelId = getElevenLabsModelId();

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
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.8,
          style: 0.35,
          use_speaker_boost: true
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
