/**
 * Job API environment — Adzuna + HeroHunt only (live 3rd-party feeds).
 *
 * Secrets in `.env.local` / Vercel env. Admin health: GET /api/admin/job-apis
 */

export type JobApiProviderId = "adzuna" | "herohunt" | "curated";

export type JobApiProviderConfig = {
  id: JobApiProviderId;
  label: string;
  description: string;
  docsUrl: string;
  configured: boolean;
  market: string;
};

function hasValue(value: string | undefined) {
  return Boolean(value?.trim());
}

export function getJobApiSecrets() {
  return {
    adzuna: {
      appId: process.env.ADZUNA_APP_ID?.trim() ?? "",
      appKey: process.env.ADZUNA_APP_KEY?.trim() ?? "",
      country: process.env.ADZUNA_COUNTRY?.trim() || "in"
    },
    herohunt: {
      apiKey: process.env.HEROHUNT_API_KEY?.trim() ?? "",
      baseUrl:
        process.env.HEROHUNT_API_BASE_URL?.trim() ||
        "https://api.herohunt.ai/v1/people/search"
    }
  };
}

export function getJobApiProviderStatus(): JobApiProviderConfig[] {
  const secrets = getJobApiSecrets();

  return [
    {
      id: "adzuna",
      label: "Adzuna",
      description: "Live job ads — India, UK, US and more",
      docsUrl: "https://developer.adzuna.com/overview",
      configured: hasValue(secrets.adzuna.appId) && hasValue(secrets.adzuna.appKey),
      market: secrets.adzuna.country.toUpperCase()
    },
    {
      id: "herohunt",
      label: "HeroHunt",
      description: "AI talent market signals (hiring demand)",
      docsUrl: "https://www.herohunt.ai/people-search-api",
      configured: hasValue(secrets.herohunt.apiKey),
      market: "Global"
    },
    {
      id: "curated",
      label: "Apply curated",
      description: "Hand-picked openings + platform deep links",
      docsUrl: "https://github.com/Rohit94r/Apply-Saas/blob/main/lib/data/job-listings.ts",
      configured: true,
      market: "India"
    }
  ];
}
