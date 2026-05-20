import { ArrowRight, Sparkle } from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

const original = [
  "Built web apps using React",
  "Worked with team on APIs",
  "Made dashboards for college project"
];

const optimized = [
  "Built accessible React dashboards with TypeScript for 700+ student users",
  "Integrated REST APIs with resilient loading and error states",
  "Improved dashboard usability through reusable components and analytics views"
];

export function EngineShowcase() {
  return (
    <section id="engine" className="bg-white py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="AI Resume Engine"
            title="See how Apply turns raw experience into role-ready evidence."
            description="The engine rewrites resume sections, highlights matched keywords, and keeps the result clean enough for applicant tracking systems."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_0.2fr_0.9fr]">
          <Reveal>
            <div className="rounded-2xl border border-border bg-[#fbfaf6] p-6">
              <p className="fine-label mb-5">Original Resume</p>
              <div className="space-y-4">
                {original.map((item) => (
                  <p
                    key={item}
                    className="rounded-xl border border-border bg-white p-4 text-sm leading-6 text-muted-foreground"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="hidden items-center justify-center lg:flex">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-button">
              <ArrowRight className="h-5 w-5" weight="regular" />
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-accent/25 bg-[#f6fbf8] p-6 shadow-soft">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="fine-label">AI Optimized</p>
                <Badge>
                  <Sparkle className="mr-1 h-3.5 w-3.5" weight="regular" />
                  ATS 94
                </Badge>
              </div>
              <div className="space-y-4">
                {optimized.map((item, index) => (
                  <p
                    key={item}
                    className="rounded-xl border border-accent/20 bg-white p-4 text-sm leading-6 text-foreground"
                  >
                    {item.split(" ").map((word) => {
                      const clean = word.replace(/[^a-zA-Z+]/g, "");
                      const isKeyword = ["React", "TypeScript", "REST", "APIs"].includes(clean);
                      return (
                        <span
                          key={`${index}-${word}`}
                          className={isKeyword ? "rounded bg-accent/10 px-1 text-accent" : ""}
                        >
                          {word}{" "}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
