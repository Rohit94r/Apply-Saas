"use client";

/**
 * Job Search workspace — main UI for `/dashboard/jobs`.
 *
 * Flow:
 * 1. On mount, fetch `/api/jobs/match` (uses saved resume automatically).
 * 2. Show profile banner + platform links at top (even before user submits anything new).
 * 3. List matched jobs with external apply links to LinkedIn, Naukri, etc.
 */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowSquareOut,
  Briefcase,
  Globe,
  MagnifyingGlass,
  MapPin,
  Sparkle,
  SpinnerGap,
  UploadSimple
} from "@phosphor-icons/react";
import { toast } from "sonner";
import type { JobMatchResult } from "@/features/jobs/types";
import { experienceBandLabel } from "@/features/jobs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JobMatchCard } from "@/features/jobs/components/job-match-card";
import { PlatformSearchLinks } from "@/features/jobs/components/platform-search-links";
import { JobProfileBanner } from "@/features/jobs/components/job-profile-banner";

const platformLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  naukri: "Naukri",
  indeed: "Indeed",
  glassdoor: "Glassdoor",
  instahyre: "Instahyre",
  cutshort: "Cutshort",
  wellfound: "Wellfound"
};

export function JobSearchWorkspace() {
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMatches = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/jobs/match?limit=12");
      const data = (await response.json()) as JobMatchResult & { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not load jobs");
      }

      setResult(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Job load failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  const profile = result?.profile;
  const hasProfile = profile?.isComplete;

  return (
    <div className="space-y-6">
      {/* Platform search — always visible at top per product requirement */}
      {result?.platformSearches?.length ? (
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border bg-gradient-to-r from-sky-50/80 to-white px-6 py-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="fine-label mb-2">Search the market</p>
                <h3 className="font-serif text-2xl text-primary">
                  Find jobs on LinkedIn, Naukri & more
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Opens pre-filled searches on external job boards based on your
                  resume profile. No need to submit a new form — we read your saved
                  resume automatically.
                </p>
              </div>
              <Globe className="h-10 w-10 shrink-0 text-sky-600" weight="regular" />
            </div>
          </div>
          <div className="p-6">
            <PlatformSearchLinks links={result.platformSearches} />
          </div>
        </Card>
      ) : null}

      {/* Profile summary from uploaded resume */}
      {loading ? (
        <Card className="flex min-h-32 items-center justify-center p-8">
          <SpinnerGap className="h-8 w-8 animate-spin text-accent" weight="regular" />
        </Card>
      ) : profile ? (
        <JobProfileBanner profile={profile} onRefresh={loadMatches} />
      ) : null}

      {/* CTA when no resume uploaded yet */}
      {!loading && !hasProfile ? (
        <Card className="flex flex-col items-start gap-4 border-dashed p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="fine-label mb-2">Better matches</p>
            <h3 className="text-lg font-semibold text-foreground">
              Upload your resume for personalized job results
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We extract skills, roles, and location to rank relevant openings.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/generate">
              <UploadSimple className="h-4 w-4" weight="regular" />
              Upload resume
            </Link>
          </Button>
        </Card>
      ) : null}

      {/* Matched job listings */}
      <Card className="p-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="fine-label mb-2">
              {hasProfile ? "Matched for your profile" : "Trending openings"}
            </p>
            <h3 className="font-serif text-3xl text-primary">
              Available jobs
            </h3>
            {result ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Scanned {result.totalListingsScanned} curated listings · showing{" "}
                {result.matches.length}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={loadMatches}
          >
            {loading ? (
              <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
            ) : (
              <MagnifyingGlass className="h-4 w-4" weight="regular" />
            )}
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : result?.matches.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {result.matches.map((job) => (
              <JobMatchCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No jobs found. Try uploading a resume.</p>
        )}
      </Card>

      {/* Legend for platforms */}
      <p className="text-center text-xs text-muted-foreground">
        Apply buttons redirect to{" "}
        {Object.values(platformLabels).slice(0, 4).join(", ")} and other boards — you
        apply directly on those sites.
      </p>
    </div>
  );
}
