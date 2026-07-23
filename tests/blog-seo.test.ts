import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { blogMetadataTitle, blogPostUrl, blogPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

describe("blog SEO", () => {
  it("uses unique, non-empty slugs", () => {
    const slugs = blogPosts.map((post) => post.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))).toBe(true);
  });

  it("keeps generated metadata titles within 60 characters", () => {
    for (const post of blogPosts) {
      const title = blogMetadataTitle(post);

      expect(title.length, `${post.slug}: ${title}`).toBeLessThanOrEqual(60);
      expect(title.length, post.slug).toBeGreaterThan(30);
    }
  });

  it("uses valid publication dates and update order", () => {
    for (const post of blogPosts) {
      const publishedAt = Date.parse(post.publishedAt);
      const updatedAt = Date.parse(post.updatedAt);

      expect(Number.isNaN(publishedAt), post.slug).toBe(false);
      expect(Number.isNaN(updatedAt), post.slug).toBe(false);
      expect(updatedAt, post.slug).toBeGreaterThanOrEqual(publishedAt);
    }
  });

  it("includes every post in the sitemap", () => {
    const sitemapUrls = new Set(sitemap().map((entry) => entry.url));

    for (const post of blogPosts) {
      expect(sitemapUrls.has(blogPostUrl(post)), post.slug).toBe(true);
    }
  });

  it("includes mock interview hub and company subpages in the sitemap", () => {
    const sitemapUrls = new Set(sitemap().map((entry) => entry.url));
    const required = [
      "/mock-interview",
      "/mock-interview/software-engineer",
      "/mock-interview/freshers",
      "/mock-interview/tcs",
      "/mock-interview/infosys",
      "/mock-interview/amazon"
    ];

    for (const path of required) {
      expect(sitemapUrls.has(absoluteUrl(path)), path).toBe(true);
    }
  });

  it("uses valid internal workflow links", () => {
    for (const post of blogPosts) {
      for (const link of post.workflowLinks ?? []) {
        expect(link.href.startsWith("/"), `${post.slug}: ${link.href}`).toBe(true);
        expect(link.label.trim().length, post.slug).toBeGreaterThan(3);
      }
    }
  });
});
