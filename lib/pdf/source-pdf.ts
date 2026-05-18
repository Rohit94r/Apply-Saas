import fs from "node:fs/promises";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { ResumeSourceLine } from "@/types";

type PreservePdfInput = {
  sourceFilePath?: string;
  sourceLayout?: ResumeSourceLine[];
  beforeText?: string;
  afterText?: string;
};

function normalizeLine(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function splitComparableLines(value?: string) {
  return (
    value
      ?.split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean) ?? []
  );
}

function orderedLayoutLines(layout: ResumeSourceLine[]) {
  return [...layout].sort(
    (a, b) => a.pageIndex - b.pageIndex || b.y - a.y || a.x - b.x
  );
}

function maxWidthForLayoutLine({
  index,
  layout,
  layoutLines,
  pageWidth
}: {
  index: number;
  layout: ResumeSourceLine;
  layoutLines: ResumeSourceLine[];
  pageWidth: number;
}) {
  const nextColumn = layoutLines.find(
    (candidate, candidateIndex) =>
      candidateIndex !== index &&
      candidate.pageIndex === layout.pageIndex &&
      Math.abs(candidate.y - layout.y) <= 2.5 &&
      candidate.x > layout.x
  );

  if (nextColumn) {
    return Math.max(24, nextColumn.x - layout.x - 8);
  }

  return Math.max(
    24,
    Math.min(pageWidth - layout.x - 28, layout.pageWidth - layout.x - 28)
  );
}

function fitText({
  font,
  text,
  maxWidth,
  startSize
}: {
  font: Awaited<ReturnType<PDFDocument["embedFont"]>>;
  text: string;
  maxWidth: number;
  startSize: number;
}) {
  let size = Math.max(8, Math.min(12, startSize));
  const minimumReadableSize = Math.max(7.5, size * 0.86);

  while (
    size > minimumReadableSize &&
    font.widthOfTextAtSize(text, size) > maxWidth
  ) {
    size -= 0.25;
  }

  if (font.widthOfTextAtSize(text, size) > maxWidth) {
    return null;
  }

  return { text, size };
}

export async function renderPreservedSourcePdf({
  sourceFilePath,
  sourceLayout,
  beforeText,
  afterText
}: PreservePdfInput) {
  if (!sourceFilePath) {
    return null;
  }

  const sourceBytes = await fs.readFile(sourceFilePath).catch(() => null);

  if (!sourceBytes) {
    return null;
  }

  if (!sourceLayout?.length || !afterText?.trim()) {
    return Buffer.from(sourceBytes);
  }

  const beforeLines = splitComparableLines(beforeText);
  const afterLines = splitComparableLines(afterText);
  const layoutLines = orderedLayoutLines(sourceLayout);

  if (!beforeLines.length || !afterLines.length || !layoutLines.length) {
    return Buffer.from(sourceBytes);
  }

  const document = await PDFDocument.load(new Uint8Array(sourceBytes));
  const font = await document.embedFont(StandardFonts.Helvetica);
  const pages = document.getPages();
  const lineCount = Math.min(beforeLines.length, afterLines.length, layoutLines.length);

  for (let index = 0; index < lineCount; index += 1) {
    const beforeLine = beforeLines[index];
    const afterLine = afterLines[index];

    if (!afterLine || normalizeLine(beforeLine) === normalizeLine(afterLine)) {
      continue;
    }

    const layout = layoutLines[index];
    const page = pages[layout.pageIndex];

    if (!page) {
      continue;
    }

    const pageWidth = page.getWidth();
    const maxWidth = maxWidthForLayoutLine({
      index,
      layout,
      layoutLines,
      pageWidth
    });
    const fontSize = Math.max(6, Math.min(12, layout.fontSize || layout.height || 9));
    const fitted = fitText({
      font,
      text: afterLine,
      maxWidth,
      startSize: fontSize
    });

    if (!fitted) {
      continue;
    }

    const y = Math.max(0, layout.y - 1);
    const height = Math.max(layout.height + 5, fitted.size + 4);

    page.drawRectangle({
      x: Math.max(0, layout.x - 2),
      y: Math.max(0, y - 2),
      width: Math.min(pageWidth - layout.x + 2, maxWidth + 4),
      height,
      color: rgb(1, 1, 1)
    });
    page.drawText(fitted.text, {
      x: layout.x,
      y,
      size: fitted.size,
      font,
      color: rgb(0.08, 0.09, 0.12),
      maxWidth
    });
  }

  return Buffer.from(await document.save());
}
