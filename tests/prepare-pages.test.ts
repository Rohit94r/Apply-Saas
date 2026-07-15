import { describe, it, expect } from "vitest";
import { preparePages } from "@/content/companies";
import type { PreparePage } from "@/content/companies/types";

describe("preparePages (SEO content)", () => {
  it("has at least 20 pages", () => {
    expect(preparePages.length).toBeGreaterThanOrEqual(20);
  });

  it("every page has a unique slug", () => {
    const slugs = preparePages.map((p) => p.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("every page has required fields", () => {
    for (const page of preparePages as PreparePage[]) {
      expect(page.slug.length).toBeGreaterThan(3);
      expect(page.title.length).toBeGreaterThan(10);
      expect(page.description.length).toBeGreaterThan(20);
      expect(page.companyName.length).toBeGreaterThan(0);
      expect(page.targetKeyword.length).toBeGreaterThan(0);
      expect(page.keywords.length).toBeGreaterThan(0);
      expect(page.excerpt.length).toBeGreaterThan(20);
      expect(page.sections.length).toBeGreaterThanOrEqual(3);
      expect(page.primaryCta.href.length).toBeGreaterThan(0);
      expect(page.primaryCta.label.length).toBeGreaterThan(0);
      expect(page.secondaryCtas.length).toBeGreaterThanOrEqual(1);
      expect(page.relatedSlugs.length).toBeGreaterThanOrEqual(1);
      expect(page.publishedAt.length).toBeGreaterThan(0);
      expect(page.updatedAt.length).toBeGreaterThan(0);
      expect(page.readingTime.length).toBeGreaterThan(0);
    }
  });

  it("every page has at least one CTA pointing to a dashboard or signup", () => {
    for (const page of preparePages as PreparePage[]) {
      const allCtas = [page.primaryCta, ...page.secondaryCtas];
      const hasDashboardCta = allCtas.some(
        (cta) =>
          cta.href.startsWith("/dashboard") ||
          cta.href.startsWith("/sign-up") ||
          cta.href.startsWith("/prepare")
      );
      expect(hasDashboardCta).toBe(true);
    }
  });

  it("related slugs reference existing pages", () => {
    const allSlugs = new Set(preparePages.map((p) => p.slug));
    for (const page of preparePages as PreparePage[]) {
      for (const related of page.relatedSlugs) {
        expect(allSlugs.has(related)).toBe(true);
      }
    }
  });

  it("every section has a heading and at least one body paragraph", () => {
    for (const page of preparePages as PreparePage[]) {
      for (const section of page.sections) {
        expect(section.heading.length).toBeGreaterThan(5);
        expect(section.body.length).toBeGreaterThanOrEqual(1);
        expect(section.body[0].length).toBeGreaterThan(20);
      }
    }
  });
});
