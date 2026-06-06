/**
 * External job board URL builders.
 *
 * We do not scrape LinkedIn/Naukri — we deep-link users to pre-filled searches
 * on each platform using their inferred profile (role, skills, location).
 */

import type { ExperienceBand, JobPlatform, JobSeekerProfile } from "@/features/jobs/types";

type PlatformMeta = {
  platform: JobPlatform;
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
    label: "Indeed India",
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

/** LinkedIn jobs search with keywords + India location. */
function linkedInUrl(profile: JobSeekerProfile) {
  const keywords = encode(skillQuery(profile));
  const location = encode(profile.location === "India" ? "India" : profile.location);
  const entryLevel =
    profile.experienceBand === "student" || profile.experienceBand === "fresher"
      ? "&f_E=1&f_E=2"
      : "";

  return `https://www.linkedin.com/jobs/search/?keywords=${keywords}&location=${location}${entryLevel}`;
}

/** Naukri search slug from role keywords. */
function naukriUrl(profile: JobSeekerProfile) {
  const slug = primaryKeyword(profile)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const locationSlug =
    profile.location !== "India"
      ? `-in-${profile.location.toLowerCase().replace(/\s+/g, "-")}`
      : "";

  return `https://www.naukri.com/${slug}-jobs${locationSlug}`;
}

function indeedUrl(profile: JobSeekerProfile) {
  const q = encode(skillQuery(profile));
  const l = encode(profile.location);
  return `https://in.indeed.com/jobs?q=${q}&l=${l}`;
}

function glassdoorUrl(profile: JobSeekerProfile) {
  const q = encode(primaryKeyword(profile));
  return `https://www.glassdoor.co.in/Job/india-${q.replace(/%20/g, "-").toLowerCase()}-jobs-SRCH_IL.0,5_IN115_KO6,${primaryKeyword(profile).length}.htm`;
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

function wellfoundUrl(profile: JobSeekerProfile) {
  const role = primaryKeyword(profile)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `https://wellfound.com/role/l/${role}/india`;
}

const urlBuilders: Record<JobPlatform, (profile: JobSeekerProfile) => string> = {
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
 * Shown at the top of Job Search even before the user submits a new resume.
 */
export function buildPlatformSearchLinks(profile: JobSeekerProfile) {
  return jobPlatformMeta.map((meta) => ({
    platform: meta.platform,
    label: meta.label,
    description: meta.description,
    url: urlBuilders[meta.platform](profile)
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
