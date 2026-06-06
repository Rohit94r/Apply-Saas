/**
 * Shared helpers for normalizing live API job rows into `JobListing`.
 */

import type {
  ExperienceBand,
  JobDataProvider,
  JobListing,
  JobListingPlatform
} from "@/features/jobs/types";

export function buildListingId(provider: JobDataProvider, externalId: string) {
  return `${provider}-${externalId}`.replace(/[^a-zA-Z0-9-_]/g, "_");
}

export function inferWorkMode(text: string): JobListing["workMode"] {
  const lower = text.toLowerCase();
  if (lower.includes("remote")) return "remote";
  if (lower.includes("hybrid")) return "hybrid";
  return "onsite";
}

export function inferJobType(text: string): JobListing["type"] {
  const lower = text.toLowerCase();
  if (lower.includes("intern")) return "internship";
  if (lower.includes("contract") || lower.includes("freelance")) return "contract";
  return "full-time";
}

export function inferExperienceBand(text: string): ExperienceBand {
  const lower = text.toLowerCase();
  if (lower.includes("intern") || lower.includes("student")) return "student";
  if (lower.includes("fresher") || lower.includes("graduate") || lower.includes("entry"))
    return "fresher";
  if (lower.includes("senior") || lower.includes("lead") || lower.includes("manager"))
    return "1-3";
  return "0-1";
}

export function formatSalaryRange(
  min?: number | null,
  max?: number | null,
  currency = "INR"
) {
  if (!min && !max) return undefined;

  const symbol =
    currency === "INR"
      ? "₹"
      : currency === "GBP"
        ? "£"
        : currency === "USD"
          ? "$"
          : `${currency} `;

  if (min && max) {
    return `${symbol}${Math.round(min / 1000)}k–${symbol}${Math.round(max / 1000)}k`;
  }

  if (min) return `From ${symbol}${Math.round(min / 1000)}k`;
  return `Up to ${symbol}${Math.round((max ?? 0) / 1000)}k`;
}

export function extractSkillsFromText(text: string, limit = 6) {
  const keywords = [
    "react",
    "javascript",
    "typescript",
    "python",
    "java",
    "node",
    "aws",
    "sql",
    "docker",
    "kubernetes",
    "angular",
    "vue",
    "go",
    "rust",
    "c++",
    "machine learning",
    "devops"
  ];

  const lower = text.toLowerCase();
  return keywords.filter((k) => lower.includes(k)).slice(0, limit);
}

/** Abort fetch after `ms` to keep dashboard snappy. */
export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit & { timeoutMs?: number } = {}
) {
  const { timeoutMs = 8000, ...rest } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, { ...rest, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export function providerPlatform(provider: JobDataProvider): JobListingPlatform {
  if (provider === "curated") return "linkedin";
  return provider;
}
