import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";

const testimonials = [
  {
    quote:
      "I was applying to internships every night and changing the same resume over and over. Apply made each version specific without making it sound fake.",
    name: "Riya S.",
    role: "Final-year CS student"
  },
  {
    quote:
      "The keyword matching helped me understand what the job post actually wanted. My resume finally looked like it belonged to the role.",
    name: "Dev P.",
    role: "Frontend fresher"
  },
  {
    quote:
      "The interview guide was the surprise win. It connected my project experience to the questions I was actually asked.",
    name: "Ananya K.",
    role: "Software intern"
  }
];

export function Testimonials() {
  return (
    <section className="bg-primary py-24 text-primary-foreground">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Student outcomes"
            title="Built for the messy middle of a real job search."
            description="Apply helps early-career candidates move faster while staying grounded in their actual work."
            tone="light"
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <figure className="h-full rounded-2xl border border-white/15 bg-white/10 p-7">
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
      </div>
    </section>
  );
}
