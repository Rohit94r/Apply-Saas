"use client";

import { useCallback, useRef, useState } from "react";

type SpeakOptions = {
  text: string;
  voiceId: string;
  languageCode?: string;
};

function speakBrowserFallback(
  text: string,
  speechLang: string,
  onEnd: () => void
) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd();
    return;
  }

  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = speechLang || "en-IN";
  utter.rate = 0.92;
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => v.lang.startsWith(speechLang.slice(0, 2))) ??
    voices.find((v) => v.lang.startsWith("en")) ??
    voices[0];
  if (preferred) utter.voice = preferred;
  utter.onend = onEnd;
  utter.onerror = onEnd;
  window.speechSynthesis.speak(utter);
}

/**
 * Plays interview questions via /api/mock-interview/speak (OpenAI HD → ElevenLabs).
 */
export function useInterviewVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    async (
      options: SpeakOptions,
      onEnded?: () => void,
      speechLang = "en-IN"
    ) => {
      const text = options.text.trim();
      if (!text) {
        onEnded?.();
        return;
      }

      stopSpeaking();
      setIsSpeaking(true);

      const finish = () => {
        setIsSpeaking(false);
        onEnded?.();
      };

      try {
        const response = await fetch("/api/mock-interview/speak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            voiceId: options.voiceId,
            languageCode: options.languageCode
          })
        });

        if (!response.ok) {
          throw new Error("tts unavailable");
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        audioUrlRef.current = audioUrl;

        const audio = new Audio(audioUrl);
        audio.playbackRate = 0.95;
        audioRef.current = audio;

        audio.onended = () => {
          stopSpeaking();
          onEnded?.();
        };
        audio.onerror = () => {
          stopSpeaking();
          speakBrowserFallback(text, speechLang, finish);
        };

        await audio.play();
      } catch {
        speakBrowserFallback(text, speechLang, finish);
      }
    },
    [stopSpeaking]
  );

  return { speak, stopSpeaking, isSpeaking };
}
