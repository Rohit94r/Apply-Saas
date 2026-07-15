import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowSquareOut } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import {
  allCompanyGuides,
  companyCategories,
  totalCompanyCount
} from "@/lib/data/coding-questions";
import { absoluteUrl, seoConfig } from "@/lib/seo";

const title =
  "Company Previous Year Coding Questions (PYQs) — 64+ Guides | Apply";
const description =
  "Free previous year coding question papers and OA PYQs from 64+ companies — TCS, Infosys, Amazon, Google, Zoho, Flipkart, Goldman Sachs, Deloitte, and more. Approach hints + hiring process for Indian campus placements.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "previous year coding questions",
    "company previous year question paper",
    "TCS previous year coding questions",
    "Infosys previous year coding questions",
    "Amazon OA previous year questions",
    "campus placement coding PYQs",
    "online assessment previous year papers",
    "Zoho previous year coding questions",
    "Google previous year coding questions",
    "placement previous year question paper"
  ],
  alternates: {
    canonical: absoluteUrl("/pyqs")
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/pyqs"),
    siteName: seoConfig.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Company Previous Year Coding Questions (PYQs)",
  description,
  url: absoluteUrl("/pyqs"),
  inLanguage: "en-IN",
  isPartOf: {
    "@id": absoluteUrl("/#website")
  },
  about: [
    "Previous year coding questions",
    "Campus placement OA",
    "Company coding interviews"
  ],
  numberOfItems: totalCompanyCount,
  publisher: {
    "@id": absoluteUrl("/#organization")
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: totalCompanyCount,
    itemListElement: allCompanyGuides.slice(0, 40).map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.guideTitle,
      url: guide.url,
      description: `${guide.company} previous year coding questions for ${guide.roles}`
    }))
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are company previous year coding questions (PYQs)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PYQs are coding and online assessment (OA) problems reported from real campus drives and interviews. Apply's library links you to company-wise guides with OA patterns, approach hints, and hiring process notes for 64+ companies."
      }
    },
    {
      "@type": "Question",
      name: "Which companies have previous year coding question papers here?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Product companies like Google, Amazon, Microsoft, Flipkart, and Zoho; IT services like TCS, Infosys, Wipro, and Cognizant; and BFSI firms like Goldman Sachs, JP Morgan, and Deloitte — plus many more."
      }
    },
    {
      "@type": "Question",
      name: "How should I use PYQs for campus placements?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pick your target company, read the hiring process first, then solve OA questions under timed conditions. Attempt each problem yourself before reading approach hints. Pair PYQs with Apply's AI mock interview for speaking practice."
      }
    }
  ]
};

export default function PyqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionJsonLd, faqJsonLd])
        }}
      />
      <SiteHeader />
      <main>
        <section className="border-b border-border/70 py-20">
          <div className="section-shell">
            <p className="fine-label mb-5">Company PYQs Library</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
              Previous year coding questions from {totalCompanyCount}+ companies.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
              Search-optimized library of company previous year question papers
              for Indian placements — OA coding rounds, approach hints, and hiring
              process breakdowns. Use these PYQs with Apply&apos;s mock interview
              and resume tailor tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard/interview"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
              >
                Open interactive library in dashboard
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
              <Link
                href="/mock-interview"
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition hover:text-primary"
              >
                Practice AI mock interview
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </div>
          </div>
        </section>

        {companyCategories.map((category) => {
          const guides = allCompanyGuides.filter((g) => g.category === category.id);
          return (
            <section
              key={category.id}
              className="border-b border-border/70 py-14"
            >
              <div className="section-shell">
                <h2 className="font-serif text-3xl text-primary">{category.label}</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  {category.companies.length} company previous year coding
                  question guides
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {guides.map((guide) => (
                    <li key={guide.slug} id={guide.slug}>
                      <a
                        href={guide.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-full flex-col rounded-xl border border-border bg-[#fbfaf6] p-4 transition hover:border-primary/30 hover:shadow-soft"
                      >
                        <span className="text-base font-bold text-primary">
                          {guide.company}
                        </span>
                        <span className="mt-1 text-sm leading-6 text-muted-foreground">
                          {guide.guideTitle}
                        </span>
                        <span className="mt-3 text-xs font-semibold text-accent">
                          {guide.roles}
                        </span>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                          Open previous year questions
                          <ArrowSquareOut className="h-3.5 w-3.5" weight="regular" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}

        <section className="py-16">
          <div className="section-shell max-w-3xl">
            <h2 className="font-serif text-3xl text-primary">
              How to use PYQs for placement prep
            </h2>
            <ol className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <li>
                1. Shortlist companies on{" "}
                <Link href="/dashboard/interview" className="font-semibold text-primary underline-offset-2 hover:underline">
                  Interview prep
                </Link>
                .
              </li>
              <li>
                2. Open that company&apos;s previous year coding question guide and
                study the hiring process first.
              </li>
              <li>
                3. Solve OA questions under a 60–90 minute timer before reading hints.
              </li>
              <li>
                4. Rehearse aloud in an{" "}
                <Link href="/mock-interview" className="font-semibold text-primary underline-offset-2 hover:underline">
                  AI mock interview
                </Link>
                {" "}with coding difficulty matched to your target.
              </li>
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
