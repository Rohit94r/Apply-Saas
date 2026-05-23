import Link from "next/link";
import { ArrowRight, Play } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { ResumeFlow } from "@/components/landing/resume-flow";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/70">
      <div className="section-shell pb-20 pt-20 text-center lg:pb-24 lg:pt-24">
        <Reveal>
          <p className="fine-label mb-5">
            ATS resume optimizer for freshers and internship seekers
          </p>
          <h1 className="mx-auto max-w-4xl font-serif text-6xl leading-[0.93] tracking-normal text-primary sm:text-7xl lg:text-8xl">
            Free AI Resume Builder
            <span className="block text-accent italic">for Indian Students.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Upload your current resume once. Generate ATS-optimized resumes for
            internships and fresher jobs across Bangalore, Hyderabad, Mumbai,
            Delhi NCR, Pune, Chennai, and remote hiring.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard/generate">
                Build free ATS resume
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#engine">
                <Play className="h-4 w-4" weight="regular" />
                Try Demo
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Your first 10 resume generations are free. No payment setup required.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ResumeFlow />
        </Reveal>
      </div>
    </section>
  );
}
