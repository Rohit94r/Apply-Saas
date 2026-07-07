/**
 * Remotive Jobs API — https://remotive.com/api/remote-jobs
 *
 * Free, no API key required. Returns remote jobs worldwide as JSON.
 * GET https://remotive.com/api/remote-jobs?search=react&limit=10
 */

import type { JobListing, JobSeekerProfile } from "@/features/jobs/types";
import {
  buildListingId,
  extractSkillsFromText,
  fetchWithTimeout,
  inferExperienceBand,
  inferJobType,
  providerPlatform
} from "@/features/jobs/lib/providers/normalize";

type RemotiveJob = {
  id?: string | number;
  title?: string;
  company_name?: string;
  candidate_required_location?: string;
  description?: string;
  url?: string;
  publication_date?: string;
  salary?: string;
  tags?: string[];
};

type RemotiveResponse = {
  jobs?: RemotiveJob[];
  "job-count"?: number;
};

export async function fetchRemotiveJobs(
  profile: JobSeekerProfile,
  limit = 10
): Promise<JobListing[]> {
  // Remotive is remote-only — location from profile is ignored for the query.
  const search =
    profile.skills.slice(0, 2).join(" ") ||
    profile.targetRoles[0] ||
    "developer";

  const url = new URL("https://remotive.com/api/remote-jobs");
  url.searchParams.set("search", search);
  url.searchParams.set("limit", String(Math.min(limit, 20)));

  const response = await fetchWithTimeout(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Remotive HTTP ${response.status}`);
  }

  const data = (await response.json()) as RemotiveResponse;
  const jobs = data.jobs ?? [];

  return jobs.slice(0, limit).map((job) => {
    const description = (job.description ?? "").replace(/<[^>]+>/g, " ");
    const tags = (job.tags ?? []).slice(0, 6);
    const skills = tags.length
      ? tags
      : extractSkillsFromText(`${job.title ?? ""} ${description}`);

    return {
      id: buildListingId("remotive", String(job.id ?? job.title ?? Math.random())),
      title: job.title ?? "Remote role",
      company: job.company_name ?? "Remote company",
      location: job.candidate_required_location ?? "Remote (Worldwide)",
      workMode: "remote" as const,
      type: inferJobType(`${job.title ?? ""} ${description}`),
      experienceBand: inferExperienceBand(`${job.title ?? ""} ${description}`),
      skills,
      salaryHint: job.salary?.trim() || undefined,
      platform: providerPlatform("remotive"),
      applyUrl: job.url ?? "https://remotive.com/",
      postedLabel: job.publication_date
        ? new Date(job.publication_date).toLocaleDateString("en-IN")
        : "Remotive live",
      dataProvider: "remotive",
      description: description.slice(0, 220)
    } satisfies JobListing;
  });
}
