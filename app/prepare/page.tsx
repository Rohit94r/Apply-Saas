import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import {
  prepareCategoryLabel,
  preparePages,
  preparePageUrl
} from "@/lib/prepare";
import { absoluteUrl, seoConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Company Prep Guides — Interview, OA & Resume",
  description:
    "India placement preparation guides for TCS, Infosys, Amazon, Capgemini, Microsoft, Google, Wipro, Cognizant, Accenture, Morgan Stanley, JPMorgan, Deloitte, and Flipkart.",
  alternates: {
    canonical: absoluteUrl("/prepare")
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  openGraph: {
    title: "Company Prep Guides — Interview, OA & Resume",
    description:
      "Practical company prep pages for Indian campus and off-campus placement — then tailor, interview, and apply inside Apply.",
    url: absoluteUrl("/prepare"),
    siteName: seoConfig.name,
    type: "website"
  }
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Company Prep Guides",
  url: absoluteUrl("/prepare"),
  inLanguage: "en-IN",
  publisher: {
    "@id": absoluteUrl("/#organization")
  },
  hasPart: preparePages.map((page) => ({
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: preparePageUrl(page)
  }))
};

export default function PrepareIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <SiteHeader />
      <main>
        <section className="border-b border-border/70 py-20">
          <div className="section-shell">
            <p className="fine-label mb-5">Placement prep</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
              Company prep guides for Indian placements.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              Interview questions, OA patterns, resume formats, and hiring
              processes — written for campus and early-career India. Each guide
              links into Tailor, Interview, and Jobs inside Apply.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard/generate"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
              >
                Tailor a resume
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
              <Link
                href="/dashboard/interview"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
              >
                Interview prep
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
              <Link
                href="/dashboard/jobs"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
              >
                Browse jobs
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
              <Link
                href="/dashboard/mock-interview"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
              >
                Mock interview
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f4ee] py-16">
          <div className="section-shell">
            <ul className="divide-y divide-border border-y border-border">
              {preparePages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/prepare/${page.slug}`}
                    className="group flex flex-col gap-2 py-5 transition hover:bg-white/50 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-muted-foreground">
                        {prepareCategoryLabel[page.category]} · {page.companyName} ·{" "}
                        {page.readingTime}
                      </p>
                      <h2 className="mt-1 font-serif text-2xl text-primary transition group-hover:text-accent">
                        {page.title}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                        {page.description}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-primary">
                      Open guide
                      <ArrowRight className="h-4 w-4" weight="regular" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
