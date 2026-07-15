"use client";

/**
 * Job Search workspace — clean single-composition UI for `/dashboard/jobs`.
 *
 * Layout:
 * 1. Upload + market bar (primary actions)
 * 2. Compact profile strip (if resume exists)
 * 3. Filters + dense job list (main focus)
 * 4. External board links as compact pills
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Globe,
  MagnifyingGlass,
  SpinnerGap,
  UploadSimple,
  ArrowSquareOut,
  CheckCircle
} from "@phosphor-icons/react";
import { toast } from "sonner";
import type { JobListing, JobMatchResult } from "@/features/jobs/types";
import { experienceBandLabel } from "@/features/jobs";
import { jobCountries } from "@/lib/config/job-countries";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JobMatchCard } from "@/features/jobs/components/job-match-card";

type JobTypeFilter = "all" | JobListing["type"];
type WorkModeFilter = "all" | JobListing["workMode"];
type SourceFilter = "all" | "adzuna" | "herohunt" | "curated";

const TYPE_FILTERS: Array<{ id: JobTypeFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "internship", label: "Internship" },
  { id: "full-time", label: "Full-time" },
  { id: "contract", label: "Contract" }
];

const WORK_MODE_FILTERS: Array<{ id: WorkModeFilter; label: string }> = [
  { id: "all", label: "Any mode" },
  { id: "remote", label: "Remote" },
  { id: "hybrid", label: "Hybrid" },
  { id: "onsite", label: "Onsite" }
];

const SOURCE_FILTERS: Array<{ id: SourceFilter; label: string }> = [
  { id: "all", label: "All feeds" },
  { id: "adzuna", label: "Adzuna" },
  { id: "herohunt", label: "HeroHunt" },
  { id: "curated", label: "Curated" }
];

function Chip({
  active,
  label,
  onClick
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-white text-muted-foreground hover:border-primary/35 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

export function JobSearchWorkspace() {
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [typeFilter, setTypeFilter] = useState<JobTypeFilter>("all");
  const [workModeFilter, setWorkModeFilter] = useState<WorkModeFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [country, setCountry] = useState<string>("in");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMatches = useCallback(
    async (selectedCountry: string, jobType: JobTypeFilter = "all") => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          limit: "30",
          country: selectedCountry
        });
        if (jobType !== "all") {
          params.set("jobType", jobType);
        }

        const response = await fetch(`/api/jobs/match?${params.toString()}`);
        const data = (await response.json()) as JobMatchResult & {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error ?? "Could not load jobs");
        }

        setResult(data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Job load failed");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void loadMatches(country, typeFilter);
  }, [country, typeFilter, loadMatches]);

  async function handleResumeUpload(file: File) {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/resumes/import", {
        method: "POST",
        body: formData
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Resume upload failed");
      }

      toast.success("Resume uploaded — top matches ready");
      await loadMatches(country, typeFilter);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not upload resume"
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  const profile = result?.profile;
  const hasProfile = Boolean(profile?.isComplete);

  const visibleMatches = useMemo(() => {
    return (result?.matches ?? []).filter((job) => {
      if (typeFilter !== "all" && job.type !== typeFilter) return false;
      if (workModeFilter !== "all" && job.workMode !== workModeFilter) {
        return false;
      }
      if (sourceFilter !== "all" && job.dataProvider !== sourceFilter) {
        return false;
      }
      return true;
    });
  }, [result?.matches, typeFilter, workModeFilter, sourceFilter]);

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.md,.rtf"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleResumeUpload(file);
        }}
      />

      {/* Action bar: market + upload */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0 text-primary" weight="regular" />
              <p className="text-sm font-semibold text-foreground">Market</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {jobCountries.map((item) => (
                <Chip
                  key={item.id}
                  active={country === item.id}
                  label={item.short}
                  onClick={() => {
                    setCountry(item.id);
                    setSourceFilter("all");
                  }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Upload a resume to rank jobs for you. Then filter by internship,
              full-time, remote, or source.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              disabled={uploading || loading}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
              ) : (
                <UploadSimple className="h-4 w-4" weight="regular" />
              )}
              {uploading ? "Matching…" : "Upload resume & match"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={loading || uploading}
              onClick={() => loadMatches(country, typeFilter)}
            >
              {loading ? (
                <SpinnerGap className="h-4 w-4 animate-spin" weight="regular" />
              ) : (
                <MagnifyingGlass className="h-4 w-4" weight="regular" />
              )}
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Compact profile strip */}
      {profile ? (
        <Card className="px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-sm font-semibold text-foreground">
                  {profile.headline}
                </p>
                {hasProfile ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
                    <CheckCircle className="h-3.5 w-3.5" weight="fill" />
                    Ready
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {profile.location} · {experienceBandLabel(profile.experienceBand)}
                {profile.skills.length
                  ? ` · ${profile.skills.slice(0, 5).join(", ")}`
                  : ""}
              </p>
            </div>
            {!hasProfile ? (
              <Button
                type="button"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadSimple className="h-4 w-4" weight="regular" />
                Add resume
              </Button>
            ) : null}
          </div>
        </Card>
      ) : null}

      {/* Jobs list + filters */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {hasProfile ? "Matched jobs" : "Available jobs"}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {result
                  ? `${visibleMatches.length} shown · scanned ${result.totalListingsScanned}`
                  : loading
                    ? "Loading openings…"
                    : "No results yet"}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {TYPE_FILTERS.map((option) => (
                <Chip
                  key={option.id}
                  active={typeFilter === option.id}
                  label={option.label}
                  onClick={() => setTypeFilter(option.id)}
                />
              ))}
              <span className="mx-1 hidden h-4 w-px bg-border sm:inline-block" />
              {WORK_MODE_FILTERS.map((option) => (
                <Chip
                  key={option.id}
                  active={workModeFilter === option.id}
                  label={option.label}
                  onClick={() => setWorkModeFilter(option.id)}
                />
              ))}
              <span className="mx-1 hidden h-4 w-px bg-border sm:inline-block" />
              {SOURCE_FILTERS.map((option) => (
                <Chip
                  key={option.id}
                  active={sourceFilter === option.id}
                  label={option.label}
                  onClick={() => setSourceFilter(option.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-2 sm:px-3">
          {loading && !result?.matches.length ? (
            <div className="space-y-2 py-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-12 animate-pulse rounded-md bg-muted" />
              ))}
            </div>
          ) : visibleMatches.length ? (
            <div className={loading ? "opacity-55 transition" : undefined}>
              {visibleMatches.map((job) => (
                <JobMatchCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="px-3 py-10 text-center">
              <p className="text-sm text-muted-foreground">
                {loading
                  ? "Finding matched jobs…"
                  : "No jobs match these filters. Clear filters or upload a resume."}
              </p>
              {!loading ? (
                <Button
                  type="button"
                  size="sm"
                  className="mt-3"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadSimple className="h-4 w-4" weight="regular" />
                  Upload resume
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </Card>

      {/* External boards — compact pills */}
      {result?.platformSearches?.length ? (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Search on job boards
          </p>
          <div className="flex flex-wrap gap-2">
            {result.platformSearches.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
              >
                {link.label}
                <ArrowSquareOut className="h-3.5 w-3.5" weight="regular" />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
