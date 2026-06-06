/**
 * Build a JobSeekerProfile from stored resume data.
 *
 * Called by `/api/jobs/match` and server components on the dashboard.
 * No LLM required — fast keyword/role extraction for instant job matching.
 */

import type { GeneratedResume, MasterResume } from "@/types";
import type { ExperienceBand, JobSeekerProfile } from "@/features/jobs/types";

const INDIAN_CITIES = [
  "Mumbai",
  "Pune",
  "Bengaluru",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Delhi",
  "Noida",
  "Gurugram",
  "Kolkata",
  "Remote"
];

const ROLE_PATTERNS = [
  /full[\s-]?stack/i,
  /frontend/i,
  /backend/i,
  /software engineer/i,
  /sde/i,
  /data analyst/i,
  /data engineer/i,
  /machine learning/i,
  /devops/i,
  /android/i,
  /react/i,
  /java developer/i,
  /python developer/i,
  /intern/i
];

const SKILL_KEYWORDS = [
  "react",
  "next.js",
  "nextjs",
  "javascript",
  "typescript",
  "node.js",
  "nodejs",
  "express",
  "python",
  "java",
  "c++",
  "sql",
  "mongodb",
  "postgresql",
  "aws",
  "docker",
  "kubernetes",
  "git",
  "html",
  "css",
  "dsa",
  "machine learning",
  "tensorflow",
  "figma",
  "spring",
  "django",
  "flutter",
  "kotlin",
  "android",
  "redux",
  "graphql",
  "rest",
  "api"
];

function normalizeToken(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function uniqueList(values: string[]) {
  const seen = new Set<string>();

  return values
    .map((v) => normalizeToken(v))
    .filter(Boolean)
    .filter((v) => {
      const key = v.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

/** Pull city/remote from raw resume text. */
function extractLocation(rawText: string) {
  const lower = rawText.toLowerCase();

  for (const city of INDIAN_CITIES) {
    if (lower.includes(city.toLowerCase())) {
      return city === "Bangalore" ? "Bengaluru" : city;
    }
  }

  return "India";
}

/** Guess experience band from graduation year and keywords. */
function inferExperienceBand(rawText: string, master: MasterResume | null) {
  const lower = rawText.toLowerCase();

  if (/intern|student|fresher|graduate trainee|campus/i.test(lower)) {
    return "student" as ExperienceBand;
  }

  const yearMatch = rawText.match(/20(2[4-9]|3[0-5])/);
  if (yearMatch) {
    return "student" as ExperienceBand;
  }

  if (/0-1|0–1|entry level|associate/i.test(lower)) {
    return "0-1" as ExperienceBand;
  }

  if (master?.experience?.length) {
    return "0-1" as ExperienceBand;
  }

  return "fresher" as ExperienceBand;
}

/** Extract role titles from experience block or raw text. */
function extractTargetRoles(
  master: MasterResume | null,
  generated: GeneratedResume | null,
  rawText: string
) {
  const roles: string[] = [];

  if (generated?.role && generated.role !== "Resume Builder") {
    roles.push(generated.role);
  }

  for (const exp of master?.experience ?? []) {
    if (exp.role) roles.push(exp.role);
  }

  for (const pattern of ROLE_PATTERNS) {
    const match = rawText.match(pattern);
    if (match) roles.push(match[0]);
  }

  if (!roles.length) {
    roles.push("Software Engineer", "Full Stack Developer");
  }

  return uniqueList(roles).slice(0, 3);
}

/** Merge structured skills + keyword scan from raw text. */
function extractSkills(master: MasterResume | null, generated: GeneratedResume | null) {
  const skills: string[] = [];

  for (const skill of master?.skills ?? []) {
    skills.push(skill.name);
  }

  if (generated?.generatedContent?.skills?.length) {
    skills.push(...generated.generatedContent.skills);
  }

  if (generated?.keywords?.length) {
    skills.push(...generated.keywords);
  }

  const raw = master?.rawText?.toLowerCase() ?? "";

  for (const keyword of SKILL_KEYWORDS) {
    if (raw.includes(keyword)) {
      skills.push(keyword.replace(/\b\w/g, (c) => c.toUpperCase()));
    }
  }

  return uniqueList(skills).slice(0, 20);
}

function buildHeadline(roles: string[], skills: string[], band: ExperienceBand) {
  const role = roles[0] ?? "Tech roles";
  const topSkills = skills.slice(0, 3).join(", ");
  const level =
    band === "student"
      ? "Student / intern"
      : band === "fresher"
        ? "Fresher"
        : "Early career";

  return topSkills
    ? `${level} · ${role} · ${topSkills}`
    : `${level} · ${role}`;
}

export type BuildProfileInput = {
  userId: string;
  masterResume?: MasterResume | null;
  latestGenerated?: GeneratedResume | null;
};

/**
 * Main entry: convert resume records into a matchable profile.
 * `isComplete` is true when we have at least 3 skills or a master resume id.
 */
export function buildJobSeekerProfile(input: BuildProfileInput): JobSeekerProfile {
  const { userId, masterResume, latestGenerated } = input;
  const rawText =
    masterResume?.rawText?.trim() ||
    latestGenerated?.generatedContent?.afterText?.trim() ||
    "";

  const skills = extractSkills(masterResume ?? null, latestGenerated ?? null);
  const targetRoles = extractTargetRoles(
    masterResume ?? null,
    latestGenerated ?? null,
    rawText
  );
  const location = rawText ? extractLocation(rawText) : "India";
  const experienceBand = inferExperienceBand(rawText, masterResume ?? null);

  const source = masterResume
    ? "master-resume"
    : latestGenerated
      ? "built-resume"
      : "none";

  const isComplete = Boolean(
    masterResume?.id || skills.length >= 3 || latestGenerated?.role
  );

  return {
    userId,
    headline: buildHeadline(targetRoles, skills, experienceBand),
    targetRoles,
    skills,
    location,
    experienceBand,
    source,
    isComplete,
    masterResumeId: masterResume?.id
  };
}

/** Empty profile for users who have not uploaded a resume yet. */
export function emptyJobSeekerProfile(userId: string): JobSeekerProfile {
  return {
    userId,
    headline: "Upload your resume to unlock personalized job matches",
    targetRoles: ["Software Engineer"],
    skills: [],
    location: "India",
    experienceBand: "fresher",
    source: "none",
    isComplete: false
  };
}
