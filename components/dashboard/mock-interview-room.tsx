"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Microphone,
  Play,
  CheckCircle
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  MockInterviewSessionRecord,
  MockQuestion
} from "@/lib/data/mock-interviews";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function MockInterviewRoom() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<MockQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [history, setHistory] = useState<MockInterviewSessionRecord[]>([]);
  const companyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void loadHistory();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  async function loadHistory() {
    try {
      const res = await fetch("/api/mock-interview");
      if (!res.ok) return;
      const data = (await res.json()) as {
        sessions: MockInterviewSessionRecord[];
      };
      setHistory(data.sessions ?? []);
    } catch {
      /* ignore */
    }
  }

  async function startSession() {
    if (!company.trim() || !role.trim()) {
      toast.error("Add a company and role to start");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not start session");
      }
      setSessionId(data.session.id);
      setQuestions(data.questions ?? data.session.questions ?? []);
      setIndex(0);
      setSeconds(0);
      setRunning(true);
      setShowTip(false);
      toast.success("Mock interview started");
      void loadHistory();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not start session"
      );
    } finally {
      setLoading(false);
    }
  }

  async function finishSession() {
    setRunning(false);
    if (sessionId) {
      try {
        await fetch("/api/mock-interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "complete",
            sessionId,
            durationSeconds: seconds
          })
        });
        void loadHistory();
      } catch {
        /* ignore */
      }
    }
    toast.success(`Session saved · ${formatTime(seconds)}`);
    setSessionId(null);
    setQuestions([]);
    setIndex(0);
  }

  const current = questions[index];
  const inSession = questions.length > 0;

  return (
    <div className="space-y-8">
      {!inSession ? (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-[#fbfaf6]">
            <CardHeader>
              <CardTitle>Start a practice room</CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">
                Enter the company and role you are preparing for. You will get
                timed practice questions with tips — no download required.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Company
                </label>
                <Input
                  ref={companyInputRef}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. TCS, Amazon, Infosys"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Role
                </label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. SDE Intern, Analyst"
                />
              </div>
              <Button onClick={startSession} disabled={loading}>
                <Play className="h-4 w-4" weight="fill" />
                {loading ? "Starting…" : "Start mock interview"}
              </Button>
            </CardContent>
          </Card>

          <div>
            <p className="fine-label mb-3">Recent practice</p>
            {history.length ? (
              <ul className="space-y-2">
                {history.slice(0, 6).map((session) => (
                  <li
                    key={session.id}
                    className="flex items-center justify-between gap-3 border-b border-border/70 py-3 text-sm last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">
                        {session.role}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {session.company}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {session.completedAt
                        ? formatTime(session.durationSeconds)
                        : "In progress"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-dashed border-border px-5 py-8 text-center">
                <p className="text-sm leading-6 text-muted-foreground">
                  No practice sessions yet — start one with a company and role.
                </p>
                <Button
                  className="mt-4"
                  size="sm"
                  onClick={() => companyInputRef.current?.focus()}
                >
                  <Play className="h-4 w-4" weight="fill" />
                  Start mock interview
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-[#fbfaf6] px-5 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                Live practice
              </p>
              <p className="mt-1 font-semibold text-foreground">
                {role} · {company}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold tabular-nums text-primary">
                <Clock className="h-4 w-4" weight="regular" />
                {formatTime(seconds)}
              </span>
              <Button variant="outline" size="sm" onClick={finishSession}>
                <CheckCircle className="h-4 w-4" weight="regular" />
                End session
              </Button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-white/80 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              <Microphone className="h-4 w-4 text-accent" weight="regular" />
              Question {index + 1} of {questions.length}
              <span className="rounded bg-muted px-2 py-0.5 normal-case tracking-normal text-[10px] font-semibold">
                {current.category}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-2xl leading-snug text-primary sm:text-3xl">
              {current.question}
            </h3>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTip((v) => !v)}
              >
                {showTip ? "Hide tip" : "Show tip & sample"}
              </Button>
            </div>

            {showTip ? (
              <div className="mt-5 space-y-3 border-t border-border pt-5">
                <p className="text-sm leading-7 text-foreground">
                  <span className="font-semibold text-accent">Tip: </span>
                  {current.tip}
                </p>
                <p className="text-sm leading-7 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Sample answer:{" "}
                  </span>
                  {current.sampleAnswer}
                </p>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <Button
                variant="ghost"
                disabled={index === 0}
                onClick={() => {
                  setIndex((i) => Math.max(0, i - 1));
                  setShowTip(false);
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              {index < questions.length - 1 ? (
                <Button
                  onClick={() => {
                    setIndex((i) => i + 1);
                    setShowTip(false);
                  }}
                >
                  Next question
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={finishSession}>
                  Finish practice
                  <CheckCircle className="h-4 w-4" weight="regular" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
