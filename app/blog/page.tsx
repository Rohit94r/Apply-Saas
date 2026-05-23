import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import { blogPostUrl, blogPosts } from "@/lib/blog";
import { absoluteUrl, seoConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Resume and ATS Guides for Indian Students",
  description:
    "Practical resume guides for Indian engineering students, CS freshers, internship seekers, ATS optimization, and job-specific resume tailoring.",
  alternates: {
    canonical: absoluteUrl("/blog")
  },
  openGraph: {
    title: "Resume and ATS Guides for Indian Students",
    description:
      "Practical resume guides for Indian engineering students, CS freshers, internship seekers, ATS optimization, and job-specific resume tailoring.",
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
  inLanguage: "en-IN",
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
              Resume and ATS guides for Indian students.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              Practical advice for engineering students, CS freshers, internship
              seekers, and campus placement applicants who want cleaner,
              ATS-friendly resumes.
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
      </main>
      <Footer />
    </>
  );
}
