import { NextResponse } from "next/server";
import { registerWithEmailPassword } from "@/lib/auth/register";
import { isAuthConfigured } from "@/lib/auth-config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      { error: "Authentication is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, password, confirmPassword } = body as Record<
    string,
    unknown
  >;

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const result = await registerWithEmailPassword({
    name: typeof name === "string" ? name : undefined,
    email,
    password,
    confirmPassword:
      typeof confirmPassword === "string" ? confirmPassword : password
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
