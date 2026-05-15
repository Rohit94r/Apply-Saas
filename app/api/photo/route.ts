import { NextResponse } from "next/server";
import { getImageAIClient } from "@/lib/ai/openai";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    const openai = getImageAIClient();

    if (!openai) {
      return NextResponse.json({
        imageUrl: null,
        message:
          "OPENAI_API_KEY is not configured. Groq can power the text AI routes, but professional photo generation needs an image-capable provider such as OpenAI."
      });
    }

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt:
        prompt ??
        "Create a professional LinkedIn profile photo with a clean neutral background and formal appearance.",
      size: "1024x1024"
    });

    return NextResponse.json({
      image: image.data?.[0] ?? null
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to generate professional photo";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
