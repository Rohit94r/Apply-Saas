import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import {
  deleteApplication,
  updateApplication
} from "@/lib/data/applications";
import { applicationUpdateSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

function isDbDown(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  return (
    message.includes("Database connection failed") ||
    message.includes("DATABASE_URL") ||
    message.includes("ECONNREFUSED") ||
    message.includes("Server selection timed out")
  );
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const userId = await getCurrentUserId();
    const { id } = await params;
    const body = await request.json();
    const input = applicationUpdateSchema.parse(body);
    try {
      const application = await updateApplication(userId, id, input);
      return NextResponse.json({ application });
    } catch (error) {
      if (isDbDown(error)) {
        return NextResponse.json(
          {
            error: "Database unavailable. Update not saved — retry later.",
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
      error instanceof Error ? error.message : "Unable to update application";
    const status =
      message === "Unauthorized" ? 401 : message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const userId = await getCurrentUserId();
    const { id } = await params;
    try {
      await deleteApplication(userId, id);
      return NextResponse.json({ ok: true });
    } catch (error) {
      if (isDbDown(error)) {
        return NextResponse.json(
          {
            error: "Database unavailable. Delete not applied — retry later.",
            offline: true
          },
          { status: 503 }
        );
      }
      throw error;
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete application";
    const status =
      message === "Unauthorized" ? 401 : message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
