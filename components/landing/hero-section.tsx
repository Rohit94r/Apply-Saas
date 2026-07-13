import Link from "next/link";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { ResumeFlow } from "@/components/landing/resume-flow";

const pillars = [
  "AI Resume Builder",
  "Job search",
  "Interview prep",
  "Cover letters",
  "Freelancing",
  "Learner tracks"
];

export function HeroSection() {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-border/70">
      <div className="section-shell pb-20 pt-20 text-center lg:pb-24 lg:pt-24">
        <Reveal>
          <p className="fine-label mb-5">All-in-one career platform</p>
          <h1 className="mx-auto max-w-5xl font-serif text-5xl leading-[0.95] tracking-normal text-primary sm:text-7xl lg:text-8xl">
            One platform for resumes,
            <span className="block text-accent italic">jobs & interviews.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Apply is your full application toolkit: tailor ATS resumes with AI, find
            matching jobs and internships, prep interviews, write cover letters,
            learn skills, and discover freelance work — then grow into Interview
            Copilot on desktop.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {pillars.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-white/80 px-3 py-1.5 text-xs font-semibold text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Open dashboard
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard/jobs">
                <MagnifyingGlass className="h-4 w-4" weight="regular" />
                Find jobs
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Live today · Desktop Interview Copilot coming soon · 5 free tailors to start
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ResumeFlow />
        </Reveal>
      </div>
    </section>
  );
}
