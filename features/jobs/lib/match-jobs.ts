/**
 * Score curated job listings against a job seeker profile.
 *
 * Matching is deterministic (skill overlap + role similarity + experience band).
 * Replace or augment with a jobs API (Adzuna, Remotive, etc.) in production.
 */

import { getAllJobListings } from "@/lib/data/job-listings";
import { buildPlatformSearchLinks } from "@/features/jobs/lib/platform-links";
import type { JobListing, JobMatchResult, JobSeekerProfile } from "@/features/jobs/types";

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

function scoreJob(profile: JobSeekerProfile, job: JobListing) {
  const reasons: string[] = [];
  let score = 0;

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
    : 0;
  score += skillScore;

  const roleScore = Math.round(roleSimilarity(profile.targetRoles, job.title) * 25);
  if (roleScore > 0) {
    reasons.push(`Role fit: ${job.title}`);
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

function uniqueReasons(reasons: string[]) {
  return [...new Set(reasons)];
}

export type MatchJobsOptions = {
  limit?: number;
  minScore?: number;
};

/**
 * Match jobs for a profile and attach external platform search links.
 */
export function matchJobsForProfile(
  profile: JobSeekerProfile,
  options: MatchJobsOptions = {}
): JobMatchResult {
  const { limit = 12, minScore = 15 } = options;
  const listings = getAllJobListings();

  const matches = listings
    .map((job) => scoreJob(profile, job))
    .filter((job) => job.matchScore >= minScore)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);

  // Fallback: show trending listings if profile is empty or no matches
  const finalMatches =
    matches.length > 0
      ? matches
      : listings.slice(0, 8).map((job) => ({
          ...job,
          matchScore: 40,
          matchReasons: ["Popular opening in the Indian market"]
        }));

  return {
    profile,
    matches: finalMatches,
    platformSearches: buildPlatformSearchLinks(profile),
    totalListingsScanned: listings.length
  };
}
