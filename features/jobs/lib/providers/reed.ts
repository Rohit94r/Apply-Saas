/**
 * Reed.co.uk Jobseeker API — https://www.reed.co.uk/developers
 *
 * GET /api/1.0/search?keywords=...&locationName=...
 * Auth: Basic (API key as username, empty password)
 */

import { getJobApiSecrets } from "@/lib/config/job-apis";
import type { JobListing, JobSeekerProfile } from "@/features/jobs/types";
import {
  buildListingId,
  extractSkillsFromText,
  fetchWithTimeout,
  formatSalaryRange,
  inferExperienceBand,
  inferJobType,
  inferWorkMode,
  providerPlatform
} from "@/features/jobs/lib/providers/normalize";

type ReedJob = {
  jobId: number;
  employerName?: string;
  jobTitle?: string;
  locationName?: string;
  jobDescription?: string;
  minimumSalary?: number;
  maximumSalary?: number;
  currency?: string;
  date?: string;
  jobUrl?: string;
};

type ReedResponse = {
  results?: ReedJob[];
  totalResults?: number;
};

export async function fetchReedJobs(
  profile: JobSeekerProfile,
  limit = 10
): Promise<JobListing[]> {
  const { reed } = getJobApiSecrets();

  if (!reed.apiKey) {
    return [];
  }

  const keywords = profile.targetRoles[0] ?? profile.skills.slice(0, 3).join(" ");
  const locationName =
    profile.location !== "India" ? profile.location : "London";

  const url = new URL("https://www.reed.co.uk/api/1.0/search");
  url.searchParams.set("keywords", keywords || "software developer");
  url.searchParams.set("locationName", locationName);
  url.searchParams.set("resultsToTake", String(Math.min(limit, 20)));

  const auth = Buffer.from(`${reed.apiKey}:`).toString("base64");

  const response = await fetchWithTimeout(url.toString(), {
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${auth}`
    },
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Reed HTTP ${response.status}`);
  }

  const data = (await response.json()) as ReedResponse;

  return (data.results ?? []).slice(0, limit).map((job) => {
    const description = job.jobDescription ?? "";

    return {
      id: buildListingId("reed", String(job.jobId)),
      title: job.jobTitle ?? "Role",
      company: job.employerName ?? "Employer",
      location: job.locationName ?? locationName,
      workMode: inferWorkMode(description),
      type: inferJobType(`${job.jobTitle} ${description}`),
      experienceBand: inferExperienceBand(`${job.jobTitle} ${description}`),
      skills: extractSkillsFromText(`${job.jobTitle} ${description}`),
      salaryHint: formatSalaryRange(
        job.minimumSalary,
        job.maximumSalary,
        job.currency ?? "GBP"
      ),
      platform: providerPlatform("reed"),
      applyUrl:
        job.jobUrl ??
        `https://www.reed.co.uk/jobs/${encodeURIComponent(job.jobTitle ?? "jobs")}`,
      postedLabel: job.date ?? "Reed live",
      dataProvider: "reed",
      description: description.replace(/<[^>]+>/g, " ").slice(0, 220)
    } satisfies JobListing;
  });
}
