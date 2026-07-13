import { DashboardHome } from "@/components/dashboard/dashboard-home";
import { getCurrentUserId } from "@/lib/auth";
import { getJobMatchesForUser } from "@/lib/data/jobs";
import {
  buildActivityFeed,
  buildDashboardStats,
  buildReadinessScore,
  getGeneratedResumes,
  getInterviewGuides
} from "@/lib/data/resumes";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  const [resumes, guides, jobMatches] = await Promise.all([
    getGeneratedResumes(userId, 6).catch(() => []),
    getInterviewGuides(userId, 3).catch(() => []),
    getJobMatchesForUser(userId, { limit: 6 }).catch(() => null)
  ]);

  return (
    <DashboardHome
      readiness={buildReadinessScore(resumes, guides)}
      stats={buildDashboardStats(resumes, guides)}
      resumes={resumes}
      guides={guides}
      activity={buildActivityFeed(resumes, guides)}
      jobMatches={jobMatches}
    />
  );
}
