import Link from "next/link";
import { ArrowRight, Play } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { ResumeFlow } from "@/components/landing/resume-flow";

export function HeroSection() {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-border/70">
      <div className="section-shell pb-20 pt-20 text-center lg:pb-24 lg:pt-24">
        <Reveal>
          <p className="fine-label mb-5">Free for students worldwide</p>
          <h1 className="mx-auto max-w-4xl font-serif text-6xl leading-[0.93] tracking-normal text-primary sm:text-7xl lg:text-8xl">
            One profile.
            <span className="block text-accent italic">Every application ready.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Upload your master resume once. Apply tailors it to each job, finds matching
            openings, preps you with courses and interview guides — for students and
            early-career developers everywhere.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard/generate">
                Upload Resume
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#student-gateway">
                <Play className="h-4 w-4" weight="regular" />
                See how it works
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            5 free resume generations for everyone — then upgrade to Pro when you need more.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ResumeFlow />
        </Reveal>
      </div>
    </section>
  );
}
