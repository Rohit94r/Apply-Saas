/**
 * External job board URL builders.
 *
 * We do not scrape LinkedIn/Naukri — we deep-link users to pre-filled searches
 * on each platform using their inferred profile (role, skills, location).
 *
 * `buildPlatformSearchLinks(profile, country?)` filters which platforms are
 * shown and switches the location/domain per selected country (India/US/UK/Remote).
 */

import type { JobCountryConfig } from "@/lib/config/job-countries";
import type { ExperienceBand, JobSearchPlatform, JobSeekerProfile } from "@/features/jobs/types";

type PlatformMeta = {
  platform: JobSearchPlatform;
  label: string;
  description: string;
};

/** Display metadata for each supported platform. */
export const jobPlatformMeta: PlatformMeta[] = [
  {
    platform: "linkedin",
    label: "LinkedIn Jobs",
    description: "Professional network — best for product companies and internships"
  },
  {
    platform: "naukri",
    label: "Naukri.com",
    description: "India's largest job portal — strong for campus and IT services"
  },
  {
    platform: "indeed",
    label: "Indeed",
    description: "Broad listings across cities and experience levels"
  },
  {
    platform: "glassdoor",
    label: "Glassdoor",
    description: "Jobs with company reviews and salary insights"
  },
  {
    platform: "instahyre",
    label: "Instahyre",
    description: "Curated startup and product roles"
  },
  {
    platform: "cutshort",
    label: "Cutshort",
    description: "Tech startups — fast applications"
  },
  {
    platform: "wellfound",
    label: "Wellfound (AngelList)",
    description: "Startup jobs including remote roles"
  }
];

function primaryKeyword(profile: JobSeekerProfile) {
  return profile.targetRoles[0] ?? profile.skills[0] ?? "Software Engineer";
}

function skillQuery(profile: JobSeekerProfile) {
  return profile.skills.slice(0, 3).join(" ") || primaryKeyword(profile);
}

function encode(value: string) {
  return encodeURIComponent(value.trim());
}

function resolveLocation(profile: JobSeekerProfile, country: JobCountryConfig) {
  // Use the resume's city when it's specific, else the country default.
  if (profile.location && profile.location !== "India") {
    return profile.location;
  }
  return country.locationLabel;
}

/** LinkedIn jobs search with keywords + location (remote filter when country=remote). */
function linkedInUrl(profile: JobSeekerProfile, country: JobCountryConfig) {
  const keywords = encode(skillQuery(profile));
  const location = encode(resolveLocation(profile, country));
  const entryLevel =
    profile.experienceBand === "student" || profile.experienceBand === "fresher"
      ? "&f_E=1&f_E=2"
      : "";
  const remote = country.remoteOnly ? "&f_WT=2" : "";

  return `https://www.linkedin.com/jobs/search/?keywords=${keywords}&location=${location}${entryLevel}${remote}`;
}

/** Naukri search slug from role keywords (India only). */
function naukriUrl(profile: JobSeekerProfile, country: JobCountryConfig) {
  const slug = primaryKeyword(profile)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const location = resolveLocation(profile, country);
  const locationSlug =
    location && location !== "India"
      ? `-in-${location.toLowerCase().replace(/\s+/g, "-")}`
      : "";

  return `https://www.naukri.com/${slug}-jobs${locationSlug}`;
}

function indeedUrl(profile: JobSeekerProfile, country: JobCountryConfig) {
  const q = encode(skillQuery(profile));
  const l = encode(resolveLocation(profile, country));
  return `https://${country.indeedDomain}/jobs?q=${q}&l=${l}`;
}

function glassdoorUrl(profile: JobSeekerProfile, country: JobCountryConfig) {
  const q = encode(primaryKeyword(profile));
  const slug = q.replace(/%20/g, "-").toLowerCase();
  return `https://${country.glassdoorDomain}/Job/${slug}-jobs-SRCH_KO0,${primaryKeyword(profile).length}.htm`;
}

function instahyreUrl(profile: JobSeekerProfile) {
  const slug = primaryKeyword(profile)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `https://www.instahyre.com/${slug}-jobs/`;
}

function cutshortUrl(profile: JobSeekerProfile) {
  const slug = primaryKeyword(profile)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `https://cutshort.io/jobs/${slug}`;
}

function wellfoundUrl(profile: JobSeekerProfile, country: JobCountryConfig) {
  const role = primaryKeyword(profile)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const loc = country.remoteOnly ? "remote" : "india";
  return `https://wellfound.com/role/l/${role}/${loc}`;
}

const urlBuilders: Record<
  JobSearchPlatform,
  (profile: JobSeekerProfile, country: JobCountryConfig) => string
> = {
  linkedin: linkedInUrl,
  naukri: naukriUrl,
  indeed: indeedUrl,
  glassdoor: glassdoorUrl,
  instahyre: instahyreUrl,
  cutshort: cutshortUrl,
  wellfound: wellfoundUrl
};

/**
 * Build platform-specific search URLs from a job seeker profile.
 * When `country` is provided, only platforms relevant to that country are
 * returned and the location/domain switches accordingly.
 */
export function buildPlatformSearchLinks(
  profile: JobSeekerProfile,
  country?: JobCountryConfig
) {
  const effectiveCountry: JobCountryConfig = country ?? {
    id: "global",
    label: "Global",
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
    providers: []
  };

  return jobPlatformMeta
    .filter((meta) => effectiveCountry.platforms.includes(meta.platform))
    .map((meta) => ({
      platform: meta.platform,
      label: meta.label,
      description: meta.description,
      url: urlBuilders[meta.platform](profile, effectiveCountry)
    }));
}

/** Map experience band to human-readable filter label. */
export function experienceBandLabel(band: ExperienceBand) {
  const labels: Record<ExperienceBand, string> = {
    student: "Student / Intern",
    fresher: "Fresher (0 exp)",
    "0-1": "0–1 years",
    "1-3": "1–3 years",
    any: "Any experience"
  };

  return labels[band];
}
