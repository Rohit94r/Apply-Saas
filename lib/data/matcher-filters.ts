import { jobListings } from "@/lib/data/job-listings";
import { getAllCompanies } from "@/lib/data/companies";

export type MatcherFilterField = "role" | "city";

export type MatcherFilterOption = {
  value: string;
  label: string;
  source: "local";
  score: number;
};

export const ANY_ROLE = "Any Role";
export const ANY_CITY = "Any City";

const BASE_ROLES = [
  "SDE Intern",
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "ML Engineer",
  "DevOps Engineer",
  "QA Engineer",
  "Android Developer",
  "Graduate Engineer Trainee",
  "Associate Software Engineer"
];

const BASE_CITIES = [
  "Bengaluru",
  "Mumbai",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Noida",
  "Gurugram",
  "Remote",
  "Pan India",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Indore",
  "Kochi",
  "Mysuru"
];

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.map((v) => v.trim()).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b)
  );
}

function extractCityFromLocation(location: string): string[] {
  return location
    .split(/[/,]/)
    .map((part) => part.replace(/\s+India$/i, "").trim())
    .filter((part) => part.length > 0 && !/^pan india$/i.test(part));
}

function scoreMatch(query: string, candidate: string): number {
  const q = query.trim().toLowerCase();
  const c = candidate.trim().toLowerCase();

  if (!q) return 50;
  if (c === q) return 100;
  if (c.startsWith(q)) return 92;
  if (c.includes(q)) return 78;

  const words = c.split(/\s+/);
  if (words.some((word) => word.startsWith(q))) return 65;

  let qi = 0;
  for (const char of c) {
    if (char === q[qi]) {
      qi += 1;
      if (qi === q.length) return 55;
    }
  }

  return 0;
}

function buildRolePool(): string[] {
  const roles = new Set<string>(BASE_ROLES);

  for (const job of jobListings) {
    roles.add(job.title);
  }

  for (const company of getAllCompanies()) {
    for (const role of company.commonRoles) {
      roles.add(role);
    }
  }

  return uniqueSorted(Array.from(roles));
}

function buildCityPool(): string[] {
  const cities = new Set<string>(BASE_CITIES);

  for (const job of jobListings) {
    for (const city of extractCityFromLocation(job.location)) {
      cities.add(city);
    }
  }

  for (const company of getAllCompanies()) {
    const hq = company.headquarters;
    if (hq.includes("India")) {
      const city = hq.split(",")[0]?.trim();
      if (city) cities.add(city);
    }
  }

  return uniqueSorted(Array.from(cities));
}

const rolePool = buildRolePool();
const cityPool = buildCityPool();

export function getMatcherRoleOptions(): string[] {
  return rolePool;
}

export function getMatcherCityOptions(): string[] {
  return cityPool;
}

export function searchMatcherFilter(
  field: MatcherFilterField,
  query: string,
  limit = 8
): MatcherFilterOption[] {
  const pool = field === "role" ? rolePool : cityPool;
  const normalized = query.trim();

  if (!normalized) {
    return pool.slice(0, limit).map((value) => ({
      value,
      label: value,
      source: "local" as const,
      score: 50
    }));
  }

  const scored = pool
    .map((value) => ({
      value,
      label: value,
      source: "local" as const,
      score: scoreMatch(normalized, value)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const top = scored.slice(0, limit);

  if (top.length === 0 && normalized.length >= 2) {
    return [
      {
        value: normalized,
        label: normalized,
        source: "local",
        score: 40
      }
    ];
  }

  return top;
}

export function normalizeMatcherRole(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed === ANY_ROLE) return trimmed;

  const exact = rolePool.find(
    (role) => role.toLowerCase() === trimmed.toLowerCase()
  );
  if (exact) return exact;

  const partial = rolePool.find((role) =>
    role.toLowerCase().includes(trimmed.toLowerCase())
  );
  return partial ?? trimmed;
}

export function normalizeMatcherCity(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed === ANY_CITY) return trimmed;

  const exact = cityPool.find(
    (city) => city.toLowerCase() === trimmed.toLowerCase()
  );
  if (exact) return exact;

  const partial = cityPool.find((city) =>
    city.toLowerCase().includes(trimmed.toLowerCase())
  );
  return partial ?? trimmed;
}
