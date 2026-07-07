/**
 * Orchestrates all live job API providers in parallel.
 *
 * Uses Promise.allSettled so one failing API does not break the page.
 * Returns merged listings + per-provider status for the overview UI.
 *
 * The `country` config controls which providers fire for the selected market
 * (e.g. USAJOBS + Juju for US, Reed for UK, Remotive + The Muse for Remote).
 */

import {
  getJobApiProviderStatus,
  type JobApiProviderId
} from "@/lib/config/job-apis";
import type { JobCountryConfig } from "@/lib/config/job-countries";
import type {
  JobListing,
  JobProviderFetchStatus,
  JobSeekerProfile
} from "@/features/jobs/types";
import { fetchAdzunaJobs } from "@/features/jobs/lib/providers/adzuna";
import { fetchHeroHuntMarketSignals } from "@/features/jobs/lib/providers/herohunt";
import { fetchJujuJobs } from "@/features/jobs/lib/providers/juju";
import { fetchReedJobs } from "@/features/jobs/lib/providers/reed";
import { fetchRemotiveJobs } from "@/features/jobs/lib/providers/remotive";
import { fetchTheMuseJobs } from "@/features/jobs/lib/providers/themuse";
import { fetchUsajobsJobs } from "@/features/jobs/lib/providers/usajobs";

type ProviderRunner = {
  id: JobApiProviderId;
  run: (
    profile: JobSeekerProfile,
    limit: number,
    country: JobCountryConfig
  ) => Promise<JobListing[]>;
};

const LIVE_PROVIDERS: ProviderRunner[] = [
  { id: "adzuna", run: fetchAdzunaJobs },
  { id: "reed", run: fetchReedJobs },
  { id: "usajobs", run: fetchUsajobsJobs },
  { id: "juju", run: fetchJujuJobs },
  { id: "herohunt", run: fetchHeroHuntMarketSignals },
  { id: "remotive", run: fetchRemotiveJobs },
  { id: "themuse", run: fetchTheMuseJobs }
];

export type LiveJobsFetchResult = {
  listings: JobListing[];
  providerStatus: JobProviderFetchStatus[];
};

export async function fetchLiveJobs(
  profile: JobSeekerProfile,
  perProviderLimit = 8,
  country: JobCountryConfig
): Promise<LiveJobsFetchResult> {
  const meta = getJobApiProviderStatus();
  const metaById = new Map(meta.map((item) => [item.id, item]));
  const activeProviderIds = new Set(country.providers);

  // Only run providers relevant to the selected country.
  const runners = LIVE_PROVIDERS.filter((provider) =>
    activeProviderIds.has(provider.id)
  );

  const settled = await Promise.allSettled(
    runners.map(async (provider) => {
      const config = metaById.get(provider.id);

      // Remotive + TheMuse are always configured (free, no key).
      const alwaysConfigured = provider.id === "remotive" || provider.id === "themuse";

      if (!config?.configured && !alwaysConfigured) {
        return {
          id: provider.id,
          listings: [] as JobListing[],
          ok: false,
          message: "Add API keys in .env.local"
        };
      }

      const listings = await provider.run(profile, perProviderLimit, country);

      return {
        id: provider.id,
        listings,
        ok: true,
        message: listings.length ? undefined : "No results for this profile"
      };
    })
  );

  const listings: JobListing[] = [];
  const providerStatus: JobProviderFetchStatus[] = [];

  // Build status for ALL providers (so the overview shows skipped ones too),
  // but only include those relevant to the selected country.
  for (const provider of LIVE_PROVIDERS) {
    if (!activeProviderIds.has(provider.id)) {
      continue;
    }

    const config = metaById.get(provider.id)!;
    const alwaysConfigured = provider.id === "remotive" || provider.id === "themuse";
    const settledIndex = runners.findIndex((r) => r.id === provider.id);
    const result = settled[settledIndex];

    if (result && result.status === "fulfilled") {
      listings.push(...result.value.listings);
      providerStatus.push({
        id: provider.id,
        label: config.label,
        configured: config.configured || alwaysConfigured,
        ok: result.value.ok && result.value.listings.length > 0,
        count: result.value.listings.length,
        message: result.value.message
      });
    } else if (result) {
      providerStatus.push({
        id: provider.id,
        label: config.label,
        configured: config.configured || alwaysConfigured,
        ok: false,
        count: 0,
        message:
          result.reason instanceof Error
            ? result.reason.message
            : "Provider request failed"
      });
    }
  }

  return { listings, providerStatus };
}

/** Deduplicate jobs that appear from multiple feeds (same title + company). */
export function dedupeJobListings(listings: JobListing[]) {
  const seen = new Set<string>();

  return listings.filter((job) => {
    const key = `${job.title.toLowerCase()}|${job.company.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
