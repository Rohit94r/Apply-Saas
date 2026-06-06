import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

const guideRows = [
  {
    title: "Company Research",
    detail: "Product engineering team shipping SaaS dashboards with React, Node.js, and cloud APIs."
  },
  {
    title: "Likely Interview Questions",
    detail: "How did you design a full-stack feature from API to UI in your college project?"
  },
  {
    title: "Your Strengths for This Role",
    detail: "React, TypeScript, REST APIs, and end-to-end delivery on student-facing products."
  },
  {
    title: "Technical Topics to Prepare",
    detail: "Node.js basics, database design, authentication, and system design for junior roles."
  }
];

export function InterviewPrepSection() {
  return (
    <section className="surface-warm border-y border-border/70 py-24">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1fr]">
        <Reveal>
          <p className="fine-label mb-5">Interview Preparation</p>
          <h2 className="font-serif text-5xl leading-[1.03] text-primary sm:text-6xl">
            Interview guides built from the resume you actually sent.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
            Most interview prep is generic. Apply generates a guide from the exact job
            description, company, master profile, and tailored resume — so Rohit Jadhav
            walks in ready for Full Stack Developer questions, not random LeetCode lists.
          </p>
          <Button asChild className="mt-8">
            <Link href="/dashboard/interview">Get your first guide free</Link>
          </Button>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <div className="border-b border-border p-6">
              <p className="fine-label mb-3 text-primary/70">Your guide</p>
              <h3 className="text-lg font-semibold text-foreground">Full Stack Developer</h3>
              <p className="text-sm text-muted-foreground">
                Rohit Jadhav · Internship · Remote / Hybrid
              </p>
            </div>
            {guideRows.map((row) => (
              <div
                key={row.title}
                className="flex items-center justify-between gap-5 border-b border-border p-5 last:border-b-0"
              >
                <div>
                  <p className="text-sm font-semibold text-primary">{row.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{row.detail}</p>
                </div>
                <CaretDown className="h-4 w-4 shrink-0 text-muted-foreground" weight="regular" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
