"use client";

/**
 * Overview of connected job APIs — Adzuna, Reed, USAJOBS, Juju, HeroHunt.
 * Shown at the top of Job Search so users know which live feeds are active.
 */

import Link from "next/link";
import { ArrowSquareOut, CheckCircle, Plug, WarningCircle } from "@phosphor-icons/react";
import type { JobProviderFetchStatus } from "@/features/jobs/types";
import { Card } from "@/components/ui/card";

const docsLinks: Record<string, string> = {
  adzuna: "https://developer.adzuna.com/signup",
  reed: "https://www.reed.co.uk/developers",
  usajobs: "https://developer.usajobs.gov/API-Request/",
  juju: "https://www.juju.com/publisher/signup",
  herohunt: "https://www.herohunt.ai/people-search-api",
  curated: "https://github.com/Rohit94r/Apply-Saas"
};

export function JobApiOverview({
  providers
}: {
  providers: JobProviderFetchStatus[];
}) {
  if (!providers.length) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="fine-label mb-2">Live job APIs</p>
          <h3 className="text-lg font-semibold text-foreground">
            Connected market feeds
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Jobs are pulled from Adzuna, Reed, USAJOBS, Juju, and HeroHunt when
            API keys are set in your environment. Apply opens the original listing.
          </p>
        </div>
        <Plug className="h-8 w-8 shrink-0 text-accent" weight="regular" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="rounded-xl border border-border bg-[#fbfaf6] p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-foreground">{provider.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {provider.configured
                    ? provider.ok
                      ? `${provider.count} results loaded`
                      : provider.message ?? "No matches"
                    : "Add keys in .env.local"}
                </p>
              </div>
              {provider.configured && provider.ok ? (
                <CheckCircle className="h-5 w-5 text-success" weight="fill" />
              ) : (
                <WarningCircle
                  className={`h-5 w-5 ${provider.configured ? "text-amber-500" : "text-muted-foreground"}`}
                  weight="fill"
                />
              )}
            </div>
            {docsLinks[provider.id] ? (
              <Link
                href={docsLinks[provider.id]}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
              >
                API docs
                <ArrowSquareOut className="h-3 w-3" weight="regular" />
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
