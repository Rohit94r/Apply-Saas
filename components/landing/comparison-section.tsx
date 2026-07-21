import { CheckCircle, MinusCircle, XCircle } from "@phosphor-icons/react/ssr";
import Link from "next/link";
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
            eyebrow="Why students switch to Apply"
            title="The only platform that bundles everything a placement student needs."
            description="PrepInsta has PYQs but no resume builder or mock interviews. Internshala has courses but no tools. Apply gives you all five tabs a placement-season student has open — in one login."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <div className="grid min-w-[860px] grid-cols-[1.45fr_repeat(4,1fr)] border-b border-border bg-[#fbfaf6] text-sm font-semibold text-primary">
              <div className="p-5">Capability</div>
              <div className="border-l border-border p-5 text-accent">Apply</div>
              <div className="border-l border-border p-5">PrepInsta</div>
              <div className="border-l border-border p-5">Internshala</div>
              <div className="border-l border-border p-5">Unstop</div>
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
                      <StatusIcon value={row.prepinsta} />
                      {row.prepinsta}
                    </div>
                    <div className="flex items-center gap-2 border-l border-border p-5 text-sm text-muted-foreground">
                      <StatusIcon value={row.internshala} />
                      {row.internshala}
                    </div>
                    <div className="flex items-center gap-2 border-l border-border p-5 text-sm text-muted-foreground">
                      <StatusIcon value={row.unstop} />
                      {row.unstop}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-sm leading-7 text-muted-foreground">
            Longer write-ups:{" "}
            <Link
              href="/blog/best-mock-interview-placement-prep-platforms"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              mock interview platforms compared
            </Link>
            ,{" "}
            <Link
              href="/blog/best-ai-resume-builder-students-india"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              best AI resume builder for students
            </Link>
            , and{" "}
            <Link
              href="/blog/best-free-resume-editor-campus-placements"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              best free resume editor for campus placements
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
