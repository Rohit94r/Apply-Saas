import { connectToDatabase } from "@/lib/mongodb";
import { GeneratedResume } from "@/models/GeneratedResume";
import { DeviceUsage, type DeviceUsageDocument } from "@/models/DeviceUsage";
import { FREE_RESUME_LIMIT } from "@/lib/billing/constants";
import { isSubscriptionExpired } from "@/lib/admin/subscription";
import { ensureUser, getUserByClerkId, isProUser } from "@/lib/billing/users";

export class UsageLimitError extends Error {
  readonly code = "USAGE_LIMIT";
  readonly status = 402;
  readonly payload: BillingStatus;

  constructor(payload: BillingStatus) {
    super(payload.message);
    this.payload = payload;
  }
}

export type BillingStatus = {
  plan: "free" | "pro" | "expired";
  creditsLeft: number;
  creditsUsed: number;
  freeLimit: number;
  canGenerate: boolean;
  deviceBlocked: boolean;
  deviceCreditsUsed: number;
  proExpiresAt: string | null;
  daysRemaining: number;
  upgradeUrl: string;
  message: string;
};

async function countUserGenerations(userId: string) {
  await connectToDatabase();
  return GeneratedResume.countDocuments({ userId });
}

async function getDeviceUsageRecord(deviceId?: string) {
  if (!deviceId?.trim()) {
    return null;
  }

  await connectToDatabase();
  return DeviceUsage.findOne({ deviceId: deviceId.trim() }).lean<DeviceUsageDocument>();
}

export async function getBillingStatus(
  userId: string,
  deviceId?: string
): Promise<BillingStatus> {
  await ensureUser(userId);
  const user = await getUserByClerkId(userId);
  const creditsUsed = await countUserGenerations(userId);
  const deviceRecord = await getDeviceUsageRecord(deviceId);
  const deviceCreditsUsed = deviceRecord?.freeGenerationsUsed ?? 0;
  const deviceBlocked =
    Boolean(deviceRecord?.blocked) || deviceCreditsUsed >= FREE_RESUME_LIMIT;

  if (isSubscriptionExpired(user)) {
    const userCreditsLeft = Math.max(0, FREE_RESUME_LIMIT - creditsUsed);
    const deviceCreditsLeft = Math.max(0, FREE_RESUME_LIMIT - deviceCreditsUsed);
    const creditsLeft = Math.min(userCreditsLeft, deviceCreditsLeft);
    const canGenerate = creditsLeft > 0 && !deviceRecord?.blocked;

    return {
      plan: "expired",
      creditsLeft,
      creditsUsed,
      freeLimit: FREE_RESUME_LIMIT,
      canGenerate,
      deviceBlocked,
      deviceCreditsUsed,
      proExpiresAt: user?.proExpiresAt
        ? new Date(user.proExpiresAt).toISOString()
        : null,
      daysRemaining: 0,
      upgradeUrl: "/dashboard/upgrade",
      message: "Your subscription has expired. Renew Pro to continue unlimited resumes."
    };
  }

  if (isProUser(user)) {
    const expiresAt = user?.proExpiresAt ? new Date(user.proExpiresAt) : null;
    const daysRemaining = expiresAt
      ? Math.max(0, Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
      : 0;

    return {
      plan: "pro",
      creditsLeft: FREE_RESUME_LIMIT,
      creditsUsed,
      freeLimit: FREE_RESUME_LIMIT,
      canGenerate: true,
      deviceBlocked: false,
      deviceCreditsUsed,
      proExpiresAt: expiresAt?.toISOString() ?? null,
      daysRemaining,
      upgradeUrl: "/dashboard/upgrade",
      message: `Pro active — ${daysRemaining} day${daysRemaining === 1 ? "" : "s"} remaining.`
    };
  }

  const userCreditsLeft = Math.max(0, FREE_RESUME_LIMIT - creditsUsed);
  const deviceCreditsLeft = Math.max(0, FREE_RESUME_LIMIT - deviceCreditsUsed);
  const creditsLeft = Math.min(userCreditsLeft, deviceCreditsLeft);
  const canGenerate = creditsLeft > 0 && !deviceRecord?.blocked;

  let message = `${creditsLeft} of ${FREE_RESUME_LIMIT} free resume credits left.`;

  if (deviceBlocked && userCreditsLeft > 0) {
    message =
      "This device already used all 5 free credits (even with a new email). Upgrade to Pro to continue.";
  } else if (userCreditsLeft <= 0) {
    message = "You used all 5 free resumes. Upgrade to Pro for unlimited access.";
  }

  return {
    plan: "free",
    creditsLeft,
    creditsUsed,
    freeLimit: FREE_RESUME_LIMIT,
    canGenerate,
    deviceBlocked,
    deviceCreditsUsed,
    proExpiresAt: null,
    daysRemaining: 0,
    upgradeUrl: "/dashboard/upgrade",
    message
  };
}

export async function assertCanGenerate(userId: string, deviceId?: string) {
  const status = await getBillingStatus(userId, deviceId);

  if (!status.canGenerate) {
    throw new UsageLimitError(status);
  }

  return status;
}

export async function recordGenerationUsage(userId: string, deviceId?: string) {
  const user = await getUserByClerkId(userId);

  if (isProUser(user)) {
    return;
  }

  if (!deviceId?.trim()) {
    return;
  }

  await connectToDatabase();
  await DeviceUsage.findOneAndUpdate(
    { deviceId: deviceId.trim() },
    {
      $inc: { freeGenerationsUsed: 1 },
      $addToSet: { linkedUserIds: userId }
    },
    { upsert: true, new: true }
  );
}
