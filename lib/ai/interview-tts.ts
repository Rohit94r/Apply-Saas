/**
 * Unified mock-interview TTS — OpenAI HD first, ElevenLabs fallback.
 */

import {
  getElevenLabsTtsStatus,
  isElevenLabsConfigured,
  synthesizeSpeech as synthesizeElevenLabs
} from "@/lib/ai/elevenlabs-tts";
import {
  getInterviewPersona,
  listInterviewPersonas
} from "@/lib/ai/interview-personas";
import {
  getOpenAiTtsStatus,
  isOpenAiTtsConfigured,
  synthesizeOpenAiSpeech
} from "@/lib/ai/openai-tts";

export type UnifiedTtsStatus = {
  available: boolean;
  provider: "openai" | "elevenlabs" | "browser";
  message: string;
  openai: boolean;
  elevenlabs: boolean;
};

export function getUnifiedTtsStatus(): UnifiedTtsStatus {
  const openai = isOpenAiTtsConfigured();
  const elevenlabs = isElevenLabsConfigured();

  if (openai) {
    return {
      available: true,
      provider: "openai",
      message: getOpenAiTtsStatus().message,
      openai,
      elevenlabs
    };
  }

  if (elevenlabs) {
    return {
      available: true,
      provider: "elevenlabs",
      message: getElevenLabsTtsStatus().message,
      openai,
      elevenlabs
    };
  }

  return {
    available: false,
    provider: "browser",
    message:
      "No cloud TTS — browser voice fallback. Add OPENAI_API_KEY for HD interviewers.",
    openai,
    elevenlabs
  };
}

export function getVoiceCatalog() {
  const status = getUnifiedTtsStatus();
  const catalog = listInterviewPersonas({
    openaiTts: status.openai,
    elevenLabs: status.elevenlabs
  });

  return {
    ...catalog,
    /** Shape expected by older clients */
    voices: catalog.personas.map((p) => ({
      id: p.id,
      name: p.name,
      label: `${p.name} — ${p.role}`,
      gender: p.gender,
      avatarSrc: p.avatarSrc,
      openaiVoice: p.openaiVoice,
      elevenLabsVoiceId: p.elevenLabsVoiceId
    })),
    defaultVoiceId: catalog.defaultPersonaId,
    tts: status
  };
}

export async function synthesizeInterviewSpeech(
  text: string,
  options: { voiceId?: string; languageCode?: string; speed?: number } = {}
): Promise<{ audio: ArrayBuffer; provider: "openai" | "elevenlabs" }> {
  const persona = getInterviewPersona(options.voiceId);
  const openaiReady = isOpenAiTtsConfigured();
  const elevenReady = isElevenLabsConfigured();

  if (openaiReady) {
    try {
      const audio = await synthesizeOpenAiSpeech(text, {
        voiceId: persona.openaiVoice,
        speed: options.speed ?? 0.95
      });
      return { audio, provider: "openai" };
    } catch (error) {
      if (!elevenReady) throw error;
      // Fall through to ElevenLabs
    }
  }

  if (elevenReady) {
    const audio = await synthesizeElevenLabs(text, {
      voiceId: persona.elevenLabsVoiceId,
      languageCode: options.languageCode,
      speed: options.speed ?? 0.88
    });
    return { audio, provider: "elevenlabs" };
  }

  throw new Error("No TTS provider configured");
}
