/**
 * Job search service — connects user resume data to the jobs feature.
 *
 * Intern note: API routes should call functions here instead of duplicating
 * MongoDB/resume logic inside `app/api/jobs/*`.
 */

import {
  buildJobSeekerProfile,
  emptyJobSeekerProfile,
  scoreListingsForProfile,
  type JobMatchResult,
  type MatchJobsOptions
} from "@/features/jobs";
import {
  dedupeJobListings,
  fetchLiveJobs
} from "@/features/jobs/lib/providers/fetch-live-jobs";
import { getAllJobListings } from "@/lib/data/job-listings";
import { getJobCountryConfig } from "@/lib/config/job-countries";
import {
  getGeneratedResumes,
  getLatestMasterResume
} from "@/lib/data/resumes";

export type GetJobMatchesOptions = Omit<MatchJobsOptions, "country"> & {
  /** Selected market id (e.g. "in", "us", "remote"). Resolved to a config. */
  country?: string;
};

/**
 * Load the signed-in user's latest resume data, fetch live API jobs,
 * merge with curated listings, and return scored matches.
 */
export async function getJobMatchesForUser(
  userId: string,
  options?: GetJobMatchesOptions
): Promise<JobMatchResult> {
  const country = getJobCountryConfig(options?.country);

  const [masterResume, generatedResumes] = await Promise.all([
    getLatestMasterResume(userId).catch(() => null),
    getGeneratedResumes(userId, 1).catch(() => [])
  ]);

  const latestGenerated = generatedResumes[0] ?? null;

  const profile =
    masterResume || latestGenerated
      ? buildJobSeekerProfile({
          userId,
          masterResume,
          latestGenerated
        })
      : emptyJobSeekerProfile(userId);

  const { listings: liveListings, providerStatus } = await fetchLiveJobs(
    profile,
    8,
    country
  );

  const curated = getAllJobListings().map((job) => ({
    ...job,
    dataProvider: "curated" as const
  }));

  const merged = dedupeJobListings([...liveListings, ...curated]);

  return scoreListingsForProfile(profile, merged, {
    limit: options?.limit,
    minScore: options?.minScore,
    country,
    providerStatus: [
      ...providerStatus,
      {
        id: "curated",
        label: "Apply curated",
        configured: true,
        ok: true,
        count: curated.length
      }
    ]
  });
}
