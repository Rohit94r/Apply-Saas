"use client";

/** Compact single-line job row — maximizes jobs visible per screen. */

import { ArrowSquareOut, MapPin } from "@phosphor-icons/react";
import type { JobListing } from "@/features/jobs/types";

type MatchedJob = JobListing & {
  matchScore: number;
  matchReasons: string[];
};

const platformBadge: Record<string, string> = {
  linkedin: "LinkedIn",
  naukri: "Naukri",
  indeed: "Indeed",
  glassdoor: "Glassdoor",
  instahyre: "Instahyre",
  cutshort: "Cutshort",
  wellfound: "Wellfound",
  adzuna: "Adzuna",
  reed: "Reed",
  usajobs: "USAJOBS",
  juju: "Juju",
  herohunt: "HeroHunt",
  remotive: "Remotive",
  themuse: "Muse"
};

function sourceLabel(job: MatchedJob) {
  if (job.dataProvider && job.dataProvider !== "curated") {
    return platformBadge[job.dataProvider] ?? job.dataProvider;
  }
  return platformBadge[job.platform] ?? job.platform;
}

export function JobMatchCard({ job }: { job: MatchedJob }) {
  return (
    <a
      href={job.applyUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-2.5 border-b border-border px-2 py-2.5 transition last:border-b-0 hover:bg-[#f7f6f2] sm:gap-3 sm:px-2.5"
      title={job.matchReasons.join(" · ") || job.title}
    >
      <span className="w-10 shrink-0 text-right text-[11px] font-bold tabular-nums text-accent">
        {job.matchScore}%
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-baseline gap-1.5">
          <span className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
            {job.title}
          </span>
          <span className="hidden truncate text-xs text-muted-foreground sm:inline">
            {job.company}
          </span>
        </div>
        <div className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
          <span className="truncate font-medium text-foreground/70 sm:hidden">
            {job.company}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <MapPin className="h-3 w-3 shrink-0" weight="regular" />
            <span className="truncate">{job.location}</span>
          </span>
          <span className="capitalize">{job.type}</span>
          <span className="capitalize">{job.workMode}</span>
          {job.salaryHint ? <span className="truncate">{job.salaryHint}</span> : null}
          <span className="text-[10px] uppercase tracking-wide opacity-70">
            {sourceLabel(job)}
          </span>
        </div>
      </div>

      <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] font-semibold text-foreground transition group-hover:border-primary/40 group-hover:text-primary">
        Apply
        <ArrowSquareOut className="h-3 w-3" weight="regular" />
      </span>
    </a>
  );
}
