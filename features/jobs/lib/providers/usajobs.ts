/**
 * USAJOBS Search API — https://developer.usajobs.gov/
 *
 * GET https://data.usajobs.gov/api/search?Keyword=...
 * Headers: Host, User-Agent (email), Authorization-Key
 */

import { getJobApiSecrets } from "@/lib/config/job-apis";
import type { JobCountryConfig } from "@/lib/config/job-countries";
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

type UsaJobsItem = {
  MatchedObjectId?: string;
  MatchedObjectDescriptor?: {
    PositionTitle?: string;
    OrganizationName?: string;
    PositionLocationDisplay?: string;
    PositionURI?: string;
    QualificationSummary?: string;
    PositionRemuneration?: Array<{ MinimumRange?: string; MaximumRange?: string }>;
    PublicationStartDate?: string;
    UserArea?: { Details?: { MajorDuties?: string[] } };
  };
};

type UsaJobsResponse = {
  SearchResult?: {
    SearchResultItems?: UsaJobsItem[];
    SearchResultCountAll?: number;
  };
};

export async function fetchUsajobsJobs(
  profile: JobSeekerProfile,
  limit = 10,
  _country: JobCountryConfig
): Promise<JobListing[]> {
  const { usajobs } = getJobApiSecrets();

  if (!usajobs.apiKey || !usajobs.userAgent) {
    return [];
  }

  const keyword =
    profile.skills.slice(0, 3).join(" ") ||
    profile.targetRoles[0] ||
    "Software Development";

  const url = new URL("https://data.usajobs.gov/api/search");
  url.searchParams.set("Keyword", keyword);
  url.searchParams.set("ResultsPerPage", String(Math.min(limit, 25)));

  if (profile.location && profile.location !== "India") {
    url.searchParams.set("LocationName", profile.location);
  }

  const response = await fetchWithTimeout(url.toString(), {
    headers: {
      Host: "data.usajobs.gov",
      "User-Agent": usajobs.userAgent,
      "Authorization-Key": usajobs.apiKey,
      Accept: "application/json"
    },
    next: { revalidate: 600 }
  });

  if (!response.ok) {
    throw new Error(`USAJOBS HTTP ${response.status}`);
  }

  const data = (await response.json()) as UsaJobsResponse;
  const items = data.SearchResult?.SearchResultItems ?? [];

  return items.slice(0, limit).map((item) => {
    const job = item.MatchedObjectDescriptor ?? {};
    const duties = (job.UserArea?.Details?.MajorDuties ?? []).join(" ");
    const summary = job.QualificationSummary ?? duties;
    const pay = job.PositionRemuneration?.[0];

    return {
      id: buildListingId("usajobs", item.MatchedObjectId ?? job.PositionTitle ?? "job"),
      title: job.PositionTitle ?? "Federal role",
      company: job.OrganizationName ?? "US Government",
      location: job.PositionLocationDisplay ?? "United States",
      workMode: inferWorkMode(summary),
      type: inferJobType(job.PositionTitle ?? ""),
      experienceBand: inferExperienceBand(summary),
      skills: extractSkillsFromText(`${job.PositionTitle} ${summary}`),
      salaryHint:
        pay?.MinimumRange && pay?.MaximumRange
          ? `$${pay.MinimumRange}–$${pay.MaximumRange}`
          : undefined,
      platform: providerPlatform("usajobs"),
      applyUrl: job.PositionURI ?? "https://www.usajobs.gov/",
      postedLabel: job.PublicationStartDate ?? "USAJOBS live",
      dataProvider: "usajobs",
      description: summary.replace(/\s+/g, " ").slice(0, 220)
    } satisfies JobListing;
  });
}
