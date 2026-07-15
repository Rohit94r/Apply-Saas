import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

const steps = [
  {
    title: "Upload once",
    description:
      "Save your projects, skills, and education as a master profile for every application."
  },
  {
    title: "Tailor per job",
    description:
      "Paste a job description, steer with a short prompt, and download an ATS-ready PDF."
  },
  {
    title: "Prep & track",
    description:
      "Cover letter, interview prep, mock practice, and an application tracker — same account."
  }
];

export function StudentGatewaySection() {
  return (
    <section id="student-gateway" className="border-y border-border/70 bg-white py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Resume builder"
            title="Upload once. Tailor for every job."
            description="Paste a job description, download an ATS-ready PDF, then use the same profile for letters, interviews, and placement tracking."
          />
        </Reveal>
        <ol className="mt-14 divide-y divide-border border-y border-border">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06}>
              <li className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8">
                <span className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Step {index + 1}
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-primary">{step.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/dashboard/generate"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
            >
              Open resume builder
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
            <Link
              href="/dashboard/applications"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-primary"
            >
              Track applications
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
