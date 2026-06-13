"use client";

import { cn } from "@/lib/utils";

export const tailorPromptSuggestions = [
  "Keep it to one page and tighten wording",
  "Optimize bullets for this company and role",
  "Lead with React, TypeScript, and API project impact",
  "Make the summary more ATS-friendly for this posting",
  "Emphasize measurable outcomes without inventing numbers"
] as const;

export function PromptQuickActions({
  value,
  onChange,
  suggestions = tailorPromptSuggestions,
  className
}: {
  value: string;
  onChange: (next: string) => void;
  suggestions?: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onClick={() =>
            onChange(value.trim() ? `${value.trim()}\n${suggestion}` : suggestion)
          }
          className="rounded-full border border-border bg-white px-3 py-1.5 text-left text-xs font-semibold text-muted-foreground transition hover:border-primary/30 hover:text-primary"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

export const refinePromptSuggestions = [
  "Shorten the summary to two lines",
  "Make project bullets more technical",
  "Add missing keywords from the job description",
  "Remove filler and keep only strong evidence"
] as const;
