import OpenAI from "openai";
import type { TextAIProvider } from "@/lib/ai/openai";

/**
 * Gemini provider via Google's OpenAI-compatible endpoint.
 * Used for resume tools and the web mock interview (Apply Interviewer).
 * No extra SDK needed — the `openai` package works against
 * https://generativelanguage.googleapis.com/v1beta/openai/
 *
 * Get a free key: https://aistudio.google.com → Create API key
 * Add to env: GEMINI_API_KEY
 */

let geminiClient: OpenAI | null = null;

const DEFAULT_GEMINI_MODEL = "gemini-1.5-flash";

export function getGeminiClient(): TextAIProvider | null {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    return null;
  }

  geminiClient ??= new OpenAI({
    apiKey: key,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
  });

  return {
    client: geminiClient,
    model: process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL,
    provider: "gemini"
  };
}
