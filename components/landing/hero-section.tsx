import Link from "next/link";
import { ArrowRight, Microphone } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { ResumeFlow } from "@/components/landing/resume-flow";

export function HeroSection() {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-border/70">
      <div className="section-shell pb-20 pt-20 text-center lg:pb-24 lg:pt-24">
        <Reveal>
          <p className="fine-label mb-5">Free AI mock interview practice</p>
          <h1 className="mx-auto max-w-5xl font-serif text-5xl leading-[0.95] tracking-normal text-primary sm:text-7xl lg:text-8xl">
            Practice mock interviews
            <span className="block text-accent italic">with AI.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Build the perfect resume. Land your dream job. Voice mock interviews,
            optional coding rounds, 64+ company PYQs, and ATS resume tailoring —
            free to start on Apply.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/mock-interview">
                <Microphone className="h-4 w-4" weight="regular" />
                Start free mock interview
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard/generate">
                <ArrowRight className="h-4 w-4" weight="regular" />
                Build ATS resume
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free to start ·{" "}
            <Link href="/pyqs" className="underline-offset-2 hover:underline">
              Browse company PYQs
            </Link>{" "}
            ·{" "}
            <Link href="/prepare" className="underline-offset-2 hover:underline">
              Company prep guides
            </Link>
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ResumeFlow />
        </Reveal>
      </div>
    </section>
  );
}
