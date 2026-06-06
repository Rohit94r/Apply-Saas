/**
 * Job search service — connects user resume data to the jobs feature.
 *
 * Intern note: API routes should call functions here instead of duplicating
 * MongoDB/resume logic inside `app/api/jobs/*`.
 */

import {
  buildJobSeekerProfile,
  emptyJobSeekerProfile,
  matchJobsForProfile,
  type JobMatchResult,
  type MatchJobsOptions
} from "@/features/jobs";
import {
  getGeneratedResumes,
  getLatestMasterResume
} from "@/lib/data/resumes";

/**
 * Load the signed-in user's latest resume data and return matched jobs.
 */
export async function getJobMatchesForUser(
  userId: string,
  options?: MatchJobsOptions
): Promise<JobMatchResult> {
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

  return matchJobsForProfile(profile, options);
}
