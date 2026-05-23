import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { seoFaqs } from "@/lib/seo";

export function FaqSection() {
  return (
    <section id="faq" className="border-y border-border/70 bg-white/55 py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Answers before students upload a resume."
            description="Clear details for Indian engineering students, CS freshers, and internship seekers comparing resume builders and ATS tools."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {seoFaqs.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.03}>
              <article className="h-full rounded-xl border border-border bg-[#fbfaf6] p-5">
                <h3 className="text-base font-bold text-primary">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
