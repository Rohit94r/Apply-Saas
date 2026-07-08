import {
  Briefcase,
  ChatsCircle,
  EnvelopeSimple,
  Sparkle
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

const pillars = [
  {
    title: "Master profile",
    description:
      "Upload your resume once — projects, skills, education, and internships. Apply stores a reusable profile for every application.",
    icon: Sparkle,
    accent: "text-accent"
  },
  {
    title: "Tailor with prompts",
    description:
      "Paste a job description and steer AI: one page, stronger bullets, keyword focus. Compare before/after ATS scores on every version.",
    icon: Briefcase,
    accent: "text-primary"
  },
  {
    title: "Refine & export",
    description:
      "Prompt-edit the tailored version, download a clean ATS PDF, and re-tailor for the next company without re-uploading.",
    icon: ChatsCircle,
    accent: "text-accent"
  },
  {
    title: "Cover letter",
    description:
      "Generate a letter from the same role context — company, job description, and resume text prefilled from your studio profile.",
    icon: EnvelopeSimple,
    accent: "text-primary"
  },
  {
    title: "Interview prep",
    description:
      "Roadmaps, coding drills, and HR questions built from the exact resume you tailored — not a generic ChatGPT thread.",
    icon: Briefcase,
    accent: "text-accent"
  }
] satisfies Array<{
  title: string;
  description: string;
  icon: PhosphorIcon;
  accent: string;
}>;

export function StudentGatewaySection() {
  return (
    <section id="student-gateway" className="border-y border-border/70 bg-white py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Application studio"
            title="Profile → Tailor → Export → Prep"
            description="Apply is an AI Resume Studio — not a LaTeX editor. Upload once, tailor every application with prompts, then cover letter and interview prep from the same role."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <article
                className={`h-full rounded-2xl border border-border p-7 ${
                  index === 0 ? "surface-accent border-accent/20 lg:col-span-1" : "surface-warm"
                }`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft ${pillar.accent}`}
                >
                  <pillar.icon className="h-5 w-5" weight="regular" />
                </div>
                <h3 className="font-serif text-2xl text-primary">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="surface-accent mt-10 rounded-2xl border border-accent/20 p-6 sm:p-8">
            <p className="fine-label mb-3">Live pipeline</p>
            <p className="max-w-3xl text-base leading-8 text-foreground">
              Upload a resume → tailor for a{" "}
              <span className="font-semibold text-accent">Full Stack Developer</span> role with
              a prompt → hit <span className="font-semibold text-success">94% ATS</span> →
              refine bullets → export PDF → generate cover letter → open interview prep — all
              without leaving Apply.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
