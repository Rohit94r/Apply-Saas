/**
 * Admin-only job API health checks (Adzuna + HeroHunt).
 * Never expose raw API keys to the client — use masked previews only.
 */

import { getJobApiProviderStatus, getJobApiSecrets } from "@/lib/config/job-apis";
import { getJobCountryConfig } from "@/lib/config/job-countries";
import { emptyJobSeekerProfile } from "@/features/jobs";
import { fetchLiveJobs } from "@/features/jobs/lib/providers/fetch-live-jobs";

export type JobApiHealthRow = {
  id: string;
  label: string;
  configured: boolean;
  ok: boolean;
  count: number;
  message?: string;
  docsUrl: string;
  market: string;
  /** Masked credential hint for admin (never full secret). */
  credentialPreview: string;
  checkedAt: string;
};

export type JobApiHealthReport = {
  providers: JobApiHealthRow[];
  summary: {
    configured: number;
    healthy: number;
    totalLiveJobs: number;
  };
  envHints: {
    adzunaAppId: string;
    adzunaCountry: string;
    herohuntBaseUrl: string;
  };
};

function maskSecret(value: string, visibleStart = 8, visibleEnd = 4) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "—";
  }
  if (trimmed.length <= visibleStart + visibleEnd) {
    return `${trimmed.slice(0, 2)}…`;
  }
  return `${trimmed.slice(0, visibleStart)}…${trimmed.slice(-visibleEnd)}`;
}

/** Live probe against Adzuna + HeroHunt using a fixed test profile. */
export async function getJobApiHealthReport(): Promise<JobApiHealthReport> {
  const secrets = getJobApiSecrets();
  const meta = getJobApiProviderStatus().filter(
    (item) => item.id === "adzuna" || item.id === "herohunt"
  );
  const country = getJobCountryConfig("in");
  const probeProfile = emptyJobSeekerProfile("admin-health-probe");
  probeProfile.skills = ["JavaScript", "React", "Node.js"];
  probeProfile.targetRoles = ["Software Engineer"];
  probeProfile.isComplete = true;

  const { listings, providerStatus } = await fetchLiveJobs(probeProfile, 5, country);
  const statusById = new Map(providerStatus.map((item) => [item.id, item]));
  const checkedAt = new Date().toISOString();

  const providers: JobApiHealthRow[] = meta.map((item) => {
    const live = statusById.get(item.id);
    const credentialPreview =
      item.id === "adzuna"
        ? `app_id=${secrets.adzuna.appId || "missing"} · key=${maskSecret(secrets.adzuna.appKey)}`
        : `key=${maskSecret(secrets.herohunt.apiKey)}`;

    return {
      id: item.id,
      label: item.label,
      configured: item.configured,
      ok: Boolean(live?.ok),
      count: live?.count ?? 0,
      message: live?.message,
      docsUrl: item.docsUrl,
      market: item.market,
      credentialPreview,
      checkedAt
    };
  });

  const healthy = providers.filter((item) => item.configured && item.ok).length;

  return {
    providers,
    summary: {
      configured: providers.filter((item) => item.configured).length,
      healthy,
      totalLiveJobs: listings.length
    },
    envHints: {
      adzunaAppId: secrets.adzuna.appId || "not set",
      adzunaCountry: secrets.adzuna.country,
      herohuntBaseUrl: secrets.herohunt.baseUrl
    }
  };
}
