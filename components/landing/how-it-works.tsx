import {
  ArrowRight,
  ClipboardText,
  DownloadSimple,
  UploadSimple
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

const steps = [
  {
    title: "Upload resume",
    description:
      "Add your master resume once — projects, skills, education, and internships. Apply builds a profile you reuse for every application.",
    icon: UploadSimple
  },
  {
    title: "Paste job description",
    description:
      "Drop in any internship or fresher JD. The AI maps React, TypeScript, APIs, and other keywords to your strongest evidence.",
    icon: ClipboardText
  },
  {
    title: "Download tailored resume",
    description:
      "Get a clean ATS-friendly PDF with a role title like Full Stack Developer, rewritten bullets, and a keyword score up to 94%.",
    icon: DownloadSimple
  }
] satisfies Array<{ title: string; description: string; icon: PhosphorIcon }>;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps from job post to polished PDF."
            description="Built for students applying to dozens of roles. Set up your profile once — every tailored resume after that takes under a minute."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <div className="surface-warm h-full rounded-2xl border border-border p-7">
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <step.icon className="h-5 w-5" weight="regular" />
                  </div>
                  {index < steps.length - 1 ? (
                    <ArrowRight className="hidden h-5 w-5 text-accent/40 md:block" weight="regular" />
                  ) : null}
                </div>
                <p className="mb-3 text-sm font-bold text-accent">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-3xl text-primary">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
