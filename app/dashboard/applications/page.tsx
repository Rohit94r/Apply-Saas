import Link from "next/link";
import { ArrowRight, ChartBar } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ApplicationsTracker } from "@/components/dashboard/applications-tracker";
import { MockInterviewProgress } from "@/components/dashboard/mock-interview-progress";
import {
  ActivityFeed,
  KeywordCoverageChart
} from "@/components/dashboard/dashboard-overview";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { getCurrentUserId } from "@/lib/auth";
import { listApplications } from "@/lib/data/applications";
import {
  buildActivityFeed,
  buildDashboardStats,
  buildKeywordCoverage,
  buildReadinessScore,
  getGeneratedResumes,
  getInterviewGuides
} from "@/lib/data/resumes";

export default async function ApplicationsProgressPage() {
  const userId = await getCurrentUserId();
  const [applications, resumes, guides] = await Promise.all([
    listApplications(userId).catch(() => []),
    getGeneratedResumes(userId).catch(() => []),
    getInterviewGuides(userId).catch(() => [])
  ]);

  const dashboardStats = buildDashboardStats(resumes, guides);
  const keywordCoverage = buildKeywordCoverage(resumes);
  const readiness = buildReadinessScore(resumes, guides);
  const activity = buildActivityFeed(resumes, guides, 8);
  const tailored = resumes.filter((r) => r.company !== "Resume Builder");
  const built = resumes.filter((r) => r.company === "Resume Builder");

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="Applications & progress"
        title="Track applications and readiness."
        description="Log where you applied, then check readiness, keyword coverage, and recent activity in one place."
      />

      <section className="space-y-4">
        <div>
          <p className="fine-label mb-2">Application tracker</p>
          <h2 className="font-serif text-3xl text-primary">Where you applied</h2>
        </div>
        <ApplicationsTracker initialApplications={applications} />
      </section>

      <section className="space-y-4">
        <MockInterviewProgress />
      </section>

      <section className="space-y-6">
        <div>
          <p className="fine-label mb-2">Progress</p>
          <h2 className="font-serif text-3xl text-primary">Readiness & analytics</h2>
        </div>

        {resumes.length ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardStats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6 lg:col-span-1">
                <p className="fine-label mb-2">Readiness score</p>
                <p className="font-serif text-6xl text-primary">{readiness.score}%</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Average keyword match: {readiness.avgAts}%
                </p>
                <ul className="mt-5 space-y-2">
                  {readiness.steps.map((step) => (
                    <li
                      key={step.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span
                        className={
                          step.done
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {step.label}
                      </span>
                      <span className="text-xs font-bold text-accent">
                        {step.done ? "Done" : `${step.weight}%`}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 lg:col-span-2">
                <p className="fine-label mb-4">Resume breakdown</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-[#fbfaf6] p-4">
                    <p className="text-3xl font-bold text-primary">
                      {resumes.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Total saved</p>
                  </div>
                  <div className="rounded-xl border border-border bg-[#fbfaf6] p-4">
                    <p className="text-3xl font-bold text-accent">{tailored.length}</p>
                    <p className="text-sm text-muted-foreground">Tailored</p>
                  </div>
                  <div className="rounded-xl border border-border bg-[#fbfaf6] p-4">
                    <p className="text-3xl font-bold text-primary">{built.length}</p>
                    <p className="text-sm text-muted-foreground">Built from scratch</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-sm font-semibold text-muted-foreground">
                      Interview guides
                    </p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {guides.length}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border p-4">
                    <p className="text-sm font-semibold text-muted-foreground">
                      Exported PDFs
                    </p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {resumes.filter((r) => r.status === "downloaded").length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {keywordCoverage.length ? (
              <Card className="p-6">
                <p className="fine-label mb-6">Keyword coverage</p>
                <KeywordCoverageChart items={keywordCoverage} />
              </Card>
            ) : null}

            <ActivityFeed items={activity} />
          </>
        ) : (
          <EmptyState
            icon={ChartBar}
            title="No progress yet"
            description="Tailor one resume to start tracking placement readiness here."
            action="Open resume builder"
          />
        )}
      </section>

      <div className="flex justify-center">
        <Button asChild variant="outline">
          <Link href="/dashboard">
            Back to home
            <ArrowRight className="h-4 w-4" weight="regular" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
