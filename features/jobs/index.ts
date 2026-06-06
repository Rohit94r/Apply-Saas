/**
 * Job Search feature — public exports for API routes and UI.
 */

export type {
  ExperienceBand,
  JobListing,
  JobMatchResult,
  JobPlatform,
  JobSeekerProfile
} from "@/features/jobs/types";

export {
  buildJobSeekerProfile,
  emptyJobSeekerProfile,
  type BuildProfileInput
} from "@/features/jobs/lib/build-profile";

export {
  matchJobsForProfile,
  type MatchJobsOptions
} from "@/features/jobs/lib/match-jobs";

export {
  buildPlatformSearchLinks,
  experienceBandLabel,
  jobPlatformMeta
} from "@/features/jobs/lib/platform-links";
