import { count, desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { touchUserLogin } from "@/lib/billing/users";
import { toUserDocument } from "@/models/User";
import type { ActivityAction } from "@/models/UserActivity";
import {
  paymentRequests,
  tailoredResumes,
  userActivity,
  users
} from "@/packages/db/schema";

export async function recordActivity(input: {
  clerkId: string;
  email: string;
  name: string;
  action: ActivityAction;
  detail?: string;
}) {
  await db.insert(userActivity).values({
    userId: input.clerkId,
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
  const existing = await db.query.users.findFirst({
    where: eq(users.userId, input.clerkId)
  });
  const lastLoginAt = existing?.lastLoginAt
    ? new Date(existing.lastLoginAt)
    : null;
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const shouldLogLogin = !lastLoginAt || lastLoginAt.getTime() < oneHourAgo;

  if (existing) {
    await touchUserLogin({
      userId: input.clerkId,
      name: input.name,
      email: input.email,
      incrementLoginCount: shouldLogLogin
    });
  } else {
    await db.insert(users).values({
      userId: input.clerkId,
      name: input.name,
      email: input.email,
      subscriptionPlan: "free",
      lastLoginAt: new Date(),
      loginCount: 1
    });
  }

  if (shouldLogLogin) {
    await recordActivity({
      ...input,
      action: "login",
      detail: "Dashboard session"
    });
  }
}

export async function getAdminOverview() {
  const [
    userRows,
    recentActivity,
    pendingPayments,
    resumeCounts,
    activityCounts,
    pageViewCounts,
    lastPages,
    recentJourneys
  ] = await Promise.all([
    db.select().from(users).orderBy(desc(users.lastLoginAt)).limit(100),
    db
      .select()
      .from(userActivity)
      .orderBy(desc(userActivity.createdAt))
      .limit(50),
    db
      .select()
      .from(paymentRequests)
      .where(eq(paymentRequests.status, "pending"))
      .orderBy(desc(paymentRequests.createdAt))
      .limit(20),
    db
      .select({
        userId: tailoredResumes.userId,
        count: count()
      })
      .from(tailoredResumes)
      .groupBy(tailoredResumes.userId),
    db
      .select({
        userId: userActivity.userId,
        action: userActivity.action,
        count: count()
      })
      .from(userActivity)
      .groupBy(userActivity.userId, userActivity.action),
    db
      .select({
        userId: userActivity.userId,
        count: count()
      })
      .from(userActivity)
      .where(eq(userActivity.action, "page_view"))
      .groupBy(userActivity.userId),
    db
      .select({
        userId: userActivity.userId,
        lastPage: sql<string>`(array_agg(${userActivity.detail} order by ${userActivity.createdAt} desc))[1]`,
        lastPageAt: sql<Date | null>`max(${userActivity.createdAt})`
      })
      .from(userActivity)
      .where(eq(userActivity.action, "page_view"))
      .groupBy(userActivity.userId),
    db
      .select()
      .from(userActivity)
      .orderBy(desc(userActivity.createdAt))
      .limit(300)
  ]);

  const resumeCountMap = new Map(
    resumeCounts.map((row) => [row.userId, row.count])
  );

  const featureMap = new Map<string, Record<string, number>>();

  for (const row of activityCounts) {
    const current = featureMap.get(row.userId) ?? {};
    current[row.action] = row.count;
    featureMap.set(row.userId, current);
  }

  const pageViewMap = new Map(
    pageViewCounts.map((row) => [row.userId, row.count])
  );
  const lastPageMap = new Map(
    lastPages.map((row) => [
      row.userId,
      { lastPage: row.lastPage, lastPageAt: row.lastPageAt }
    ])
  );

  const journeyMap = new Map<
    string,
    Array<{ action: string; detail?: string | null; createdAt: Date | null }>
  >();

  for (const item of recentJourneys) {
    const list = journeyMap.get(item.userId) ?? [];
    if (list.length < 8) {
      list.push({
        action: item.action,
        detail: item.detail,
        createdAt: item.createdAt
      });
      journeyMap.set(item.userId, list);
    }
  }

  const now = Date.now();

  return {
    users: userRows.map((row) => {
      const user = toUserDocument(row);
      const features = featureMap.get(user.clerkId) ?? {};
      const proExpiresAt = user.proExpiresAt ? new Date(user.proExpiresAt) : null;
      const daysRemaining = proExpiresAt
        ? Math.max(0, Math.ceil((proExpiresAt.getTime() - now) / (1000 * 60 * 60 * 24)))
        : 0;
      const isActivePro =
        user.subscriptionPlan === "pro" && proExpiresAt && proExpiresAt.getTime() > now;
      const isExpiredPro =
        user.subscriptionPlan === "pro" && proExpiresAt && proExpiresAt.getTime() <= now;
      const lastPageInfo = lastPageMap.get(user.clerkId);

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
        pageViews: pageViewMap.get(user.clerkId) ?? 0,
        lastPage: lastPageInfo?.lastPage ?? null,
        lastPageAt: lastPageInfo?.lastPageAt
          ? new Date(lastPageInfo.lastPageAt).toISOString()
          : null,
        journey: journeyMap.get(user.clerkId) ?? [],
        features: {
          generate: features.generate ?? 0,
          build: features.build ?? 0,
          interview: features.interview ?? 0,
          jobs: features.jobs ?? 0,
          freelance: features.freelance ?? 0,
          payment: features.payment ?? 0
        }
      };
    }),
    recentActivity: recentActivity.map((item) => ({
      id: item.id,
      clerkId: item.userId,
      email: item.email,
      name: item.name,
      action: item.action,
      detail: item.detail,
      createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null
    })),
    pendingPayments: pendingPayments.map((payment) => ({
      id: payment.id,
      userId: payment.userId,
      userName: payment.userName,
      userEmail: payment.userEmail,
      amountInr: payment.amountInr,
      discountCode: payment.discountCode,
      createdAt: payment.createdAt
        ? new Date(payment.createdAt).toISOString()
        : null
    }))
  };
}
