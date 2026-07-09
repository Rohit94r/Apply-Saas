import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { absoluteUrl, seoConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const publicRoutes = seoConfig.publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? ("weekly" as const) : ("daily" as const),
    priority: route === "/" ? 1 : 0.9
  }));
  const blogRoutes = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75
  }));

  return [...publicRoutes, ...blogRoutes];
}

/** Refresh sitemap daily so Google sees updated lastmod dates. */
export const revalidate = 86_400;
