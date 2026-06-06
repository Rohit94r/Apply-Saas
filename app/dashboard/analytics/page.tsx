import Link from "next/link";
import { ArrowRight, ChartBar } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  ActivityFeed,
  KeywordCoverageChart
} from "@/components/dashboard/dashboard-overview";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { getCurrentUserId } from "@/lib/auth";
import {
  buildActivityFeed,
  buildDashboardStats,
  buildKeywordCoverage,
  buildReadinessScore,
  getGeneratedResumes,
  getInterviewGuides
} from "@/lib/data/resumes";

export default async function AnalyticsPage() {
  const userId = await getCurrentUserId();
  const [resumes, guides] = await Promise.all([
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
    <div className="space-y-8">
      <PageHeader
        eyebrow="Resume analytics"
        title="Know what is improving."
        description="Track ATS scores, keyword coverage, readiness progress, and activity across your job search."
      />

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
                Average ATS: {readiness.avgAts}%
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

          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/dashboard">
                Back to overview
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <EmptyState
          icon={ChartBar}
          title="No analytics yet"
          description="Analytics appear after you generate and save resumes or interview guides."
          action="Build resume"
        />
      )}
    </div>
  );
}
