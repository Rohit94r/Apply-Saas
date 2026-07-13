"use client";

/**
 * Dashboard home — motion-led composition.
 * One clear story: progress → next action → tools → jobs → recent work.
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
  CheckCircle,
  Circle,
  Desktop,
  EnvelopeSimple,
  FileText,
  GraduationCap,
  MagicWand,
  MagnifyingGlass,
  Sparkle,
  Storefront
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { JobMatchResult } from "@/features/jobs/types";
import type { ActivityItem } from "@/lib/data/resumes";
import type { DashboardStat, GeneratedResume, InterviewGuide } from "@/types";
import { Button } from "@/components/ui/button";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { phaseTwoFeatures } from "@/content/landing";

type ReadinessData = {
  score: number;
  steps: Array<{ label: string; done: boolean; weight: number }>;
  avgAts: number;
};

type DashboardHomeProps = {
  readiness: ReadinessData;
  stats: DashboardStat[];
  resumes: GeneratedResume[];
  guides: InterviewGuide[];
  activity: ActivityItem[];
  jobMatches: JobMatchResult | null;
};

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay: i * 0.06 }
  })
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 }
  }
};

const tools: Array<{
  title: string;
  blurb: string;
  href: string;
  icon: PhosphorIcon;
}> = [
  {
    title: "AI Resume Builder",
    blurb: "Tailor your resume to any job description in minutes.",
    href: "/dashboard/generate",
    icon: Sparkle
  },
  {
    title: "Job search",
    blurb: "See openings matched to your skills and experience.",
    href: "/dashboard/jobs",
    icon: MagnifyingGlass
  },
  {
    title: "Interview prep",
    blurb: "Practice questions based on the role you are targeting.",
    href: "/dashboard/interview",
    icon: Briefcase
  },
  {
    title: "Cover letter & tools",
    blurb: "Write letters, get critique, and polish your profile.",
    href: "/dashboard/tools",
    icon: MagicWand
  },
  {
    title: "Freelancing",
    blurb: "Find client work while you study or job hunt.",
    href: "/dashboard/freelancing",
    icon: Storefront
  },
  {
    title: "Learner tracks",
    blurb: "Close skill gaps with focused learning paths.",
    href: "/dashboard/learners",
    icon: GraduationCap
  }
];

function nextAction(readiness: ReadinessData) {
  if (!readiness.steps[0]?.done) {
    return {
      title: "Upload your resume",
      body: "Start here. We will reuse this profile for jobs, letters, and interview prep.",
      href: "/dashboard/generate",
      cta: "Open Resume Builder"
    };
  }
  if (!readiness.steps[1]?.done) {
    return {
      title: "Tailor for one real job",
      body: "Paste a job description and get an ATS-ready version you can download.",
      href: "/dashboard/generate",
      cta: "Tailor now"
    };
  }
  if (!readiness.steps[2]?.done) {
    return {
      title: "Build interview prep",
      body: "Turn your tailored resume into role-specific questions and talking points.",
      href: "/dashboard/interview",
      cta: "Start prep"
    };
  }
  return {
    title: "Apply to matched jobs",
    body: "Your profile looks ready. Open job search and apply to the best fits first.",
    href: "/dashboard/jobs",
    cta: "Find jobs"
  };
}

function ReadinessRing({
  score,
  reduceMotion
}: {
  score: number;
  reduceMotion: boolean | null;
}) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          className="text-muted"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          className="text-accent"
          strokeDasharray={circumference}
          initial={
            reduceMotion
              ? { strokeDashoffset: offset }
              : { strokeDashoffset: circumference }
          }
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.15, ease, delay: 0.2 }}
        />
      </svg>
      <div className="absolute text-center">
        <motion.p
          className="font-serif text-4xl text-primary"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
        >
          {score}%
        </motion.p>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Ready
        </p>
      </div>
    </div>
  );
}

export function DashboardHome({
  readiness,
  stats,
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
    <div className="space-y-10">
      {/* Welcome */}
      <motion.header
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        variants={stagger}
        className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-[#fbfaf6] px-6 py-8 sm:px-8"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.25, 0.45, 0.25], x: [0, 12, 0] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.35fr_auto] lg:items-center">
          <div>
            <motion.p variants={fadeUp} custom={0} className="fine-label mb-3">
              Your Apply workspace
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="max-w-xl font-serif text-4xl leading-[1.05] text-primary sm:text-5xl"
            >
              Get hired faster — resume, jobs, and interviews in one place.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base"
            >
              Tailor your resume, find matching roles, prepare for interviews, write
              cover letters, and explore freelance work. Everything shares the same
              profile.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Button asChild>
                <Link href={action.href}>
                  {action.cta}
                  <ArrowRight className="h-4 w-4" weight="regular" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/jobs">
                  <MagnifyingGlass className="h-4 w-4" weight="regular" />
                  Browse jobs
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex flex-col items-center gap-3"
          >
            <ReadinessRing score={readiness.score} reduceMotion={reduceMotion} />
            <p className="text-center text-xs text-muted-foreground">
              {resumes.length} resume{resumes.length === 1 ? "" : "s"} ·{" "}
              {guides.length} prep plan{guides.length === 1 ? "" : "s"}
              {jobMatches
                ? ` · ${jobMatches.matches.length} job matches`
                : ""}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          custom={4}
          className="relative mt-8 grid gap-3 border-t border-border/70 pt-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {readiness.steps.map((step) => (
            <div key={step.label} className="flex items-center gap-2.5">
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
            </div>
          ))}
        </motion.div>
      </motion.header>

      {/* Next step callout */}
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease }}
        className="flex flex-col gap-4 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Suggested next step
          </p>
          <h2 className="mt-1 font-serif text-2xl text-primary">{action.title}</h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
            {action.body}
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href={action.href}>
            {action.cta}
            <ArrowRight className="h-4 w-4" weight="regular" />
          </Link>
        </Button>
      </motion.section>

      {/* Tools — text-first, not identical icon boxes */}
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="fine-label mb-2">What you can do</p>
            <h2 className="font-serif text-3xl text-primary">Your toolkit</h2>
          </div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="grid gap-3 md:grid-cols-2"
        >
          {tools.map((tool, index) => (
            <motion.div key={tool.href} variants={fadeUp} custom={index}>
              <Link
                href={tool.href}
                className="group flex items-start gap-4 rounded-2xl border border-transparent px-3 py-3 transition hover:border-border hover:bg-white/70"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary transition group-hover:bg-accent/12 group-hover:text-accent">
                  <tool.icon className="h-5 w-5" weight="regular" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-foreground group-hover:text-primary">
                      {tool.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-accent opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                  <span className="mt-0.5 block text-sm leading-6 text-muted-foreground">
                    {tool.blurb}
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats strip */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={stagger}
        className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            custom={index}
            className="bg-[#fbfaf6] px-5 py-5"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </p>
              {stat.trend ? (
                <span className="text-[11px] font-semibold text-accent">
                  {stat.trend}
                </span>
              ) : null}
            </div>
            <p className="mt-3 font-serif text-4xl text-primary">{stat.value}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {stat.detail}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* Jobs */}
      {jobMatches ? (
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, ease }}
          className="rounded-[1.5rem] border border-border bg-white/70 p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="fine-label mb-2">Job search</p>
              <h2 className="font-serif text-3xl text-primary">
                {jobMatches.profile.isComplete
                  ? "Roles that fit your resume"
                  : "Jobs to explore"}
              </h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                {jobMatches.profile.isComplete
                  ? jobMatches.profile.headline
                  : "Upload a resume to rank matches — or browse openings now."}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/jobs">
                Open job search
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
          </div>

          <div className="mt-5 divide-y divide-border border-t border-border">
            {topJobs.length ? (
              topJobs.map((job, index) => (
                <motion.a
                  key={job.id}
                  href={job.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4, ease }}
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
                      {job.company} · {job.location} · {job.type}
                    </span>
                  </span>
                  <ArrowSquareOut className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                </motion.a>
              ))
            ) : (
              <p className="py-6 text-sm text-muted-foreground">
                No matches yet. Upload a resume to get ranked openings.
              </p>
            )}
          </div>
        </motion.section>
      ) : null}

      {/* Recent work */}
      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="fine-label mb-2">Resumes</p>
              <h2 className="font-serif text-3xl text-primary">Ready to send</h2>
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
            <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center">
              <FileText className="mx-auto h-6 w-6 text-accent" weight="regular" />
              <p className="mt-3 font-serif text-xl text-primary">
                No tailored resumes yet
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Upload once, then create a version for each job you apply to.
              </p>
              <Button asChild size="sm" className="mt-4">
                <Link href="/dashboard/generate">Open Resume Builder</Link>
              </Button>
            </div>
          )}
        </motion.section>

        <div className="space-y-6">
          <motion.section
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease, delay: 0.05 }}
            className="rounded-2xl border border-border bg-white/60 p-5"
          >
            <p className="fine-label mb-3">Recent activity</p>
            {activity.length ? (
              <ul className="space-y-3">
                {activity.slice(0, 5).map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04, duration: 0.35 }}
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
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                Your tailored resumes and prep plans will appear here.
              </p>
            )}
          </motion.section>

          <motion.section
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="rounded-2xl border border-border bg-white/60 p-5"
          >
            <p className="fine-label mb-2">Interview prep</p>
            {latestGuide ? (
              <>
                <h3 className="font-serif text-2xl text-primary">
                  {latestGuide.role}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {latestGuide.companyAnalysis}
                </p>
                <ul className="mt-4 space-y-2">
                  {latestGuide.generatedQuestions.slice(0, 3).map((question) => (
                    <li
                      key={question}
                      className="border-l-2 border-accent/40 pl-3 text-xs leading-5 text-foreground/85"
                    >
                      {question}
                    </li>
                  ))}
                </ul>
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
                  Generate role-specific questions from the same resume you tailored.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <Link href="/dashboard/interview">Start interview prep</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/dashboard/tools?tool=cover">
                      <EnvelopeSimple className="h-4 w-4" weight="regular" />
                      Cover letter
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </motion.section>
        </div>
      </div>

      {/* Coming soon — quiet strip */}
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease }}
        className="rounded-[1.5rem] border border-border bg-primary px-6 py-7 text-primary-foreground sm:px-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-accent">
              <Desktop className="h-5 w-5" weight="regular" />
              <p className="text-xs font-bold uppercase tracking-[0.18em]">
                Coming soon
              </p>
            </div>
            <h2 className="mt-3 font-serif text-3xl leading-tight">
              Interview Copilot on desktop
            </h2>
            <p className="mt-3 text-sm leading-7 text-primary-foreground/75">
              Practice interviews with a private overlay that syncs your resume and
              job context from this account. Built for mock sessions first.
            </p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:max-w-md">
            {phaseTwoFeatures.slice(0, 4).map((feature, index) => (
              <motion.li
                key={feature.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.35 }}
                className="rounded-xl border border-primary-foreground/12 bg-primary-foreground/5 px-3 py-2.5 text-xs leading-5 text-primary-foreground/85"
              >
                <span className="font-semibold text-primary-foreground">
                  {feature.name}
                </span>
                <span className="mt-0.5 block opacity-70">{feature.badge}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>
    </div>
  );
}
