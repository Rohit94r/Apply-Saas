import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import {
  blogMetadataTitle,
  blogPostUrl,
  blogPosts,
  getBlogPost
} from "@/lib/blog";
import { absoluteUrl, seoConfig } from "@/lib/seo";
import {
  getBlogCategoryByPostCategory,
  blogCategoryUrl
} from "@/content/blog/categories";

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
  const image = absoluteUrl(`/blog/${post.slug}/opengraph-image`);

  return {
    title: {
      absolute: blogMetadataTitle(post)
    },
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
      modifiedTime: post.updatedAt,
      images: [{ url: image, alt: post.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image]
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
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
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
    isPartOf: {
      "@id": absoluteUrl("/#website")
    },
    keywords: post.keywords
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
        name: "Placement Guides",
        item: absoluteUrl("/blog")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: getBlogCategoryByPostCategory(post.category)
          ? absoluteUrl(
              blogCategoryUrl(
                getBlogCategoryByPostCategory(post.category)!.slug
              )
            )
          : absoluteUrl("/blog")
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: blogPostUrl(post)
      }
    ]
  };

  const faqJsonLd = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.answer
          }
        }))
      }
    : null;
  const relatedPosts = blogPosts
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        (candidate.category === post.category ||
          post.workflowLinks?.some(
            (link) => link.href === `/blog/${candidate.slug}`
          ))
    )
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd
              ? [articleJsonLd, breadcrumbJsonLd, faqJsonLd]
              : [articleJsonLd, breadcrumbJsonLd]
          )
        }}
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
                <time dateTime={post.updatedAt}>Updated {post.updatedAt}</time>
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
              {post.workflowLinks?.length ? (
                <section className="border-t border-border pt-8">
                  <h2 className="text-3xl font-bold leading-9 text-primary">
                    Continue this workflow
                  </h2>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">
                    Put the guide into practice with the most relevant tools and
                    supporting resources.
                  </p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {post.workflowLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border bg-[#fbfaf6] p-4 text-sm font-bold text-primary transition hover:border-accent/50 hover:text-accent"
                        >
                          {link.label}
                          <ArrowRight className="h-4 w-4 shrink-0" weight="regular" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {relatedPosts.length ? (
                <section className="border-t border-border pt-8">
                  <h2 className="text-3xl font-bold leading-9 text-primary">
                    Related guides
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {relatedPosts.map((relatedPost) => (
                      <li key={relatedPost.slug}>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="inline-flex items-center gap-2 font-semibold text-primary transition hover:text-accent"
                        >
                          {relatedPost.title}
                          <ArrowRight className="h-4 w-4 shrink-0" weight="regular" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border border-border bg-[#fbfaf6] p-5">
                <p className="fine-label text-accent">Apply faster</p>
                <h2 className="mt-4 text-xl font-bold text-primary">
                  Continue in Apply.
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Use the product workflow that supports this guide, or upload a
                  resume and tailor it to a real job description.
                </p>
                <Link
                  href={post.workflowLinks?.[0]?.href ?? "/dashboard/generate"}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
                >
                  {post.workflowLinks?.[0]?.label ?? "Build free resume"}
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
