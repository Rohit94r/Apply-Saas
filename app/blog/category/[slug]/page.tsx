import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/landing/footer";
import { SiteHeader } from "@/components/landing/site-header";
import {
  blogCategories,
  blogCategoryUrl,
  type BlogCategory
} from "@/content/blog/categories";
import { blogPosts } from "@/lib/blog";
import { absoluteUrl, seoConfig } from "@/lib/seo";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

function postsInCategory(category: BlogCategory) {
  return blogPosts
    .filter((post) => category.matchCategories.includes(post.category))
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
}

export function generateStaticParams() {
  return blogCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = blogCategories.find((item) => item.slug === slug);

  if (!category) {
    return {};
  }

  const url = absoluteUrl(blogCategoryUrl(category.slug));

  return {
    title: {
      absolute: `${category.name}: Guides for Students | Apply`
    },
    description: category.description,
    keywords: category.keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `${category.name} — ${category.tagline} | Apply`,
      description: category.description,
      url,
      siteName: seoConfig.name,
      type: "website"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true }
    }
  };
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = blogCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = postsInCategory(category);
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} guides`,
    description: category.description,
    url: absoluteUrl(blogCategoryUrl(category.slug)),
    isPartOf: {
      "@id": absoluteUrl("/#website")
    },
    mainEntity: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt
    }))
  };

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
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
            >
              <ArrowRight className="h-4 w-4 rotate-180" weight="regular" />
              Back to guides
            </Link>
            <p className="fine-label mb-5">{category.tagline}</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] text-primary sm:text-6xl">
              {category.name} guides.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
              {category.description}
            </p>
          </div>
        </section>

        <section className="bg-[#f7f4ee] py-16">
          <div className="section-shell">
            {posts.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {posts.map((post) => (
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
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition hover:text-accent"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <time
                        dateTime={post.updatedAt}
                        className="text-xs font-semibold text-muted-foreground"
                      >
                        Updated {post.updatedAt}
                      </time>
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
            ) : (
              <p className="text-base leading-8 text-muted-foreground">
                Guides in this category are being prepared.
              </p>
            )}
          </div>
        </section>

        <section className="border-t border-border py-16">
          <div className="section-shell">
            <p className="fine-label mb-4">Explore more categories</p>
            <div className="flex flex-wrap gap-3">
              {blogCategories
                .filter((item) => item.slug !== category.slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={blogCategoryUrl(item.slug)}
                    className="rounded-full border border-border bg-[#fbfaf6] px-4 py-2 text-sm font-semibold text-primary transition hover:border-accent/50 hover:text-accent"
                  >
                    {item.name}
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
