"use client";

/**
 * Dashboard home — one story for non-tech students:
 * clear headline → next step → toolkit → recent work.
 */

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants
} from "framer-motion";
import {
  ArrowRight,
  ArrowSquareOut,
  Briefcase,
  Buildings,
  CheckCircle,
  Circle,
  Desktop,
  FileText,
  GraduationCap,
  ListChecks,
  MagicWand,
  MagnifyingGlass,
  Microphone,
  Sparkle,
  Storefront
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { JobMatchResult } from "@/features/jobs/types";
import type { ActivityItem } from "@/lib/data/resumes";
import type { DashboardStat, GeneratedResume, InterviewGuide } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResumeCard } from "@/components/dashboard/resume-card";

type ReadinessData = {
  score: number;
  steps: Array<{ label: string; done: boolean; weight: number }>;
  avgAts: number;
};

type DashboardHomeProps = {
  readiness: ReadinessData;
  /** Kept for caller compat; strip removed to cut homepage clutter. */
  stats: DashboardStat[];
  resumes: GeneratedResume[];
  guides: InterviewGuide[];
  activity: ActivityItem[];
  jobMatches: JobMatchResult | null;
};

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease }
  }
};

const tools: Array<{
  title: string;
  blurb: string;
  href: string;
  icon: PhosphorIcon;
}> = [
  {
    title: "Tailor resume",
    blurb: "Fit your resume to one job.",
    href: "/dashboard/generate",
    icon: Sparkle
  },
  {
    title: "Job search",
    blurb: "Find openings that match your skills.",
    href: "/dashboard/jobs",
    icon: MagnifyingGlass
  },
  {
    title: "Interview prep",
    blurb: "Practice questions for that role.",
    href: "/dashboard/interview",
    icon: Briefcase
  },
  {
    title: "Mock interview",
    blurb: "Live AI interviewer — practice on the web.",
    href: "/dashboard/mock-interview",
    icon: Microphone
  },
  {
    title: "Applications & progress",
    blurb: "Tracker plus readiness and keyword stats.",
    href: "/dashboard/applications",
    icon: ListChecks
  },
  {
    title: "Freelancing",
    blurb: "Find client work while you study.",
    href: "/dashboard/freelancing",
    icon: Storefront
  },
  {
    title: "Learning tracks",
    blurb: "Short roadmaps for skill gaps.",
    href: "/dashboard/learners",
    icon: GraduationCap
  },
  {
    title: "Company prep",
    blurb: "Guides for TCS, Infosys, Amazon…",
    href: "/prepare",
    icon: Buildings
  },
  {
    title: "AI tools",
    blurb: "Cover letter, critique, photo, offers.",
    href: "/dashboard/tools",
    icon: MagicWand
  }
];

function nextAction(readiness: ReadinessData) {
  if (!readiness.steps[0]?.done) {
    return {
      title: "Upload your resume",
      body: "Start here — we reuse it for jobs, letters, and interview prep.",
      href: "/dashboard/generate",
      cta: "Upload resume"
    };
  }
  if (!readiness.steps[1]?.done) {
    return {
      title: "Tailor for one real job",
      body: "Paste a job description and download an ATS-ready PDF.",
      href: "/dashboard/generate",
      cta: "Tailor now"
    };
  }
  if (!readiness.steps[2]?.done) {
    return {
      title: "Practice for the interview",
      body: "Get questions based on the resume you just tailored.",
      href: "/dashboard/interview",
      cta: "Start prep"
    };
  }
  return {
    title: "Track your applications",
    body: "Log companies you applied to — or open a mock interview warm-up first.",
    href: "/dashboard/applications",
    cta: "Open tracker"
  };
}

export function DashboardHome({
  readiness,
  resumes,
  guides,
  activity,
  jobMatches
}: DashboardHomeProps) {
  const reduceMotion = useReducedMotion();
  const action = nextAction(readiness);
  const latestGuide = guides[0];
  const topJobs = jobMatches?.matches.slice(0, 4) ?? [];

  return (
    <div className="space-y-12">
      {/* One headline + next step */}
      <motion.header
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        variants={fadeUp}
        className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-[#fbfaf6] px-6 py-8 sm:px-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
        />

        <p className="fine-label mb-3">Your placement workspace</p>
        <h1 className="max-w-2xl font-serif text-4xl leading-[1.05] text-primary sm:text-5xl">
          {action.title}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          {action.body}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href={action.href}>
              {action.cta}
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">{readiness.score}%</span>{" "}
            ready
          </p>
        </div>

        <ul className="mt-8 grid gap-2 border-t border-border/70 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {readiness.steps.map((step) => (
            <li key={step.label} className="flex items-center gap-2.5">
              {step.done ? (
                <CheckCircle className="h-5 w-5 shrink-0 text-success" weight="fill" />
              ) : (
                <Circle
                  className="h-5 w-5 shrink-0 text-muted-foreground"
                  weight="regular"
                />
              )}
              <span
                className={`text-sm ${
                  step.done
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ul>
      </motion.header>

      {/* Toolkit — restrained card grid (cover letter & offers nest under AI tools) */}
      <section>
        <p className="fine-label mb-2">Toolkit</p>
        <h2 className="font-serif text-3xl text-primary">What you can do</h2>
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
        >
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group block h-full">
              <Card className="flex h-full flex-col bg-[#fbfaf6] p-5 transition group-hover:border-primary/25">
                <tool.icon
                  className="h-5 w-5 text-accent"
                  weight="regular"
                />
                <p className="mt-3 font-semibold text-foreground group-hover:text-primary">
                  {tool.title}
                </p>
                <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">
                  {tool.blurb}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                  Open
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Card>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Jobs preview */}
      {jobMatches ? (
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="fine-label mb-2">Jobs</p>
              <h2 className="font-serif text-3xl text-primary">
                {jobMatches.profile.isComplete
                  ? "Roles that fit your resume"
                  : "Jobs to explore"}
              </h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/jobs">
                Open job search
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
          </div>

          <div className="mt-4 divide-y divide-border border-t border-border">
            {topJobs.length ? (
              topJobs.map((job) => (
                <a
                  key={job.id}
                  href={job.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 py-3 transition hover:bg-[#f7f6f2]"
                >
                  <span className="w-11 shrink-0 text-right text-xs font-bold tabular-nums text-accent">
                    {job.matchScore}%
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary">
                      {job.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {job.company} · {job.location}
                    </span>
                  </span>
                  <ArrowSquareOut className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                </a>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Upload a resume to see ranked job matches.
                </p>
                <Button asChild size="sm" className="mt-3">
                  <Link href="/dashboard/jobs">Upload &amp; match</Link>
                </Button>
              </div>
            )}
          </div>
        </motion.section>
      ) : null}

      {/* Recent work */}
      <div className="grid gap-10 xl:grid-cols-[1.15fr_0.85fr]">
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="fine-label mb-2">Resumes</p>
              <h2 className="font-serif text-3xl text-primary">Ready to send</h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/resumes">View all</Link>
            </Button>
          </div>
          {resumes.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {resumes.slice(0, 2).map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center">
              <FileText className="mx-auto h-6 w-6 text-accent" weight="regular" />
              <p className="mt-3 font-serif text-xl text-primary">
                No tailored resumes yet
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Upload once, then make a version for each job you apply to.
              </p>
              <Button asChild size="sm" className="mt-4">
                <Link href="/dashboard/generate">Open resume builder</Link>
              </Button>
            </div>
          )}
        </section>

        <div className="space-y-8">
          <section>
            <p className="fine-label mb-3">Recent activity</p>
            {activity.length ? (
              <ul className="space-y-3">
                {activity.slice(0, 5).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      {item.score !== undefined ? (
                        <p className="text-sm font-bold text-accent">{item.score}%</p>
                      ) : null}
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short"
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-dashed border-border px-5 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Your tailored resumes and prep plans will show up here.
                </p>
                <Button asChild size="sm" className="mt-3">
                  <Link href="/dashboard/generate">Start with a resume</Link>
                </Button>
              </div>
            )}
          </section>

          <section>
            <p className="fine-label mb-2">Interview prep</p>
            {latestGuide ? (
              <>
                <h3 className="font-serif text-2xl text-primary">
                  {latestGuide.role}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {latestGuide.companyAnalysis}
                </p>
                <Button asChild size="sm" variant="outline" className="mt-4">
                  <Link href="/dashboard/interview">
                    Continue prep
                    <Briefcase className="h-4 w-4" weight="regular" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-primary">
                  Prepare before you apply
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Get practice questions from the same resume you tailored.
                </p>
                <Button asChild size="sm" className="mt-4">
                  <Link href="/dashboard/interview">Start interview prep</Link>
                </Button>
              </>
            )}
          </section>
        </div>
      </div>

      {/* Coming soon — quiet strip */}
      <section className="rounded-[1.5rem] border border-border bg-primary px-6 py-7 text-primary-foreground sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-accent">
              <Desktop className="h-5 w-5" weight="regular" />
              <p className="text-xs font-bold uppercase tracking-[0.18em]">
                Coming soon
              </p>
            </div>
            <h2 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
              Interview Copilot on desktop
            </h2>
            <p className="mt-2 text-sm leading-7 text-primary-foreground/75">
              Windows + macOS overlay is still Coming Soon. Mock interview,
              applications, and AI tools are live on the web today.
            </p>
          </div>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="shrink-0 border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/downloads">Get notified when Desktop ships</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
