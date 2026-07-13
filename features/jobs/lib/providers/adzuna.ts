/**
 * Adzuna Jobs API — https://developer.adzuna.com/overview
 *
 * Example:
 * GET /v1/api/jobs/in/search/1?app_id=...&app_key=...&what=react&where=bangalore
 */

import { getJobApiSecrets } from "@/lib/config/job-apis";
import type { JobCountryConfig } from "@/lib/config/job-countries";
import type { JobListing } from "@/features/jobs/types";
import type { JobSeekerProfile } from "@/features/jobs/types";
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

type AdzunaResult = {
  id: string;
  title: string;
  company?: { display_name?: string };
  location?: { display_name?: string };
  description?: string;
  created?: string;
  redirect_url?: string;
  salary_min?: number;
  salary_max?: number;
  contract_type?: string;
};

type AdzunaResponse = {
  results?: AdzunaResult[];
  count?: number;
};

export async function fetchAdzunaJobs(
  profile: JobSeekerProfile,
  limit = 10,
  country: JobCountryConfig,
  options?: { jobType?: JobListing["type"] | "all" }
): Promise<JobListing[]> {
  const { adzuna } = getJobApiSecrets();

  // Skip Adzuna for markets where it has no coverage (e.g. remote-only).
  if (!country.adzunaCountry) {
    return [];
  }

  if (!adzuna.appId || !adzuna.appKey) {
    return [];
  }

  const role = profile.targetRoles[0] ?? profile.skills.slice(0, 3).join(" ");
  const typeBias =
    options?.jobType === "internship"
      ? "internship"
      : options?.jobType === "contract"
        ? "contract"
        : options?.jobType === "full-time"
          ? "full time"
          : "";
  const what = [role || "software developer", typeBias].filter(Boolean).join(" ");
  const where =
    profile.location && profile.location !== "India"
      ? profile.location
      : country.locationLabel;

  const url = new URL(
    `https://api.adzuna.com/v1/api/jobs/${country.adzunaCountry}/search/1`
  );
  url.searchParams.set("app_id", adzuna.appId);
  url.searchParams.set("app_key", adzuna.appKey);
  url.searchParams.set("what", what);
  url.searchParams.set("where", where);
  url.searchParams.set("results_per_page", String(Math.min(limit, 20)));
  url.searchParams.set("content-type", "application/json");

  const response = await fetchWithTimeout(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    const snippet = detail.replace(/\s+/g, " ").slice(0, 140);
    throw new Error(
      snippet
        ? `Adzuna HTTP ${response.status}: ${snippet}`
        : `Adzuna HTTP ${response.status}`
    );
  }

  const data = (await response.json()) as AdzunaResponse;
  const currency =
    country.adzunaCountry === "in"
      ? "INR"
      : country.adzunaCountry === "gb"
        ? "GBP"
        : "USD";

  return (data.results ?? []).slice(0, limit).map((job) => {
    const description = job.description ?? "";
    const location = job.location?.display_name ?? where;

    return {
      id: buildListingId("adzuna", String(job.id)),
      title: job.title,
      company: job.company?.display_name ?? "Company",
      location,
      workMode: inferWorkMode(`${location} ${description}`),
      type: inferJobType(`${job.contract_type ?? ""} ${job.title}`),
      experienceBand: inferExperienceBand(`${job.title} ${description}`),
      skills: extractSkillsFromText(`${job.title} ${description}`),
      salaryHint: formatSalaryRange(job.salary_min, job.salary_max, currency),
      platform: providerPlatform("adzuna"),
      applyUrl: job.redirect_url ?? url.toString(),
      postedLabel: job.created
        ? new Date(job.created).toLocaleDateString("en-IN")
        : "Adzuna live",
      dataProvider: "adzuna",
      description: description.replace(/<[^>]+>/g, " ").slice(0, 220)
    } satisfies JobListing;
  });
}
