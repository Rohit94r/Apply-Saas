import { connectToDatabase } from "@/lib/mongodb";
import { User, type UserDocument } from "@/models/User";

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

  await connectToDatabase();

  const normalized = email.trim();
  const user = await User.findOne({
    email: { $regex: new RegExp(`^${normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") }
  }).lean<UserDocument>();

  if (!user) {
    throw new Error("User not found. They must sign in once before you can activate Pro.");
  }

  return applySubscriptionDays(user.clerkId, days);
}

export async function applySubscriptionDays(clerkId: string, days: number) {
  await connectToDatabase();

  const user = await User.findOne({ clerkId }).lean<UserDocument>();
  const now = new Date();
  const currentExpiry =
    user?.proExpiresAt && new Date(user.proExpiresAt) > now
      ? new Date(user.proExpiresAt)
      : now;

  const proExpiresAt = new Date(currentExpiry);
  proExpiresAt.setDate(proExpiresAt.getDate() + days);

  await User.updateOne(
    { clerkId },
    {
      $set: {
        subscriptionPlan: "pro",
        proExpiresAt
      }
    }
  );

  return {
    clerkId,
    proExpiresAt: proExpiresAt.toISOString(),
    daysAdded: days,
    daysRemaining: getDaysRemaining(proExpiresAt)
  };
}

export async function setUserSubscriptionByClerkId(clerkId: string, days: number) {
  await connectToDatabase();
  const user = await User.findOne({ clerkId }).lean<UserDocument>();

  if (!user) {
    throw new Error("User not found");
  }

  return applySubscriptionDays(clerkId, days);
}
