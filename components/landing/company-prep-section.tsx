import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/animations/reveal";
import { preparePages } from "@/lib/prepare";

const featured = preparePages.slice(0, 8);

export function CompanyPrepSection() {
  return (
    <section id="company-prep" className="border-y border-border/70 bg-[#f7f4ee] py-24">
      <div className="section-shell">
        <Reveal>
          <p className="fine-label mb-5">Company placement prep</p>
          <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] text-primary sm:text-5xl">
            Prepare for the companies that hire on campus.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Free guides for interview questions, OA patterns, and resume formats —
            then jump into Tailor or Interview prep inside Apply.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border/70 pt-8">
            {featured.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/prepare/${page.slug}`}
                  className="text-base font-semibold text-primary underline-offset-4 transition hover:text-accent hover:underline"
                >
                  {page.companyName}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/prepare"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
            >
              Browse all company guides
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
            <Link
              href="/dashboard/generate"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-primary"
            >
              Tailor a resume for a JD
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
