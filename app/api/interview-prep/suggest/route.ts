import { NextResponse } from "next/server";
import { getOptionalUserId } from "@/lib/auth";
import { suggestMatcherFilterOptions } from "@/lib/ai/matcher-suggest";
import {
  searchMatcherFilter,
  type MatcherFilterField
} from "@/lib/data/matcher-filters";

const VALID_FIELDS = new Set<MatcherFilterField>(["role", "city"]);

export async function GET(request: Request) {
  const userId = await getOptionalUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const field = searchParams.get("field")?.trim() as MatcherFilterField | undefined;
  const query = searchParams.get("q")?.trim() ?? "";

  if (!field || !VALID_FIELDS.has(field)) {
    return NextResponse.json({ error: "Invalid field" }, { status: 400 });
  }

  const localResults = searchMatcherFilter(field, query, 8).map((item) => ({
    value: item.value,
    label: item.label,
    source: item.source
  }));

  const needsAi =
    query.length >= 2 &&
    (localResults.length === 0 ||
      (localResults.length < 3 &&
        !localResults.some((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        )));

  let aiResults: Array<{ value: string; label: string; source: "ai" }> = [];

  if (needsAi) {
    const suggestions = await suggestMatcherFilterOptions(field, query);
    const localLabels = new Set(
      localResults.map((item) => item.label.toLowerCase())
    );

    aiResults = suggestions
      .filter((suggestion) => !localLabels.has(suggestion.toLowerCase()))
      .map((suggestion) => ({
        value: suggestion,
        label: suggestion,
        source: "ai" as const
      }));
  }

  return NextResponse.json({
    results: [...localResults, ...aiResults].slice(0, 10),
    hasAiSuggestions: aiResults.length > 0
  });
}
