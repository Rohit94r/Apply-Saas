"use client";

import { Sparkle, SpinnerGap } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PromptQuickActions } from "@/components/dashboard/prompt-quick-actions";

export function AiPromptBar({
  value,
  onChange,
  suggestions,
  onApply,
  loading
}: {
  value: string;
  onChange: (value: string) => void;
  suggestions: readonly string[];
  onApply: () => void;
  loading: boolean;
}) {
  return (
    <div className="sticky bottom-0 border-t border-border bg-white/95 px-4 py-4 backdrop-blur">
      <div className="mx-auto max-w-3xl space-y-3">
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-20 resize-none"
          placeholder="Ask Apply AI to improve your resume..."
          onKeyDown={(event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
              event.preventDefault();
              onApply();
            }
          }}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PromptQuickActions value={value} onChange={onChange} suggestions={suggestions} />
          <Button type="button" className="shrink-0" disabled={loading} onClick={onApply}>
            {loading ? (
              <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
            ) : (
              <Sparkle className="h-4 w-4" weight="regular" />
            )}
            Apply changes
          </Button>
        </div>
      </div>
    </div>
  );
}
