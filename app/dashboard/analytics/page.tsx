import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { getCurrentUserId } from "@/lib/auth";
import {
  buildDashboardStats,
  buildKeywordCoverage,
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

  return (
    <div>
      <PageHeader
        eyebrow="Resume analytics"
        title="Know what is improving."
        description="Track ATS scores, keyword coverage, generated versions, and application readiness across your job search."
      />
      {resumes.length ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {dashboardStats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <p className="text-sm font-semibold text-muted-foreground">{stat.label}</p>
              <p className="mt-5 font-serif text-5xl text-primary">{stat.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {stat.detail}
              </p>
            </Card>
          ))}
          <Card className="p-6 lg:col-span-3">
            <p className="fine-label mb-6">Keyword coverage</p>
            <div className="grid gap-4 md:grid-cols-4">
              {keywordCoverage.map((item) => (
                <div
                  key={item.keyword}
                  className="rounded-xl border border-border bg-white p-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.keyword}
                  </p>
                  <div className="mt-4 h-28 rounded-xl bg-gradient-to-t from-accent/30 to-muted" />
                  <p className="mt-3 text-xs text-muted-foreground">
                    Coverage {item.coverage}%
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <EmptyState
          icon={BarChart3}
          title="No analytics yet"
          description="Analytics appear after you generate and download role-specific resumes."
        />
      )}
    </div>
  );
}
