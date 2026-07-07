/**
 * The Muse Jobs API v2 — https://www.themuse.com/developers/api/v2
 *
 * Free, no API key required. Company-curated jobs (mostly US/global).
 * GET https://www.themuse.com/api/v1/jobs?category=Software%20Engineer&page=0&taking=10
 *
 * Note: v1 endpoint is the stable public one documented for partners.
 */

import type { JobListing, JobSeekerProfile } from "@/features/jobs/types";
import {
  buildListingId,
  extractSkillsFromText,
  fetchWithTimeout,
  inferExperienceBand,
  inferJobType,
  inferWorkMode,
  providerPlatform
} from "@/features/jobs/lib/providers/normalize";

type MuseLocation = { name?: string };

type MuseJob = {
  id?: string;
  name?: string;
  company?: { name?: string };
  locations?: MuseLocation[];
  contents?: string;
  refs?: { landing_page?: string };
  publication_date?: string;
  categories?: Array<{ name?: string }>;
  levels?: Array<{ name?: string }>;
};

type MuseResponse = {
  results?: MuseJob[];
  page?: string;
  page_count?: number;
};

export async function fetchTheMuseJobs(
  profile: JobSeekerProfile,
  limit = 10
): Promise<JobListing[]> {
  // The Muse accepts a `category` and free-text `page`. Use top skill/role as category-ish search.
  const search =
    profile.targetRoles[0] ??
    profile.skills[0] ??
    "Software Engineer";

  const url = new URL("https://www.themuse.com/api/v1/jobs");
  url.searchParams.set("category", search);
  url.searchParams.set("page", "0");
  url.searchParams.set("taking", String(Math.min(limit, 20)));

  const response = await fetchWithTimeout(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`The Muse HTTP ${response.status}`);
  }

  const data = (await response.json()) as MuseResponse;
  const jobs = data.results ?? [];

  return jobs.slice(0, limit).map((job) => {
    const description = (job.contents ?? "").replace(/<[^>]+>/g, " ");
    const locationName = job.locations?.[0]?.name ?? "Global";
    const level = job.levels?.[0]?.name ?? "";

    return {
      id: buildListingId(
        "themuse",
        String(job.id ?? job.name ?? Math.random())
      ),
      title: job.name ?? "Role",
      company: job.company?.name ?? "Company",
      location: locationName,
      workMode: inferWorkMode(`${locationName} ${description}`),
      type: inferJobType(`${job.name ?? ""} ${level}`),
      experienceBand: inferExperienceBand(`${job.name ?? ""} ${level} ${description}`),
      skills: extractSkillsFromText(`${job.name ?? ""} ${description}`),
      platform: providerPlatform("themuse"),
      applyUrl: job.refs?.landing_page ?? "https://www.themuse.com/",
      postedLabel: job.publication_date
        ? new Date(job.publication_date).toLocaleDateString("en-IN")
        : "The Muse live",
      dataProvider: "themuse",
      description: description.slice(0, 220)
    } satisfies JobListing;
  });
}
