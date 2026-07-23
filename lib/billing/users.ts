import { eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/packages/db/schema";
import { toUserDocument, type UserDocument } from "@/models/User";

/**
 * Profile from Auth.js session (Google or email/password).
 * `users.user_id` stores the stable auth id (Google sub or credentials UUID).
 */
export async function getCurrentUserProfile() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return {
    userId: user.id,
    name: user.name || user.email || "Apply user",
    email: user.email,
    image: user.image ?? undefined
  };
}

export async function ensureUser(authUserId: string) {
  const profile = await getCurrentUserProfile();

  if (profile.userId !== authUserId) {
    throw new Error("Unauthorized");
  }

  const existing = await db.query.users.findFirst({
    where: eq(users.userId, authUserId)
  });

  if (existing) {
    const [updated] = await db
      .update(users)
      .set({
        name: profile.name,
        email: profile.email,
        ...(profile.image ? { image: profile.image } : {}),
        updatedAt: new Date()
      })
      .where(eq(users.userId, authUserId))
      .returning();

    return updated ? toUserDocument(updated) : toUserDocument(existing);
  }

  const [created] = await db
    .insert(users)
    .values({
      userId: authUserId,
      name: profile.name,
      email: profile.email,
      image: profile.image,
      subscriptionPlan: "free"
    })
    .returning();

  return toUserDocument(created);
}

/** @deprecated Prefer getUserByAuthId */
export async function getUserByClerkId(clerkId: string) {
  return getUserByAuthId(clerkId);
}

export async function getUserByAuthId(authUserId: string) {
  const row = await db.query.users.findFirst({
    where: eq(users.userId, authUserId)
  });
  return row ? toUserDocument(row) : null;
}

export function isProUser(user?: UserDocument | null) {
  if (!user || user.subscriptionPlan !== "pro" || !user.proExpiresAt) {
    return false;
  }

  return new Date(user.proExpiresAt).getTime() > Date.now();
}

export async function activatePro(
  authUserId: string,
  options: { days?: number; discountCode?: string | null } = {}
) {
  const days = options.days ?? 30;
  const proExpiresAt = new Date();
  proExpiresAt.setDate(proExpiresAt.getDate() + days);

  await db
    .update(users)
    .set({
      subscriptionPlan: "pro",
      proExpiresAt,
      ...(options.discountCode ? { lastDiscountCode: options.discountCode } : {}),
      updatedAt: new Date()
    })
    .where(eq(users.userId, authUserId));

  return proExpiresAt;
}

export async function revokePro(authUserId: string) {
  await db
    .update(users)
    .set({
      subscriptionPlan: "free",
      proExpiresAt: null,
      lastDiscountCode: null,
      updatedAt: new Date()
    })
    .where(eq(users.userId, authUserId));
}

/** Bump login counters (used by admin activity tracking). */
export async function touchUserLogin(input: {
  userId: string;
  name: string;
  email: string;
  incrementLoginCount: boolean;
}) {
  if (input.incrementLoginCount) {
    await db
      .update(users)
      .set({
        name: input.name,
        email: input.email,
        lastLoginAt: new Date(),
        loginCount: sql`${users.loginCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(users.userId, input.userId));
    return;
  }

  await db
    .update(users)
    .set({
      name: input.name,
      email: input.email,
      lastLoginAt: new Date(),
      updatedAt: new Date()
    })
    .where(eq(users.userId, input.userId));
}
