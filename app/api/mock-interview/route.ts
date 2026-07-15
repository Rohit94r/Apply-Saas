import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import {
  buildMockQuestions,
  completeMockSession,
  createMockSession,
  listMockSessions
} from "@/lib/data/mock-interviews";
import {
  mockInterviewCompleteSchema,
  mockInterviewStartSchema
} from "@/lib/validations";

export async function GET() {
  try {
    const userId = await getCurrentUserId();
    try {
      const sessions = await listMockSessions(userId);
      return NextResponse.json({ sessions });
    } catch {
      return NextResponse.json({ sessions: [] });
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load sessions";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId();
    const body = await request.json();

    if (body?.action === "complete") {
      const input = mockInterviewCompleteSchema.parse(body);
      try {
        const session = await completeMockSession(
          userId,
          input.sessionId,
          input.durationSeconds
        );
        return NextResponse.json({ session });
      } catch {
        return NextResponse.json({
          session: {
            id: input.sessionId,
            durationSeconds: input.durationSeconds,
            completedAt: new Date().toISOString()
          }
        });
      }
    }

    const input = mockInterviewStartSchema.parse(body);
    const questions = buildMockQuestions(input.company, input.role);

    try {
      const session = await createMockSession(userId, {
        company: input.company,
        role: input.role,
        questions
      });
      return NextResponse.json({ session, questions }, { status: 201 });
    } catch {
      // Practice still works without Mongo — history just won't persist.
      return NextResponse.json(
        {
          session: {
            id: `local-${Date.now()}`,
            userId,
            company: input.company,
            role: input.role,
            questions,
            durationSeconds: 0,
            createdAt: new Date().toISOString()
          },
          questions,
          persisted: false
        },
        { status: 201 }
      );
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues.map((i) => i.message).join(". ") },
        { status: 400 }
      );
    }
    const message =
      error instanceof Error ? error.message : "Unable to start mock interview";
    const status =
      message === "Unauthorized"
        ? 401
        : message.includes("not found")
          ? 404
          : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
