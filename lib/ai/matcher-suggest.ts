import { getGeminiClient } from "@/lib/ai/gemini";
import { getTextAIClient } from "@/lib/ai/openai";
import type { MatcherFilterField } from "@/lib/data/matcher-filters";

type SuggestResponse = {
  suggestions: string[];
};

function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    const trimmed = value
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    return JSON.parse(trimmed) as T;
  } catch {
    return fallback;
  }
}

function fieldLabel(field: MatcherFilterField): string {
  return field === "role" ? "job role" : "Indian city or work location";
}

export async function suggestMatcherFilterOptions(
  field: MatcherFilterField,
  query: string
): Promise<string[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const provider = getGeminiClient() ?? getTextAIClient();
  if (!provider) return [];

  const system = `You help Indian job seekers filter companies for interview prep.
Return ONLY valid JSON: {"suggestions":["..."]}
Give 3-5 realistic ${fieldLabel(field)} options for the Indian tech job market.
Keep each suggestion short (1-4 words). No explanations outside JSON.`;

  const user = `User typed: "${trimmed}"
Field: ${field}
Suggest nearest useful filter values.`;

  try {
    const completion = await provider.client.chat.completions.create({
      model: provider.model,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
    });

    const content = completion.choices[0]?.message?.content;
    const parsed = safeJsonParse<SuggestResponse>(content, { suggestions: [] });
    return parsed.suggestions
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .slice(0, 5);
  } catch {
    return [];
  }
}
