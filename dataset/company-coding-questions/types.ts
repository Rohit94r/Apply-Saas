/**
 * Dataset — Company-wise Previous Year Coding Questions
 *
 * Extracted from: https://docs.google.com/document/d/1JFyZTIxCKj6Q2UJTOmA3lvhmI99etfBtnsSxCeDX4-o
 * Curated by: Let's Code (lets-code.co.in) / Om Kute
 * Research & extraction by: Rohit Jadhav (apply.neexmeet.com)
 *
 * Raw JSON: dataset/company-coding-questions/raw-data.json
 * Re-exported from: content/coding-questions/index.ts for app imports.
 */

export type CompanyCategory =
  | "product-tech"
  | "bfsi-consulting"
  | "it-services";

export type CompanyCodingGuide = {
  slug: string;
  company: string;
  guideTitle: string;
  url: string;
  roles: string;
  category: CompanyCategory;
};

export type CodingResourceLink = {
  label: string;
  url: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type DatasetSource = {
  documentUrl: string;
  documentId: string;
  title: string;
  curatedBy: string;
  authorEmail: string;
  authorSocial: SocialLink[];
  extractedBy: string;
  extractedAt: string;
  copyright: string;
};

export type CompanyCategoryGroup = {
  id: CompanyCategory;
  label: string;
  icon: string;
  companies: CompanyCodingGuide[];
};

export type CompanyCodingQuestionsDataset = {
  source: DatasetSource;
  description: string;
  categories: CompanyCategoryGroup[];
  additionalResources: CodingResourceLink[];
  usageGuide: string[];
};
