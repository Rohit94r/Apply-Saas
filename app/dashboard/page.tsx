import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  FileText,
  MagicWand,
  Stack
} from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/dashboard/page-header";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { getCurrentUserId } from "@/lib/auth";
import {
  buildDashboardStats,
  getGeneratedResumes,
  getInterviewGuides
} from "@/lib/data/resumes";

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  const [resumes, guides] = await Promise.all([
    getGeneratedResumes(userId, 6).catch(() => []),
    getInterviewGuides(userId, 3).catch(() => [])
  ]);
  const dashboardStats = buildDashboardStats(resumes, guides);
  const latestGuide = guides[0];

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Your job search command center."
        description="Manage tailored resumes, generate new versions, prepare for interviews, and keep every application connected to the role it was made for."
        cta="Improve resume"
      />
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <p className="fine-label mb-2">Already have a resume</p>
          <h3 className="text-lg font-semibold text-foreground">Improve resume</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Upload your PDF, paste job details, compare before and after, then download.
          </p>
          <Button asChild className="mt-4" size="sm">
            <Link href="/dashboard/generate">
              Improve
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </Button>
        </Card>
        <Card className="p-5">
          <p className="fine-label mb-2">No resume yet</p>
          <h3 className="text-lg font-semibold text-foreground">Build resume</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Answer simple student questions, choose a template, preview, edit, and save.
          </p>
          <Button asChild className="mt-4" size="sm" variant="outline">
            <Link href="/dashboard/build">
              Build
              <Stack className="h-4 w-4" weight="regular" />
            </Link>
          </Button>
        </Card>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
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
              description="Generate a role-specific resume and it will be saved here automatically."
              action="Generate resume"
            />
          )}
        </Card>
        <div className="space-y-6">
          <Card className="p-6">
            <p className="fine-label mb-2">Interview prep</p>
            {latestGuide ? (
              <>
                <h3 className="font-serif text-3xl text-primary">
                  {latestGuide.role}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {latestGuide.companyAnalysis}
                </p>
                <ul className="mt-5 space-y-3">
                  {latestGuide.generatedQuestions.slice(0, 3).map((question) => (
                    <li
                      key={question}
                      className="rounded-xl border border-border bg-white p-3 text-sm"
                    >
                      {question}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <EmptyState
                icon={Briefcase}
                title="No guides yet"
                description="Create an interview guide from a target role and resume content."
                action="Generate guide"
              />
            )}
          </Card>
          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {[
              { title: "Cover letter", icon: FileText },
              { title: "PDF editing", icon: MagicWand },
              { title: "Interview guide", icon: Briefcase }
            ].map((item) => (
              <Link
                href="/dashboard/tools"
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft transition hover:-translate-y-0.5"
              >
                <span className="rounded-full bg-accent/10 p-3 text-accent">
                  <item.icon className="h-4 w-4" weight="regular" />
                </span>
                <span className="text-sm font-semibold text-foreground">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
