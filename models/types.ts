/**
 * @deprecated Mongoose models — app storage is Neon + Drizzle (`packages/db`, `lib/db`).
 * These files re-export types for callers that still import from `@/models/*`.
 */

export type {
  UserRow as UserDocument,
  ActivityAction,
  ApplicationStatus
} from "@/packages/db/schema";

export { ACTIVITY_ACTIONS, APPLICATION_STATUSES } from "@/packages/db/schema";

/** Compatibility shape: `clerkId` mirrors auth `userId` for admin/billing UI. */
export type UserCompat = {
  id: string;
  /** Auth provider user id (Neon Auth / legacy Clerk). */
  userId: string;
  /** Alias of `userId` kept for admin UI / older call sites. */
  clerkId: string;
  name: string;
  email: string;
  image?: string | null;
  subscriptionPlan: "free" | "pro";
  proExpiresAt?: Date | null;
  lastDiscountCode?: string | null;
  lastLoginAt?: Date | null;
  loginCount?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
