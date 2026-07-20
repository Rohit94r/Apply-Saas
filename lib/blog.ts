/**
 * Blog helpers — post content is in content/blog/posts.ts (edit SEO there).
 */
import { absoluteUrl } from "@/lib/seo";
import { blogPosts, type BlogPost } from "@/content/blog/posts";

export type { BlogPost };
export { blogPosts };

const MAX_METADATA_TITLE_LENGTH = 60;

/**
 * Keep search titles concise without changing the article's reader-facing H1.
 * Truncation happens at a word boundary and metadata uses an absolute title,
 * so the root layout does not append another brand suffix.
 */
export function blogMetadataTitle(post: BlogPost) {
  if (post.title.length <= MAX_METADATA_TITLE_LENGTH) {
    return post.title;
  }

  const shortened = post.title.slice(0, MAX_METADATA_TITLE_LENGTH - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const titleStem =
    lastSpace > 40 ? shortened.slice(0, lastSpace) : shortened;

  return `${titleStem.trim()}…`;
}

export const featuredBlogPosts = [...blogPosts]
  .sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
  .slice(0, 3);

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function blogPostUrl(post: BlogPost) {
  return absoluteUrl(`/blog/${post.slug}`);
}
