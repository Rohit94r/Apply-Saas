import { connectToDatabase } from "@/lib/mongodb";
import { GeneratedResume } from "@/models/GeneratedResume";
import { PaymentRequest } from "@/models/PaymentRequest";
import { User, type UserDocument } from "@/models/User";
import { UserActivity, type ActivityAction } from "@/models/UserActivity";

export async function recordActivity(input: {
  clerkId: string;
  email: string;
  name: string;
  action: ActivityAction;
  detail?: string;
}) {
  await connectToDatabase();
  await UserActivity.create({
    clerkId: input.clerkId,
    email: input.email,
    name: input.name,
    action: input.action,
    detail: input.detail
  });
}

export async function trackUserSession(input: {
  clerkId: string;
  email: string;
  name: string;
}) {
  await connectToDatabase();

  const existing = await User.findOne({ clerkId: input.clerkId }).lean<UserDocument>();
  const lastLoginAt = existing?.lastLoginAt ? new Date(existing.lastLoginAt) : null;
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const shouldLogLogin = !lastLoginAt || lastLoginAt.getTime() < oneHourAgo;

  await User.updateOne(
    { clerkId: input.clerkId },
    {
      $set: {
        name: input.name,
        email: input.email,
        lastLoginAt: new Date()
      },
      ...(shouldLogLogin ? { $inc: { loginCount: 1 } } : {})
    }
  );

  if (shouldLogLogin) {
    await recordActivity({
      ...input,
      action: "login",
      detail: "Dashboard session"
    });
  }
}

export async function getAdminOverview() {
  await connectToDatabase();

  const [users, recentActivity, pendingPayments, resumeCounts] = await Promise.all([
    User.find().sort({ lastLoginAt: -1 }).limit(100).lean<UserDocument[]>(),
    UserActivity.find().sort({ createdAt: -1 }).limit(50).lean(),
    PaymentRequest.find({ status: "pending" }).sort({ createdAt: -1 }).limit(20).lean(),
    GeneratedResume.aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$userId", count: { $sum: 1 } } }
    ])
  ]);

  const resumeCountMap = new Map(resumeCounts.map((row) => [row._id, row.count]));

  const activityCounts = await UserActivity.aggregate<{
    _id: { clerkId: string; action: ActivityAction };
    count: number;
  }>([
    {
      $group: {
        _id: { clerkId: "$clerkId", action: "$action" },
        count: { $sum: 1 }
      }
    }
  ]);

  const featureMap = new Map<string, Record<string, number>>();

  for (const row of activityCounts) {
    const clerkId = row._id.clerkId;
    const current = featureMap.get(clerkId) ?? {};
    current[row._id.action] = row.count;
    featureMap.set(clerkId, current);
  }

  const now = Date.now();

  return {
    users: users.map((user) => {
      const features = featureMap.get(user.clerkId) ?? {};
      const proExpiresAt = user.proExpiresAt ? new Date(user.proExpiresAt) : null;
      const daysRemaining = proExpiresAt
        ? Math.max(0, Math.ceil((proExpiresAt.getTime() - now) / (1000 * 60 * 60 * 24)))
        : 0;
      const isActivePro =
        user.subscriptionPlan === "pro" && proExpiresAt && proExpiresAt.getTime() > now;
      const isExpiredPro =
        user.subscriptionPlan === "pro" && proExpiresAt && proExpiresAt.getTime() <= now;

      return {
        clerkId: user.clerkId,
        name: user.name,
        email: user.email,
        plan: isActivePro ? "pro" : isExpiredPro ? "expired" : "free",
        daysRemaining: isActivePro ? daysRemaining : 0,
        proExpiresAt: proExpiresAt?.toISOString() ?? null,
        lastLoginAt: user.lastLoginAt
          ? new Date(user.lastLoginAt).toISOString()
          : null,
        loginCount: user.loginCount ?? 0,
        resumesGenerated: resumeCountMap.get(user.clerkId) ?? 0,
        features: {
          generate: features.generate ?? 0,
          build: features.build ?? 0,
          interview: features.interview ?? 0,
          jobs: features.jobs ?? 0,
          payment: features.payment ?? 0
        }
      };
    }),
    recentActivity: recentActivity.map((item) => ({
      id: String(item._id),
      clerkId: item.clerkId,
      email: item.email,
      name: item.name,
      action: item.action,
      detail: item.detail,
      createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null
    })),
    pendingPayments: pendingPayments.map((payment) => ({
      id: String(payment._id),
      userId: payment.userId,
      userName: payment.userName,
      userEmail: payment.userEmail,
      amountInr: payment.amountInr,
      discountCode: payment.discountCode,
      createdAt: payment.createdAt ? new Date(payment.createdAt).toISOString() : null
    }))
  };
}
