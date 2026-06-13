import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { featuredBlogPosts } from "@/lib/blog";

export function BlogPreviewSection() {
  return (
    <section className="bg-[#f7f4ee] py-24">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Resume guides"
              title="Practical advice for student resumes and internships."
              description="Guides for ATS resumes, entry-level formats, internship mistakes, and job-specific tailoring."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-accent"
            >
              Read all guides
              <ArrowRight className="h-4 w-4" weight="regular" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featuredBlogPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.08}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-white p-6 shadow-soft">
                <p className="fine-label text-accent">{post.category}</p>
                <h3 className="mt-4 text-xl font-bold leading-7 text-primary">
                  <Link href={`/blog/${post.slug}`} className="transition hover:text-accent">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between gap-3 text-xs font-semibold text-muted-foreground">
                  <span>{post.readingTime}</span>
                  <span>{post.targetKeyword}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
