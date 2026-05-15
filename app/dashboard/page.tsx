import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileText, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { dashboardStats, sampleInterviewGuide, sampleResumes } from "@/lib/constants";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Your job search command center."
        description="Manage tailored resumes, generate new versions, prepare for interviews, and keep every application connected to the role it was made for."
        cta="Generate resume"
      />
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
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {sampleResumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="p-6">
            <p className="fine-label mb-2">Interview prep</p>
            <h3 className="font-serif text-3xl text-primary">
              {sampleInterviewGuide.role}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {sampleInterviewGuide.companyAnalysis}
            </p>
            <ul className="mt-5 space-y-3">
              {sampleInterviewGuide.generatedQuestions.slice(0, 3).map((question) => (
                <li key={question} className="rounded-xl border border-border bg-white p-3 text-sm">
                  {question}
                </li>
              ))}
            </ul>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {[
              { title: "Cover letter", icon: FileText },
              { title: "PDF editing", icon: Wand2 },
              { title: "Interview guide", icon: BriefcaseBusiness }
            ].map((item) => (
              <Link
                href="/dashboard/tools"
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft transition hover:-translate-y-0.5"
              >
                <span className="rounded-full bg-accent/10 p-3 text-accent">
                  <item.icon className="h-4 w-4" />
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
