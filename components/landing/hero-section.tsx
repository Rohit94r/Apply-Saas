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
            India&apos;s placement prep platform — tailor resumes, track
            applications, mock interview, and prep for TCS, Infosys, Amazon, and
            more.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Open dashboard
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/prepare">
                <MagnifyingGlass className="h-4 w-4" weight="regular" />
                Company prep guides
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free to start ·{" "}
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
