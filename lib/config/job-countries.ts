/**
 * Supported job-search countries/regions.
 *
 * The country selector on `/dashboard/jobs` lets a user switch the market they
 * search in — India by default, plus US, UK, Remote and Global. Each config
 * drives which live providers fire, the Adzuna country slug, the Indeed/Glassdoor
 * domain, the location used in platform deep-links, and which platforms are shown.
 */

import type { JobApiProviderId } from "@/lib/config/job-apis";
import type { JobSearchPlatform } from "@/features/jobs/types";

export type JobCountryId = "in" | "us" | "gb" | "remote" | "global";

export type JobCountryConfig = {
  id: JobCountryId;
  label: string;
  short: string;
  /** Adzuna country slug (`in`, `us`, `gb`, …). `null` = skip Adzuna. */
  adzunaCountry: string | null;
  /** Indeed domain to use in deep-links. */
  indeedDomain: string;
  /** Glassdoor domain (country TLD). */
  glassdoorDomain: string;
  /** Location string injected into LinkedIn / Naukri / Indeed searches. */
  locationLabel: string;
  /** LinkedIn `f_WT` work-type filter (remote = 2, else omitted). */
  remoteOnly: boolean;
  /** Platforms to show for this country (others hidden). */
  platforms: JobSearchPlatform[];
  /** Live providers to fire for this country. */
  providers: JobApiProviderId[];
};

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
    providers: ["adzuna", "remotive", "themuse", "herohunt"]
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
    providers: ["adzuna", "usajobs", "juju", "remotive", "themuse", "herohunt"]
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
    providers: ["adzuna", "reed", "remotive", "themuse", "herohunt"]
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
    providers: ["remotive", "themuse", "herohunt"]
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
    providers: [
      "adzuna",
      "reed",
      "usajobs",
      "juju",
      "remotive",
      "themuse",
      "herohunt"
    ]
  }
];

export const defaultJobCountry: JobCountryId = "in";

export function getJobCountryConfig(id: string | null | undefined) {
  return (
    jobCountries.find((item) => item.id === id) ??
    jobCountries.find((item) => item.id === defaultJobCountry)!
  );
}
