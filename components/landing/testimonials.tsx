import { SealCheck } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

const testimonials = [
  {
    quote:
      "The PYQs library saved me during TCS placement prep. I practiced the exact coding patterns that showed up in my NQT OA. Got selected.",
    name: "Rohit J.",
    role: "B.E. IT · Atharva College · TCS selected 2026",
    verified: true
  },
  {
    quote:
      "Mock interview felt real — the AI asked follow-up questions based on my project. Practiced 4 sessions before my Amazon OA and felt confident.",
    name: "Student from Mumbai",
    role: "Final-year CE · Placed at startup",
    verified: true
  },
  {
    quote:
      "I used to paste my resume into ChatGPT and get generic results. Apply actually matched keywords from the JD and showed me what was missing.",
    name: "Apply user",
    role: "Early-career developer · Bengaluru",
    verified: true
  }
];

export function Testimonials() {
  return (
    <section className="bg-primary py-24 text-primary-foreground">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Student outcomes"
            title="Built for the messy middle of a real placement season."
            description="Real users, real placements. Add your story after your first offer — we feature verified student outcomes."
            tone="light"
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <figure className="h-full rounded-2xl border border-white/15 bg-white/10 p-7">
                {testimonial.verified ? (
                  <div className="mb-4 flex items-center gap-1.5 text-xs font-semibold text-[#7fd9c7]">
                    <SealCheck className="h-4 w-4" weight="fill" />
                    Verified user
                  </div>
                ) : null}
                <blockquote className="text-lg leading-8 text-white/90">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="mt-8 text-center text-sm text-white/50">
            Want to be featured here? Share your placement story after your first offer —
            email{' '}
            <a
              href="mailto:rjdhav67@gmail.com"
              className="underline-offset-2 hover:underline"
            >
              rjdhav67@gmail.com
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
