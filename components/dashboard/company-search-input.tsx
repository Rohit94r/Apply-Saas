"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Buildings, MagnifyingGlass, SpinnerGap } from "@phosphor-icons/react";
import type { CompanyProfile } from "@/lib/data/companies";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LookupResponse = {
  results: CompanyProfile[];
  company: CompanyProfile | null;
};

export function CompanySearchInput({
  value,
  onChange,
  onSelect,
  placeholder = "Search company — Google, TCS, Infosys..."
}: {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (company: CompanyProfile | null) => void;
  placeholder?: string;
}) {
  const [results, setResults] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<CompanyProfile | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (query: string) => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/company/lookup?q=${encodeURIComponent(query.trim())}`
      );
      const data = (await response.json()) as LookupResponse;
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

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

  function handleInputChange(next: string) {
    onChange(next);
    setSelected(null);
    onSelect?.(null);
    setOpen(true);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => search(next), 250);
  }

  function pickCompany(company: CompanyProfile) {
    onChange(company.name);
    setSelected(company);
    onSelect?.(company);
    setOpen(false);
    setResults([]);
  }

  return (
    <div ref={containerRef} className="space-y-3">
      <div className="relative">
        <MagnifyingGlass
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          weight="regular"
        />
        <Input
          value={value}
          onChange={(event) => handleInputChange(event.target.value)}
          onFocus={() => value.length >= 2 && setOpen(true)}
          placeholder={placeholder}
          className="pl-10"
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
          {results.map((company) => (
            <li key={company.id}>
              <button
                type="button"
                onClick={() => pickCompany(company)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-muted"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {company.name.slice(0, 2).toUpperCase()}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {company.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {company.industry} · {company.headquarters}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {selected ? (
        <CompanyInfoCard company={selected} />
      ) : null}
    </div>
  );
}

export function CompanyInfoCard({
  company,
  compact = false
}: {
  company: CompanyProfile;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 to-white",
        compact ? "p-3" : "p-4"
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <Buildings className="h-5 w-5" weight="regular" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-foreground">{company.name}</h4>
          <p className="text-xs text-muted-foreground">
            {company.industry} · {company.size} employees · {company.headquarters}
          </p>
        </div>
      </div>

      {!compact ? (
        <>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {company.interviewStyle}
          </p>
          <div className="mt-3">
            <p className="text-[10px] font-bold uppercase text-muted-foreground">
              Hiring focus
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {company.hiringFocus.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[10px] font-bold uppercase text-muted-foreground">
              Common roles
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {company.commonRoles.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-border bg-white px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
