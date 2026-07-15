"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle,
  CircleNotch,
  Play,
  Sparkle,
  WarningCircle
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type {
  MockInterviewSessionRecord,
  MockTurnRecord
} from "@/lib/data/mock-interviews";
import { MockInterviewRobot } from "@/components/dashboard/mock-interview-robot";
import {
  MockInterviewMeet,
  type MeetRoomState
} from "@/components/dashboard/mock-interview-meet";

type InterviewType = "hr" | "technical" | "mixed";
type Difficulty = "easy" | "medium" | "hard";
type Phase = "setup" | "live" | "summary";

type AIStatus = {
  available: boolean;
  provider: string | null;
  message: string;
};

type SttStatus = {
  available: boolean;
  message: string;
};

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

function stopSpeaking() {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
}

function speakQuestion(text: string, onEnd?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return;
  }
  stopSpeaking();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  utter.pitch = 1;
  utter.lang = "en-IN";
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => /en-IN|Indian|Google UK|Samantha|Daniel/i.test(v.name)) ||
    voices.find((v) => v.lang.toLowerCase().startsWith("en"));
  if (preferred) utter.voice = preferred;
  utter.onend = () => onEnd?.();
  utter.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utter);
}

function pickRecorderMime() {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg"
  ];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) || "";
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
  const [transcribing, setTranscribing] = useState(false);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
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
  const [stt, setStt] = useState<SttStatus | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [resumeContext, setResumeContext] = useState<string | undefined>();
  const [resumeContextAvailable, setResumeContextAvailable] = useState(false);
  const [pendingNextIndex, setPendingNextIndex] = useState<number | null>(null);
  const [sessionDone, setSessionDone] = useState(false);

  const companyInputRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    void loadHistory();
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      synth.getVoices();
    };
    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);
    return () => synth.removeEventListener("voiceschanged", loadVoices);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    if (phase !== "live") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  const speakCurrentQuestion = useCallback(
    (text: string) => {
      if (!voiceEnabled || !text.trim()) return;
      setSpeaking(true);
      speakQuestion(text, () => setSpeaking(false));
    },
    [voiceEnabled]
  );

  async function loadHistory() {
    try {
      const res = await fetch("/api/mock-interview");
      if (!res.ok) return;
      const data = (await res.json()) as {
        sessions: MockInterviewSessionRecord[];
        ai?: AIStatus;
        stt?: SttStatus;
      };
      setHistory(data.sessions ?? []);
      if (data.ai) setAi(data.ai);
      if (data.stt) setStt(data.stt);
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
    setSessionDone(false);
    stopSpeaking();
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
        if (data.stt) setStt(data.stt);
        throw new Error(data.error || "Could not start session");
      }

      if (data.ai) setAi(data.ai);
      if (data.stt) setStt(data.stt);
      setSessionId(data.session.id);
      const firstTurns = data.session.turns ?? [data.turn];
      setTurns(firstTurns);
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
          ? "Demo interview started"
          : "Interview started — Apply Interviewer is ready"
      );
      void loadHistory();
      const q = firstTurns[0]?.question;
      if (q) {
        window.setTimeout(() => speakCurrentQuestion(q), 350);
      }
      window.setTimeout(() => answerRef.current?.focus(), 400);
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
      toast.error("Speak or type your answer first");
      return;
    }
    stopSpeaking();
    setSpeaking(false);
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
      if (data.stt) setStt(data.stt);
      setAnswer("");
      setFeedback(data.feedback);

      if (data.done) {
        setSessionDone(true);
        setPendingNextIndex(null);
        toast.success("Final question answered — review feedback, then wrap up");
      } else {
        setSessionDone(false);
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
    stopSpeaking();
    setSpeaking(false);
    if (recording) stopRecording(false);

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
        highlights: ["Session ended — history may not have saved."]
      });
    } finally {
      setLoading(false);
    }
  }

  async function startRecording() {
    if (recording || submitting || feedback || transcribing) return;
    stopSpeaking();
    setSpeaking(false);

    if (stt && !stt.available) {
      toast.error(stt.message);
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Microphone not supported in this browser — type your answer");
      return;
    }

    let stream: MediaStream | null = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      chunksRef.current = [];
      const mimeType = pickRecorderMime();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        void finalizeRecording();
      };

      recorder.start(250);
      setRecording(true);
      toast.message("Listening… speak your answer", { duration: 1800 });
    } catch (error) {
      stream?.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
      mediaRecorderRef.current = null;
      const name =
        error instanceof DOMException ? error.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        toast.error("Allow microphone access to use voice answers");
      } else if (name === "NotFoundError") {
        toast.error("No microphone found — type your answer instead");
      } else {
        toast.error("Could not start the microphone — type your answer instead");
      }
    }
  }

  function stopRecording(transcribe = true) {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;
    if (!transcribe) {
      recorder.ondataavailable = null;
      recorder.onstop = null;
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
      mediaRecorderRef.current = null;
      chunksRef.current = [];
      setRecording(false);
      return;
    }
    if (recorder.state !== "inactive") {
      recorder.stop();
    }
    setRecording(false);
  }

  async function finalizeRecording() {
    const blob = new Blob(chunksRef.current, {
      type: mediaRecorderRef.current?.mimeType || "audio/webm"
    });
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    mediaRecorderRef.current = null;
    chunksRef.current = [];

    if (blob.size < 900) {
      toast.error("Recording too short — try again");
      return;
    }

    setTranscribing(true);
    try {
      const form = new FormData();
      form.append("audio", blob, "answer.webm");
      const res = await fetch("/api/mock-interview/transcribe", {
        method: "POST",
        body: form
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not transcribe audio");
      }
      const text = String(data.text || "").trim();
      setAnswer((prev) => (prev.trim() ? `${prev.trim()} ${text}` : text));
      toast.success("Voice captured — review and submit");
      window.setTimeout(() => answerRef.current?.focus(), 100);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Voice transcription failed"
      );
    } finally {
      setTranscribing(false);
    }
  }

  function goToNextQuestion() {
    if (sessionDone) {
      void endSession(turns);
      return;
    }
    const next = pendingNextIndex ?? questionIndex + 1;
    const nextQ = turns[next]?.question;
    setFeedback(null);
    setPendingNextIndex(null);
    setQuestionIndex(next);
    setAnswer("");
    if (nextQ) {
      window.setTimeout(() => speakCurrentQuestion(nextQ), 200);
    }
    window.setTimeout(() => answerRef.current?.focus(), 250);
  }

  function resetToSetup() {
    stopSpeaking();
    stopRecording(false);
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
    setSessionDone(false);
    setSpeaking(false);
    setRecording(false);
  }

  const current = turns[questionIndex];

  const roomState: MeetRoomState = feedback
    ? "coaching"
    : submitting
      ? "thinking"
      : transcribing
        ? "transcribing"
        : recording
          ? "recording"
          : speaking
            ? "speaking"
            : answer.trim()
              ? "listening"
              : "asking";

  return (
    <div className="space-y-8">
      {ai && !ai.available && phase === "setup" ? (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-50/80 px-5 py-4 text-sm text-amber-950">
          <WarningCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <div>
            <p className="font-semibold">Live AI interviewer unavailable</p>
            <p className="mt-1 leading-6 text-amber-900/80">
              Add{" "}
              <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">
                GEMINI_API_KEY
              </code>{" "}
              (preferred) or ensure{" "}
              <code className="rounded bg-white/70 px-1.5 py-0.5 text-xs">
                GROQ_API_KEY
              </code>{" "}
              is set. Voice answers need Groq Whisper. You can still start Demo
              mode.
            </p>
          </div>
        </div>
      ) : null}

      {ai?.available && stt && !stt.available && phase === "setup" ? (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-50/80 px-5 py-4 text-sm text-amber-950">
          <WarningCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <div>
            <p className="font-semibold">Voice answers unavailable</p>
            <p className="mt-1 leading-6 text-amber-900/80">
              {stt.message}. Typed answers still work with the AI interviewer.
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
                Click start to join a Meet-style call with Apply Interviewer —
                spoken questions, voice or text answers, and live coaching.
                Desktop later is for live interview assist only.
              </p>
              {ai?.available ? (
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <Sparkle className="h-3.5 w-3.5" weight="fill" />
                  {ai.message}
                  {stt?.available ? " · voice ready" : ""}
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
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Interview type
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["hr", "technical", "mixed"] as InterviewType[]).map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setInterviewType(value)}
                        className={cn(
                          "rounded-xl border px-3.5 py-2 text-sm font-medium capitalize transition",
                          interviewType === value
                            ? "border-accent bg-accent/10 text-primary"
                            : "border-border bg-white/70 text-muted-foreground hover:border-accent/40"
                        )}
                      >
                        {value}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Difficulty
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(["easy", "medium", "hard"] as Difficulty[]).map(
                      (value) => (
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
                      )
                    )}
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

              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={voiceEnabled}
                  onChange={(e) => setVoiceEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-[hsl(var(--accent))]"
                />
                Speak questions aloud (browser voice)
              </label>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button onClick={() => startSession(false)} disabled={loading}>
                  {loading ? (
                    <CircleNotch className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" weight="fill" />
                  )}
                  {loading ? "Joining…" : "Start interview"}
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
                Uses your master resume when available. Hold the mic during the
                round to answer by voice (Whisper via Groq).
              </p>
              <a
                href="/dashboard/interview"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Browse 64+ company coding question guides
                <ArrowLeft className="h-3 w-3 rotate-180" weight="regular" />
              </a>
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
                    No practice sessions yet — start one to build history in Mongo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {phase === "live" && current ? (
        <MockInterviewMeet
          company={company}
          role={role}
          interviewType={interviewType}
          difficulty={difficulty}
          providerLabel={providerLabel(provider, demoMode)}
          demoMode={demoMode}
          seconds={seconds}
          questionNumber={questionIndex + 1}
          totalQuestions={totalQuestions}
          question={current.question}
          category={current.category ?? "general"}
          roomState={roomState}
          answer={answer}
          onAnswerChange={setAnswer}
          answerRef={answerRef}
          feedback={feedback}
          sessionDone={sessionDone}
          voiceEnabled={voiceEnabled}
          speaking={speaking}
          recording={recording}
          submitting={submitting}
          transcribing={transcribing}
          loading={loading}
          sttAvailable={!stt || stt.available}
          sttMessage={stt?.message}
          resumeContextAvailable={resumeContextAvailable}
          onStartRecording={() => void startRecording()}
          onStopRecording={() => stopRecording(true)}
          onSubmitAnswer={() => void submitAnswer()}
          onReplayQuestion={() => {
            if (current.question) speakCurrentQuestion(current.question);
          }}
          onStopVoice={() => {
            stopSpeaking();
            setSpeaking(false);
          }}
          onEndInterview={() => void endSession()}
          onNext={goToNextQuestion}
        />
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
    <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-gradient-to-br from-[#0f2a3d] via-[#123447] to-[#0d5c56] p-5 text-white shadow-sm">
      <div className="relative flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
        <MockInterviewRobot mood="idle" size="sm" />
        <div className="text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7fd9c7]">
            Apply Interviewer
          </p>
          <p className="mt-1 text-sm leading-6 text-white/80">
            Starts a Google Meet–style room — speaks questions, listens to your
            voice or text, then coaches you live.
          </p>
        </div>
      </div>
    </div>
  );
}
