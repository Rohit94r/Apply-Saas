"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MagnifyingGlass, Sparkle, SpinnerGap } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: string;
};

type SuggestResult = {
  value: string;
  label: string;
  source: "local" | "ai";
};

export function MatcherFormSelect({
  label,
  value,
  onChange,
  options,
  icon: Icon
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  icon: PhosphorIcon;
}) {
  return (
    <label className="space-y-1.5">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" weight="regular" />
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-input bg-white px-3 text-sm font-medium text-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function MatcherSearchSelect({
  label,
  value,
  onChange,
  field,
  placeholder,
  icon: Icon
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  field: "role" | "city";
  placeholder: string;
  icon: PhosphorIcon;
}) {
  const [inputValue, setInputValue] = useState(value);
  const [results, setResults] = useState<SuggestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasAi, setHasAi] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const search = useCallback(async (query: string) => {
    setLoading(true);

    try {
      const params = new URLSearchParams({ field, q: query });
      const response = await fetch(`/api/interview-prep/suggest?${params}`);
      const data = (await response.json()) as {
        results?: SuggestResult[];
        hasAiSuggestions?: boolean;
      };

      const nextResults = data.results ?? [];
      setResults(nextResults);
      setHasAi(Boolean(data.hasAiSuggestions));
    } catch {
      setResults([]);
      setHasAi(false);
    } finally {
      setLoading(false);
    }
  }, [field]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function scheduleSearch(query: string) {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => search(query), 250);
  }

  function handleInputChange(next: string) {
    setInputValue(next);
    onChange(next);
    setOpen(true);
    scheduleSearch(next);
  }

  function pickOption(option: SuggestResult) {
    setInputValue(option.label);
    onChange(option.value);
    setOpen(false);
    setResults([]);
  }

  function handleFocus() {
    setOpen(true);
    scheduleSearch(inputValue);
  }

  return (
    <div ref={containerRef} className="space-y-1.5">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" weight="regular" />
        {label}
      </span>

      <div className="relative">
        <MagnifyingGlass
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          weight="regular"
        />
        <Input
          value={inputValue}
          onChange={(event) => handleInputChange(event.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="h-11 pl-10"
        />
        {loading ? (
          <SpinnerGap
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-accent"
            weight="regular"
          />
        ) : null}
      </div>

      {open && results.length > 0 ? (
        <ul className="overflow-hidden rounded-xl border border-border bg-white shadow-soft">
          {results.map((option) => (
            <li key={`${option.source}-${option.value}`}>
              <button
                type="button"
                onClick={() => pickOption(option)}
                className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition hover:bg-muted"
              >
                <span className="font-medium text-foreground">{option.label}</span>
                {option.source === "ai" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                    <Sparkle className="h-3 w-3" weight="fill" />
                    Suggested
                  </span>
                ) : null}
              </button>
            </li>
          ))}
          {hasAi ? (
            <li className="border-t border-border px-4 py-2 text-[10px] text-muted-foreground">
              AI suggestions when not in our database
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
