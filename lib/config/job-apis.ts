/**
 * Job API environment configuration.
 *
 * All secrets live in `.env.local` — never commit real keys.
 * Register at:
 * - Adzuna: https://developer.adzuna.com/signup
 * - Reed: https://www.reed.co.uk/developers
 * - USAJOBS: https://developer.usajobs.gov/API-Request/
 * - Juju: https://www.juju.com/publisher/signup
 * - HeroHunt: https://www.herohunt.ai/people-search-api
 */

export type JobApiProviderId =
  | "adzuna"
  | "reed"
  | "usajobs"
  | "juju"
  | "herohunt"
  | "curated";

export type JobApiProviderConfig = {
  id: JobApiProviderId;
  label: string;
  description: string;
  docsUrl: string;
  /** True when required env vars are present. */
  configured: boolean;
  /** Region/market this feed targets. */
  market: string;
};

function hasValue(value: string | undefined) {
  return Boolean(value?.trim());
}

/** Read all job API credentials from environment (server-side only). */
export function getJobApiSecrets() {
  return {
    adzuna: {
      appId: process.env.ADZUNA_APP_ID?.trim() ?? "",
      appKey: process.env.ADZUNA_APP_KEY?.trim() ?? "",
      /** ISO country slug — `in` for India, `gb` for UK, `us` for USA. */
      country: process.env.ADZUNA_COUNTRY?.trim() || "in"
    },
    reed: {
      apiKey: process.env.REED_API_KEY?.trim() ?? ""
    },
    usajobs: {
      apiKey: process.env.USAJOBS_API_KEY?.trim() ?? "",
      /** Must be your contact email per USAJOBS terms. */
      userAgent: process.env.USAJOBS_USER_AGENT?.trim() ?? ""
    },
    juju: {
      partnerId: process.env.JUJU_PARTNER_ID?.trim() ?? ""
    },
    herohunt: {
      apiKey: process.env.HEROHUNT_API_KEY?.trim() ?? "",
      baseUrl:
        process.env.HEROHUNT_API_BASE_URL?.trim() ||
        "https://api.herohunt.ai/v1/people/search"
    }
  };
}

/** Which providers are ready to call (have credentials). */
export function getJobApiProviderStatus(): JobApiProviderConfig[] {
  const secrets = getJobApiSecrets();

  return [
    {
      id: "adzuna",
      label: "Adzuna",
      description: "Live job ads — India, UK, US and 9 more markets",
      docsUrl: "https://developer.adzuna.com/overview",
      configured: hasValue(secrets.adzuna.appId) && hasValue(secrets.adzuna.appKey),
      market: secrets.adzuna.country.toUpperCase()
    },
    {
      id: "reed",
      label: "Reed.co.uk",
      description: "UK job search API with salary ranges",
      docsUrl: "https://www.reed.co.uk/developers",
      configured: hasValue(secrets.reed.apiKey),
      market: "UK"
    },
    {
      id: "usajobs",
      label: "USAJOBS",
      description: "US federal and government opportunities",
      docsUrl: "https://developer.usajobs.gov/",
      configured:
        hasValue(secrets.usajobs.apiKey) && hasValue(secrets.usajobs.userAgent),
      market: "USA"
    },
    {
      id: "juju",
      label: "Juju",
      description: "US job aggregator (RSS/XML feed)",
      docsUrl: "https://www.juju.com/publisher/signup",
      configured: hasValue(secrets.juju.partnerId),
      market: "USA"
    },
    {
      id: "herohunt",
      label: "HeroHunt",
      description: "AI talent market signals (natural language search)",
      docsUrl: "https://www.herohunt.ai/people-search-api",
      configured: hasValue(secrets.herohunt.apiKey),
      market: "Global"
    },
    {
      id: "curated",
      label: "Apply curated",
      description: "Hand-picked India openings + platform deep links",
      docsUrl: "https://github.com/Rohit94r/Apply-Saas/blob/main/lib/data/job-listings.ts",
      configured: true,
      market: "India"
    }
  ];
}
