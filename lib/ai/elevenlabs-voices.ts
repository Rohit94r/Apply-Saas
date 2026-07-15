/** Curated ElevenLabs voices for mock interview (English + multilingual). */

export type InterviewVoice = {
  id: string;
  name: string;
  label: string;
  gender: "female" | "male";
  accent: string;
  multilingual: boolean;
};

export type InterviewLanguage = {
  code: string;
  label: string;
  speechLang: string;
  elevenLabsModel: string;
};

export const INTERVIEW_VOICES: InterviewVoice[] = [
  {
    id: "21m00Tcm4TlvDq8ikWAM",
    name: "Rachel",
    label: "Rachel — warm professional female",
    gender: "female",
    accent: "American English",
    multilingual: false
  },
  {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Bella",
    label: "Bella — clear & friendly female",
    gender: "female",
    accent: "American English",
    multilingual: false
  },
  {
    id: "MF3mGyEYCl7XYWbV9V6O",
    name: "Elli",
    label: "Elli — calm interviewer female",
    gender: "female",
    accent: "American English",
    multilingual: false
  },
  {
    id: "jsCqWAIVKqL4i9b2b4h2",
    name: "Freya",
    label: "Freya — natural conversational (British)",
    gender: "female",
    accent: "British English",
    multilingual: true
  },
  {
    id: "pFZP5JQG7iQjIQuC4Bku",
    name: "Lily",
    label: "Lily — soft & articulate (British)",
    gender: "female",
    accent: "British English",
    multilingual: true
  },
  {
    id: "AZnzlk1XvdvUeBnXldCj",
    name: "Antoni",
    label: "Antoni — deep & calm male",
    gender: "male",
    accent: "American English",
    multilingual: false
  },
  {
    id: "pNInz6obpgDQGcFmaJgB",
    name: "Adam",
    label: "Adam — deep narrator male",
    gender: "male",
    accent: "American English",
    multilingual: false
  },
  {
    id: "yoZ06aMxZJJ28mC3PNQ5",
    name: "Sam",
    label: "Sam — raspy & natural male",
    gender: "male",
    accent: "American English",
    multilingual: false
  },
  {
    id: "TxGEqnHWrfWFTfGW9XjX",
    name: "Josh",
    label: "Josh — young & energetic male",
    gender: "male",
    accent: "American English",
    multilingual: false
  }
];

/** Top 5 languages for Indian interview prep */
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

export function getInterviewVoice(voiceId?: string): InterviewVoice {
  const id = voiceId?.trim();
  return (
    INTERVIEW_VOICES.find((v) => v.id === id) ??
    INTERVIEW_VOICES[0]
  );
}

export function getInterviewLanguage(code?: string): InterviewLanguage {
  const normalized = code?.trim().toLowerCase();
  return (
    INTERVIEW_LANGUAGES.find((l) => l.code === normalized) ??
    INTERVIEW_LANGUAGES[0]
  );
}

export function listAvailableVoices(elevenLabsConfigured: boolean) {
  if (!elevenLabsConfigured) {
    return {
      voices: [],
      languages: INTERVIEW_LANGUAGES,
      defaultVoiceId: INTERVIEW_VOICES[0].id,
      message: "Browser voice fallback — add ELEVENLABS_API_KEY for premium voices"
    };
  }
  return {
    voices: INTERVIEW_VOICES,
    languages: INTERVIEW_LANGUAGES,
    defaultVoiceId: INTERVIEW_VOICES[0].id,
    message: "ElevenLabs voices ready"
  };
}
