import { CheckCircle, MinusCircle, XCircle } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { comparisonRows } from "@/lib/constants";

function StatusIcon({ value, best = false }: { value: string; best?: boolean }) {
  if (value === "No") {
    return <XCircle className="h-4 w-4 text-red-500" weight="regular" />;
  }
  if (value.includes("Manual") || value.includes("Limited") || value.includes("Requires")) {
    return <MinusCircle className="h-4 w-4 text-warning" weight="regular" />;
  }
  return (
    <CheckCircle
      className={best ? "h-4 w-4 text-accent" : "h-4 w-4 text-success"}
      weight="regular"
    />
  );
}

export function ComparisonSection() {
  return (
    <section id="comparison" className="border-y border-border/70 bg-[#f7f4ee] py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Built for job applications"
            title="Generic AI can write. Apply knows the workflow."
            description="Compare the experience students actually need: role matching, ATS optimization, history tracking, PDF export, and prep after submission."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <div className="grid min-w-[860px] grid-cols-[1.45fr_repeat(4,1fr)] border-b border-border bg-[#fbfaf6] text-sm font-semibold text-primary">
              <div className="p-5">Capability</div>
              <div className="border-l border-border p-5 text-accent">Apply</div>
              <div className="border-l border-border p-5">ChatGPT</div>
              <div className="border-l border-border p-5">Canva Resume Builder</div>
              <div className="border-l border-border p-5">Resume.io</div>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[860px]">
                {comparisonRows.map((row) => (
                  <div
                    key={row.feature}
                    className="grid grid-cols-[1.45fr_repeat(4,1fr)] border-b border-border last:border-b-0"
                  >
                    <div className="p-5 text-sm font-medium text-foreground">
                      {row.feature}
                    </div>
                    <div className="flex items-center gap-2 border-l border-border p-5 text-sm text-accent">
                      <StatusIcon value={row.apply} best />
                      {row.apply}
                    </div>
                    <div className="flex items-center gap-2 border-l border-border p-5 text-sm text-muted-foreground">
                      <StatusIcon value={row.chatgpt} />
                      {row.chatgpt}
                    </div>
                    <div className="flex items-center gap-2 border-l border-border p-5 text-sm text-muted-foreground">
                      <StatusIcon value={row.canva} />
                      {row.canva}
                    </div>
                    <div className="flex items-center gap-2 border-l border-border p-5 text-sm text-muted-foreground">
                      <StatusIcon value={row.resumeio} />
                      {row.resumeio}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
