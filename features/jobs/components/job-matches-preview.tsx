/**
 * Compact job matches strip for the dashboard overview (top section).
 * Server component — no client fetch required.
 */

import Link from "next/link";
import { ArrowRight, ArrowSquareOut, MagnifyingGlass } from "@phosphor-icons/react/ssr";
import type { JobMatchResult } from "@/features/jobs/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const platformLabel: Record<string, string> = {
  linkedin: "LinkedIn",
  naukri: "Naukri",
  indeed: "Indeed",
  instahyre: "Instahyre"
};

export function JobMatchesPreview({ result }: { result: JobMatchResult }) {
  const topJobs = result.matches.slice(0, 3);
  const topPlatforms = result.platformSearches.slice(0, 4);

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-col justify-between gap-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 px-6 py-5 lg:flex-row lg:items-center">
        <div>
          <p className="fine-label mb-2">Job search</p>
          <h3 className="font-serif text-2xl text-primary">
            {result.profile.isComplete
              ? "Jobs matched to your profile"
              : "Explore jobs in the market"}
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            {result.profile.isComplete
              ? result.profile.headline
              : "Upload a resume to personalize matches — or browse platforms below."}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/jobs">
            <MagnifyingGlass className="h-4 w-4" weight="regular" />
            Open job search
            <ArrowRight className="h-4 w-4" weight="regular" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-px bg-border lg:grid-cols-[1fr_auto]">
        <div className="grid gap-px bg-border sm:grid-cols-3">
          {topJobs.map((job) => (
            <a
              key={job.id}
              href={job.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="group bg-white p-4 transition hover:bg-[#fbfaf6]"
            >
              <p className="text-[10px] font-bold uppercase text-accent">
                {job.matchScore}% match · {platformLabel[job.platform] ?? job.platform}
              </p>
              <p className="mt-1 text-sm font-bold text-foreground group-hover:text-primary">
                {job.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {job.company} · {job.location}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-primary">
                Apply
                <ArrowSquareOut className="h-3 w-3" weight="regular" />
              </span>
            </a>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 bg-white p-4 lg:flex-col lg:justify-center">
          <p className="w-full text-[10px] font-bold uppercase text-muted-foreground">
            Search on
          </p>
          {topPlatforms.map((platform) => (
            <a
              key={platform.platform}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/30 hover:text-primary"
            >
              {platform.label}
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
}
