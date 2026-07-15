import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import { blogPostUrl, blogPosts } from "@/lib/blog";
import { preparePages } from "@/lib/prepare";
import { absoluteUrl, seoConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Placement Guides — PYQs, Mock Interviews, ATS Resumes | Apply",
  description:
    "Guides for Indian campus placements: company previous year coding questions, AI mock interview practice, ATS resume tips, and fresher resume formats.",
  keywords: [
    "previous year coding questions",
    "mock interview practice online",
    "ATS resume tips India",
    "campus placement prep"
  ],
  alternates: {
    canonical: absoluteUrl("/blog")
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  openGraph: {
    title: "Placement Guides — PYQs, Mock Interviews, ATS Resumes | Apply",
    description:
      "Guides for Indian campus placements: company previous year coding questions, AI mock interview practice, ATS resume tips, and fresher resume formats.",
    url: absoluteUrl("/blog"),
    siteName: seoConfig.name,
    type: "website"
  }
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Apply Resume Guides",
  url: absoluteUrl("/blog"),
  inLanguage: "en",
  publisher: {
    "@id": absoluteUrl("/#organization")
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: blogPostUrl(post),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt
  }))
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <SiteHeader />
      <main>
        <section className="border-b border-border/70 py-20">
          <div className="section-shell">
            <p className="fine-label mb-5">Resume guides</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
              Resume and ATS guides for students worldwide.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              Practical advice for engineering students, interns, and early-career
              applicants who want cleaner, ATS-friendly resumes — wherever you are applying.
            </p>
          </div>
        </section>

        <section className="bg-[#f7f4ee] py-16">
          <div className="section-shell grid gap-5 md:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-soft"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                    {post.category}
                  </span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-5 text-2xl font-bold leading-8 text-primary">
                  <Link href={`/blog/${post.slug}`} className="transition hover:text-accent">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Target keyword: {post.targetKeyword}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
                  >
                    Read guide
                    <ArrowRight className="h-4 w-4" weight="regular" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-16">
          <div className="section-shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="fine-label mb-3">Company prep</p>
                <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] text-primary">
                  Placement guides by company.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                  Interview questions, OA patterns, and resume formats for TCS,
                  Amazon, Infosys, and more — then continue inside Apply.
                </p>
              </div>
              <Link
                href="/prepare"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
              >
                View all company guides
                <ArrowRight className="h-4 w-4" weight="regular" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {preparePages.slice(0, 6).map((page) => (
                <Link
                  key={page.slug}
                  href={`/prepare/${page.slug}`}
                  className="rounded-xl border border-border bg-[#fbfaf6] p-5 transition hover:border-accent/40"
                >
                  <p className="text-xs font-semibold text-accent">
                    {page.companyName}
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-primary">
                    {page.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
