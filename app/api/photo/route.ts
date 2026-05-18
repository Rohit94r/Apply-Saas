import { NextResponse } from "next/server";
import { generateProfessionalPhotoPlan } from "@/lib/ai/resume-engine";
import { getImageAIClient } from "@/lib/ai/openai";
import { getCurrentUserId } from "@/lib/auth";
import { professionalPhotoSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const input = professionalPhotoSchema.parse(await request.json());
    await getCurrentUserId();
    const openai = getImageAIClient();

    if (!openai || input.imageUrl) {
      const plan = await generateProfessionalPhotoPlan(input);

      return NextResponse.json({
        imageUrl: input.imageUrl ?? null,
        plan
      });
    }

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt:
        input.prompt ??
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
