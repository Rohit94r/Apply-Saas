export const MIN_INTERVIEW_QUESTIONS = 5;
export const MAX_INTERVIEW_QUESTIONS = 10;
export const DEFAULT_INTERVIEW_QUESTIONS = 6;

export function normalizeQuestionCount(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return DEFAULT_INTERVIEW_QUESTIONS;
  }
  return Math.min(
    MAX_INTERVIEW_QUESTIONS,
    Math.max(MIN_INTERVIEW_QUESTIONS, Math.trunc(value))
  );
}

export function getActiveQuestionIndex(
  turns: Array<{ answer?: string }>,
  totalQuestions: number
): number {
  const limit = normalizeQuestionCount(totalQuestions);
  const pending = turns.slice(0, limit).findIndex((turn) => !turn.answer?.trim());
  return pending === -1 ? Math.min(turns.length, limit) : pending;
}

export function hasReachedQuestionLimit(
  questionIndex: number,
  totalQuestions: number
): boolean {
  return questionIndex + 1 >= normalizeQuestionCount(totalQuestions);
}
