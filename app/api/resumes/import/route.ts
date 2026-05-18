import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import mammoth from "mammoth";
import WordExtractor from "word-extractor";
import { getCurrentUserId } from "@/lib/auth";
import { upsertMasterResume } from "@/lib/data/resumes";
import type { ResumeSourceLine } from "@/types";

export const runtime = "nodejs";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const SUPPORTED_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "txt",
  "text",
  "md",
  "markdown",
  "rtf"
]);
const UPLOAD_DIR = path.join(process.cwd(), ".data", "uploads");

type ExtractedResume = {
  rawText: string;
  sourceFilePath?: string;
  sourceFileType?: string;
  sourceLayout?: ResumeSourceLine[];
};

type PdfTextItem = {
  str: string;
  transform: number[];
  width: number;
  height: number;
};

type PdfLineDraft = {
  items: PdfTextItem[];
  pageIndex: number;
  y: number;
  pageWidth: number;
  pageHeight: number;
};

type PdfJsGlobalScope = typeof globalThis & {
  DOMMatrix?: typeof DOMMatrix;
};

const SECTION_HEADERS = new Set([
  "summary",
  "work experience",
  "experience",
  "education",
  "projects",
  "skills",
  "certificate",
  "certificates",
  "certifications",
  "achievements",
  "awards"
]);

function extensionFromName(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function cleanText(value: string) {
  return value
    .replace(/\r/g, "\n")
    .replace(/\u0000/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isSectionHeader(value: string) {
  return SECTION_HEADERS.has(normalizeLine(value).toLowerCase());
}

function normalizeResumeStructure(value: string) {
  const sectionPattern = [
    "WORK EXPERIENCE",
    "CERTIFICATIONS",
    "CERTIFICATES",
    "CERTIFICATE",
    "ACHIEVEMENTS",
    "EDUCATION",
    "PROJECTS",
    "SUMMARY",
    "SKILLS",
    "AWARDS"
  ].join("|");

  return cleanText(
    value
      .replace(new RegExp(`\\s+(${sectionPattern})(?=\\s+)`, "g"), "\n\n$1\n")
      .replace(new RegExp(`^(${sectionPattern})(?=\\s+)`, "g"), "$1\n")
      .replace(/\n([A-Z][A-Z ]{3,})\s+([A-Z][a-z])/g, "\n$1\n$2")
  );
}

function shouldInsertBlankLine(
  previous: ResumeSourceLine | undefined,
  current: ResumeSourceLine
) {
  if (!previous) {
    return false;
  }

  if (previous.pageIndex !== current.pageIndex) {
    return true;
  }

  const previousHeader = isSectionHeader(previous.text);
  const currentHeader = isSectionHeader(current.text);
  const verticalGap = Math.abs(previous.y - current.y);

  return (
    currentHeader ||
    previousHeader ||
    verticalGap > Math.max(previous.height, current.height, 9) * 1.45
  );
}

function sourceLayoutToText(lines: ResumeSourceLine[]) {
  return normalizeResumeStructure(
    lines
      .map((line, index) => {
        const previous = lines[index - 1];
        const blankLine = shouldInsertBlankLine(previous, line) ? "\n" : "";
        const indent =
          previous &&
          previous.pageIndex === line.pageIndex &&
          line.x - Math.min(previous.x, line.x) > 70
            ? "  "
            : "";

        return `${blankLine}${indent}${line.text}`;
      })
      .join("\n")
  );
}

function stripRtf(value: string) {
  return cleanText(
    value
      .replace(/\\'[0-9a-fA-F]{2}/g, " ")
      .replace(/\\par[d]?/g, "\n")
      .replace(/\\tab/g, " ")
      .replace(/\\[a-zA-Z]+-?\d* ?/g, "")
      .replace(/[{}]/g, "")
  );
}

function ensurePdfJsNodeGlobals() {
  const scope = globalThis as PdfJsGlobalScope;

  if (scope.DOMMatrix) {
    return;
  }

  class NodeDOMMatrix {
    a = 1;
    b = 0;
    c = 0;
    d = 1;
    e = 0;
    f = 0;
    m11 = 1;
    m12 = 0;
    m13 = 0;
    m14 = 0;
    m21 = 0;
    m22 = 1;
    m23 = 0;
    m24 = 0;
    m31 = 0;
    m32 = 0;
    m33 = 1;
    m34 = 0;
    m41 = 0;
    m42 = 0;
    m43 = 0;
    m44 = 1;
    is2D = true;
    isIdentity = true;

    constructor(init?: number[] | string) {
      if (Array.isArray(init)) {
        this.applyArray(init);
      }
    }

    private applyArray(values: number[]) {
      if (values.length >= 6) {
        [this.a, this.b, this.c, this.d, this.e, this.f] = values;
        this.m11 = this.a;
        this.m12 = this.b;
        this.m21 = this.c;
        this.m22 = this.d;
        this.m41 = this.e;
        this.m42 = this.f;
      }
    }

    multiplySelf() {
      return this;
    }

    preMultiplySelf() {
      return this;
    }

    translate() {
      return this;
    }

    scale() {
      return this;
    }

    invertSelf() {
      return this;
    }
  }

  scope.DOMMatrix = NodeDOMMatrix as unknown as typeof DOMMatrix;
}

async function extractPdf(buffer: Buffer) {
  ensurePdfJsNodeGlobals();

  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(buffer),
    disableFontFace: true,
    isEvalSupported: false,
    useSystemFonts: true
  });
  const document = await loadingTask.promise;
  const lines: ResumeSourceLine[] = [];

  try {
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1 });
      const content = await page.getTextContent();
      const drafts: PdfLineDraft[] = [];
      const items = (content.items as unknown[]).flatMap((item) => {
        const candidate = item as Partial<PdfTextItem>;

        if (
          typeof candidate.str !== "string" ||
          !candidate.str.trim() ||
          !Array.isArray(candidate.transform)
        ) {
          return [];
        }

        return [
          {
            str: candidate.str.replace(/\s+/g, " ").trim(),
            transform: candidate.transform,
            width: candidate.width ?? 0,
            height: candidate.height ?? 0
          }
        ];
      });

      for (const item of items) {
        const y = item.transform[5];
        const existing = drafts.find((line) => Math.abs(line.y - y) <= 2.5);

        if (existing) {
          existing.items.push(item);
        } else {
          drafts.push({
            items: [item],
            pageIndex: pageNumber - 1,
            y,
            pageWidth: viewport.width,
            pageHeight: viewport.height
          });
        }
      }

      drafts
        .sort((a, b) => b.y - a.y)
        .forEach((line) => {
          const sorted = line.items.sort((a, b) => a.transform[4] - b.transform[4]);
          const text = sorted
            .map((item, index) => {
              const previous = sorted[index - 1];

              if (!previous) {
                return item.str;
              }

              const gap = item.transform[4] - (previous.transform[4] + previous.width);
              return `${gap > 3 ? " " : ""}${item.str}`;
            })
            .join("")
            .replace(/\s+/g, " ")
            .trim();
          const xValues = sorted.map((item) => item.transform[4]);
          const rightValues = sorted.map((item) => item.transform[4] + item.width);
          const heights = sorted.map((item) => Math.max(item.height, Math.abs(item.transform[3])));
          const x = Math.min(...xValues);
          const width = Math.max(...rightValues) - x;
          const height = Math.max(...heights, 8);

          if (text) {
            lines.push({
              pageIndex: line.pageIndex,
              text,
              x,
              y: line.y,
              width,
              height,
              fontSize: Math.max(7, Math.min(18, height || 10)),
              pageWidth: line.pageWidth,
              pageHeight: line.pageHeight
            });
          }
        });
    }

    const orderedLines = lines.sort(
      (a, b) => a.pageIndex - b.pageIndex || b.y - a.y || a.x - b.x
    );

    return {
      rawText: sourceLayoutToText(orderedLines),
      sourceLayout: orderedLines
    };
  } finally {
    await document.destroy();
  }
}

async function extractWordDoc(buffer: Buffer) {
  const extractor = new WordExtractor();
  const document = await extractor.extract(buffer);

  return document.getBody();
}

function safeFileName(value: string) {
  return value.replace(/[^a-z0-9.-]+/gi, "-").replace(/-+/g, "-").slice(0, 90);
}

async function saveUploadedPdf(userId: string, file: File, buffer: Buffer) {
  const safeUser = safeFileName(userId);
  const name = `${safeUser}-${Date.now()}-${safeFileName(file.name) || "resume.pdf"}`;
  const targetPath = path.join(UPLOAD_DIR, name);

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(targetPath, buffer);

  return targetPath;
}

async function extractResumeText(
  userId: string,
  file: File,
  buffer: Buffer
): Promise<ExtractedResume> {
  const extension = extensionFromName(file.name);

  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    throw new Error("Upload a PDF, Word document, text, Markdown, or RTF file");
  }

  if (extension === "pdf") {
    const pdf = await extractPdf(buffer);

    return {
      rawText: normalizeResumeStructure(pdf.rawText),
      sourceFilePath: await saveUploadedPdf(userId, file, buffer),
      sourceFileType: "pdf",
      sourceLayout: pdf.sourceLayout
    };
  }

  if (extension === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return {
      rawText: normalizeResumeStructure(result.value),
      sourceFileType: "docx"
    };
  }

  if (extension === "doc") {
    return {
      rawText: normalizeResumeStructure(await extractWordDoc(buffer)),
      sourceFileType: "doc"
    };
  }

  const text = buffer.toString("utf8");
  return {
    rawText: normalizeResumeStructure(extension === "rtf" ? stripRtf(text) : text),
    sourceFileType: extension
  };
}

function titleFromFileName(fileName: string) {
  return (
    fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]+/g, " ")
      .trim() || "Master resume"
  );
}

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      throw new Error("Choose a resume file to upload");
    }

    if (file.size > MAX_RESUME_BYTES) {
      throw new Error("Resume upload must be 10MB or smaller");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extracted = await extractResumeText(userId, file, buffer);
    const rawText = extracted.rawText;

    if (rawText.length < 80) {
      throw new Error("Could not read enough resume text from this file");
    }

    const masterResume = await upsertMasterResume(userId, {
      title: titleFromFileName(file.name),
      sourceName: file.name,
      sourceFilePath: extracted.sourceFilePath,
      sourceFileType: extracted.sourceFileType,
      sourceLayout: extracted.sourceLayout,
      rawText
    });

    return NextResponse.json({ masterResume });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to import resume";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
