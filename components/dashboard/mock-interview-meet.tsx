"use client";

import { type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  CircleNotch,
  Microphone,
  PaperPlaneTilt,
  PhoneDisconnect,
  SpeakerHigh,
  SpeakerSlash,
  Stop,
  User
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  MockInterviewRobot,
  type RobotMood
} from "@/components/dashboard/mock-interview-robot";

export type MeetRoomState =
  | "asking"
  | "speaking"
  | "listening"
  | "recording"
  | "thinking"
  | "transcribing"
  | "coaching";

type Feedback = {
  strengths: string[];
  improvements: string[];
  score: number;
};

type MockInterviewMeetProps = {
  company: string;
  role: string;
  interviewType: string;
  difficulty: string;
  providerLabel: string;
  demoMode: boolean;
  seconds: number;
  questionNumber: number;
  totalQuestions: number;
  question: string;
  category: string;
  roomState: MeetRoomState;
  answer: string;
  onAnswerChange: (value: string) => void;
  answerRef: RefObject<HTMLTextAreaElement | null>;
  feedback: Feedback | null;
  sessionDone: boolean;
  voiceEnabled: boolean;
  speaking: boolean;
  recording: boolean;
  submitting: boolean;
  transcribing: boolean;
  loading: boolean;
  sttAvailable: boolean;
  sttMessage?: string;
  resumeContextAvailable?: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSubmitAnswer: () => void;
  onReplayQuestion: () => void;
  onStopVoice: () => void;
  onEndInterview: () => void;
  onNext: () => void;
};

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function toRobotMood(state: MeetRoomState): RobotMood {
  switch (state) {
    case "speaking":
      return "speaking";
    case "recording":
      return "recording";
    case "listening":
    case "asking":
      return state === "listening" ? "listening" : "idle";
    case "thinking":
      return "thinking";
    case "transcribing":
      return "transcribing";
    case "coaching":
      return "coaching";
    default:
      return "idle";
  }
}

function statusChip(state: MeetRoomState): { label: string; tone: string } {
  switch (state) {
    case "speaking":
      return {
        label: "Speaking",
        tone: "border-[#7fd9c7]/40 bg-[#7fd9c7]/15 text-[#9eebdc]"
      };
    case "recording":
      return {
        label: "Recording",
        tone: "border-[#ffb4a8]/45 bg-[#ffb4a8]/15 text-[#ffc9c0]"
      };
    case "thinking":
      return {
        label: "Thinking",
        tone: "border-white/20 bg-white/10 text-white/85"
      };
    case "transcribing":
      return {
        label: "Transcribing",
        tone: "border-[#ffb4a8]/35 bg-[#ffb4a8]/10 text-[#ffc9c0]"
      };
    case "coaching":
      return {
        label: "Coaching",
        tone: "border-[#7fd9c7]/40 bg-[#7fd9c7]/15 text-[#9eebdc]"
      };
    case "listening":
      return {
        label: "Listening",
        tone: "border-white/20 bg-white/10 text-white/85"
      };
    default:
      return {
        label: "Ready",
        tone: "border-white/15 bg-white/8 text-white/75"
      };
  }
}

function MeetControlButton({
  onClick,
  disabled,
  danger,
  active,
  label,
  children,
  className
}: {
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  active?: boolean;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "group flex flex-col items-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full transition sm:h-14 sm:w-14",
          danger
            ? "bg-[#e85d4c] text-white hover:bg-[#d44c3c]"
            : active
              ? "bg-[#ffb4a8] text-[#2a1814] hover:bg-[#ff9f90]"
              : "bg-white/12 text-white hover:bg-white/20"
        )}
      >
        {children}
      </span>
      <span className="max-w-[4.5rem] text-center text-[10px] font-medium leading-tight text-white/65 sm:text-[11px]">
        {label}
      </span>
    </button>
  );
}

function CandidateTile({ name }: { name: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#152530] ring-1 ring-white/10 sm:aspect-auto sm:h-full">
      <div className="flex h-full min-h-[120px] flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1a3340] via-[#163540] to-[#12262f]">
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <User className="h-7 w-7 text-[#7fd9c7]" weight="duotone" />
        </motion.div>
        <p className="text-xs font-semibold text-white/80">You</p>
      </div>
      <div className="absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-sm">
        {name || "You"}
      </div>
    </div>
  );
}

export function MockInterviewMeet({
  company,
  role,
  interviewType,
  difficulty,
  providerLabel,
  demoMode,
  seconds,
  questionNumber,
  totalQuestions,
  question,
  category,
  roomState,
  answer,
  onAnswerChange,
  answerRef,
  feedback,
  sessionDone,
  voiceEnabled,
  speaking,
  recording,
  submitting,
  transcribing,
  loading,
  sttAvailable,
  sttMessage,
  resumeContextAvailable,
  onStartRecording,
  onStopRecording,
  onSubmitAnswer,
  onReplayQuestion,
  onStopVoice,
  onEndInterview,
  onNext
}: MockInterviewMeetProps) {
  const chip = statusChip(roomState);
  const progressPct = Math.round(
    (Math.min(questionNumber, totalQuestions) / totalQuestions) * 100
  );
  const busy = submitting || transcribing || loading;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0b141a] text-white">
      {/* Ambient meeting room backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(20,70,78,0.45), transparent 55%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(255,140,120,0.08), transparent 50%), linear-gradient(180deg, #0c1820 0%, #0b141a 50%, #091018 100%)"
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between gap-3 border-b border-white/8 bg-black/25 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#e85d4c] shadow-[0_0_8px_rgba(232,93,76,0.7)]" />
            <p className="truncate text-sm font-semibold text-white sm:text-base">
              {role} · {company}
            </p>
          </div>
          <p className="mt-0.5 truncate text-[11px] capitalize text-white/50 sm:text-xs">
            {interviewType} · {difficulty} · {providerLabel}
            {demoMode ? " · demo" : ""} · Q{questionNumber}/{totalQuestions}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span
            className={cn(
              "hidden rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:inline-flex",
              chip.tone
            )}
          >
            {chip.label}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 font-mono text-sm font-semibold tabular-nums text-white/90">
            {formatTime(seconds)}
          </span>
          <button
            type="button"
            onClick={onEndInterview}
            disabled={busy || recording}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#e85d4c] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#d44c3c] disabled:opacity-40 sm:px-4 sm:text-sm"
          >
            <PhoneDisconnect className="h-4 w-4" weight="fill" />
            <span className="hidden sm:inline">End call</span>
          </button>
        </div>
      </header>

      {/* Thin progress */}
      <div className="relative z-10 h-0.5 bg-white/5">
        <motion.div
          className="h-full bg-[#7fd9c7]"
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        />
      </div>

      {/* Stage */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-5 lg:flex-row">
        {/* Main interviewer tile */}
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-[#121e26]/90 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(15,80,78,0.35),transparent_65%)]" />

          <div className="relative flex items-start justify-between gap-2 px-4 pt-3 sm:px-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7fd9c7]">
                Apply Interviewer
              </p>
              <p className="mt-0.5 text-xs text-white/45">
                {category} · question {questionNumber}
              </p>
            </div>
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:hidden",
                chip.tone
              )}
            >
              {chip.label}
            </span>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-4 sm:py-6">
            <MockInterviewRobot mood={toRobotMood(roomState)} size="lg" />

            {/* Captions / subtitles */}
            <div className="mt-2 w-full max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="rounded-xl bg-black/45 px-4 py-3 text-center backdrop-blur-md ring-1 ring-white/10"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                    Captions
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/95 sm:text-base">
                    {question}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Answer draft / feedback overlay at bottom of main tile */}
          <div className="relative border-t border-white/8 bg-black/35 px-4 py-3 backdrop-blur-md sm:px-5">
            {feedback ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#7fd9c7]">
                    Feedback · {feedback.score}/10
                    {demoMode ? " (demo)" : ""}
                  </p>
                  <button
                    type="button"
                    onClick={onNext}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#7fd9c7] px-4 py-2 text-xs font-semibold text-[#0b141a] transition hover:bg-[#95e4d4] disabled:opacity-50"
                  >
                    {sessionDone ? (
                      loading ? (
                        <CircleNotch className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <CheckCircle className="h-3.5 w-3.5" weight="fill" />
                      )
                    ) : null}
                    {sessionDone
                      ? loading
                        ? "Saving…"
                        : "View summary"
                      : "Next question"}
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold text-white/70">
                      Strengths
                    </p>
                    <ul className="mt-1 space-y-0.5 text-xs leading-5 text-white/55">
                      {feedback.strengths.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-white/70">
                      Improve
                    </p>
                    <ul className="mt-1 space-y-0.5 text-xs leading-5 text-white/55">
                      {feedback.improvements.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wide text-white/45">
                    Your answer
                  </label>
                  <p className="text-[10px] text-white/35">
                    {recording
                      ? "Recording…"
                      : transcribing
                        ? "Transcribing…"
                        : submitting
                          ? "Evaluating…"
                          : sttAvailable
                            ? "Mic or type"
                            : "Type your answer"}
                  </p>
                </div>
                <textarea
                  ref={answerRef}
                  value={answer}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  placeholder="Speak with the mic, or type as you would answer live…"
                  disabled={submitting || recording}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm leading-6 text-white placeholder:text-white/30 focus:border-[#7fd9c7]/40 focus:outline-none focus:ring-1 focus:ring-[#7fd9c7]/30 disabled:opacity-60"
                />
              </div>
            )}
          </div>
        </div>

        {/* Side / PiP column */}
        <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-56 lg:flex-col xl:w-64">
          <div className="min-h-[120px] flex-1 lg:min-h-0 lg:flex-[1.1]">
            <CandidateTile name="You" />
          </div>
          <div className="rounded-xl bg-[#121e26]/90 p-3 ring-1 ring-white/10 sm:flex-1 lg:flex-none">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
              Meeting info
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-white/60">
              <li>
                Progress{" "}
                <span className="text-white/90">
                  {questionNumber}/{totalQuestions}
                </span>
              </li>
              <li>
                Status{" "}
                <span className="capitalize text-[#9eebdc]">{chip.label}</span>
              </li>
              {resumeContextAvailable ? (
                <li>
                  Resume context{" "}
                  <span className="text-[#9eebdc]">on</span>
                </li>
              ) : null}
              <li className="leading-5">
                Tip: Wait for the question, speak your answer, then submit.
              </li>
            </ul>
            {!sttAvailable && sttMessage ? (
              <p className="mt-2 text-[11px] leading-4 text-[#ffb4a8]/80">
                {sttMessage}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Bottom control bar — Meet-style round actions */}
      <footer className="relative z-10 border-t border-white/8 bg-black/40 px-3 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-3xl flex-wrap items-end justify-center gap-4 sm:gap-6">
          {!recording ? (
            <MeetControlButton
              label="Speak answer"
              onClick={onStartRecording}
              disabled={
                Boolean(feedback) ||
                submitting ||
                transcribing ||
                !sttAvailable
              }
            >
              <Microphone className="h-5 w-5 sm:h-6 sm:w-6" weight="fill" />
            </MeetControlButton>
          ) : (
            <MeetControlButton label="Stop" onClick={onStopRecording} active>
              <Stop className="h-5 w-5 sm:h-6 sm:w-6" weight="fill" />
            </MeetControlButton>
          )}

          <MeetControlButton
            label="Submit"
            onClick={onSubmitAnswer}
            disabled={
              Boolean(feedback) ||
              submitting ||
              recording ||
              transcribing ||
              !answer.trim()
            }
          >
            {submitting ? (
              <CircleNotch className="h-5 w-5 animate-spin sm:h-6 sm:w-6" />
            ) : (
              <PaperPlaneTilt className="h-5 w-5 sm:h-6 sm:w-6" weight="fill" />
            )}
          </MeetControlButton>

          <MeetControlButton
            label={speaking ? "Stop voice" : "Replay Q"}
            onClick={speaking ? onStopVoice : onReplayQuestion}
            disabled={!voiceEnabled || submitting || Boolean(feedback)}
          >
            {speaking ? (
              <SpeakerSlash className="h-5 w-5 sm:h-6 sm:w-6" weight="fill" />
            ) : (
              <SpeakerHigh className="h-5 w-5 sm:h-6 sm:w-6" weight="fill" />
            )}
          </MeetControlButton>

          <MeetControlButton
            label="End call"
            danger
            onClick={onEndInterview}
            disabled={busy || recording}
          >
            <PhoneDisconnect className="h-5 w-5 sm:h-6 sm:w-6" weight="fill" />
          </MeetControlButton>
        </div>
      </footer>
    </div>
  );
}
