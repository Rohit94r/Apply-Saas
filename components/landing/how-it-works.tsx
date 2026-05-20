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
      "Add your master resume, LinkedIn PDF, or project notes once. Apply turns it into a reusable profile.",
    icon: UploadSimple
  },
  {
    title: "Paste job description",
    description:
      "The AI reads the role, extracts requirements, and maps them to your strongest evidence.",
    icon: ClipboardText
  },
  {
    title: "Download tailored resume",
    description:
      "Get a clean ATS-friendly PDF with rewritten summary, skills, bullets, and keywords.",
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
            description="Apply is designed for repeat applications: the first setup is careful, and every resume after that is fast."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-[#fbfaf6] p-7">
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" weight="regular" />
                  </div>
                  {index < steps.length - 1 ? (
                    <ArrowRight className="hidden h-5 w-5 text-border md:block" weight="regular" />
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
