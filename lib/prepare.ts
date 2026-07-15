/**
 * Prepare / company SEO page helpers.
 * Content lives in content/companies/ — edit there.
 */

import { preparePages, type PreparePage } from "@/content/companies";
import { absoluteUrl } from "@/lib/seo";

export type { PreparePage };
export { preparePages };

export function getPreparePage(slug: string): PreparePage | undefined {
  return preparePages.find((page) => page.slug === slug);
}

export function preparePageUrl(page: PreparePage) {
  return absoluteUrl(`/prepare/${page.slug}`);
}

export function getRelatedPreparePages(page: PreparePage): PreparePage[] {
  return page.relatedSlugs
    .map((slug) => getPreparePage(slug))
    .filter((related): related is PreparePage => Boolean(related));
}

export const prepareCategoryLabel: Record<PreparePage["category"], string> = {
  interview: "Interview prep",
  resume: "Resume format",
  oa: "Online assessment",
  process: "Hiring process",
  internship: "Internship",
  experience: "Interview experience",
  aptitude: "Aptitude"
};
