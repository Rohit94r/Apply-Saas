"use client";

/** Expandable job row with match evidence and application actions. */

import { useState } from "react";
import {
  ArrowSquareOut,
  BookmarkSimple,
  CaretDown,
  MapPin
} from "@phosphor-icons/react";
import type { JobListing } from "@/features/jobs/types";
import { getJobNextSteps, getSourceTrust } from "@/features/jobs/lib/job-workflow";
import { Button } from "@/components/ui/button";

type MatchedJob = JobListing & {
  matchScore: number;
  matchReasons: string[];
  matchGaps: string[];
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

export function JobMatchCard({
  job,
  saved,
  applying,
  tracked,
  onSave,
  onApplied
}: {
  job: MatchedJob;
  saved: boolean;
  applying: boolean;
  tracked: boolean;
  onSave: () => void;
  onApplied: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const trust = getSourceTrust(job);

  return (
    <article className="border-b border-border px-3 py-3 last:border-b-0">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 w-11 shrink-0 rounded-md bg-accent/10 px-1.5 py-1 text-center text-[11px] font-bold tabular-nums text-accent"
          aria-label={`${job.matchScore} percent directional match`}
        >
          {job.matchScore}%
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h4 className="text-sm font-semibold text-foreground">{job.title}</h4>
            <span className="text-xs text-muted-foreground">{job.company}</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-0.5">
              <MapPin className="h-3 w-3 shrink-0" weight="regular" />
              {job.location}
            </span>
            <span className="capitalize">{job.type}</span>
            <span className="capitalize">{job.workMode}</span>
            {job.salaryHint ? <span>{job.salaryHint}</span> : null}
            <span>
              {job.dataProvider && job.dataProvider !== "curated"
                ? job.postedLabel
                : "Recency unverified"}
            </span>
            <span className="font-semibold text-foreground/70">{sourceLabel(job)}</span>
          </div>
          <p className="mt-1.5 text-xs text-foreground/80">
            {job.matchReasons.length
              ? job.matchReasons.slice(0, 2).join(" · ")
              : "Limited profile overlap — review requirements before applying"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Hide" : "Show"} details for ${job.title}`}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <CaretDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {expanded ? (
        <div className="ml-0 mt-3 rounded-lg border border-border bg-muted/30 p-3 sm:ml-14">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold text-foreground">Why it matched</p>
              <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                {job.matchReasons.map((reason) => <li key={reason}>• {reason}</li>)}
                {job.matchGaps.length ? <li>• Check gaps: {job.matchGaps.join(", ")}</li> : null}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Next steps</p>
              <ol className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                {getJobNextSteps(job).map((step, index) => (
                  <li key={step}>{index + 1}. {step}</li>
                ))}
              </ol>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">{trust.label}.</span>{" "}
            {trust.detail} Match scores are directional, not hiring probabilities.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline" onClick={onSave}>
              <BookmarkSimple className="h-4 w-4" weight={saved ? "fill" : "regular"} />
              {saved ? "Saved" : "Save"}
            </Button>
            <Button type="button" size="sm" asChild>
              <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                Verify &amp; apply
                <ArrowSquareOut className="h-4 w-4" />
              </a>
            </Button>
            <Button type="button" size="sm" variant="outline" disabled={applying || tracked} onClick={onApplied}>
              {applying ? "Saving…" : tracked ? "Application tracked" : "Mark applied"}
            </Button>
          </div>
        </div>
      ) : null}
    </article>
  );
}
