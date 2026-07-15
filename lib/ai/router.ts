import { getTextAIClient, type TextAIProvider } from "@/lib/ai/openai";
import { getGeminiClient } from "@/lib/ai/gemini";

/**
 * Central AI router — picks the best model for a task.
 *
 * Strategy (Phase 1 — free-first):
 *   resume / cover-letter / ats / critique → Gemini 1.5 Flash (long context, better prose)
 *   interview / quick / coding            → Groq Llama 3.3 70B (fast, good JSON)
 *   transcribe                             → Groq Whisper (when desktop ships)
 *
 * Falls back gracefully:
 *   1. Try the preferred provider for the task.
 *   2. If unavailable, try the other text provider.
 *   3. If neither is configured, return null (caller uses deterministic fallback).
 */

export type AITask =
  | "resume"
  | "cover-letter"
  | "ats"
  | "critique"
  | "interview"
  | "quick"
  | "photo"
  | "transcribe";

export type AIPlan = "free" | "pro" | "premium";

/** Preferred provider per task. */
const taskPreference: Record<AITask, "gemini" | "groq" | "openai"> = {
  "cover-letter": "gemini",
  resume: "gemini",
  ats: "gemini",
  critique: "gemini",
  interview: "groq",
  quick: "groq",
  photo: "openai",
  transcribe: "groq"
};

/**
 * Resolve a text AI client for the given task.
 * Returns the preferred provider when available, else falls back
 * to any configured text provider, else null.
 */
export function routeTextAI(task: AITask): TextAIProvider | null {
  const preferred = taskPreference[task];

  if (preferred === "gemini") {
    const gemini = getGeminiClient();
    if (gemini) return gemini;
    const groq = getTextAIClient();
    if (groq) return groq;
    return null;
  }

  if (preferred === "groq") {
    const groq = getTextAIClient();
    if (groq) return groq;
    const gemini = getGeminiClient();
    if (gemini) return gemini;
    return null;
  }

  const openai = getTextAIClient();
  if (openai) return openai;

  return null;
}

/**
 * Convenience: get the raw OpenAI-compatible client + model for a task.
 * Returns null when no provider is configured (caller should use fallback).
 */
export function getTextAIForTask(task: AITask) {
  return routeTextAI(task);
}
