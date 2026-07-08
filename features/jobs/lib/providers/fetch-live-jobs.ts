/**
 * Orchestrates live job APIs — Adzuna (jobs) + HeroHunt (market signals).
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
  { id: "herohunt", run: fetchHeroHuntMarketSignals }
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

  const runners = LIVE_PROVIDERS.filter((provider) =>
    activeProviderIds.has(provider.id)
  );

  const settled = await Promise.allSettled(
    runners.map(async (provider) => {
      const config = metaById.get(provider.id);

      if (!config?.configured) {
        return {
          id: provider.id,
          listings: [] as JobListing[],
          ok: false,
          message: `${config?.label ?? provider.id} API keys not configured`
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

  for (const provider of runners) {
    const config = metaById.get(provider.id)!;
    const settledIndex = runners.findIndex((r) => r.id === provider.id);
    const result = settled[settledIndex];

    if (result && result.status === "fulfilled") {
      listings.push(...result.value.listings);
      providerStatus.push({
        id: provider.id,
        label: config.label,
        configured: config.configured,
        ok: result.value.ok && result.value.listings.length > 0,
        count: result.value.listings.length,
        message: result.value.message
      });
    } else if (result) {
      providerStatus.push({
        id: provider.id,
        label: config.label,
        configured: config.configured,
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

export function dedupeJobListings(listings: JobListing[]) {
  const seen = new Set<string>();

  return listings.filter((job) => {
    const key = `${job.title.toLowerCase()}|${job.company.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
