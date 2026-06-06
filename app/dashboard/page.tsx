import Link from "next/link";
import { ArrowRight, Briefcase, FileText } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  ActivityFeed,
  DashboardHero,
  QuickActionsGrid
} from "@/components/dashboard/dashboard-overview";
import { JobMatchesPreview } from "@/features/jobs/components/job-matches-preview";
import { PageHeader } from "@/components/dashboard/page-header";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { StatCard } from "@/components/dashboard/stat-card";
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
  const dashboardStats = buildDashboardStats(resumes, guides);
  const readiness = buildReadinessScore(resumes, guides);
  const activity = buildActivityFeed(resumes, guides);
  const latestGuide = guides[0];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Your job search command center."
        description="Track readiness, manage tailored resumes, follow learner roadmaps, and prepare for interviews — all in one workspace."
        cta="Improve resume"
      />

      {jobMatches ? <JobMatchesPreview result={jobMatches} /> : null}

      <DashboardHero
        readiness={readiness}
        resumeCount={resumes.length}
        guideCount={guides.length}
      />

      <QuickActionsGrid />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="fine-label mb-2">Recent resumes</p>
              <h3 className="font-serif text-3xl text-primary">Ready to apply</h3>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/resumes">
                View all
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
          </div>
          {resumes.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {resumes.slice(0, 2).map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              title="No saved resumes yet"
              description="Build or improve a resume and it will appear here automatically."
              action="Build resume"
            />
          )}
        </Card>

        <div className="space-y-6">
          <ActivityFeed items={activity} />

          <Card className="p-6">
            <p className="fine-label mb-2">Interview prep</p>
            {latestGuide ? (
              <>
                <h3 className="font-serif text-2xl text-primary">
                  {latestGuide.role}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {latestGuide.companyAnalysis}
                </p>
                <ul className="mt-4 space-y-2">
                  {latestGuide.generatedQuestions.slice(0, 3).map((question) => (
                    <li
                      key={question}
                      className="rounded-lg border border-border bg-white p-2.5 text-xs leading-5"
                    >
                      {question}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-4" size="sm" variant="outline">
                  <Link href="/dashboard/interview">
                    Open prep plan
                    <Briefcase className="h-4 w-4" weight="regular" />
                  </Link>
                </Button>
              </>
            ) : (
              <EmptyState
                icon={Briefcase}
                title="No guides yet"
                description="Create an interview guide from a target role and resume."
                action="Start prep"
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
