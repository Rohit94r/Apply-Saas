"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle,
  CircleNotch,
  Clock,
  Microphone,
  Play,
  Robot,
  Sparkle,
  WarningCircle
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  MockInterviewSessionRecord,
  MockTurnRecord
} from "@/lib/data/mock-interviews";

type InterviewType = "hr" | "technical" | "mixed";
type Difficulty = "easy" | "medium" | "hard";

type AIStatus = {
  available: boolean;
  provider: string | null;
  message: string;
};

type Phase = "setup" | "live" | "summary";

type Feedback = {
  strengths: string[];
  improvements: string[];
  score: number;
};

type Summary = {
  overallScore: number;
  tips: string[];
  highlights: string[];
};

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function providerLabel(provider?: string | null, demoMode?: boolean) {
  if (demoMode || provider === "demo") return "Demo mode";
  if (provider === "gemini") return "Gemini";
  if (provider === "groq") return "Groq";
  if (provider === "openai") return "OpenAI";
  return "AI interviewer";
}

export function MockInterviewRoom() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [interviewType, setInterviewType] = useState<InterviewType>("mixed");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [totalQuestions, setTotalQuestions] = useState(6);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [turns, setTurns] = useState<MockTurnRecord[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<MockInterviewSessionRecord[]>([]);
  const [ai, setAi] = useState<AIStatus | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [resumeContext, setResumeContext] = useState<string | undefined>();
  const [resumeContextAvailable, setResumeContextAvailable] = useState(false);
  const [pendingNextIndex, setPendingNextIndex] = useState<number | null>(null);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

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
        ai?: AIStatus;
      };
      setHistory(data.sessions ?? []);
      if (data.ai) setAi(data.ai);
    } catch {
      /* ignore */
    }
  }

  async function startSession(allowDemo = false) {
    if (!company.trim() || !role.trim()) {
      toast.error("Add a company and role to start");
      return;
    }
    setLoading(true);
    setFeedback(null);
    setSummary(null);
    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start",
          company,
          role,
          interviewType,
          difficulty,
          totalQuestions,
          allowDemo
        })
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.code === "AI_UNAVAILABLE" && data.ai) {
          setAi(data.ai);
        }
        throw new Error(data.error || "Could not start session");
      }

      if (data.ai) setAi(data.ai);
      setSessionId(data.session.id);
      setTurns(data.session.turns ?? [data.turn]);
      setQuestionIndex(0);
      setSeconds(0);
      setRunning(true);
      setAnswer("");
      setDemoMode(Boolean(data.demoMode));
      setProvider(data.provider ?? null);
      setResumeContextAvailable(Boolean(data.resumeContextAvailable));
      if (typeof data.resumeContext === "string") {
        setResumeContext(data.resumeContext);
      } else {
        setResumeContext(undefined);
      }
      setPhase("live");
      toast.success(
        data.demoMode
          ? "Demo interview started (static coach)"
          : "Interview started — Apply Interviewer is ready"
      );
      void loadHistory();
      window.setTimeout(() => answerRef.current?.focus(), 200);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not start session"
      );
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer() {
    if (!sessionId || !answer.trim()) {
      toast.error("Type your answer first");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "answer",
          sessionId,
          answer: answer.trim(),
          turns,
          company,
          role,
          interviewType,
          difficulty,
          totalQuestions,
          resumeContext,
          questionIndex,
          currentQuestion: turns[questionIndex]?.question
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not submit answer");
      }

      setTurns(data.turns ?? turns);
      setDemoMode(Boolean(data.demoMode));
      setProvider(data.provider ?? provider);
      if (data.ai) setAi(data.ai);
      setAnswer("");

      if (data.done) {
        toast.success("Final question answered — wrapping up");
        await endSession(data.turns ?? turns);
      } else {
        setFeedback(data.feedback);
        // Keep current question visible while feedback shows; advance on continue.
        setPendingNextIndex(data.questionIndex ?? questionIndex + 1);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not submit answer"
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function endSession(finalTurns?: MockTurnRecord[]) {
    setRunning(false);
    const turnsToSave = finalTurns ?? turns;
    if (!sessionId) {
      setPhase("setup");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "end",
          sessionId,
          durationSeconds: seconds,
          turns: turnsToSave,
          company,
          role,
          interviewType,
          difficulty,
          totalQuestions,
          resumeContext
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not end session");
      }
      setSummary(data.summary);
      setDemoMode(Boolean(data.demoMode));
      setProvider(data.provider ?? provider);
      setPhase("summary");
      void loadHistory();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not save summary"
      );
      setPhase("summary");
      setSummary({
        overallScore: 5,
        tips: ["Practice again with clearer STAR stories."],
        highlights: ["Session ended locally — history may not have saved."]
      });
    } finally {
      setLoading(false);
    }
  }

  function resetToSetup() {
    setPhase("setup");
    setSessionId(null);
    setTurns([]);
    setQuestionIndex(0);
    setAnswer("");
    setFeedback(null);
    setSummary(null);
    setSeconds(0);
    setRunning(false);
    setPendingNextIndex(null);
  }

  const current = turns[questionIndex];
  const progressPct = Math.round(
    ((Math.min(questionIndex + 1, totalQuestions) / totalQuestions) * 100)
  );

  return (
    <div className="space-y-8">
      {ai && !ai.available && phase === "setup" ? (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-50/80 px-5 py-4 text-sm text-amber-950">
          <WarningCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <div>
            <p className="font-semibold">Live AI interviewer unavailable</p>
            <p className="mt-1 leading-6 text-amber-900/80">
              Add <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">GEMINI_API_KEY</code>{" "}
              to enable the live AI interviewer. Optional:{" "}
              <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">GROQ_API_KEY</code>{" "}
              as fallback. Or start a clearly labeled Demo mode below.
            </p>
          </div>
        </div>
      ) : null}

      {phase === "setup" ? (
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="overflow-hidden border-border/80 bg-[#fbfaf6]">
            <CardHeader className="space-y-2">
              <CardTitle className="font-serif text-3xl text-primary">
                Virtual interview room
              </CardTitle>
              <p className="text-sm leading-6 text-muted-foreground">
                Apply Interviewer asks live questions for your company and role.
                You answer in text, get brief coaching, then move to the next
                question — full practice on the web.
              </p>
              {ai?.available ? (
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <Sparkle className="h-3.5 w-3.5" weight="fill" />
                  {ai.message}
                </p>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
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
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Interview type
                </p>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["hr", "HR / Behavioral"],
                      ["technical", "Technical"],
                      ["mixed", "Mixed"]
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setInterviewType(value)}
                      className={cn(
                        "rounded-xl border px-3.5 py-2 text-sm font-medium transition",
                        interviewType === value
                          ? "border-accent bg-accent/10 text-primary"
                          : "border-border bg-white/70 text-muted-foreground hover:border-accent/40"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Difficulty
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(["easy", "medium", "hard"] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setDifficulty(value)}
                        className={cn(
                          "rounded-xl border px-3.5 py-2 text-sm font-medium capitalize transition",
                          difficulty === value
                            ? "border-accent bg-accent/10 text-primary"
                            : "border-border bg-white/70 text-muted-foreground hover:border-accent/40"
                        )}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Questions ({totalQuestions})
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={8}
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--accent))]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button onClick={() => startSession(false)} disabled={loading}>
                  {loading ? (
                    <CircleNotch className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" weight="fill" />
                  )}
                  {loading ? "Starting…" : "Start live interview"}
                </Button>
                {!ai?.available ? (
                  <Button
                    variant="outline"
                    onClick={() => startSession(true)}
                    disabled={loading}
                  >
                    Start demo mode
                  </Button>
                ) : null}
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                Resume context is loaded automatically when you have a master
                resume.{" "}
                <Link href="/dashboard/tools" className="text-accent underline-offset-2 hover:underline">
                  AI tools
                </Link>{" "}
                remain separate — this room is for live practice.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <InterviewerPreview />
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
                          {session.overallScore
                            ? ` · ${session.overallScore}/10`
                            : ""}
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
                    No practice sessions yet — set up the room and start.
                  </p>
                  <Button
                    className="mt-4"
                    size="sm"
                    onClick={() => companyInputRef.current?.focus()}
                  >
                    <Play className="h-4 w-4" weight="fill" />
                    Focus setup
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {phase === "live" && current ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-[#fbfaf6] px-5 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                Virtual interview · {providerLabel(provider, demoMode)}
              </p>
              <p className="mt-1 font-semibold text-foreground">
                {role} · {company}
              </p>
              <p className="mt-0.5 text-xs capitalize text-muted-foreground">
                {interviewType} · {difficulty}
                {resumeContextAvailable ? " · resume context on" : ""}
                {demoMode ? " · demo (not live AI)" : ""}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold tabular-nums text-primary">
                <Clock className="h-4 w-4" weight="regular" />
                {formatTime(seconds)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => void endSession()}
                disabled={loading || submitting}
              >
                <CheckCircle className="h-4 w-4" weight="regular" />
                End session
              </Button>
            </div>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <InterviewerPanel
              state={
                feedback
                  ? "coaching"
                  : submitting
                    ? "thinking"
                    : answer.trim()
                      ? "listening"
                      : "asking"
              }
              category={current.category ?? "general"}
              questionNumber={questionIndex + 1}
              total={totalQuestions}
            />

            <div className="rounded-[1.5rem] border border-border bg-white/80 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                <Microphone className="h-4 w-4 text-accent" weight="regular" />
                Question {questionIndex + 1} of {totalQuestions}
                <span className="rounded bg-muted px-2 py-0.5 normal-case tracking-normal text-[10px] font-semibold">
                  {current.category ?? "general"}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.h3
                  key={current.question}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 font-serif text-2xl leading-snug text-primary sm:text-3xl"
                >
                  {current.question}
                </motion.h3>
              </AnimatePresence>

              {feedback ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-3 rounded-2xl border border-accent/20 bg-[hsl(175_40%_96%)] p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">
                    Feedback · {feedback.score}/10
                    {demoMode ? " (demo)" : ""}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        Strengths
                      </p>
                      <ul className="mt-1 space-y-1 text-sm leading-6 text-muted-foreground">
                        {feedback.strengths.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        Improve
                      </p>
                      <ul className="mt-1 space-y-1 text-sm leading-6 text-muted-foreground">
                        {feedback.improvements.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const next = pendingNextIndex ?? questionIndex + 1;
                      setFeedback(null);
                      setPendingNextIndex(null);
                      setQuestionIndex(next);
                      window.setTimeout(() => answerRef.current?.focus(), 150);
                    }}
                  >
                    Next question
                  </Button>
                </motion.div>
              ) : (
                <div className="mt-6 space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Your answer
                  </label>
                  <Textarea
                    ref={answerRef}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer as you would say it in the interview…"
                    className="min-h-40"
                    disabled={submitting}
                  />
                  <div className="flex flex-wrap justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                      Voice answers can come later — text is enough for MVP.
                    </p>
                    <Button
                      onClick={() => void submitAnswer()}
                      disabled={submitting || !answer.trim()}
                    >
                      {submitting ? (
                        <CircleNotch className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkle className="h-4 w-4" weight="fill" />
                      )}
                      {submitting ? "Evaluating…" : "Submit answer"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {phase === "summary" ? (
        <div className="space-y-6">
          <Card className="border-border/80 bg-[#fbfaf6]">
            <CardHeader>
              <p className="text-xs font-bold uppercase tracking-wide text-accent">
                Session complete
              </p>
              <CardTitle className="font-serif text-3xl text-primary">
                {summary?.overallScore ?? "—"}/10 practice score
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {role} at {company} · {formatTime(seconds)} ·{" "}
                {providerLabel(provider, demoMode)}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {summary?.highlights?.length ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Highlights
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-foreground">
                    {summary.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          weight="fill"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {summary?.tips?.length ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Tips for next round
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-muted-foreground">
                    {summary.tips.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <Button onClick={resetToSetup}>
                  <ArrowLeft className="h-4 w-4" />
                  New interview
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/interview">Open interview guides</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

function InterviewerPreview() {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-gradient-to-br from-[#0f2a3d] via-[#123447] to-[#0d5c56] p-6 text-white shadow-sm">
      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/30 blur-2xl"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex items-center gap-4">
        <motion.div
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Robot className="h-8 w-8 text-[#7fd9c7]" weight="duotone" />
        </motion.div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7fd9c7]">
            Apply Interviewer
          </p>
          <p className="mt-1 text-sm leading-6 text-white/80">
            Calm, professional AI coach — not a creepy avatar. Asks, listens,
            coaches.
          </p>
        </div>
      </div>
    </div>
  );
}

function InterviewerPanel({
  state,
  category,
  questionNumber,
  total
}: {
  state: "asking" | "listening" | "thinking" | "coaching";
  category: string;
  questionNumber: number;
  total: number;
}) {
  const active = state === "asking" || state === "thinking";
  const statusLabel =
    state === "asking"
      ? "Asking…"
      : state === "thinking"
        ? "Evaluating…"
        : state === "coaching"
          ? "Coaching feedback"
          : "Listening to your answer";

  return (
    <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-border bg-gradient-to-br from-[#0f2a3d] via-[#123447] to-[#0d5c56] p-6 text-white">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(127,217,199,0.22),transparent_55%)]"
        animate={{ opacity: active ? [0.5, 0.85, 0.5] : 0.4 }}
        transition={{ duration: active ? 2.4 : 4, repeat: Infinity }}
      />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7fd9c7]">
          Apply Interviewer
        </p>
        <p className="mt-2 text-sm text-white/70">
          Question {questionNumber}/{total} · {category}
        </p>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center py-8">
        <motion.div
          className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white/10 ring-1 ring-white/25"
          animate={
            active
              ? { scale: [1, 1.04, 1], rotate: [0, 1.5, -1.5, 0] }
              : { y: [0, -3, 0] }
          }
          transition={{
            duration: active ? 1.8 : 3.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Robot className="h-14 w-14 text-[#7fd9c7]" weight="duotone" />
        </motion.div>
        <div className="mt-5 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#7fd9c7]"
              animate={
                active
                  ? { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }
                  : { opacity: 0.45 }
              }
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.15
              }}
            />
          ))}
        </div>
        <p className="mt-3 text-xs font-medium text-white/65">{statusLabel}</p>
      </div>
    </div>
  );
}
