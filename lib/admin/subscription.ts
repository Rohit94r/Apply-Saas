import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { toUserDocument, type UserDocument } from "@/models/User";
import { users } from "@/packages/db/schema";

export function getDaysRemaining(proExpiresAt?: Date | null) {
  if (!proExpiresAt) {
    return 0;
  }

  return Math.max(
    0,
    Math.ceil((new Date(proExpiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );
}

export function isSubscriptionExpired(user?: UserDocument | null) {
  if (!user || user.subscriptionPlan !== "pro" || !user.proExpiresAt) {
    return false;
  }

  return new Date(user.proExpiresAt).getTime() <= Date.now();
}

export async function setUserSubscriptionByEmail(email: string, days: number) {
  if (days < 1 || days > 365) {
    throw new Error("Days must be between 1 and 365");
  }

  const normalized = email.trim().toLowerCase();
  const [user] = await db
    .select()
    .from(users)
    .where(sql`lower(${users.email}) = ${normalized}`)
    .limit(1);

  if (!user) {
    throw new Error("User not found. They must sign in once before you can activate Pro.");
  }

  return applySubscriptionDays(user.userId, days);
}

export async function applySubscriptionDays(clerkId: string, days: number) {
  const row = await db.query.users.findFirst({
    where: eq(users.userId, clerkId)
  });
  const user = row ? toUserDocument(row) : null;
  const now = new Date();
  const currentExpiry =
    user?.proExpiresAt && new Date(user.proExpiresAt) > now
      ? new Date(user.proExpiresAt)
      : now;

  const proExpiresAt = new Date(currentExpiry);
  proExpiresAt.setDate(proExpiresAt.getDate() + days);

  await db
    .update(users)
    .set({
      subscriptionPlan: "pro",
      proExpiresAt,
      updatedAt: new Date()
    })
    .where(eq(users.userId, clerkId));

  return {
    clerkId,
    proExpiresAt: proExpiresAt.toISOString(),
    daysAdded: days,
    daysRemaining: getDaysRemaining(proExpiresAt)
  };
}

export async function setUserSubscriptionByClerkId(clerkId: string, days: number) {
  const user = await db.query.users.findFirst({
    where: eq(users.userId, clerkId)
  });

  if (!user) {
    throw new Error("User not found");
  }

  return applySubscriptionDays(clerkId, days);
}
