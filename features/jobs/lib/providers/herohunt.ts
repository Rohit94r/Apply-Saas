/**
 * HeroHunt People Search API — https://www.herohunt.ai/people-search-api
 *
 * Note: HeroHunt indexes talent profiles (recruiter-facing). We use it to surface
 * market-demand signals and link out — not as primary job postings.
 * Auth: Authorization: Bearer HEROHUNT_API_KEY
 */

import { getJobApiSecrets } from "@/lib/config/job-apis";
import type { JobCountryConfig } from "@/lib/config/job-countries";
import type { JobListing, JobSeekerProfile } from "@/features/jobs/types";
import {
  buildListingId,
  extractSkillsFromText,
  fetchWithTimeout,
  inferExperienceBand,
  providerPlatform
} from "@/features/jobs/lib/providers/normalize";

type HeroHuntProfile = {
  id?: string;
  title?: string;
  headline?: string;
  company?: string;
  location?: string;
  profile_url?: string;
  linkedin_url?: string;
  relevancy_score?: number;
  summary?: string;
};

type HeroHuntResponse = {
  results?: HeroHuntProfile[];
  profiles?: HeroHuntProfile[];
  data?: HeroHuntProfile[];
};

function normalizeHeroHuntRows(payload: HeroHuntResponse) {
  return payload.results ?? payload.profiles ?? payload.data ?? [];
}

export async function fetchHeroHuntMarketSignals(
  profile: JobSeekerProfile,
  limit = 5,
  country: JobCountryConfig
): Promise<JobListing[]> {
  const { herohunt } = getJobApiSecrets();

  if (!herohunt.apiKey) {
    return [];
  }

  const query = [
    profile.targetRoles[0],
    profile.skills.slice(0, 5).join(", "),
    profile.location && profile.location !== "India"
      ? profile.location
      : country.locationLabel
  ]
    .filter(Boolean)
    .join(" — ");

  const response = await fetchWithTimeout(herohunt.baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${herohunt.apiKey}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query || "software engineer",
      limit: Math.min(limit, 10)
    }),
    next: { revalidate: 600 }
  });

  if (!response.ok) {
    throw new Error(`HeroHunt HTTP ${response.status}`);
  }

  const data = (await response.json()) as HeroHuntResponse;
  const rows = normalizeHeroHuntRows(data);

  /** Map talent-market rows into exploratory cards (company + role demand). */
  return rows.slice(0, limit).map((row, index) => {
    const title = row.title ?? row.headline ?? "In-demand profile";
    const company = row.company ?? "Market signal";
    const description = row.summary ?? title;

    return {
      id: buildListingId("herohunt", row.id ?? String(index)),
      title: `Hiring signal · ${title}`,
      company,
      location: row.location ?? profile.location,
      workMode: "hybrid",
      type: "full-time",
      experienceBand: inferExperienceBand(title),
      skills: extractSkillsFromText(`${title} ${description}`),
      platform: providerPlatform("herohunt"),
      applyUrl:
        row.linkedin_url ??
        row.profile_url ??
        "https://www.herohunt.ai/people-search-api",
      postedLabel: row.relevancy_score
        ? `${Math.round(row.relevancy_score * 100)}% AI relevance`
        : "HeroHunt signal",
      dataProvider: "herohunt",
      description: description.slice(0, 220)
    } satisfies JobListing;
  });
}
