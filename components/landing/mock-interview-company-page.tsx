import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Button } from "@/components/ui/button";
import { absoluteUrl, seoConfig } from "@/lib/seo";
import type { Metadata } from "next";

export type MockInterviewPageLink = {
  href: string;
  label: string;
};

export type MockInterviewCompanyPageProps = {
  /** Absolute metadata title (≤ ~60 chars including brand if included). */
  title: string;
  description: string;
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  hiringNotes: string[];
  sampleQuestions: Array<{
    round: string;
    prompt: string;
    tip?: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedPages: MockInterviewPageLink[];
  relatedGuides: MockInterviewPageLink[];
  ctaLabel?: string;
  softwareName?: string;
};

export function buildMockInterviewPageMetadata(props: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}): Metadata {
  const url = absoluteUrl(props.path);
  return {
    title: {
      absolute: props.title
    },
    description: props.description,
    keywords: props.keywords,
    alternates: {
      canonical: url
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
      title: props.title,
      description: props.description,
      url,
      siteName: seoConfig.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: props.title,
      description: props.description
    }
  };
}

export function MockInterviewCompanyPage({
  title,
  description,
  path,
  h1,
  eyebrow,
  intro,
  hiringNotes,
  sampleQuestions,
  faqs,
  relatedPages,
  relatedGuides,
  ctaLabel = "Start free mock interview",
  softwareName = "Apply Free AI Mock Interview"
}: MockInterviewCompanyPageProps) {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: softwareName,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: absoluteUrl(path),
    description,
    isAccessibleForFree: true,
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Indian students and freshers preparing for campus placements"
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR"
    },
    featureList: [
      "AI voice mock interview",
      "Optional coding rounds",
      "Scored feedback",
      "Company and role targeting"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Mock Interview",
        item: absoluteUrl("/mock-interview")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: h1,
        item: absoluteUrl(path)
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([softwareJsonLd, faqJsonLd, breadcrumbJsonLd])
        }}
      />
      <SiteHeader />
      <main>
        <section className="border-b border-border/70 py-20">
          <div className="section-shell max-w-4xl">
            <p className="fine-label mb-5">{eyebrow}</p>
            <h1 className="font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
              {h1}
            </h1>
            <p className="mt-6 text-base leading-8 text-muted-foreground">{intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard/mock-interview">
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" weight="regular" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/mock-interview">All mock interview options</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pyqs">Browse company PYQs</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b border-border/70 bg-[#fbfaf6] py-16">
          <div className="section-shell max-w-4xl">
            <h2 className="font-serif text-3xl text-primary">Hiring notes</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {hiringNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-3 rounded-xl border border-border bg-white p-4 text-sm leading-6 text-foreground"
                >
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                    weight="fill"
                  />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-border/70 py-16">
          <div className="section-shell max-w-4xl">
            <h2 className="font-serif text-3xl text-primary">Sample interview questions</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Practice these aloud in Apply&apos;s mock interview room — speaking
              beats reading. Pair with PYQs before enabling coding rounds.
            </p>
            <ul className="mt-8 space-y-4">
              {sampleQuestions.map((item) => (
                <li
                  key={item.prompt}
                  className="rounded-xl border border-border/80 bg-[#fbfaf6] px-5 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                    {item.round}
                  </p>
                  <p className="mt-2 text-base font-medium leading-7 text-primary">
                    {item.prompt}
                  </p>
                  {item.tip ? (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Tip: {item.tip}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8">
              <Link href="/dashboard/mock-interview">
                Practice these in a live mock
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="border-b border-border/70 bg-[#fbfaf6] py-16">
          <div className="section-shell max-w-3xl">
            <h2 className="font-serif text-3xl text-primary">Frequently asked questions</h2>
            <ul className="mt-8 space-y-6">
              {faqs.map((item) => (
                <li key={item.question}>
                  <h3 className="text-base font-bold text-primary">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-border/70 py-16">
          <div className="section-shell max-w-3xl">
            <h2 className="font-serif text-3xl text-primary">
              More mock interview pages
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {relatedPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16">
          <div className="section-shell max-w-3xl">
            <h2 className="font-serif text-3xl text-primary">Related guides</h2>
            <ul className="mt-6 space-y-3">
              {relatedGuides.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="text-sm font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    {guide.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              Also browse{" "}
              <Link
                href="/pyqs"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                company PYQs
              </Link>{" "}
              and{" "}
              <Link
                href="/prepare"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                prepare guides
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
      {/* Keep title in DOM for a11y tools that skip JSON-LD */}
      <span className="sr-only">{title}</span>
    </>
  );
}

/** Shared chip/link set for cross-linking subpages. */
export const mockInterviewHubLinks: MockInterviewPageLink[] = [
  { href: "/mock-interview", label: "Mock interview hub" },
  { href: "/mock-interview/software-engineer", label: "Software engineer" },
  { href: "/mock-interview/freshers", label: "Freshers India" },
  { href: "/mock-interview/tcs", label: "TCS" },
  { href: "/mock-interview/infosys", label: "Infosys" },
  { href: "/mock-interview/amazon", label: "Amazon" },
  { href: "/mock-interview/google", label: "Google" },
  { href: "/mock-interview/wipro", label: "Wipro" },
  { href: "/mock-interview/flipkart", label: "Flipkart" },
  { href: "/mock-interview/zomato", label: "Zomato" },
  { href: "/mock-interview/microsoft", label: "Microsoft" },
  { href: "/mock-interview/razorpay", label: "Razorpay" },
  { href: "/mock-interview/phonepe", label: "PhonePe" },
  { href: "/mock-interview/swiggy", label: "Swiggy" }
];

export function relatedMockInterviewPages(excludePath: string) {
  return mockInterviewHubLinks.filter((link) => link.href !== excludePath);
}
