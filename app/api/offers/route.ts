import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { createOffer, listOffers } from "@/lib/data/offers";
import { offerCreateSchema } from "@/lib/validations";

function isDbDown(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  return (
    message.includes("Database connection failed") ||
    message.includes("MONGODB_URI") ||
    message.includes("ECONNREFUSED") ||
    message.includes("Server selection timed out")
  );
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    try {
      const offers = await listOffers(userId);
      return NextResponse.json({ offers });
    } catch (error) {
      if (isDbDown(error)) {
        return NextResponse.json({
          offers: [],
          offline: true,
          warning:
            "Database unavailable — showing an empty offers list. Try again when Mongo is reachable."
        });
      }
      throw error;
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load offers";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await request.json();
    const input = offerCreateSchema.parse(body);
    try {
      const offer = await createOffer(userId, input);
      return NextResponse.json({ offer }, { status: 201 });
    } catch (error) {
      if (isDbDown(error)) {
        return NextResponse.json(
          {
            error:
              "Database unavailable. Offer was not saved — retry when Mongo is back.",
            offline: true
          },
          { status: 503 }
        );
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues.map((i) => i.message).join(". ") },
        { status: 400 }
      );
    }
    const message =
      error instanceof Error ? error.message : "Unable to create offer";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
