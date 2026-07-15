import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import {
  getCompanyQuestionBank,
  type InterviewQuestion
} from "@/lib/data/companies";
import {
  getPreparePage,
  getRelatedPreparePages,
  prepareCategoryLabel,
  preparePages,
  preparePageUrl
} from "@/lib/prepare";
import { absoluteUrl, seoConfig } from "@/lib/seo";

type PreparePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return preparePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params
}: PreparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPreparePage(slug);

  if (!page) {
    return {};
  }

  const url = absoluteUrl(`/prepare/${page.slug}`);

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: seoConfig.name,
      type: "article",
      publishedTime: page.publishedAt,
      modifiedTime: page.updatedAt
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description
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
    }
  };
}

function QuestionList({
  title,
  questions
}: {
  title: string;
  questions: InterviewQuestion[];
}) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-3xl font-bold leading-9 text-primary">{title}</h2>
      <ul className="mt-5 space-y-4">
        {questions.map((item) => (
          <li
            key={`${item.round}-${item.prompt}`}
            className="rounded-lg border border-border/80 bg-[#fbfaf6] px-4 py-3"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              {item.round}
              {item.difficulty ? ` · ${item.difficulty}` : ""}
            </p>
            <p className="mt-2 text-base font-medium leading-7 text-primary">
              {item.prompt}
            </p>
            {item.hint ? (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Hint: {item.hint}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function PrepareSlugPage({ params }: PreparePageProps) {
  const { slug } = await params;
  const page = getPreparePage(slug);

  if (!page) {
    notFound();
  }

  const related = getRelatedPreparePages(page);
  const bank = page.questionBankKey
    ? getCompanyQuestionBank(page.questionBankKey)
    : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    url: preparePageUrl(page),
    datePublished: page.publishedAt,
    dateModified: page.updatedAt,
    inLanguage: "en-IN",
    author: {
      "@type": "Organization",
      name: seoConfig.name,
      url: seoConfig.url
    },
    publisher: {
      "@id": absoluteUrl("/#organization")
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": preparePageUrl(page)
    },
    keywords: page.keywords
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
        name: "Company Prep Guides",
        item: absoluteUrl("/prepare")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.companyName,
        item: preparePageUrl(page)
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd]) }}
      />
      <SiteHeader />
      <main>
        <article>
          <header className="border-b border-border/70 py-20">
            <div className="section-shell">
              <Link
                href="/prepare"
                className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" weight="regular" />
                All company guides
              </Link>
              <p className="fine-label mb-5">
                {prepareCategoryLabel[page.category]} · {page.companyName}
              </p>
              <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
                {page.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
                {page.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-muted-foreground">
                <span>{page.readingTime}</span>
                <span>Updated {page.updatedAt}</span>
                <span>Target: {page.targetKeyword}</span>
              </div>
            </div>
          </header>

          <div className="section-shell grid gap-10 py-16 lg:grid-cols-[0.72fr_0.28fr]">
            <div className="space-y-10">
              <p className="text-lg leading-8 text-foreground">{page.excerpt}</p>
              {page.sections.map((section) => (
                <section key={section.heading} className="border-t border-border pt-8">
                  <h2 className="text-3xl font-bold leading-9 text-primary">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="text-base leading-8 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-muted-foreground">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              {bank ? (
                <QuestionList
                  title={`${page.companyName} question bank`}
                  questions={bank.questions}
                />
              ) : null}

              {related.length > 0 ? (
                <section className="border-t border-border pt-8">
                  <h2 className="text-3xl font-bold leading-9 text-primary">
                    Related prep guides
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/prepare/${item.slug}`}
                          className="text-base font-semibold text-primary transition hover:text-accent"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-border bg-[#fbfaf6] p-5">
                <p className="fine-label text-accent">Prepare in Apply</p>
                <h2 className="mt-4 text-xl font-bold text-primary">
                  {page.primaryCta.label}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Use this guide as context, then practise with your real resume
                  and a live job description — Tailor, Interview, and Jobs stay
                  in one account.
                </p>
                <Link
                  href={page.primaryCta.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
                >
                  {page.primaryCta.label}
                  <ArrowRight className="h-4 w-4" weight="regular" />
                </Link>
              </div>

              {page.secondaryCtas.map((cta) => (
                <div
                  key={cta.href + cta.label}
                  className="rounded-xl border border-border bg-white p-5"
                >
                  <Link
                    href={cta.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
                  >
                    {cta.label}
                    <ArrowRight className="h-4 w-4" weight="regular" />
                  </Link>
                </div>
              ))}
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
