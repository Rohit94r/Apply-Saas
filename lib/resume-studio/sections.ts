import type { MasterResume } from "@/types";
import type { EditorItem, ResumeSectionId, ResumeStudioDocument } from "./types";

const SECTION_ALIASES: Record<Exclude<ResumeSectionId, "personal" | "skills">, string[]> = {
  summary: ["summary", "professional summary", "profile", "objective"],
  experience: [
    "work experience",
    "experience",
    "professional experience",
    "employment"
  ],
  projects: ["projects", "project experience", "personal projects"],
  education: ["education", "academic background"],
  achievements: ["achievements", "awards", "honors", "certifications", "certificates"]
};

export function createItemId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createItem(text = ""): EditorItem {
  return { id: createItemId(), text };
}

export function emptyResumeDocument(
  partial?: Partial<Omit<ResumeStudioDocument, "personal">> & {
    personal?: Partial<ResumeStudioDocument["personal"]>;
  }
): ResumeStudioDocument {
  return {
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      targetRole: "Full Stack Developer",
      ...partial?.personal
    },
    summary: partial?.summary ?? "",
    experience: partial?.experience ?? [],
    projects: partial?.projects ?? [],
    skills: partial?.skills ?? [],
    education: partial?.education ?? [],
    achievements: partial?.achievements ?? [],
    template: partial?.template ?? "classic"
  };
}

function normalizeLine(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function findSectionIndex(lines: string[], aliases: string[]) {
  const aliasSet = new Set(aliases.map(normalizeLine));
  return lines.findIndex((line) => aliasSet.has(normalizeLine(line)));
}

function extractSection(lines: string[], aliases: string[]) {
  const start = findSectionIndex(lines, aliases);
  if (start < 0) {
    return "";
  }

  const sectionHeaders = new Set(
    Object.values(SECTION_ALIASES)
      .flat()
      .map(normalizeLine)
  );
  const content: string[] = [];

  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index]?.trim() ?? "";

    if (!line) {
      if (content.length) {
        content.push("");
      }
      continue;
    }

    if (sectionHeaders.has(normalizeLine(line))) {
      break;
    }

    content.push(line);
  }

  return content.join("\n").trim();
}

export function textToItems(value: string): EditorItem[] {
  const chunks = value
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  if (!chunks.length) {
    const lines = value
      .split(/\r?\n/)
      .map((line) => line.replace(/^[-*•]\s*/, "").trim())
      .filter(Boolean);

    if (lines.length) {
      return lines.map((line) => createItem(line));
    }

    return [createItem()];
  }

  return chunks.map((chunk) => createItem(chunk));
}

export function itemsToText(items: EditorItem[]) {
  return items
    .map((item) => item.text.trim())
    .filter(Boolean)
    .join("\n\n");
}

export function formatItemLines(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return [];
  }

  if (lines.length === 1) {
    return lines;
  }

  return [
    lines[0],
    ...lines.slice(1).map((line) =>
      /^[-*•]\s/.test(line) ? line.replace(/^[-*•]\s*/, "• ") : `• ${line}`
    )
  ];
}

function nonEmptyItems(items: EditorItem[]) {
  return items.filter((item) => item.text.trim());
}

function sectionFromItems(title: string, items: EditorItem[]) {
  const lines: string[] = [];

  nonEmptyItems(items).forEach((item, index) => {
    if (index > 0) {
      lines.push("");
    }

    lines.push(...formatItemLines(item.text));
  });

  return lines.length ? { title, lines } : null;
}

function parseContactLine(line: string) {
  const email = line.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0] ?? "";
  const phone = line.match(/\+?\d[\d\s().-]{8,}\d/)?.[0] ?? "";
  const linkedin = line.match(/linkedin\.com\/[\w/-]+/i)?.[0] ?? "";
  const github = line.match(/github\.com\/[\w/-]+/i)?.[0] ?? "";

  return { email, phone, linkedin, github };
}

export function parseResumeText(rawText: string): ResumeStudioDocument {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const firstLine = lines[0] ?? "";
  const contactLine =
    lines.find((line) => /@|linkedin|github|\+?\d{2,}/i.test(line)) ?? "";
  const contact = parseContactLine(contactLine);
  const skillsText = extractSection(lines, ["skills", "technical skills", "core skills"]);
  const skills = skillsText
    .split(/[,;•\n]/)
    .map((skill) => skill.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);

  return emptyResumeDocument({
    personal: {
      name: firstLine,
      email: contact.email,
      phone: contact.phone,
      location: "",
      linkedin: contact.linkedin,
      github: contact.github,
      targetRole: "Full Stack Developer"
    },
    summary: extractSection(lines, SECTION_ALIASES.summary),
    experience: textToItems(extractSection(lines, SECTION_ALIASES.experience)),
    projects: textToItems(extractSection(lines, SECTION_ALIASES.projects)),
    skills,
    education: textToItems(extractSection(lines, SECTION_ALIASES.education)),
    achievements: textToItems(extractSection(lines, SECTION_ALIASES.achievements))
  });
}

export function masterResumeToDocument(master: MasterResume | null): ResumeStudioDocument {
  if (!master?.rawText?.trim()) {
    return emptyResumeDocument();
  }

  return parseResumeText(master.rawText);
}

export function serializeResumeDocument(document: ResumeStudioDocument) {
  const { personal } = document;
  const blocks: string[] = [];

  if (personal.name.trim()) {
    blocks.push(personal.name.trim());
  }

  const contact = [personal.email, personal.phone, personal.location]
    .filter(Boolean)
    .join(" · ");
  if (contact) {
    blocks.push(contact);
  }

  const links = [personal.linkedin, personal.github].filter(Boolean).join(" · ");
  if (links) {
    blocks.push(links);
  }

  if (document.summary.trim()) {
    blocks.push("", "SUMMARY", document.summary.trim());
  }

  const experience = itemsToText(nonEmptyItems(document.experience));
  if (experience) {
    blocks.push("", "EXPERIENCE", experience);
  }

  const projects = itemsToText(nonEmptyItems(document.projects));
  if (projects) {
    blocks.push("", "PROJECTS", projects);
  }

  if (document.skills.length) {
    blocks.push("", "SKILLS", ...document.skills);
  }

  const education = itemsToText(nonEmptyItems(document.education));
  if (education) {
    blocks.push("", "EDUCATION", education);
  }

  const achievements = itemsToText(nonEmptyItems(document.achievements));
  if (achievements) {
    blocks.push("", "ACHIEVEMENTS", achievements);
  }

  return blocks.join("\n").trim();
}

export function documentToPdfPayload(document: ResumeStudioDocument) {
  const { personal } = document;
  const text = serializeResumeDocument(document);
  const contacts = [
    [personal.email, personal.phone, personal.location].filter(Boolean).join(" · "),
    [personal.linkedin, personal.github].filter(Boolean).join(" · ")
  ].filter(Boolean);
  const sections = [
    document.summary.trim()
      ? {
          title: "SUMMARY",
          lines: document.summary
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean)
        }
      : null,
    sectionFromItems("EXPERIENCE", document.experience),
    sectionFromItems("PROJECTS", document.projects),
    document.skills.length
      ? { title: "SKILLS", lines: document.skills }
      : null,
    sectionFromItems("EDUCATION", document.education),
    sectionFromItems("ACHIEVEMENTS", document.achievements)
  ].filter((section): section is { title: string; lines: string[] } => Boolean(section));
  const bullets = nonEmptyItems(document.experience)
    .flatMap((item) => formatItemLines(item.text))
    .filter((line) => line.length > 24)
    .slice(0, 8);

  return {
    name: personal.name.trim() || "Resume",
    role: personal.targetRole.trim() || "Target role",
    email: personal.email.trim() || undefined,
    location: personal.location.trim() || undefined,
    contacts,
    sections,
    summary: document.summary.trim(),
    skills: document.skills,
    bullets,
    fullText: text,
    template: document.template
  };
}

export function sectionLabel(section: ResumeSectionId) {
  const labels: Record<ResumeSectionId, string> = {
    personal: "Personal Information",
    summary: "Professional Summary",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    education: "Education",
    achievements: "Achievements / Certifications"
  };

  return labels[section];
}

export function sectionImprovePrompt(section: ResumeSectionId) {
  const prompts: Record<ResumeSectionId, string> = {
    personal:
      "Improve contact formatting and target role clarity without changing factual details.",
    summary: "Improve this professional summary. Keep it truthful, concise, and ATS-friendly.",
    experience:
      "Rewrite experience entries using stronger action verbs and clearer measurable outcomes. Do not invent employers or dates.",
    projects:
      "Strengthen project descriptions with technical detail and impact. Do not invent projects or technologies.",
    skills: "Optimize the skills list for ATS readability and role relevance.",
    education: "Improve education entries for clarity and professional formatting.",
    achievements:
      "Make achievements and certifications more impactful without inventing awards."
  };

  return prompts[section];
}

export function mergeParsedDocument(
  current: ResumeStudioDocument,
  parsed: ResumeStudioDocument
): ResumeStudioDocument {
  return {
    personal: {
      ...current.personal,
      name: parsed.personal.name || current.personal.name,
      email: parsed.personal.email || current.personal.email,
      phone: parsed.personal.phone || current.personal.phone,
      linkedin: parsed.personal.linkedin || current.personal.linkedin,
      github: parsed.personal.github || current.personal.github,
      targetRole: parsed.personal.targetRole || current.personal.targetRole
    },
    summary: parsed.summary || current.summary,
    experience: parsed.experience.some((item) => item.text.trim())
      ? parsed.experience
      : current.experience,
    projects: parsed.projects.some((item) => item.text.trim())
      ? parsed.projects
      : current.projects,
    skills: parsed.skills.length ? parsed.skills : current.skills,
    education: parsed.education.some((item) => item.text.trim())
      ? parsed.education
      : current.education,
    achievements: parsed.achievements.some((item) => item.text.trim())
      ? parsed.achievements
      : current.achievements,
    template: current.template
  };
}
