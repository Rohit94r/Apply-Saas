/**
 * Juju Job Search API (RSS/XML) — https://www.juju.com/publisher/signup
 *
 * GET https://api.juju.com/jobs?partnerid=...&k=keywords&l=location
 * Response: RSS 2.0 XML with <item> entries
 */

import { getJobApiSecrets } from "@/lib/config/job-apis";
import type { JobCountryConfig } from "@/lib/config/job-countries";
import type { JobListing, JobSeekerProfile } from "@/features/jobs/types";
import {
  buildListingId,
  extractSkillsFromText,
  fetchWithTimeout,
  inferExperienceBand,
  inferJobType,
  inferWorkMode,
  providerPlatform
} from "@/features/jobs/lib/providers/normalize";

function readXmlTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!match) return "";

  return match[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function parseJujuRss(xml: string) {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];

  return items.map((block) => ({
    title: readXmlTag(block, "title"),
    company: readXmlTag(block, "company"),
    city: readXmlTag(block, "city"),
    state: readXmlTag(block, "state"),
    country: readXmlTag(block, "country"),
    link: readXmlTag(block, "link"),
    guid: readXmlTag(block, "guid"),
    postdate: readXmlTag(block, "postdate"),
    description: readXmlTag(block, "description")
  }));
}

export async function fetchJujuJobs(
  profile: JobSeekerProfile,
  limit = 10,
  country: JobCountryConfig
): Promise<JobListing[]> {
  const { juju } = getJobApiSecrets();

  if (!juju.partnerId) {
    return [];
  }

  const k =
    profile.targetRoles[0] ??
    (profile.skills.slice(0, 3).join(" ") || "software engineer");
  const l =
    profile.location && profile.location !== "India"
      ? profile.location
      : country.locationLabel;

  const url = new URL("https://api.juju.com/jobs");
  url.searchParams.set("partnerid", juju.partnerId);
  url.searchParams.set("k", k);
  url.searchParams.set("l", l);
  url.searchParams.set("page", "1");
  url.searchParams.set("limit", String(Math.min(limit, 20)));

  const response = await fetchWithTimeout(url.toString(), {
    headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Juju HTTP ${response.status}`);
  }

  const xml = await response.text();
  const rows = parseJujuRss(xml);

  return rows.slice(0, limit).map((row, index) => {
    const location = [row.city, row.state, row.country].filter(Boolean).join(", ");
    const description = row.description.replace(/<[^>]+>/g, " ");

    return {
      id: buildListingId("juju", row.guid || String(index)),
      title: row.title.replace(/<[^>]+>/g, ""),
      company: row.company || "Company",
      location: location || l,
      workMode: inferWorkMode(description),
      type: inferJobType(row.title),
      experienceBand: inferExperienceBand(`${row.title} ${description}`),
      skills: extractSkillsFromText(`${row.title} ${description}`),
      platform: providerPlatform("juju"),
      applyUrl: row.link || "https://www.juju.com/",
      postedLabel: row.postdate || "Juju live",
      dataProvider: "juju",
      description: description.slice(0, 220)
    } satisfies JobListing;
  });
}
