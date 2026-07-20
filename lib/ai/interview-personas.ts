/**
 * Curated mock-interview personas — real-looking interviewers with
 * OpenAI TTS voices (primary) and ElevenLabs fallbacks.
 */

export type InterviewPersona = {
  id: string;
  name: string;
  role: string;
  gender: "male" | "female";
  /** OpenAI TTS voice id: onyx | echo | nova | shimmer | alloy | fable | etc. */
  openaiVoice: string;
  /** ElevenLabs voice id used when OpenAI TTS is unavailable */
  elevenLabsVoiceId: string;
  avatarSrc: string;
  previewLine: string;
};

export type InterviewLanguage = {
  code: string;
  label: string;
  speechLang: string;
  elevenLabsModel: string;
};

export const INTERVIEW_PERSONAS: InterviewPersona[] = [
  {
    id: "james",
    name: "James",
    role: "Senior Interviewer",
    gender: "male",
    openaiVoice: "onyx",
    elevenLabsVoiceId: "pNInz6obpgDQGcFmaJgB",
    avatarSrc: "/interviewers/james.png",
    previewLine: "Hello — I'll be conducting your interview today. Ready when you are."
  },
  {
    id: "michael",
    name: "Michael",
    role: "Tech Lead",
    gender: "male",
    openaiVoice: "echo",
    elevenLabsVoiceId: "TxGEqnHWrfWFTfGW9XjX",
    avatarSrc: "/interviewers/michael.png",
    previewLine: "Hi there. Let's walk through a few technical questions together."
  },
  {
    id: "sarah",
    name: "Sarah",
    role: "HR Manager",
    gender: "female",
    openaiVoice: "nova",
    elevenLabsVoiceId: "21m00Tcm4TlvDq8ikWAM",
    avatarSrc: "/interviewers/sarah.png",
    previewLine: "Welcome. I'd love to learn more about your experience and goals."
  },
  {
    id: "priya",
    name: "Priya",
    role: "Senior Recruiter",
    gender: "female",
    openaiVoice: "shimmer",
    elevenLabsVoiceId: "EXAVITQu4vr4xnSDxMaL",
    avatarSrc: "/interviewers/priya.png",
    previewLine: "Namaste — thanks for joining. Shall we begin with a quick intro?"
  }
];

/** Top languages for Indian interview prep */
export const INTERVIEW_LANGUAGES: InterviewLanguage[] = [
  {
    code: "en",
    label: "English",
    speechLang: "en-IN",
    elevenLabsModel: "eleven_turbo_v2_5"
  },
  {
    code: "hi",
    label: "Hindi",
    speechLang: "hi-IN",
    elevenLabsModel: "eleven_multilingual_v2"
  },
  {
    code: "ta",
    label: "Tamil",
    speechLang: "ta-IN",
    elevenLabsModel: "eleven_multilingual_v2"
  },
  {
    code: "te",
    label: "Telugu",
    speechLang: "te-IN",
    elevenLabsModel: "eleven_multilingual_v2"
  },
  {
    code: "mr",
    label: "Marathi",
    speechLang: "mr-IN",
    elevenLabsModel: "eleven_multilingual_v2"
  }
];

export const DEFAULT_PERSONA_ID = INTERVIEW_PERSONAS[0].id;

export function getInterviewPersona(id?: string): InterviewPersona {
  const normalized = id?.trim();
  return (
    INTERVIEW_PERSONAS.find((p) => p.id === normalized) ??
    INTERVIEW_PERSONAS.find((p) => p.openaiVoice === normalized) ??
    INTERVIEW_PERSONAS.find((p) => p.elevenLabsVoiceId === normalized) ??
    INTERVIEW_PERSONAS[0]
  );
}

export function getInterviewLanguage(code?: string): InterviewLanguage {
  const normalized = code?.trim().toLowerCase();
  return (
    INTERVIEW_LANGUAGES.find((l) => l.code === normalized) ??
    INTERVIEW_LANGUAGES[0]
  );
}

export function personasByGender(gender: "male" | "female") {
  return INTERVIEW_PERSONAS.filter((p) => p.gender === gender);
}

/** Client catalog — always available for UI selection */
export function listInterviewPersonas(options: {
  openaiTts: boolean;
  elevenLabs: boolean;
}) {
  const provider = options.openaiTts
    ? "openai"
    : options.elevenLabs
      ? "elevenlabs"
      : "browser";

  return {
    personas: INTERVIEW_PERSONAS,
    languages: INTERVIEW_LANGUAGES,
    defaultPersonaId: DEFAULT_PERSONA_ID,
    provider,
    message:
      provider === "openai"
        ? "OpenAI HD voice ready"
        : provider === "elevenlabs"
          ? "ElevenLabs voice ready"
          : "Browser voice fallback — add OPENAI_API_KEY for HD interviewers"
  };
}
