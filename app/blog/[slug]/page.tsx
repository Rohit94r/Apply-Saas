import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import { blogPostUrl, blogPosts, getBlogPost } from "@/lib/blog";
import { absoluteUrl, seoConfig } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: seoConfig.name,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: blogPostUrl(post),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
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
      "@id": blogPostUrl(post)
    },
    keywords: post.keywords
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteHeader />
      <main>
        <article>
          <header className="border-b border-border/70 py-20">
            <div className="section-shell">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
              >
                <ArrowLeft className="h-4 w-4" weight="regular" />
                Back to guides
              </Link>
              <p className="fine-label mb-5">{post.category}</p>
              <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-muted-foreground">
                <span>{post.readingTime}</span>
                <span>Updated {post.updatedAt}</span>
                <span>Target keyword: {post.targetKeyword}</span>
              </div>
            </div>
          </header>

          <div className="section-shell grid gap-10 py-16 lg:grid-cols-[0.72fr_0.28fr]">
            <div className="space-y-10">
              <p className="text-lg leading-8 text-foreground">{post.excerpt}</p>
              {post.sections.map((section) => (
                <section key={section.heading} className="border-t border-border pt-8">
                  <h2 className="text-3xl font-bold leading-9 text-primary">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-border bg-[#fbfaf6] p-5">
                <p className="fine-label text-accent">Apply faster</p>
                <h2 className="mt-4 text-xl font-bold text-primary">
                  Turn this guide into a tailored resume.
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Upload your current resume, paste a job description, and review
                  an ATS-optimized version before downloading.
                </p>
                <Link
                  href="/dashboard/generate"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
                >
                  Build free resume
                  <ArrowRight className="h-4 w-4" weight="regular" />
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
