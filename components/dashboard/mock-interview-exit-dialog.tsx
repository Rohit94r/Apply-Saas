"use client";

import { CheckCircle, Trophy, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SessionExitStats = {
  answered: number;
  totalQuestions: number;
  strongAnswers: number;
  codingPassed: number;
  codingTotal: number;
  overallScore?: number;
  company: string;
  role: string;
};

export function MockInterviewExitDialog({
  open,
  stats,
  onClose
}: {
  open: boolean;
  stats: SessionExitStats;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-accent">
              Meeting ended
            </p>
            <h3 className="mt-1 font-serif text-2xl text-primary">Session results</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {stats.role} at {stats.company}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <StatBox
            label="Questions answered"
            value={`${stats.answered}/${stats.totalQuestions}`}
          />
          <StatBox
            label="Strong answers (7+)"
            value={String(stats.strongAnswers)}
            accent
          />
          {stats.codingTotal > 0 ? (
            <>
              <StatBox
                label="Coding solved"
                value={`${stats.codingPassed}/${stats.codingTotal}`}
              />
              <StatBox
                label="Practice score"
                value={stats.overallScore ? `${stats.overallScore}/10` : "—"}
              />
            </>
          ) : (
            <StatBox
              label="Practice score"
              value={stats.overallScore ? `${stats.overallScore}/10` : "—"}
              className="col-span-2"
            />
          )}
        </div>

        <div className="mt-5 rounded-xl bg-accent/5 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Trophy className="h-4 w-4 text-accent" weight="fill" />
            What you completed
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-accent" weight="fill" />
              {stats.answered} verbal answer{stats.answered === 1 ? "" : "s"} recorded
            </li>
            {stats.strongAnswers > 0 ? (
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-accent" weight="fill" />
                {stats.strongAnswers} rated strong by the interviewer
              </li>
            ) : null}
            {stats.codingTotal > 0 ? (
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-accent" weight="fill" />
                {stats.codingPassed} coding problem{stats.codingPassed === 1 ? "" : "s"} passed tests
              </li>
            ) : null}
          </ul>
        </div>

        <Button className="mt-5 w-full" onClick={onClose}>
          View full summary
        </Button>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  accent,
  className
}: {
  label: string;
  value: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-[#fbfaf6] p-3",
        className
      )}
    >
      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-2xl font-bold",
          accent ? "text-accent" : "text-primary"
        )}
      >
        {value}
      </p>
    </div>
  );
}
