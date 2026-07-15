"use client";

import { type ReactNode, type RefObject, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  CircleNotch,
  ClosedCaptioning,
  Microphone,
  MicrophoneSlash,
  PaperPlaneTilt,
  PhoneDisconnect,
  User,
  VideoCamera,
  VideoCameraSlash
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
  speaking: boolean;
  recording: boolean;
  submitting: boolean;
  transcribing: boolean;
  loading: boolean;
  captionsEnabled: boolean;
  onToggleCaptions: () => void;
  cameraOn: boolean;
  cameraStream: MediaStream | null;
  cameraError: string | null;
  onToggleCamera: () => void;
  liveCaption?: string;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSubmitAnswer: () => void;
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

function statusLabel(state: MeetRoomState): string {
  switch (state) {
    case "speaking":
      return "Interviewer speaking";
    case "recording":
      return "You're speaking";
    case "thinking":
      return "Evaluating";
    case "transcribing":
      return "Capturing answer";
    case "coaching":
      return "Quick coaching";
    case "listening":
      return "Ready for your answer";
    default:
      return "Ready";
  }
}

function MeetControlButton({
  onClick,
  disabled,
  danger,
  active,
  muted,
  label,
  children,
  className
}: {
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  active?: boolean;
  muted?: boolean;
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
            ? "bg-[#d93025] text-white shadow-sm hover:bg-[#c5221f]"
            : muted
              ? "bg-[#d93025]/90 text-white hover:bg-[#c5221f]"
              : active
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-white text-foreground ring-1 ring-border/80 hover:bg-muted"
        )}
      >
        {children}
      </span>
      <span className="max-w-[4.8rem] text-center text-[10px] font-medium leading-tight text-muted-foreground sm:text-[11px]">
        {label}
      </span>
    </button>
  );
}

function CandidateTile({
  cameraOn,
  stream,
  cameraError,
  active
}: {
  cameraOn: boolean;
  stream: MediaStream | null;
  cameraError: string | null;
  active?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (cameraOn && stream) {
      video.srcObject = stream;
      void video.play().catch(() => undefined);
    } else {
      video.srcObject = null;
    }
  }, [cameraOn, stream]);

  const showVideo = cameraOn && stream && !cameraError;

  return (
    <div
      className={cn(
        "relative h-full min-h-[220px] w-full overflow-hidden rounded-2xl bg-[#eef2f4] ring-1 ring-border/70 sm:min-h-0",
        active && "ring-2 ring-accent/70"
      )}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          className="absolute inset-0 h-full w-full scale-x-[-1] object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#e8eef2] via-[#f3f6f8] to-[#dde8ea]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-border/60 sm:h-24 sm:w-24">
            <User className="h-10 w-10 text-accent sm:h-12 sm:w-12" weight="duotone" />
          </div>
          <p className="max-w-[14rem] px-4 text-center text-xs text-muted-foreground">
            {cameraError
              ? cameraError
              : cameraOn
                ? "Starting camera…"
                : "Camera off"}
          </p>
        </div>
      )}
      <div className="absolute bottom-3 left-3 rounded-md bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
        You
      </div>
      {active ? (
        <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
          Speaking
        </span>
      ) : null}
    </div>
  );
}

function InterviewerTile({
  mood,
  question,
  captionsEnabled,
  active,
  speaking
}: {
  mood: RobotMood;
  question: string;
  captionsEnabled: boolean;
  active?: boolean;
  speaking?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[220px] w-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#edf6f5] via-[#f7faf9] to-[#e8f0f2] ring-1 ring-border/70 sm:min-h-0",
        active && "ring-2 ring-accent/70"
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-8 sm:pt-6">
        <MockInterviewRobot mood={mood} size="lg" />
      </div>

      {captionsEnabled && speaking ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-12 z-10 flex justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={question}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="max-w-xl rounded-xl bg-black/70 px-4 py-2.5 text-center shadow-lg backdrop-blur-md"
            >
              <p className="text-sm leading-relaxed text-white sm:text-[15px]">
                {question}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : null}

      <div className="absolute bottom-3 left-3 rounded-md bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
        Apply Interviewer
      </div>
      {active ? (
        <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
          Speaking
        </span>
      ) : null}
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
  speaking,
  recording,
  submitting,
  transcribing,
  loading,
  captionsEnabled,
  onToggleCaptions,
  cameraOn,
  cameraStream,
  cameraError,
  onToggleCamera,
  liveCaption,
  onStartRecording,
  onStopRecording,
  onSubmitAnswer,
  onEndInterview,
  onNext
}: MockInterviewMeetProps) {
  const progressPct = Math.round(
    (Math.min(questionNumber, totalQuestions) / totalQuestions) * 100
  );
  const busy = submitting || transcribing || loading;
  const showLiveCaption =
    captionsEnabled && (recording || Boolean(liveCaption?.trim()));

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[hsl(var(--background))] text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(20,130,120,0.1), transparent 55%), radial-gradient(ellipse 55% 45% at 85% 20%, rgba(22,78,122,0.08), transparent 50%), linear-gradient(180deg, #f7f4ee 0%, #f3f0e8 45%, #efebe3 100%)"
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between gap-3 border-b border-border/70 bg-white/70 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[#d93025]" />
            <p className="truncate text-sm font-semibold text-primary sm:text-base">
              {role} · {company}
            </p>
          </div>
          <p className="mt-0.5 truncate text-[11px] capitalize text-muted-foreground sm:text-xs">
            {interviewType} · {difficulty} · {providerLabel}
            {demoMode ? " · demo" : ""} · Q{questionNumber}/{totalQuestions} ·{" "}
            {category}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full border border-border bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground sm:inline-flex">
            {statusLabel(roomState)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 font-mono text-sm font-semibold tabular-nums text-primary">
            {formatTime(seconds)}
          </span>
        </div>
      </header>

      <div className="relative z-10 h-1 bg-border/40">
        <motion.div
          className="h-full bg-accent"
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        />
      </div>

      {/* Two large side-by-side tiles */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-2 p-2 sm:gap-3 sm:p-4">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          <CandidateTile
            cameraOn={cameraOn}
            stream={cameraStream}
            cameraError={cameraError}
            active={recording}
          />
          <InterviewerTile
            mood={toRobotMood(roomState)}
            question={question}
            captionsEnabled={captionsEnabled}
            active={speaking}
            speaking={speaking}
          />
        </div>

        {/* Live user caption + answer / feedback strip */}
        <div className="shrink-0 rounded-2xl border border-border/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md sm:px-5">
          {showLiveCaption ? (
            <p className="mb-2 line-clamp-2 text-center text-sm text-muted-foreground">
              <span className="mr-1.5 text-[10px] font-bold uppercase tracking-wide text-accent">
                Live
              </span>
              {liveCaption || "Listening…"}
            </p>
          ) : null}

          {feedback ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-accent">
                  Feedback · {feedback.score}/10
                  {demoMode ? " (demo)" : ""}
                  <span className="ml-2 font-normal normal-case text-muted-foreground">
                    Auto-advancing soon…
                  </span>
                </p>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground transition hover:opacity-90 disabled:opacity-50"
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
                  <p className="text-[11px] font-semibold text-foreground">
                    Strengths
                  </p>
                  <ul className="mt-1 space-y-0.5 text-xs leading-5 text-muted-foreground">
                    {feedback.strengths.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">
                    Improve
                  </p>
                  <ul className="mt-1 space-y-0.5 text-xs leading-5 text-muted-foreground">
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
                <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Your answer
                </label>
                <p className="text-[10px] text-muted-foreground">
                  {recording
                    ? "Listening… tap mic to stop"
                    : transcribing
                      ? "Finalizing transcript…"
                      : submitting
                        ? "Evaluating…"
                        : speaking
                          ? "Wait for the question"
                          : "Mic answers instantly · type optional"}
                </p>
              </div>
              <textarea
                ref={answerRef}
                value={answer}
                onChange={(e) => onAnswerChange(e.target.value)}
                placeholder="Speak with the mic — live captions appear as you talk…"
                disabled={submitting || recording || speaking}
                rows={2}
                className="w-full resize-none rounded-xl border border-border bg-white px-3 py-2.5 text-sm leading-6 text-foreground placeholder:text-muted-foreground/60 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:opacity-60"
              />
            </div>
          )}
        </div>
      </div>

      {/* Light Meet-style control bar */}
      <footer className="relative z-10 border-t border-border/70 bg-white/85 px-3 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <p className="hidden min-w-0 flex-1 truncate text-sm text-muted-foreground md:block">
            {role} interview · {company}
          </p>

          <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-5">
            {!recording ? (
              <MeetControlButton
                label="Mic"
                onClick={onStartRecording}
                disabled={
                  Boolean(feedback) ||
                  submitting ||
                  transcribing ||
                  speaking
                }
              >
                <Microphone className="h-5 w-5 sm:h-6 sm:w-6" weight="fill" />
              </MeetControlButton>
            ) : (
              <MeetControlButton
                label="Stop"
                onClick={onStopRecording}
                active
              >
                <MicrophoneSlash
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  weight="fill"
                />
              </MeetControlButton>
            )}

            <MeetControlButton
              label={cameraOn ? "Camera" : "Cam off"}
              onClick={onToggleCamera}
              muted={!cameraOn}
            >
              {cameraOn ? (
                <VideoCamera className="h-5 w-5 sm:h-6 sm:w-6" weight="fill" />
              ) : (
                <VideoCameraSlash
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  weight="fill"
                />
              )}
            </MeetControlButton>

            <MeetControlButton
              label="Captions"
              onClick={onToggleCaptions}
              active={captionsEnabled}
            >
              <ClosedCaptioning
                className="h-5 w-5 sm:h-6 sm:w-6"
                weight="fill"
              />
            </MeetControlButton>

            <MeetControlButton
              label="Submit"
              onClick={onSubmitAnswer}
              disabled={
                Boolean(feedback) ||
                submitting ||
                recording ||
                transcribing ||
                speaking ||
                !answer.trim()
              }
            >
              {submitting ? (
                <CircleNotch className="h-5 w-5 animate-spin sm:h-6 sm:w-6" />
              ) : (
                <PaperPlaneTilt
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  weight="fill"
                />
              )}
            </MeetControlButton>

            <button
              type="button"
              onClick={onEndInterview}
              disabled={busy || recording}
              aria-label="End call"
              title="End call"
              className="mb-5 flex h-12 items-center justify-center rounded-full bg-[#d93025] px-5 text-white shadow-sm transition hover:bg-[#c5221f] disabled:opacity-40 sm:h-14 sm:px-6"
            >
              <PhoneDisconnect className="h-5 w-5 sm:h-6 sm:w-6" weight="fill" />
            </button>
          </div>

          <div className="hidden flex-1 justify-end md:flex">
            <span className="rounded-full border border-border bg-white px-3 py-1 text-[11px] font-medium text-muted-foreground">
              {questionNumber}/{totalQuestions}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
