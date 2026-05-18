import { NextResponse } from "next/server";
import {
  analyzeResumeAts,
  generateTailoredResume
} from "@/lib/ai/resume-engine";
import {
  generateResumeRequestSchema,
  type GenerateResumeInput
} from "@/lib/validations";
import { getCurrentUserId } from "@/lib/auth";
import {
  createGeneratedResume,
  getLatestMasterResume,
  getMasterResume,
  masterResumeToText
} from "@/lib/data/resumes";
import type { ResumeSourceLine } from "@/types";

const SECTION_HEADERS = [
  "summary",
  "professional summary",
  "profile",
  "work experience",
  "experience",
  "professional experience",
  "employment",
  "education",
  "projects",
  "project experience",
  "skills",
  "technical skills",
  "core skills",
  "certificate",
  "certificates",
  "certifications",
  "achievements",
  "awards"
];
const SUMMARY_HEADERS = ["summary", "professional summary", "profile"];
const EXPERIENCE_HEADERS = [
  "work experience",
  "experience",
  "professional experience",
  "employment"
];
const PROJECT_HEADERS = ["projects", "project experience"];
const SKILL_HEADERS = ["skills", "technical skills", "core skills"];
const REWRITE_STOP_WORDS = new Set([
  "about",
  "also",
  "and",
  "are",
  "for",
  "from",
  "into",
  "that",
  "the",
  "this",
  "with",
  "while",
  "using",
  "role",
  "target",
  "requirements"
]);

function normalizeLine(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function orderedLayoutText(layout?: ResumeSourceLine[]) {
  return (
    layout
      ?.slice()
      .sort((a, b) => a.pageIndex - b.pageIndex || b.y - a.y || a.x - b.x)
      .map((line) => line.text.trim())
      .filter(Boolean) ?? []
  );
}

function findHeaderByAliases(lines: string[], aliases: string[]) {
  const normalizedAliases = new Set(aliases.map(normalizeLine));

  return lines.findIndex((line) => normalizedAliases.has(normalizeLine(line)));
}

function isSectionHeader(line: string) {
  return SECTION_HEADERS.includes(normalizeLine(line));
}

function nextHeaderIndex(lines: string[], startIndex: number) {
  const headers = new Set(SECTION_HEADERS);

  return lines.findIndex(
    (line, index) => index > startIndex && headers.has(normalizeLine(line))
  );
}

function sectionEndIndex(lines: string[], startIndex: number) {
  const nextHeader = nextHeaderIndex(lines, startIndex);

  return nextHeader > startIndex ? nextHeader : lines.length;
}

function wrapIntoSlots(text: string, slots: string[]) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const wrapped = slots.map(() => "");

  for (let slotIndex = 0; slotIndex < slots.length; slotIndex += 1) {
    const targetLength = Math.max(24, slots[slotIndex]?.length || 72);

    while (words.length) {
      const nextWord = words[0];
      const candidate = wrapped[slotIndex]
        ? `${wrapped[slotIndex]} ${nextWord}`
        : nextWord;

      if (candidate.length > targetLength && wrapped[slotIndex]) {
        break;
      }

      wrapped[slotIndex] = candidate;
      words.shift();
    }
  }

  if (words.length && wrapped.length) {
    wrapped[wrapped.length - 1] = `${wrapped[wrapped.length - 1]} ${words.join(" ")}`.trim();
  }

  return wrapped.map((line, index) => line || slots[index]);
}

function unique(values: string[]) {
  const seen = new Set<string>();

  return values.filter((value) => {
    const key = normalizeLine(value);

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function sectionLinesFromText(text: string, aliases: string[]) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const headerIndex = findHeaderByAliases(lines, aliases);

  if (headerIndex < 0) {
    return [];
  }

  return lines.slice(headerIndex + 1, sectionEndIndex(lines, headerIndex));
}

function stripListMarker(line: string) {
  return line.replace(/^[-*•]\s*/, "").trim();
}

function isLikelyStructureLine(line: string) {
  const trimmed = stripListMarker(line);

  if (!trimmed || isSectionHeader(trimmed)) {
    return true;
  }

  if (/^(languages|frontend|backend|database|tools|core|soft skills)\s*:/i.test(trimmed)) {
    return true;
  }

  if (
    /\b(19|20)\d{2}\b|\bpresent\b/i.test(trimmed) &&
    trimmed.length <= 95 &&
    !/[,.]/.test(trimmed)
  ) {
    return true;
  }

  if (
    /^(founder|software|full stack|front[- ]?end|back[- ]?end|developer|engineer|intern|student|b\.?e\.?|bachelor|master)\b/i.test(trimmed) &&
    trimmed.length <= 75 &&
    !/[,.]/.test(trimmed)
  ) {
    return true;
  }

  return trimmed.length < 34 && !/[,.]/.test(trimmed);
}

function isEditableDescriptionLine(line: string) {
  const trimmed = stripListMarker(line);

  return trimmed.length >= 34 && !isLikelyStructureLine(trimmed);
}

function meaningfulTokens(value: string) {
  return (
    value
      .toLowerCase()
      .match(/[a-z][a-z0-9.+#-]{2,}/g)
      ?.filter((token) => !REWRITE_STOP_WORDS.has(token)) ?? []
  );
}

function hasUnsupportedNumbers(originalText: string, candidateText: string) {
  const originalNumbers = new Set(
    originalText.match(/\b\d+(?:\.\d+)?%?\b/g)?.map((item) => item.toLowerCase()) ?? []
  );
  const candidateNumbers =
    candidateText.match(/\b\d+(?:\.\d+)?%?\b/g)?.map((item) => item.toLowerCase()) ?? [];

  return candidateNumbers.some(
    (item) => !originalNumbers.has(item) && !/^(19|20)\d{2}$/.test(item)
  );
}

function hasEnoughOriginalEvidence(originalText: string, candidateText: string) {
  const originalTokens = new Set(meaningfulTokens(originalText));
  const candidateTokens = meaningfulTokens(candidateText);

  if (!candidateTokens.length || hasUnsupportedNumbers(originalText, candidateText)) {
    return false;
  }

  const sharedCount = candidateTokens.filter((token) => originalTokens.has(token)).length;
  const denominator = Math.max(1, Math.min(candidateTokens.length, originalTokens.size));

  return sharedCount / denominator >= 0.28;
}

function editableIndexesForSection(lines: string[], aliases: string[]) {
  const headerIndex = findHeaderByAliases(lines, aliases);

  if (headerIndex < 0) {
    return [];
  }

  const endIndex = sectionEndIndex(lines, headerIndex);

  return lines
    .map((_, index) => index)
    .filter(
      (index) =>
        index > headerIndex &&
        index < endIndex &&
        isEditableDescriptionLine(lines[index])
    );
}

function rewriteSectionFromGenerated({
  lines,
  aliases,
  generatedAfterText
}: {
  lines: string[];
  aliases: string[];
  generatedAfterText: string;
}) {
  const editableIndexes = editableIndexesForSection(lines, aliases);

  if (!editableIndexes.length) {
    return false;
  }

  const originalSlots = editableIndexes.map((index) => lines[index]);
  const generatedDescriptions = sectionLinesFromText(generatedAfterText, aliases)
    .map(stripListMarker)
    .filter(isEditableDescriptionLine);
  const generatedText = generatedDescriptions.join(" ");
  const originalText = originalSlots.join(" ");
  const replacementText = generatedText;

  if (
    !replacementText ||
    normalizeLine(replacementText) === normalizeLine(originalText) ||
    !hasEnoughOriginalEvidence(originalText, replacementText)
  ) {
    return false;
  }

  const wrapped = wrapIntoSlots(replacementText, originalSlots);
  let changed = false;

  wrapped.forEach((line, index) => {
    const targetIndex = editableIndexes[index];

    if (normalizeLine(lines[targetIndex]) !== normalizeLine(line)) {
      lines[targetIndex] = line;
      changed = true;
    }
  });

  return changed;
}

function addKeywordsToSkillSlots(lines: string[], keywords: string[]) {
  const skillsHeaderIndex = findHeaderByAliases(lines, SKILL_HEADERS);

  if (skillsHeaderIndex < 0) {
    return false;
  }

  const nextHeader = nextHeaderIndex(lines, skillsHeaderIndex);
  const endIndex = nextHeader > skillsHeaderIndex ? nextHeader : lines.length;
  const skillIndexes = lines
    .map((_, index) => index)
    .filter((index) => index > skillsHeaderIndex && index < endIndex);

  if (!skillIndexes.length) {
    return false;
  }

  const currentText = lines.join(" ").toLowerCase();
  const seenKeywords = new Set<string>();
  const missing = keywords
    .filter((keyword) => {
      const key = keyword.toLowerCase();

      if (seenKeywords.has(key) || currentText.includes(key)) {
        return false;
      }

      seenKeywords.add(key);
      return true;
    })
    .slice(0, 6);

  if (!missing.length) {
    return false;
  }

  const originalLengths = new Map(
    skillIndexes.map((index) => [index, lines[index].length])
  );
  const preferredIndexes = [
    ...skillIndexes.filter((index) => /^core\s*:/i.test(lines[index])),
    ...skillIndexes.filter((index) => /^tools\s*:/i.test(lines[index])),
    ...skillIndexes.filter((index) => /^frontend\s*:/i.test(lines[index])),
    ...skillIndexes.filter((index) => /^backend\s*:/i.test(lines[index])),
    ...skillIndexes
  ];
  const seen = new Set<number>();
  const orderedTargets = preferredIndexes.filter((index) => {
    if (seen.has(index)) {
      return false;
    }

    seen.add(index);
    return true;
  });

  let changed = false;

  for (const keyword of missing) {
    const targetIndex = orderedTargets.find((index) => {
      const maxLength = Math.min(
        88,
        Math.max((originalLengths.get(index) ?? lines[index].length) + 16, 48)
      );
      const candidate = `${lines[index].trim()}, ${keyword}`;

      return candidate.length <= maxLength;
    });

    if (targetIndex === undefined) {
      continue;
    }

    lines[targetIndex] = `${lines[targetIndex].trim()}, ${keyword}`;
    changed = true;
  }

  return changed;
}

function preservePdfLineLayout(
  layout: ResumeSourceLine[] | undefined,
  generatedContent: Awaited<ReturnType<typeof generateTailoredResume>>
) {
  const lines = orderedLayoutText(layout);

  if (!lines.length) {
    return generatedContent;
  }

  const afterLines = [...lines];
  const summaryHeaderIndex = findHeaderByAliases(afterLines, SUMMARY_HEADERS);
  const nextHeader = summaryHeaderIndex >= 0
    ? sectionEndIndex(afterLines, summaryHeaderIndex)
    : -1;
  const changedSections: string[] = [];

  if (summaryHeaderIndex >= 0 && nextHeader > summaryHeaderIndex + 1) {
    const start = summaryHeaderIndex + 1;
    const summarySlots = afterLines.slice(start, nextHeader);
    const wrappedSummary = wrapIntoSlots(generatedContent.summary, summarySlots);

    wrappedSummary.forEach((line, index) => {
      afterLines[start + index] = line;
    });
    changedSections.push("summary");
  }

  const sectionKeywords = unique([
    ...generatedContent.skills,
    ...generatedContent.keywords
  ]);

  if (
    rewriteSectionFromGenerated({
      lines: afterLines,
      aliases: EXPERIENCE_HEADERS,
      generatedAfterText: generatedContent.afterText
    })
  ) {
    changedSections.push("experience");
  }

  if (
    rewriteSectionFromGenerated({
      lines: afterLines,
      aliases: PROJECT_HEADERS,
      generatedAfterText: generatedContent.afterText
    })
  ) {
    changedSections.push("projects");
  }

  if (addKeywordsToSkillSlots(afterLines, sectionKeywords)) {
    changedSections.push("skills");
  }

  return {
    ...generatedContent,
    afterText: afterLines.join("\n"),
    bullets: generatedContent.bullets.length
      ? generatedContent.bullets
      : afterLines.filter((line) => line.length > 50).slice(0, 6),
    changeSummary: generatedContent.changeSummary?.length
      ? [
          `Updated ${changedSections.length ? changedSections.join(", ") : "resume"} text inside the original PDF layout`,
          ...generatedContent.changeSummary.filter(
            (change) => !change.toLowerCase().includes("structure")
          )
        ].slice(0, 4)
      : [
          `Updated ${changedSections.length ? changedSections.join(", ") : "resume"} text inside the original PDF layout`
        ]
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requestInput = generateResumeRequestSchema.parse(body);
    const userId = await getCurrentUserId();
    const savedMasterResume = requestInput.masterResumeId
      ? await getMasterResume(userId, requestInput.masterResumeId)
      : await getLatestMasterResume(userId);
    const masterResume =
      requestInput.masterResume?.trim() ?? masterResumeToText(savedMasterResume);

    if (masterResume.length < 80) {
      throw new Error("Save your master resume once before generating");
    }

    const input: GenerateResumeInput = {
      company: requestInput.company,
      role: requestInput.role,
      jobDescription: requestInput.jobDescription,
      masterResume
    };
    const beforeAnalysis = analyzeResumeAts({
      resumeText: masterResume,
      jobDescription: input.jobDescription,
      role: input.role
    });
    const pdfBeforeText =
      savedMasterResume?.sourceFileType === "pdf" &&
      savedMasterResume.sourceLayout?.length
        ? orderedLayoutText(savedMasterResume.sourceLayout).join("\n")
        : masterResume;
    const baseTailoredContent = await generateTailoredResume(input);
    const tailoredContent = preservePdfLineLayout(
      savedMasterResume?.sourceFileType === "pdf"
        ? savedMasterResume.sourceLayout
        : undefined,
      baseTailoredContent
    );
    const afterAnalysis = analyzeResumeAts({
      resumeText: tailoredContent.afterText,
      jobDescription: input.jobDescription,
      role: input.role
    });
    const generatedContent = {
      ...tailoredContent,
      beforeAtsScore: beforeAnalysis.score,
      atsScore: afterAnalysis.score,
      keywords: afterAnalysis.matchedKeywords.length
        ? afterAnalysis.matchedKeywords.slice(0, 12)
        : tailoredContent.keywords,
      changeSummary: [
        `ATS keyword match: ${beforeAnalysis.matchedKeywords.length}/${beforeAnalysis.jobKeywords.length} before, ${afterAnalysis.matchedKeywords.length}/${afterAnalysis.jobKeywords.length} after`,
        ...tailoredContent.changeSummary.filter(
          (change) => !change.toLowerCase().includes("keyword match")
        )
      ].slice(0, 5)
    };
    const resume = await createGeneratedResume(
      userId,
      input,
      {
        ...generatedContent,
        beforeText: pdfBeforeText,
        sourceFilePath: savedMasterResume?.sourceFilePath,
        sourceFileType: savedMasterResume?.sourceFileType,
        sourceLayout: savedMasterResume?.sourceLayout
      },
      savedMasterResume?.id
    );

    return NextResponse.json({
      resume
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to generate resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
