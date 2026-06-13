"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Circle,
  EnvelopeSimple,
  FileText,
  Sparkle,
  Stack
} from "@phosphor-icons/react";
import type { ActivityItem } from "@/lib/data/resumes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ReadinessData = {
  score: number;
  steps: Array<{ label: string; done: boolean; weight: number }>;
  avgAts: number;
};

export function DashboardHero({
  readiness,
  resumeCount,
  guideCount
}: {
  readiness: ReadinessData;
  resumeCount: number;
  guideCount: number;
}) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid lg:grid-cols-[1fr_auto]">
        <div className="border-b border-border bg-gradient-to-br from-primary/8 via-accent/5 to-transparent p-6 lg:border-b-0 lg:border-r">
          <p className="fine-label mb-2">Your progress</p>
          <h3 className="font-serif text-3xl text-primary">
            Application studio readiness
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {readiness.score >= 80
              ? "Profile, tailoring, and prep are in place. Keep applying."
              : readiness.score >= 40
                ? "Good start. Finish tailoring and interview prep for your target role."
                : "Upload a master profile, tailor to a job, then generate cover letter and prep."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/dashboard/generate">
                <Sparkle className="h-4 w-4" weight="regular" />
                Tailor resume
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard/tools?tool=cover">
                <FileText className="h-4 w-4" weight="regular" />
                Cover letter
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-8">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${readiness.score * 2.64} 264`}
                strokeLinecap="round"
                className="text-accent transition-all duration-700"
              />
            </svg>
            <span className="absolute text-center">
              <span className="block font-serif text-4xl text-primary">
                {readiness.score}%
              </span>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">
                Ready
              </span>
            </span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {resumeCount} resume{resumeCount === 1 ? "" : "s"} · {guideCount}{" "}
            guide{guideCount === 1 ? "" : "s"}
          </p>
        </div>
      </div>
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {readiness.steps.map((step) => (
          <div
            key={step.label}
            className="flex items-center gap-3 bg-white px-5 py-4"
          >
            {step.done ? (
              <CheckCircle className="h-5 w-5 shrink-0 text-success" weight="fill" />
            ) : (
              <Circle className="h-5 w-5 shrink-0 text-muted-foreground" weight="regular" />
            )}
            <span
              className={`text-sm font-semibold ${
                step.done ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function QuickActionsGrid() {
  const actions = [
    {
      title: "Master profile",
      description: "Upload once — reuse everywhere",
      href: "/dashboard/generate",
      icon: FileText,
      accent: "bg-primary/10 text-primary"
    },
    {
      title: "Tailor with AI",
      description: "Prompt + job description → ATS resume",
      href: "/dashboard/generate",
      icon: Sparkle,
      accent: "bg-accent/10 text-accent"
    },
    {
      title: "Cover letter",
      description: "Prefilled from your tailored resume",
      href: "/dashboard/tools?tool=cover",
      icon: EnvelopeSimple,
      accent: "bg-sky-50 text-sky-700"
    },
    {
      title: "Interview prep",
      description: "Roadmap from the same role context",
      href: "/dashboard/interview",
      icon: Briefcase,
      accent: "bg-emerald-50 text-emerald-700"
    },
    {
      title: "Build resume",
      description: "Guided questions → master profile",
      href: "/dashboard/build",
      icon: Stack,
      accent: "bg-primary/10 text-primary"
    }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="group rounded-2xl border border-border bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
        >
          <span
            className={`inline-flex rounded-xl p-3 ${action.accent}`}
          >
            <action.icon className="h-5 w-5" weight="regular" />
          </span>
          <h4 className="mt-4 text-sm font-bold text-foreground group-hover:text-primary">
            {action.title}
          </h4>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {action.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition group-hover:opacity-100">
            Open
            <ArrowRight className="h-3 w-3" weight="regular" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (!items.length) {
    return (
      <Card className="p-6">
        <p className="fine-label mb-2">Recent activity</p>
        <p className="text-sm text-muted-foreground">
          Your resumes and prep plans will appear here.
        </p>
      </Card>
    );
  }

  const typeIcons = {
    resume: Sparkle,
    build: Stack,
    guide: Briefcase
  };

  return (
    <Card className="p-6">
      <p className="fine-label mb-4">Recent activity</p>
      <ul className="space-y-3">
        {items.map((item) => {
          const Icon = typeIcons[item.type] ?? FileText;
          const date = new Date(item.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short"
          });

          return (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-xl border border-border bg-[#fbfaf6] p-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-accent shadow-sm">
                <Icon className="h-4 w-4" weight="regular" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
              <div className="shrink-0 text-right">
                {item.score !== undefined ? (
                  <p className="text-sm font-bold text-accent">{item.score}%</p>
                ) : null}
                <p className="text-[10px] text-muted-foreground">{date}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export function KeywordCoverageChart({
  items
}: {
  items: Array<{ keyword: string; coverage: number }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.keyword}
          className="rounded-xl border border-border bg-white p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-foreground">
              {item.keyword}
            </p>
            <span className="text-xs font-bold text-accent">
              {item.coverage}%
            </span>
          </div>
          <Progress value={item.coverage} className="mt-3" />
        </div>
      ))}
    </div>
  );
}
