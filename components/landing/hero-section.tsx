import Link from "next/link";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { ResumeFlow } from "@/components/landing/resume-flow";

export function HeroSection() {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-border/70">
      <div className="section-shell pb-20 pt-20 text-center lg:pb-24 lg:pt-24">
        <Reveal>
          <p className="fine-label mb-5">India&apos;s placement preparation platform</p>
          <h1 className="mx-auto max-w-5xl font-serif text-5xl leading-[0.95] tracking-normal text-primary sm:text-7xl lg:text-8xl">
            Apply
            <span className="block text-accent italic">for placements.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Tailor ATS resumes, practice AI mock interviews, and study previous year
            coding questions from 64+ companies — TCS, Infosys, Amazon, Zoho, and more.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Open dashboard
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pyqs">
                <MagnifyingGlass className="h-4 w-4" weight="regular" />
                Previous year coding questions
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free to start ·{" "}
            <Link href="/mock-interview" className="underline-offset-2 hover:underline">
              AI mock interview
            </Link>{" "}
            ·{" "}
            <Link href="/downloads" className="underline-offset-2 hover:underline">
              Interview Copilot
            </Link>{" "}
            coming soon
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ResumeFlow />
        </Reveal>
      </div>
    </section>
  );
}
