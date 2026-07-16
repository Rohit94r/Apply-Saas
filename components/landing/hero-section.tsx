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
            Crack campus
            <span className="block text-accent italic">placements.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Previous year coding questions from 64+ companies, AI mock interviews
            with voice, ATS resume tailoring, and application tracking — TCS,
            Infosys, Amazon, Zoho, and more. All in one place.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/pyqs">
                <MagnifyingGlass className="h-4 w-4" weight="regular" />
                Browse company PYQs
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/mock-interview">
                <ArrowRight className="h-4 w-4" weight="regular" />
                Try mock interview
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free to start ·{" "}
            <Link href="/dashboard" className="underline-offset-2 hover:underline">
              Build your resume
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
