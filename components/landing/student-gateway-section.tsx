import {
  Briefcase,
  ChatsCircle,
  GraduationCap,
  MagnifyingGlass,
  Sparkle
} from "@phosphor-icons/react/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

const pillars = [
  {
    title: "Master resume",
    description:
      "Upload once. Apply stores Profile, Projects, Skills, and Education as a reusable profile you never retype.",
    icon: Sparkle,
    accent: "text-accent"
  },
  {
    title: "Tailor per job",
    description:
      "Paste any internship or fresher JD. AI rewrites bullets, matches keywords like React and TypeScript, and scores ATS fit.",
    icon: Briefcase,
    accent: "text-primary"
  },
  {
    title: "Job search",
    description:
      "Match roles from your resume with curated listings and live APIs. Open LinkedIn, Naukri, and other platforms in one click.",
    icon: MagnifyingGlass,
    accent: "text-accent"
  },
  {
    title: "Learner prep",
    description:
      "Skill gaps surfaced from each role? Get curated YouTube playlists and courses so you know what to study next.",
    icon: GraduationCap,
    accent: "text-primary"
  },
  {
    title: "Interview prep",
    description:
      "Guides built from the exact resume you sent — company research, likely questions, and strengths mapped to the role.",
    icon: ChatsCircle,
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
            eyebrow="Student gateway"
            title="Everything between your resume and your offer letter."
            description="Apply is not just a PDF builder. It is a full student workflow — from tailoring your Full Stack Developer resume to finding jobs, learning gaps, and walking into interviews prepared."
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
            <p className="fine-label mb-3">Live example</p>
            <p className="max-w-3xl text-base leading-8 text-foreground">
              <span className="font-semibold text-primary">Rohit Jadhav</span> uploads a CS
              student resume → targets a{" "}
              <span className="font-semibold text-accent">Full Stack Developer</span> role →
              gets <span className="font-semibold text-success">94% ATS</span> with matched
              skills React, TypeScript, APIs → finds internships on Naukri &amp; LinkedIn →
              studies Node.js gaps → walks in with a role-specific interview guide.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
