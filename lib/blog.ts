/**
 * Blog helpers — post content is in content/blog/posts.ts (edit SEO there).
 */
import { absoluteUrl } from "@/lib/seo";
import { blogPosts, type BlogPost } from "@/content/blog/posts";

export type { BlogPost };
export { blogPosts };

export const featuredBlogPosts = blogPosts.slice(0, 3);

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function blogPostUrl(post: BlogPost) {
  return absoluteUrl(`/blog/${post.slug}`);
}
