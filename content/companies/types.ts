/**
 * Company / placement SEO pages — edit copy in pages.ts.
 * Routes: /prepare, /prepare/[slug].
 */

export type PreparePageCategory =
  | "interview"
  | "resume"
  | "oa"
  | "process"
  | "internship"
  | "experience"
  | "aptitude";

export type PrepareCta = {
  label: string;
  href: string;
};

export type PrepareSection = {
  heading: string;
  body: string[];
  /** Optional scannable list under the paragraphs */
  bullets?: string[];
};

export type PreparePage = {
  slug: string;
  title: string;
  description: string;
  /** Matches `id` in lib/data/companies.ts when available */
  companyId: string;
  companyName: string;
  category: PreparePageCategory;
  targetKeyword: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  excerpt: string;
  sections: PrepareSection[];
  /** Optional key into company question banks */
  questionBankKey?: string;
  primaryCta: PrepareCta;
  secondaryCtas: PrepareCta[];
  relatedSlugs: string[];
};
