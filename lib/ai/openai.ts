import OpenAI from "openai";

let openAIClient: OpenAI | null = null;
let groqClient: OpenAI | null = null;

const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";
const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";

export type TextAIProvider = {
  client: OpenAI;
  model: string;
  provider: "groq" | "openai" | "gemini";
};

export function getTextAIClient(): TextAIProvider | null {
  const groqKey = process.env.GROQ_API_KEY?.trim();
  if (groqKey) {
    groqClient ??= new OpenAI({
      apiKey: groqKey,
      baseURL: "https://api.groq.com/openai/v1"
    });

    return {
      client: groqClient,
      model: process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL,
      provider: "groq"
    };
  }

  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  if (openaiKey) {
    openAIClient ??= new OpenAI({
      apiKey: openaiKey
    });

    return {
      client: openAIClient,
      model: process.env.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL,
      provider: "openai"
    };
  }

  return null;
}

export function getImageAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  openAIClient ??= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  return openAIClient;
}
