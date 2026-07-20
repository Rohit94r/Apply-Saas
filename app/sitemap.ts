import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { preparePages } from "@/lib/prepare";
import { absoluteUrl, seoConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestBlogUpdate = new Date(
    Math.max(...blogPosts.map((post) => new Date(post.updatedAt).getTime()))
  );
  const latestPrepareUpdate = new Date(
    Math.max(...preparePages.map((page) => new Date(page.updatedAt).getTime()))
  );
  const publicRouteUpdates: Record<string, Date> = {
    "/": new Date("2026-07-19"),
    "/blog": latestBlogUpdate,
    "/prepare": latestPrepareUpdate,
    "/pyqs": new Date("2026-07-19"),
    "/mock-interview": new Date("2026-07-19")
  };
  const publicRoutes = seoConfig.publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: publicRouteUpdates[route],
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.9
  }));
  const blogRoutes = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75
  }));
  const prepareRoutes = preparePages.map((page) => ({
    url: absoluteUrl(`/prepare/${page.slug}`),
    lastModified: new Date(page.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  return [...publicRoutes, ...blogRoutes, ...prepareRoutes];
}

/** Refresh daily to expose real content dates from the data modules. */
export const revalidate = 86_400;
