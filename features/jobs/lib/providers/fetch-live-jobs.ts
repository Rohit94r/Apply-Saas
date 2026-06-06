/**
 * Orchestrates all live job API providers in parallel.
 *
 * Uses Promise.allSettled so one failing API does not break the page.
 * Returns merged listings + per-provider status for the overview UI.
 */

import {
  getJobApiProviderStatus,
  type JobApiProviderId
} from "@/lib/config/job-apis";
import type {
  JobListing,
  JobProviderFetchStatus,
  JobSeekerProfile
} from "@/features/jobs/types";
import { fetchAdzunaJobs } from "@/features/jobs/lib/providers/adzuna";
import { fetchHeroHuntMarketSignals } from "@/features/jobs/lib/providers/herohunt";
import { fetchJujuJobs } from "@/features/jobs/lib/providers/juju";
import { fetchReedJobs } from "@/features/jobs/lib/providers/reed";
import { fetchUsajobsJobs } from "@/features/jobs/lib/providers/usajobs";

type ProviderRunner = {
  id: JobApiProviderId;
  run: (profile: JobSeekerProfile, limit: number) => Promise<JobListing[]>;
};

const LIVE_PROVIDERS: ProviderRunner[] = [
  { id: "adzuna", run: fetchAdzunaJobs },
  { id: "reed", run: fetchReedJobs },
  { id: "usajobs", run: fetchUsajobsJobs },
  { id: "juju", run: fetchJujuJobs },
  { id: "herohunt", run: fetchHeroHuntMarketSignals }
];

export type LiveJobsFetchResult = {
  listings: JobListing[];
  providerStatus: JobProviderFetchStatus[];
};

export async function fetchLiveJobs(
  profile: JobSeekerProfile,
  perProviderLimit = 8
): Promise<LiveJobsFetchResult> {
  const meta = getJobApiProviderStatus();
  const metaById = new Map(meta.map((item) => [item.id, item]));

  const settled = await Promise.allSettled(
    LIVE_PROVIDERS.map(async (provider) => {
      const config = metaById.get(provider.id);

      if (!config?.configured) {
        return {
          id: provider.id,
          listings: [] as JobListing[],
          ok: false,
          message: "Add API keys in .env.local"
        };
      }

      const listings = await provider.run(profile, perProviderLimit);

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

  for (let index = 0; index < LIVE_PROVIDERS.length; index += 1) {
    const provider = LIVE_PROVIDERS[index];
    const config = metaById.get(provider.id)!;
    const result = settled[index];

    if (result.status === "fulfilled") {
      listings.push(...result.value.listings);
      providerStatus.push({
        id: provider.id,
        label: config.label,
        configured: config.configured,
        ok: result.value.ok && result.value.listings.length > 0,
        count: result.value.listings.length,
        message: result.value.message
      });
    } else {
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
