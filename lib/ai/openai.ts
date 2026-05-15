import OpenAI from "openai";

let openAIClient: OpenAI | null = null;
let groqClient: OpenAI | null = null;

const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";
const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";

export type TextAIProvider = {
  client: OpenAI;
  model: string;
  provider: "groq" | "openai";
};

export function getTextAIClient(): TextAIProvider | null {
  if (process.env.GROQ_API_KEY) {
    groqClient ??= new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1"
    });

    return {
      client: groqClient,
      model: process.env.GROQ_MODEL ?? DEFAULT_GROQ_MODEL,
      provider: "groq"
    };
  }

  if (process.env.OPENAI_API_KEY) {
    openAIClient ??= new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    return {
      client: openAIClient,
      model: process.env.OPENAI_MODEL ?? DEFAULT_OPENAI_MODEL,
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
