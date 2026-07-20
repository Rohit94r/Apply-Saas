/**
 * Job Search feature — shared types.
 *
 * Intern note: keep domain types here so UI, API routes, and matchers
 * all import from one place (`@/features/jobs/types`).
 */

/** External job boards we deep-link into (search URLs). */
export type JobSearchPlatform =
  | "linkedin"
  | "naukri"
  | "indeed"
  | "glassdoor"
  | "instahyre"
  | "cutshort"
  | "wellfound";

/** Live feed provider that supplied this listing. */
export type JobDataProvider =
  | "curated"
  | "adzuna"
  | "reed"
  | "usajobs"
  | "juju"
  | "herohunt"
  | "remotive"
  | "themuse";

/** Display platform on a job card (search boards + API sources). */
export type JobListingPlatform = JobSearchPlatform | JobDataProvider;

/** Experience band used for filtering curated listings. */
export type ExperienceBand =
  | "student"
  | "fresher"
  | "0-1"
  | "1-3"
  | "any";

/**
 * Profile inferred from the user's uploaded or built resume.
 * Built by `features/jobs/lib/build-profile.ts`.
 */
export type JobSeekerProfile = {
  /** Auth user id — for logging/analytics only in API responses. */
  userId: string;
  /** Human-readable headline shown in the job search banner. */
  headline: string;
  /** Primary roles the user likely targets (max 3). */
  targetRoles: string[];
  /** Normalized skill tokens extracted from resume. */
  skills: string[];
  /** Best-guess location (city or "India"). */
  location: string;
  /** student | fresher | junior — drives job filtering. */
  experienceBand: ExperienceBand;
  /** Where the profile came from. */
  source: "master-resume" | "built-resume" | "manual" | "none";
  /** True when we have enough signal to personalize matches. */
  isComplete: boolean;
  /** Optional link back to master resume id. */
  masterResumeId?: string;
};

/** A curated market job listing stored in `lib/data/job-listings.ts`. */
export type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: "remote" | "hybrid" | "onsite";
  type: "internship" | "full-time" | "contract";
  experienceBand: ExperienceBand;
  /** Skills/tags used by the matcher. */
  skills: string[];
  salaryHint?: string;
  platform: JobListingPlatform;
  /** External apply/search URL on LinkedIn, Naukri, etc. */
  applyUrl: string;
  postedLabel: string;
  /** Where this row came from — curated DB or a live API. */
  dataProvider?: JobDataProvider;
  /** Optional short description from API. */
  description?: string;
};

/** Status of each live job API after a fetch attempt. */
export type JobProviderFetchStatus = {
  id: JobDataProvider;
  label: string;
  configured: boolean;
  ok: boolean;
  count: number;
  message?: string;
};

/** Result returned to the dashboard and job search page. */
export type JobMatchResult = {
  profile: JobSeekerProfile;
  matches: Array<
    JobListing & {
      matchScore: number;
      matchReasons: string[];
      matchGaps: string[];
    }
  >;
  platformSearches: Array<{
    platform: JobSearchPlatform;
    label: string;
    description: string;
    url: string;
  }>;
  totalListingsScanned: number;
  /** Live API fetch summary — shown in Job Search overview. */
  providerStatus?: JobProviderFetchStatus[];
  /** Country/region the search ran in (e.g. "in", "us", "remote"). */
  country?: string;
};
