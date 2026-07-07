/**
 * Build deep links that open real business directories (Google Maps, Justdial,
 * IndiaMART, Google, LinkedIn) pre-filtered to a service + city. The student
 * uses these to find local clients with phone numbers, then calls to pitch.
 *
 * We do NOT scrape or store business numbers — the directories show them live.
 */

import type { FindClientLink, FindClientProvider } from "@/features/freelancing/types";

function slug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildGoogleMapsUrl(term: string, city: string) {
  return `https://www.google.com/maps/search/${encodeURIComponent(`${term} in ${city}`)}`;
}

export function buildJustdialUrl(term: string, city: string) {
  return `https://www.justdial.com/${slug(city)}/${slug(term)}`;
}

export function buildIndiamartUrl(term: string) {
  return `https://www.indiamart.com/search.php?ss=${encodeURIComponent(term)}`;
}

export function buildGoogleSearchUrl(term: string, city: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(`${term} in ${city} contact number website design`)}`;
}

export function buildLinkedInPeopleUrl(term: string, city: string) {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${term} ${city}`)}`;
}

const providerMeta: Record<
  FindClientProvider,
  { label: string; hint: string }
> = {
  "google-maps": {
    label: "Google Maps",
    hint: "See businesses near you with phone numbers & pins"
  },
  justdial: {
    label: "Justdial",
    hint: "City-wise directory with direct call buttons"
  },
  indiamart: {
    label: "IndiaMART",
    hint: "Suppliers & SMEs — good for B2B leads"
  },
  google: {
    label: "Google search",
    hint: "Find businesses without a website to pitch"
  },
  linkedin: {
    label: "LinkedIn",
    hint: "Find decision-makers & marketing managers"
  }
};

export function buildFindClientLinks(
  term: string,
  city: string
): FindClientLink[] {
  const providers: FindClientProvider[] = [
    "google-maps",
    "justdial",
    "indiamart",
    "google",
    "linkedin"
  ];

  return providers.map((provider) => {
    const meta = providerMeta[provider];
    let url: string;

    switch (provider) {
      case "google-maps":
        url = buildGoogleMapsUrl(term, city);
        break;
      case "justdial":
        url = buildJustdialUrl(term, city);
        break;
      case "indiamart":
        url = buildIndiamartUrl(term);
        break;
      case "google":
        url = buildGoogleSearchUrl(term, city);
        break;
      case "linkedin":
        url = buildLinkedInPeopleUrl(term, city);
        break;
    }

    return { provider, label: meta.label, hint: meta.hint, url };
  });
}

export const freelanceCities: string[] = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Nagpur",
  "Indore",
  "Bhopal",
  "Patna",
  "Visakhapatnam",
  "Kochi",
  "Coimbatore",
  "Chandigarh",
  "Nashik"
];
