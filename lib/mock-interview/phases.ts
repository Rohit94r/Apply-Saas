import type { MockInterviewType } from "@/lib/ai/mock-interview";
import { normalizeQuestionCount } from "@/lib/mock-interview/flow";

/**
 * Realistic mock-interview progression:
 * 1. Intro / self (early)
 * 2. Role-related skills & projects (middle)
 * 3. Company-specific / PYQ-aligned (later)
 * Coding (when enabled) inserts basic → company-flavored turns.
 */
export type InterviewPhase =
  | "intro"
  | "role"
  | "company"
  | "coding-basic"
  | "coding-company"
  | "closing";

export type PhasePlanOptions = {
  includeCoding?: boolean;
  interviewType?: MockInterviewType;
};

export function codingSlotIndexes(
  totalQuestions: number,
  opts: PhasePlanOptions = {}
): { basic: number | null; company: number | null } {
  const total = normalizeQuestionCount(totalQuestions);
  const allowCoding =
    Boolean(opts.includeCoding) && (opts.interviewType ?? "mixed") !== "hr";

  if (!allowCoding) return { basic: null, company: null };

  // Mid-session basic coding; later company-flavored when there is room.
  const basic = Math.min(Math.max(2, Math.floor(total * 0.4)), total - 2);
  const company =
    total >= 7
      ? Math.min(Math.max(basic + 2, Math.floor(total * 0.7)), total - 1)
      : null;

  if (company !== null && company === basic) {
    return { basic, company: Math.min(basic + 1, total - 1) };
  }
  return { basic, company };
}

/**
 * Map 0-based question index → interview phase for a session of 5–10 questions.
 */
export function phaseFromIndex(
  questionIndex: number,
  totalQuestions: number,
  opts: PhasePlanOptions = {}
): InterviewPhase {
  const total = normalizeQuestionCount(totalQuestions);
  const index = Math.max(0, Math.min(questionIndex, total - 1));
  const slots = codingSlotIndexes(total, opts);

  if (slots.basic !== null && index === slots.basic) return "coding-basic";
  if (slots.company !== null && index === slots.company) {
    return "coding-company";
  }

  const introCount = total <= 5 ? 1 : 2;
  if (index < introCount) return "intro";

  // Last question leans closing unless it was reserved for coding above.
  if (index === total - 1) return "closing";

  // After intro: first half of remaining → role; later → company-specific.
  const afterIntro = index - introCount;
  const midSpan = Math.max(1, total - introCount - 1);
  const roleSpan = Math.ceil(midSpan * 0.55);

  if (afterIntro < roleSpan) return "role";
  return "company";
}

export function phaseLabel(phase: InterviewPhase): string {
  switch (phase) {
    case "intro":
      return "Introduction / background";
    case "role":
      return "Role fit, skills & projects";
    case "company":
      return "Company-specific / PYQ-aligned";
    case "coding-basic":
      return "Basic coding exercise";
    case "coding-company":
      return "Company-style coding exercise";
    case "closing":
      return "Closing / candidate questions";
  }
}

export function phaseCategoryHint(phase: InterviewPhase): string {
  switch (phase) {
    case "intro":
      return "intro";
    case "role":
      return "technical";
    case "company":
      return "company";
    case "coding-basic":
    case "coding-company":
      return "coding";
    case "closing":
      return "closing";
  }
}

export function buildPhasePlan(
  totalQuestions: number,
  opts: PhasePlanOptions = {}
): InterviewPhase[] {
  const total = normalizeQuestionCount(totalQuestions);
  return Array.from({ length: total }, (_, index) =>
    phaseFromIndex(index, total, opts)
  );
}
