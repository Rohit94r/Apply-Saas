/**
 * Supported job-search countries — live feeds: Adzuna + HeroHunt only.
 */

import type { JobApiProviderId } from "@/lib/config/job-apis";
import type { JobSearchPlatform } from "@/features/jobs/types";

export type JobCountryId = "in" | "us" | "gb" | "remote" | "global";

export type JobCountryConfig = {
  id: JobCountryId;
  label: string;
  short: string;
  adzunaCountry: string | null;
  indeedDomain: string;
  glassdoorDomain: string;
  locationLabel: string;
  remoteOnly: boolean;
  platforms: JobSearchPlatform[];
  providers: JobApiProviderId[];
};

const LIVE_PROVIDERS: JobApiProviderId[] = ["adzuna", "herohunt"];

export const jobCountries: JobCountryConfig[] = [
  {
    id: "in",
    label: "India",
    short: "IN",
    adzunaCountry: "in",
    indeedDomain: "in.indeed.com",
    glassdoorDomain: "glassdoor.co.in",
    locationLabel: "India",
    remoteOnly: false,
    platforms: [
      "linkedin",
      "naukri",
      "indeed",
      "glassdoor",
      "instahyre",
      "cutshort",
      "wellfound"
    ],
    providers: LIVE_PROVIDERS
  },
  {
    id: "us",
    label: "United States",
    short: "US",
    adzunaCountry: "us",
    indeedDomain: "www.indeed.com",
    glassdoorDomain: "www.glassdoor.com",
    locationLabel: "United States",
    remoteOnly: false,
    platforms: ["linkedin", "indeed", "glassdoor", "wellfound"],
    providers: LIVE_PROVIDERS
  },
  {
    id: "gb",
    label: "United Kingdom",
    short: "UK",
    adzunaCountry: "gb",
    indeedDomain: "uk.indeed.com",
    glassdoorDomain: "www.glassdoor.co.uk",
    locationLabel: "United Kingdom",
    remoteOnly: false,
    platforms: ["linkedin", "indeed", "glassdoor"],
    providers: LIVE_PROVIDERS
  },
  {
    id: "remote",
    label: "Remote / Worldwide",
    short: "Remote",
    adzunaCountry: null,
    indeedDomain: "www.indeed.com",
    glassdoorDomain: "www.glassdoor.com",
    locationLabel: "Remote",
    remoteOnly: true,
    platforms: ["linkedin", "wellfound", "indeed"],
    providers: ["herohunt"]
  },
  {
    id: "global",
    label: "Global (all feeds)",
    short: "Global",
    adzunaCountry: "in",
    indeedDomain: "in.indeed.com",
    glassdoorDomain: "glassdoor.co.in",
    locationLabel: "India",
    remoteOnly: false,
    platforms: [
      "linkedin",
      "naukri",
      "indeed",
      "glassdoor",
      "instahyre",
      "cutshort",
      "wellfound"
    ],
    providers: LIVE_PROVIDERS
  }
];

export const defaultJobCountry: JobCountryId = "in";

export function getJobCountryConfig(id: string | null | undefined) {
  return (
    jobCountries.find((item) => item.id === id) ??
    jobCountries.find((item) => item.id === defaultJobCountry)!
  );
}
