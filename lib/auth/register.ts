import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { users } from "@/packages/db/schema";
import {
  hashPassword,
  normalizeEmail,
  validatePassword
} from "@/lib/auth/password";

export type RegisterInput = {
  name?: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterResult =
  | { ok: true; userId: string }
  | { ok: false; error: string; status: number };

export async function registerWithEmailPassword(
  input: RegisterInput
): Promise<RegisterResult> {
  const email = normalizeEmail(input.email);
  const name = input.name?.trim() || email.split("@")[0] || "Apply user";
  const password = input.password;
  const confirmPassword = input.confirmPassword;

  if (!email || !email.includes("@")) {
    return { ok: false, error: "Enter a valid email address.", status: 400 };
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return { ok: false, error: passwordError, status: 400 };
  }

  if (password !== confirmPassword) {
    return { ok: false, error: "Passwords do not match.", status: 400 };
  }

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email)
  });

  if (existing) {
    return {
      ok: false,
      error:
        existing.passwordHash == null
          ? "An account with this email already exists. Sign in with Google, or use a different email."
          : "An account with this email already exists. Sign in instead.",
      status: 409
    };
  }

  const userId = randomUUID();
  const passwordHash = await hashPassword(password);

  try {
    await db.insert(users).values({
      userId,
      name,
      email,
      passwordHash,
      subscriptionPlan: "free",
      lastLoginAt: new Date(),
      loginCount: 0
    });
  } catch (error) {
    // Unique violation if a concurrent signup raced us
    const message = error instanceof Error ? error.message : "";
    if (message.includes("unique") || message.includes("duplicate")) {
      return {
        ok: false,
        error: "An account with this email already exists. Sign in instead.",
        status: 409
      };
    }
    console.error("Failed to register user", { email });
    return {
      ok: false,
      error: "Could not create your account. Try again.",
      status: 500
    };
  }

  return { ok: true, userId };
}

export async function touchCredentialsLogin(userId: string) {
  await db
    .update(users)
    .set({
      lastLoginAt: new Date(),
      loginCount: sql`${users.loginCount} + 1`,
      updatedAt: new Date()
    })
    .where(eq(users.userId, userId));
}
