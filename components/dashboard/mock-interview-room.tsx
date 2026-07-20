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
import {
  MockInterviewMeet,
  type MeetRoomState
} from "@/components/dashboard/mock-interview-meet";
import {
  MockInterviewExitDialog,
  type SessionExitStats
} from "@/components/dashboard/mock-interview-exit-dialog";
import { VoiceSelector } from "@/components/dashboard/voice-selector";
import { InterviewerAvatar } from "@/components/dashboard/interviewer-avatar";
import {
  DEFAULT_PERSONA_ID,
  getInterviewPersona,
  INTERVIEW_LANGUAGES,
  INTERVIEW_PERSONAS,
  type InterviewPersona
} from "@/lib/ai/interview-personas";
import {
  MAX_INTERVIEW_QUESTIONS,
  MIN_INTERVIEW_QUESTIONS
} from "@/lib/mock-interview/flow";

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
  whisper?: boolean;
  message: string;
};

type VoiceOption = {
  id: string;
  name: string;
  label: string;
};

type LanguageOption = {
  code: string;
  label: string;
  speechLang: string;
};

type VoicesCatalog = {
  voices?: VoiceOption[];
  personas?: InterviewPersona[];
  languages?: LanguageOption[];
  defaultVoiceId?: string;
  defaultPersonaId?: string;
};

type TtsStatus = {
  available: boolean;
  message: string;
  provider?: string;
};

function computeExitStats(
  turns: MockTurnRecord[],
  totalQuestions: number,
  company: string,
  role: string,
  overallScore?: number
): SessionExitStats {
  const answered = turns.filter((t) => t.answer?.trim()).length;
  const strongAnswers = turns.filter((t) => (t.score ?? 0) >= 7).length;
  const codingTurns = turns.filter((t) => t.codeProblem);
  const codingPassed = turns.filter((t) => t.codePassed).length;

  return {
    answered,
    totalQuestions,
    strongAnswers,
    codingPassed,
    codingTotal: codingTurns.length,
    overallScore,
    company,
    role
  };
}

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

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

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

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
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

function stopBrowserSpeech() {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
}

/**
 * Pick the best available browser voice for an Indian English interviewer.
 * Priority: en-IN voices → Google Indian English → British English → American English → any en.
 */
function pickInterviewerVoice(
  voices: SpeechSynthesisVoice[],
  langCode: string
): SpeechSynthesisVoice | undefined {
  const speechLang = langCode || "en-IN";

  if (speechLang !== "en-IN") {
    return (
      voices.find((v) => v.lang.toLowerCase() === speechLang.toLowerCase()) ??
      voices.find((v) => v.lang.toLowerCase().startsWith(speechLang.slice(0, 2).toLowerCase()))
    );
  }

  return (
    voices.find((v) => v.lang.toLowerCase() === "en-in") ??
    voices.find((v) => /india|indian/i.test(v.name)) ??
    voices.find((v) => /Google.*India/i.test(v.name)) ??
    voices.find((v) => v.lang.toLowerCase() === "en-gb") ??
    voices.find((v) => /Daniel|Kate|Serena|Moira/i.test(v.name)) ??
    voices.find((v) => v.lang.toLowerCase() === "en-us") ??
    voices.find((v) => /Samantha|Karen|Google US/i.test(v.name)) ??
    voices.find((v) => v.lang.toLowerCase().startsWith("en"))
  );
}

/**
 * Speak text using the browser's built-in TTS — tuned to sound like a
 * calm, clear human interviewer. Splits long text into sentence chunks
 * for more natural pacing.
 */
function speakBrowserFallback(text: string, onEnd?: () => void, langCode = "en-IN") {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return;
  }
  stopBrowserSpeech();

  const voices = window.speechSynthesis.getVoices();
  const voice = pickInterviewerVoice(voices, langCode);

  // Split into sentence-sized chunks for natural pauses
  const sentences = text
    .replace(/([.!?])\s+/g, "$1\n")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks = sentences.length > 0 ? sentences : [text];
  let chunkIndex = 0;

  const speakChunk = () => {
    if (chunkIndex >= chunks.length) {
      onEnd?.();
      return;
    }

    const utter = new SpeechSynthesisUtterance(chunks[chunkIndex]);
    utter.rate = 0.92; // slightly slower = clearer, more human
    utter.pitch = 1.0; // neutral pitch
    utter.volume = 1.0;

    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    } else {
      utter.lang = langCode;
    }

    utter.onend = () => {
      chunkIndex++;
      // Small natural pause between sentences
      window.setTimeout(speakChunk, 180);
    };
    utter.onerror = () => {
      chunkIndex++;
      speakChunk();
    };

    window.speechSynthesis.speak(utter);
  };

  speakChunk();
}

export function MockInterviewRoom() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [interviewType, setInterviewType] = useState<InterviewType>("mixed");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [includeCoding, setIncludeCoding] = useState(false);
  const [languageCode, setLanguageCode] = useState("en");
  const [voiceId, setVoiceId] = useState(DEFAULT_PERSONA_ID);
  const [voiceOptions, setVoiceOptions] = useState<VoiceOption[]>(
    INTERVIEW_PERSONAS.map((p) => ({
      id: p.id,
      name: p.name,
      label: `${p.name} — ${p.role}`
    }))
  );
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>(
    INTERVIEW_LANGUAGES.map((l) => ({
      code: l.code,
      label: l.label,
      speechLang: l.speechLang
    }))
  );
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [totalQuestions, setTotalQuestions] = useState(6);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [turns, setTurns] = useState<MockTurnRecord[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [liveCaption, setLiveCaption] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<MockInterviewSessionRecord[]>([]);
  const [ai, setAi] = useState<AIStatus | null>(null);
  const [stt, setStt] = useState<SttStatus | null>(null);
  const [tts, setTts] = useState<TtsStatus | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const [resumeContext, setResumeContext] = useState<string | undefined>();
  const [resumeContextAvailable, setResumeContextAvailable] = useState(false);
  const [pendingNextIndex, setPendingNextIndex] = useState<number | null>(null);
  const [sessionDone, setSessionDone] = useState(false);
  const [browserSpeechAvailable, setBrowserSpeechAvailable] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [exitStats, setExitStats] = useState<SessionExitStats | null>(null);
  const speechLangRef = useRef("en-IN");
  const languageCodeRef = useRef(languageCode);
  languageCodeRef.current = languageCode;

  const companyInputRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const usingWebSpeechRef = useRef(false);
  const finalTranscriptRef = useRef("");
  const autoSubmitTimerRef = useRef<number | null>(null);
  const autoAdvanceTimerRef = useRef<number | null>(null);
  const autoListenTimerRef = useRef<number | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const answerSnapshotRef = useRef("");
  const submitAnswerRef = useRef<() => Promise<void>>(async () => undefined);
  const startListeningRef = useRef<() => Promise<void>>(async () => undefined);
  const speakQuestionRef = useRef<(text: string) => void>(() => undefined);

  useEffect(() => {
    answerSnapshotRef.current = answer;
  }, [answer]);

  useEffect(() => {
    const lang = languageOptions.find((item) => item.code === languageCode);
    speechLangRef.current = lang?.speechLang ?? "en-IN";
  }, [languageCode, languageOptions]);

  useEffect(() => {
    setBrowserSpeechAvailable(Boolean(getSpeechRecognitionCtor()));
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

  const clearAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    stopBrowserSpeech();
  }, []);

  const clearTimers = useCallback(() => {
    if (autoSubmitTimerRef.current) {
      window.clearTimeout(autoSubmitTimerRef.current);
      autoSubmitTimerRef.current = null;
    }
    if (autoAdvanceTimerRef.current) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (autoListenTimerRef.current) {
      window.clearTimeout(autoListenTimerRef.current);
      autoListenTimerRef.current = null;
    }
  }, []);

  const stopCamera = useCallback(() => {
    cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
    cameraStreamRef.current = null;
    setCameraStream(null);
  }, []);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera not supported in this browser");
      setCameraOn(false);
      return;
    }
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      cameraStreamRef.current = stream;
      setCameraStream(stream);
      setCameraError(null);
      setCameraOn(true);
    } catch (error) {
      const name = error instanceof DOMException ? error.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setCameraError("Camera permission denied — using avatar");
      } else if (name === "NotFoundError") {
        setCameraError("No camera found — using avatar");
      } else {
        setCameraError("Could not open camera — using avatar");
      }
      setCameraOn(false);
      stopCamera();
    }
  }, [stopCamera]);

  const toggleCamera = useCallback(() => {
    if (cameraOn && cameraStreamRef.current) {
      stopCamera();
      setCameraOn(false);
      return;
    }
    void startCamera();
  }, [cameraOn, startCamera, stopCamera]);

  useEffect(() => {
    return () => {
      clearAudio();
      clearTimers();
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
      recognitionRef.current?.abort();
      stopCamera();
    };
  }, [clearAudio, clearTimers, stopCamera]);

  useEffect(() => {
    if (phase !== "live") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    void startCamera();
    return () => {
      document.body.style.overflow = prev;
      stopCamera();
    };
  }, [phase, startCamera, stopCamera]);

  const stopWebSpeech = useCallback(() => {
    const rec = recognitionRef.current;
    if (rec) {
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      try {
        rec.stop();
      } catch {
        try {
          rec.abort();
        } catch {
          /* ignore */
        }
      }
      recognitionRef.current = null;
    }
    usingWebSpeechRef.current = false;
  }, []);

  const speakCurrentQuestion = useCallback(
    (text: string) => {
      if (!voiceEnabled || !text.trim()) {
        setSpeaking(false);
        autoListenTimerRef.current = window.setTimeout(() => {
          void startListeningRef.current();
        }, 600);
        return;
      }

      clearAudio();
      setSpeaking(true);

      const finishSpeaking = () => {
        setSpeaking(false);
        autoListenTimerRef.current = window.setTimeout(() => {
          void startListeningRef.current();
        }, 800);
      };

      void (async () => {
        try {
          const res = await fetch("/api/mock-interview/speak", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, voiceId, languageCode })
          });

          if (!res.ok) {
            throw new Error("tts unavailable");
          }

          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          audioUrlRef.current = url;
          const audio = new Audio(url);
          audio.playbackRate = 0.94;
          audioRef.current = audio;
          audio.onended = () => {
            clearAudio();
            finishSpeaking();
          };
          audio.onerror = () => {
            clearAudio();
            speakBrowserFallback(text, finishSpeaking, speechLangRef.current);
          };
          await audio.play();
        } catch {
          speakBrowserFallback(text, finishSpeaking, speechLangRef.current);
        }
      })();
    },
    [voiceEnabled, clearAudio, voiceId, languageCode]
  );

  useEffect(() => {
    speakQuestionRef.current = speakCurrentQuestion;
  }, [speakCurrentQuestion]);

  async function loadHistory() {
    try {
      const res = await fetch("/api/mock-interview");
      if (!res.ok) return;
      const data = (await res.json()) as {
        sessions: MockInterviewSessionRecord[];
        ai?: AIStatus;
        stt?: SttStatus;
        tts?: TtsStatus;
        voices?: VoicesCatalog;
      };
      setHistory((data.sessions ?? []).slice(0, 5));
      if (data.ai) setAi(data.ai);
      if (data.stt) setStt(data.stt);
      if (data.tts) setTts(data.tts);
      const catalog = data.voices;
      if (catalog?.personas?.length) {
        setVoiceOptions(
          catalog.personas.map((p) => ({
            id: p.id,
            name: p.name,
            label: `${p.name} — ${p.role}`
          }))
        );
        setVoiceId(
          catalog.defaultPersonaId ??
            catalog.defaultVoiceId ??
            catalog.personas[0].id
        );
      } else if (catalog?.voices?.length) {
        setVoiceOptions(catalog.voices);
        setVoiceId(catalog.defaultVoiceId ?? catalog.voices[0].id);
      }
      if (catalog?.languages?.length) {
        setLanguageOptions(catalog.languages);
      }
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
    clearTimers();
    clearAudio();
    stopWebSpeech();
    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start",
          company,
          role,
          jobDescription: jobDescription.trim() || undefined,
          interviewType,
          difficulty,
          includeCoding,
          languageCode,
          voiceId,
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
        if (data.tts) setTts(data.tts);
        throw new Error(data.error || "Could not start session");
      }

      if (data.ai) setAi(data.ai);
      if (data.stt) setStt(data.stt);
      if (data.tts) setTts(data.tts);
      setSessionId(data.session.id);
      const firstTurns = data.session.turns ?? [data.turn];
      setTurns(firstTurns);
      setQuestionIndex(0);
      setSeconds(0);
      setRunning(true);
      setAnswer("");
      setLiveCaption("");
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
        window.setTimeout(() => speakQuestionRef.current(q), 350);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not start session"
      );
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer(overrideAnswer?: string) {
    const text = (overrideAnswer ?? answerSnapshotRef.current).trim();
    if (!sessionId || !text) {
      toast.error("Speak or type your answer first");
      return;
    }
    clearAudio();
    setSpeaking(false);
    stopWebSpeech();
    setSubmitting(true);
    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "answer",
          sessionId,
          answer: text,
          turns,
          company,
          role,
          interviewType,
          difficulty,
          totalQuestions,
          resumeContext,
          jobDescription: jobDescription.trim() || undefined,
          includeCoding,
          languageCode,
          questionIndex,
          currentQuestion: turns[questionIndex]?.question
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not submit answer");
      }

      setTurns((prev) => {
        const next = (data.turns ?? prev) as MockTurnRecord[];
        return next.map((turn, index) => ({
          ...turn,
          codePassed: prev[index]?.codePassed ?? turn.codePassed,
          codeProblem: turn.codeProblem ?? prev[index]?.codeProblem
        }));
      });
      setDemoMode(Boolean(data.demoMode));
      setProvider(data.provider ?? provider);
      if (data.ai) setAi(data.ai);
      if (data.stt) setStt(data.stt);
      if (data.tts) setTts(data.tts);
      setAnswer("");
      setLiveCaption("");
      setFeedback(data.feedback);

      if (data.done) {
        setSessionDone(true);
        setPendingNextIndex(null);
      } else {
        setSessionDone(false);
        setPendingNextIndex(data.questionIndex ?? questionIndex + 1);
      }

      // Auto-advance after a short coaching beat
      if (autoAdvanceTimerRef.current) {
        window.clearTimeout(autoAdvanceTimerRef.current);
      }
      autoAdvanceTimerRef.current = window.setTimeout(() => {
        goToNextQuestionRef.current();
      }, data.done ? 3200 : 2800);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not submit answer"
      );
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    submitAnswerRef.current = () => submitAnswer();
  });

  const scheduleAutoSubmit = useCallback((text: string) => {
    if (autoSubmitTimerRef.current) {
      window.clearTimeout(autoSubmitTimerRef.current);
    }
    autoSubmitTimerRef.current = window.setTimeout(() => {
      if (text.trim()) {
        void submitAnswerRef.current();
      }
    }, 6000);
  }, []);

  async function transcribeWithWhisper(blob: Blob) {
    setTranscribing(true);
    try {
      const form = new FormData();
      form.append("audio", blob, "answer.webm");
      form.append("language", languageCodeRef.current);
      const res = await fetch("/api/mock-interview/transcribe", {
        method: "POST",
        body: form
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not transcribe audio");
      }
      const text = String(data.text || "").trim();
      if (!text) {
        setLiveCaption(
          "Couldn't capture speech — tap mic to try again or type below"
        );
        return;
      }
      setAnswer(text);
      setLiveCaption(text);
      toast.success("Answer captured — review and submit, or wait 6s");
      scheduleAutoSubmit(text);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Voice transcription failed"
      );
    } finally {
      setTranscribing(false);
    }
  }

  async function startWhisperRecording() {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Microphone not supported — type your answer");
      return;
    }
    if (stt && stt.whisper === false && !browserSpeechAvailable) {
      toast.error(stt.message);
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
        const blob = new Blob(chunksRef.current, {
          type: mediaRecorderRef.current?.mimeType || "audio/webm"
        });
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;
        chunksRef.current = [];
        if (blob.size < 900) {
          // Don't error — just reset and let user try again
          setLiveCaption("Recording too short — tap mic to try again or type below");
          return;
        }
        void transcribeWithWhisper(blob);
      };

      recorder.start(200);
      setRecording(true);
      setLiveCaption("Listening…");
    } catch (error) {
      stream?.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
      mediaRecorderRef.current = null;
      const name = error instanceof DOMException ? error.name : "";
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        toast.error("Allow microphone access to use voice answers");
      } else {
        toast.error("Could not start the microphone — type your answer");
      }
    }
  }

  const startListening = useCallback(async () => {
    if (recording || submitting || feedback || transcribing || speaking) return;
    clearAudio();
    setSpeaking(false);
    finalTranscriptRef.current = "";
    setLiveCaption("");
    setAnswer("");

    // Prefer Whisper when available — far more reliable than Web Speech API
    if (stt?.whisper) {
      await startWhisperRecording();
      return;
    }

    const Ctor = getSpeechRecognitionCtor();
    if (Ctor) {
      usingWebSpeechRef.current = true;
      const recognition = new Ctor();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = speechLangRef.current;
      recognitionRef.current = recognition;

      recognition.onresult = (event) => {
        let interim = "";
        let finalText = finalTranscriptRef.current;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const chunk = result[0]?.transcript ?? "";
          if (result.isFinal) {
            finalText = `${finalText} ${chunk}`.trim();
          } else {
            interim += chunk;
          }
        }
        finalTranscriptRef.current = finalText;
        const display = `${finalText} ${interim}`.trim();
        setLiveCaption(display);
        setAnswer(display);

        if (autoSubmitTimerRef.current) {
          window.clearTimeout(autoSubmitTimerRef.current);
        }
        if (finalText.trim().split(/\s+/).length >= 4) {
          autoSubmitTimerRef.current = window.setTimeout(() => {
            if (finalTranscriptRef.current.trim() && !submitting && !feedback) {
              usingWebSpeechRef.current = false;
              try {
                recognitionRef.current?.stop();
              } catch {
                /* ignore */
              }
              recognitionRef.current = null;
              setRecording(false);
              setAnswer(finalTranscriptRef.current);
              setLiveCaption(finalTranscriptRef.current);
              toast.success("Answer captured — submitting…");
              void submitAnswerRef.current();
            }
          }, 6000);
        }
      };

      recognition.onerror = (event) => {
        if (event.error === "aborted" || event.error === "no-speech") return;
        if (event.error === "not-allowed") {
          toast.error("Allow microphone access to use voice answers");
          setRecording(false);
          stopWebSpeech();
          return;
        }
      };

      recognition.onend = () => {
        // Keep the session alive while the user is still answering.
        // Do NOT auto-submit on end — browsers fire this often mid-answer.
        if (!usingWebSpeechRef.current) return;
        try {
          recognition.start();
        } catch {
          usingWebSpeechRef.current = false;
          recognitionRef.current = null;
          setRecording(false);
          setLiveCaption(
            "Listening stopped — tap mic to try again or type below"
          );
        }
      };

      try {
        recognition.start();
        setRecording(true);
        setLiveCaption("Listening…");
        return;
      } catch {
        stopWebSpeech();
      }
    }

    await startWhisperRecording();
  }, [
    recording,
    submitting,
    feedback,
    transcribing,
    speaking,
    clearAudio,
    stopWebSpeech,
    stt
  ]);

  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  function stopRecording(transcribe = true) {
    if (usingWebSpeechRef.current || recognitionRef.current) {
      const finalText = (finalTranscriptRef.current || answerSnapshotRef.current).trim();
      stopWebSpeech();
      setRecording(false);
      if (!transcribe) {
        setLiveCaption("");
        return;
      }
      if (!finalText) {
        // Don't show error — just reset and let user try again or type
        setLiveCaption("Tap mic to try again or type your answer below");
        return;
      }
      setAnswer(finalText);
      setLiveCaption(finalText);
      toast.success("Answer captured");
      scheduleAutoSubmit(finalText);
      return;
    }

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
      setLiveCaption("");
      return;
    }
    if (recorder.state !== "inactive") {
      recorder.stop();
    }
    setRecording(false);
  }

  async function endSession(finalTurns?: MockTurnRecord[]) {
    setRunning(false);
    clearTimers();
    clearAudio();
    setSpeaking(false);
    if (recording) stopRecording(false);
    stopWebSpeech();
    stopCamera();
    setPhase("summary");

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
          resumeContext,
          jobDescription: jobDescription.trim() || undefined,
          includeCoding,
          languageCode
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not end session");
      }
      setSummary(data.summary);
      setDemoMode(Boolean(data.demoMode));
      setProvider(data.provider ?? provider);
      const stats = computeExitStats(
        turnsToSave,
        totalQuestions,
        company,
        role,
        data.summary?.overallScore
      );
      setExitStats(stats);
      setShowExitDialog(true);
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

  function goToNextQuestion() {
    if (autoAdvanceTimerRef.current) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
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
    setLiveCaption("");
    if (nextQ) {
      window.setTimeout(() => speakQuestionRef.current(nextQ), 200);
    }
  }

  function repeatCurrentQuestion() {
    const q = turns[questionIndex]?.question;
    if (!q || speaking || submitting || recording) return;
    if (autoSubmitTimerRef.current) {
      window.clearTimeout(autoSubmitTimerRef.current);
      autoSubmitTimerRef.current = null;
    }
    stopWebSpeech();
    setRecording(false);
    speakQuestionRef.current(q);
  }

  async function previewPersonaVoice(persona: InterviewPersona) {
    setPreviewingId(persona.id);
    clearAudio();
    try {
      const res = await fetch("/api/mock-interview/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: persona.previewLine,
          voiceId: persona.id,
          languageCode
        })
      });
      if (!res.ok) throw new Error("preview failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        clearAudio();
        setPreviewingId(null);
      };
      audio.onerror = () => {
        clearAudio();
        setPreviewingId(null);
      };
      await audio.play();
    } catch {
      setPreviewingId(null);
      toast.error("Voice preview unavailable — check OPENAI_API_KEY");
    }
  }

  const goToNextQuestionRef = useRef(goToNextQuestion);
  goToNextQuestionRef.current = goToNextQuestion;

  function handleCodePassed(passed: boolean) {
    setTurns((prev) =>
      prev.map((turn, index) =>
        index === questionIndex ? { ...turn, codePassed: passed } : turn
      )
    );
  }

  function resetToSetup() {
    clearTimers();
    clearAudio();
    stopRecording(false);
    stopWebSpeech();
    stopCamera();
    setPhase("setup");
    setSessionId(null);
    setTurns([]);
    setQuestionIndex(0);
    setAnswer("");
    setLiveCaption("");
    setFeedback(null);
    setSummary(null);
    setSeconds(0);
    setRunning(false);
    setPendingNextIndex(null);
    setSessionDone(false);
    setSpeaking(false);
    setRecording(false);
    setShowExitDialog(false);
    setExitStats(null);
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
              is set. You can still start Demo mode.
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
                Pick a real interviewer, join a Meet-style call, answer out loud,
                and get scored feedback — repeat any question anytime.
              </p>
              {ai?.available ? (
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                  <Sparkle className="h-3.5 w-3.5" weight="fill" />
                  {ai.message}
                  {tts?.available
                    ? tts.provider === "openai"
                      ? " · OpenAI HD voice"
                      : " · ElevenLabs voice"
                    : ""}
                  {stt?.whisper
                    ? " · Whisper STT"
                    : browserSpeechAvailable
                      ? " · live captions"
                      : ""}
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
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Job description / interview notes (optional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste JD, round details, or topics you expect…"
                  rows={3}
                  className="w-full rounded-xl border border-input bg-white px-3 py-2.5 text-sm leading-6 text-foreground placeholder:text-muted-foreground/70 focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Choose your interviewer
                </label>
                <VoiceSelector
                  selectedId={voiceId}
                  onSelect={(persona) => setVoiceId(persona.id)}
                  onPreview={(persona) => void previewPersonaVoice(persona)}
                  previewingId={previewingId}
                />
                {!tts?.available ? (
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Add <code className="font-mono">OPENAI_API_KEY</code> for HD
                    interviewer voices (browser fallback otherwise).
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Language
                  </label>
                  <select
                    value={languageCode}
                    onChange={(e) => setLanguageCode(e.target.value)}
                    className="h-11 w-full rounded-xl border border-input bg-white px-3 text-sm font-medium text-foreground focus:border-primary/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  >
                    {(languageOptions.length
                      ? languageOptions
                      : [
                          { code: "en", label: "English", speechLang: "en-IN" },
                          { code: "hi", label: "Hindi", speechLang: "hi-IN" },
                          { code: "ta", label: "Tamil", speechLang: "ta-IN" },
                          { code: "te", label: "Telugu", speechLang: "te-IN" },
                          { code: "mr", label: "Marathi", speechLang: "mr-IN" }
                        ]
                    ).map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
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
                    Questions ({totalQuestions} · max {MAX_INTERVIEW_QUESTIONS})
                  </label>
                  <input
                    type="range"
                    min={MIN_INTERVIEW_QUESTIONS}
                    max={MAX_INTERVIEW_QUESTIONS}
                    value={totalQuestions}
                    onChange={(e) => setTotalQuestions(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--accent))]"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={includeCoding}
                  onChange={(e) => setIncludeCoding(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-[hsl(var(--accent))]"
                />
                Include coding questions (easy / medium / hard uses difficulty above)
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={voiceEnabled}
                  onChange={(e) => setVoiceEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-[hsl(var(--accent))]"
                />
                Speak questions aloud (OpenAI HD · ElevenLabs · browser fallback)
              </label>

              <div className="flex flex-wrap gap-3 pt-1">
                <Button onClick={() => startSession(false)} disabled={loading}>
                  {loading ? (
                    <CircleNotch className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" weight="fill" />
                  )}
                  {loading
                    ? "Joining…"
                    : `Start call with ${getInterviewPersona(voiceId).name}`}
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
                Call flow: hear the question → tap mic → speak → tap stop →
                submit (or wait 6s). Use Repeat question anytime. End call when
                done.
              </p>
              <Link
                href="/dashboard/interview"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                Browse 64+ company coding question guides
                <ArrowLeft className="h-3 w-3 rotate-180" weight="regular" />
              </Link>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <InterviewerPreview personaId={voiceId} />
            <div>
              <p className="fine-label mb-3">Recent practice</p>
              {history.length ? (
                <ul className="space-y-2">
                  {history.slice(0, 5).map((session) => (
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
          codeProblem={
            includeCoding && current.codeProblem ? current.codeProblem : undefined
          }
          onCodePassed={handleCodePassed}
          roomState={roomState}
          answer={answer}
          onAnswerChange={setAnswer}
          answerRef={answerRef}
          feedback={feedback}
          sessionDone={sessionDone}
          speaking={speaking}
          recording={recording}
          submitting={submitting}
          transcribing={transcribing}
          loading={loading}
          captionsEnabled={captionsEnabled}
          onToggleCaptions={() => setCaptionsEnabled((v) => !v)}
          cameraOn={cameraOn}
          cameraStream={cameraStream}
          cameraError={cameraError}
          onToggleCamera={toggleCamera}
          liveCaption={liveCaption}
          voiceOptions={voiceOptions}
          languageOptions={
            languageOptions.length
              ? languageOptions
              : [
                  { code: "en", label: "English", speechLang: "en-IN" },
                  { code: "hi", label: "Hindi", speechLang: "hi-IN" },
                  { code: "ta", label: "Tamil", speechLang: "ta-IN" },
                  { code: "te", label: "Telugu", speechLang: "te-IN" },
                  { code: "mr", label: "Marathi", speechLang: "mr-IN" }
                ]
          }
          currentVoiceId={voiceId}
          currentLanguageCode={languageCode}
          onVoiceChange={setVoiceId}
          onLanguageChange={setLanguageCode}
          ttsAvailable={Boolean(tts?.available)}
          onStartRecording={() => void startListening()}
          onStopRecording={() => stopRecording(true)}
          onSubmitAnswer={() => void submitAnswer()}
          onEndInterview={() => void endSession()}
          onNext={goToNextQuestion}
          onRepeatQuestion={repeatCurrentQuestion}
          turns={turns}
          interviewer={getInterviewPersona(voiceId)}
        />
      ) : null}

      {exitStats ? (
        <MockInterviewExitDialog
          open={showExitDialog}
          stats={exitStats}
          onClose={() => setShowExitDialog(false)}
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

function InterviewerPreview({ personaId }: { personaId: string }) {
  const persona = getInterviewPersona(personaId);
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-gradient-to-br from-[#edf6f5] via-[#f7faf9] to-[#e8f0f2] p-5 shadow-sm">
      <div className="relative flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
        <InterviewerAvatar persona={persona} size="md" statusLabel={persona.role} />
        <div className="text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            {persona.name}
          </p>
          <p className="mt-1 text-sm font-semibold text-primary">{persona.role}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Meet-style call with your camera, a real interviewer voice, live
            captions, and scored feedback after each answer.
          </p>
        </div>
      </div>
    </div>
  );
}
