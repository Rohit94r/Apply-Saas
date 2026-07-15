"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Microphone, Sparkle } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import type { MockInterviewSessionRecord } from "@/lib/data/mock-interviews";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function MockInterviewProgress() {
  const [sessions, setSessions] = useState<MockInterviewSessionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/mock-interview");
        if (!res.ok) return;
        const data = (await res.json()) as {
          sessions?: MockInterviewSessionRecord[];
        };
        setSessions((data.sessions ?? []).slice(0, 5));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Card className="p-5">
        <p className="text-sm text-muted-foreground">Loading mock interview practice…</p>
      </Card>
    );
  }

  if (!sessions.length) {
    return (
      <Card className="p-5">
        <p className="fine-label mb-2">Mock interview practice</p>
        <p className="text-sm text-muted-foreground">
          No practice sessions yet.{" "}
          <Link href="/dashboard/mock-interview" className="font-semibold text-primary hover:underline">
            Start a mock interview
          </Link>
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="fine-label mb-1">Mock interview practice</p>
          <h3 className="font-serif text-xl text-primary">Latest 5 sessions</h3>
        </div>
        <Link
          href="/dashboard/mock-interview"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Practice again
        </Link>
      </div>
      <ul className="space-y-3">
        {sessions.map((session) => {
          const answered = session.turns.filter((t) => t.answer?.trim()).length;
          const strong = session.turns.filter((t) => (t.score ?? 0) >= 7).length;
          const codingPassed = session.turns.filter((t) => t.codePassed).length;

          return (
            <li
              key={session.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-[#fbfaf6] p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {session.role} · {session.company}
                </p>
                <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Microphone className="h-3 w-3" />
                    {answered}/{session.totalQuestions} answered
                  </span>
                  {strong > 0 ? (
                    <span className="inline-flex items-center gap-1 text-accent">
                      <Sparkle className="h-3 w-3" weight="fill" />
                      {strong} strong
                    </span>
                  ) : null}
                  {codingPassed > 0 ? (
                    <span>{codingPassed} coding passed</span>
                  ) : null}
                </p>
              </div>
              <div className="shrink-0 text-right text-xs text-muted-foreground">
                {session.overallScore ? (
                  <p className="font-bold text-accent">{session.overallScore}/10</p>
                ) : null}
                <p className="tabular-nums">
                  {session.completedAt
                    ? formatTime(session.durationSeconds)
                    : "In progress"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
