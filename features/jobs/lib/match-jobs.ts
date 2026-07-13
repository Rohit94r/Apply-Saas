/**
 * Score job listings against a job seeker profile.
 *
 * Works for curated data (`lib/data/job-listings.ts`) and live API rows
 * normalized in `features/jobs/lib/providers/*`.
 */

import { getAllJobListings } from "@/lib/data/job-listings";
import type { JobCountryConfig } from "@/lib/config/job-countries";
import { buildPlatformSearchLinks } from "@/features/jobs/lib/platform-links";
import type {
  JobListing,
  JobMatchResult,
  JobProviderFetchStatus,
  JobSeekerProfile
} from "@/features/jobs/types";

const EXPERIENCE_COMPAT: Record<
  JobSeekerProfile["experienceBand"],
  JobListing["experienceBand"][]
> = {
  student: ["student", "fresher", "any"],
  fresher: ["fresher", "student", "0-1", "any"],
  "0-1": ["0-1", "fresher", "1-3", "any"],
  "1-3": ["1-3", "0-1", "any"],
  any: ["any", "student", "fresher", "0-1", "1-3"]
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9+#.\s]/g, "").trim();
}

function tokenSet(values: string[]) {
  return new Set(values.map(normalize).filter(Boolean));
}

function roleSimilarity(profileRoles: string[], jobTitle: string) {
  const title = normalize(jobTitle);

  for (const role of profileRoles) {
    const r = normalize(role);
    if (title.includes(r) || r.includes(title)) return 1;
    if (r.split(/\s+/).some((word) => word.length > 3 && title.includes(word))) {
      return 0.7;
    }
  }

  return 0;
}

function uniqueReasons(reasons: string[]) {
  return [...new Set(reasons)];
}

function scoreJob(profile: JobSeekerProfile, job: JobListing) {
  const reasons: string[] = [];
  let score = 0;

  if (job.dataProvider && job.dataProvider !== "curated") {
    score += 8;
    reasons.push(`Live · ${job.dataProvider}`);
  }

  const profileSkills = tokenSet(profile.skills);
  const jobSkills = tokenSet(job.skills);
  let skillHits = 0;

  for (const skill of jobSkills) {
    for (const ps of profileSkills) {
      if (ps.includes(skill) || skill.includes(ps)) {
        skillHits += 1;
        reasons.push(`Skill: ${skill}`);
        break;
      }
    }
  }

  const skillScore = jobSkills.size
    ? Math.min(50, Math.round((skillHits / jobSkills.size) * 50))
    : profileSkills.size
      ? Math.min(25, skillHits * 8)
      : 0;
  score += skillScore;

  const roleScore = Math.round(roleSimilarity(profile.targetRoles, job.title) * 25);
  if (roleScore > 0) {
    reasons.push(`Role fit: ${job.title.replace(/^Hiring signal · /, "")}`);
  }
  score += roleScore;

  if (EXPERIENCE_COMPAT[profile.experienceBand]?.includes(job.experienceBand)) {
    score += 15;
    reasons.push("Experience level match");
  }

  if (
    profile.location !== "India" &&
    normalize(job.location).includes(normalize(profile.location))
  ) {
    score += 10;
    reasons.push(`Location: ${job.location}`);
  }

  if (job.type === "internship" && profile.experienceBand === "student") {
    score += 5;
    reasons.push("Internship for students");
  }

  return {
    ...job,
    matchScore: Math.min(100, score),
    matchReasons: uniqueReasons(reasons).slice(0, 4)
  };
}

export type MatchJobsOptions = {
  limit?: number;
  minScore?: number;
  /** Extra listings from live APIs (already normalized). */
  extraListings?: JobListing[];
  providerStatus?: JobProviderFetchStatus[];
  /** Selected market — drives platform deep-links + which providers fire. */
  country?: JobCountryConfig;
  /** Optional job-type bias for live providers. */
  jobType?: JobListing["type"] | "all";
};

/**
 * Score an arbitrary listing set — curated + live API merged upstream.
 */
export function scoreListingsForProfile(
  profile: JobSeekerProfile,
  listings: JobListing[],
  options: MatchJobsOptions = {}
): JobMatchResult {
  const { limit = 12, minScore = 12, providerStatus, country } = options;

  const matches = listings
    .map((job) => scoreJob(profile, job))
    .filter((job) => job.matchScore >= minScore)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);

  const finalMatches =
    matches.length > 0
      ? matches
      : listings.slice(0, 8).map((job) => ({
          ...scoreJob(profile, job),
          matchScore: Math.max(35, scoreJob(profile, job).matchScore),
          matchReasons: ["Trending opening"]
        }));

  return {
    profile,
    matches: finalMatches,
    platformSearches: buildPlatformSearchLinks(profile, country),
    totalListingsScanned: listings.length,
    providerStatus,
    country: country?.id
  };
}

/**
 * Curated-only match (sync) — used when live fetch is skipped.
 */
export function matchJobsForProfile(
  profile: JobSeekerProfile,
  options: MatchJobsOptions = {}
): JobMatchResult {
  const curated = getAllJobListings().map((job) => ({
    ...job,
    dataProvider: "curated" as const
  }));

  const listings = [...(options.extraListings ?? []), ...curated];

  return scoreListingsForProfile(profile, listings, options);
}
