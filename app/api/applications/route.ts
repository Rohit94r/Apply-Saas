import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import {
  createApplication,
  listApplications
} from "@/lib/data/applications";
import { applicationCreateSchema } from "@/lib/validations";

function isDbDown(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  return (
    message.includes("Database connection failed") ||
    message.includes("DATABASE_URL") ||
    message.includes("ECONNREFUSED") ||
    message.includes("Server selection timed out")
  );
}

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    try {
      const applications = await listApplications(userId);
      return NextResponse.json({ applications });
    } catch (error) {
      if (isDbDown(error)) {
        return NextResponse.json({
          applications: [],
          offline: true,
          warning:
            "Database unavailable — showing an empty tracker. Try again when Mongo is reachable."
        });
      }
      throw error;
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load applications";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await request.json();
    const input = applicationCreateSchema.parse(body);
    try {
      const application = await createApplication(userId, input);
      return NextResponse.json({ application }, { status: 201 });
    } catch (error) {
      if (isDbDown(error)) {
        return NextResponse.json(
          {
            error:
              "Database unavailable. Application was not saved — retry when Mongo is back.",
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
      error instanceof Error ? error.message : "Unable to create application";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
