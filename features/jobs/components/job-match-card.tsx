"use client";

/** Single job card with match score and external apply link. */

import { ArrowSquareOut, Briefcase, MapPin } from "@phosphor-icons/react";
import type { JobListing } from "@/features/jobs/types";
import { Button } from "@/components/ui/button";

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
  reed: "Reed.co.uk",
  usajobs: "USAJOBS",
  juju: "Juju",
  herohunt: "HeroHunt"
};

function sourceLabel(job: MatchedJob) {
  if (job.dataProvider && job.dataProvider !== "curated") {
    return platformBadge[job.dataProvider] ?? job.dataProvider;
  }
  return platformBadge[job.platform] ?? job.platform;
}

export function JobMatchCard({ job }: { job: MatchedJob }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-white p-5 transition hover:border-primary/25 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase text-accent">
            {sourceLabel(job)}
            {job.dataProvider && job.dataProvider !== "curated" ? " · Live" : ""}
          </p>
          <h4 className="mt-1 text-base font-bold text-foreground">{job.title}</h4>
          <p className="text-sm font-semibold text-primary">{job.company}</p>
        </div>
        <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
          {job.matchScore}% match
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" weight="regular" />
          {job.location} · {job.workMode}
        </span>
        <span className="inline-flex items-center gap-1">
          <Briefcase className="h-3.5 w-3.5" weight="regular" />
          {job.type}
        </span>
        {job.salaryHint ? <span>{job.salaryHint}</span> : null}
        <span>{job.postedLabel}</span>
      </div>

      {job.matchReasons.length ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {job.matchReasons.map((reason) => (
            <li
              key={reason}
              className="rounded-full bg-primary/5 px-2 py-0.5 text-[10px] font-semibold text-primary"
            >
              {reason}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.skills.slice(0, 5).map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      {job.description ? (
        <p className="mt-3 line-clamp-2 text-xs leading-5 text-muted-foreground">
          {job.description}
        </p>
      ) : null}

      <Button asChild className="mt-5 w-full sm:w-auto" size="sm">
        <a href={job.applyUrl} target="_blank" rel="noreferrer">
          Apply on {sourceLabel(job)}
          <ArrowSquareOut className="h-4 w-4" weight="regular" />
        </a>
      </Button>
    </article>
  );
}
