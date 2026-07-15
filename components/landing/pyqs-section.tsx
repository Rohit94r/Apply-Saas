import Link from "next/link";
import { ArrowRight, Code, Microphone } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/animations/reveal";
import { allCompanyGuides, totalCompanyCount } from "@/lib/data/coding-questions";

const featuredCompanies = [
  "TCS",
  "Infosys",
  "Amazon",
  "Google",
  "Microsoft",
  "Flipkart",
  "Zoho",
  "Accenture",
  "Wipro",
  "JP Morgan",
  "Goldman Sachs",
  "Deloitte"
];

export function PyqsSection() {
  const sample = allCompanyGuides.slice(0, 12);

  return (
    <section id="pyqs" className="border-y border-border/70 bg-white py-24">
      <div className="section-shell">
        <Reveal>
          <p className="fine-label mb-5">Company PYQs Library</p>
          <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] text-primary sm:text-5xl">
            Previous year coding questions from {totalCompanyCount}+ companies.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Curated OA and coding round PYQs from real candidate reports, campus
            drives, and hiring challenges — with approach hints and hiring-process
            breakdowns. Search by company: TCS, Amazon, Infosys, Zoho, Google, and more.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {featuredCompanies.map((name) => (
              <li
                key={name}
                className="rounded-full border border-border bg-[#fbfaf6] px-3 py-1.5 text-xs font-semibold text-foreground"
              >
                {name} PYQs
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sample.map((guide) => (
              <Link
                key={guide.slug}
                href={`/pyqs#${guide.slug}`}
                className="rounded-xl border border-border bg-[#fbfaf6] p-4 transition hover:border-primary/30 hover:shadow-soft"
              >
                <p className="text-sm font-bold text-primary">{guide.company}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                  {guide.guideTitle}
                </p>
                <p className="mt-2 text-[11px] font-semibold text-accent">{guide.roles}</p>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/pyqs"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <Code className="h-4 w-4" weight="regular" />
              Open PYQs library
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
            <Link
              href="/mock-interview"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
            >
              <Microphone className="h-4 w-4" weight="regular" />
              Practice with AI mock interview
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
