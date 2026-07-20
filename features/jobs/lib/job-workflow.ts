import type { JobListing } from "@/features/jobs/types";

export type JobSort = "best-match" | "newest" | "company";

export function getSourceTrust(job: JobListing) {
  const isLive = Boolean(job.dataProvider && job.dataProvider !== "curated");
  return {
    label: isLive ? "Live provider listing" : "Curated search link",
    detail: isLive
      ? `Provided by ${job.dataProvider}; confirm details on the source before applying.`
      : "This opens a job-board search, not a verified current vacancy. Check availability and terms on the destination."
  };
}

export function parsePostedAgeDays(label: string, now = new Date()) {
  const timestamp = Date.parse(label);
  if (Number.isFinite(timestamp)) {
    return Math.max(0, Math.floor((now.getTime() - timestamp) / 86_400_000));
  }

  const normalized = label.toLowerCase();
  if (normalized.includes("today") || normalized.includes("hour")) return 0;
  const dayMatch = normalized.match(/(\d+)\s+day/);
  if (dayMatch) return Number(dayMatch[1]);
  const weekMatch = normalized.match(/(\d+)\s+week/);
  if (weekMatch) return Number(weekMatch[1]) * 7;
  return null;
}

export function sortJobMatches<T extends JobListing & { matchScore: number }>(
  jobs: T[],
  sort: JobSort
) {
  return [...jobs].sort((a, b) => {
    if (sort === "company") {
      return a.company.localeCompare(b.company) || b.matchScore - a.matchScore;
    }
    if (sort === "newest") {
      const aAge = parsePostedAgeDays(a.postedLabel);
      const bAge = parsePostedAgeDays(b.postedLabel);
      if (aAge === null && bAge === null) return b.matchScore - a.matchScore;
      if (aAge === null) return 1;
      if (bAge === null) return -1;
      return aAge - bAge || b.matchScore - a.matchScore;
    }
    return b.matchScore - a.matchScore;
  });
}

export function getJobNextSteps(job: JobListing & { matchScore: number }) {
  const steps = [
    `Confirm the ${job.title} posting, requirements, and closing date on the source`,
    job.skills.length
      ? `Tailor your resume around ${job.skills.slice(0, 3).join(", ")} with evidence`
      : "Tailor your resume to the verified requirements",
    "Track the application and schedule a follow-up in 5–7 days"
  ];
  if (job.matchScore < 50) {
    steps.splice(1, 0, "Review the gaps before applying; the match is directional");
  }
  return steps;
}
