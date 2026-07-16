/**
 * @deprecated Mongoose models — app data now uses Drizzle + Neon (`packages/db`, `lib/db`).
 * These files re-export types only so existing `@/models/*` imports keep working.
 */
export type {
  ActivityAction,
  ApplicationStatus,
  UserRow as UserDocument,
  PaymentRequestRow as PaymentRequestDocument,
  DeviceUsageRow as DeviceUsageDocument,
  UserActivityRow as UserActivityDocument,
  MockInterviewSessionRow as MockInterviewSessionDocument
} from "@/packages/db/schema";

export {
  ACTIVITY_ACTIONS,
  APPLICATION_STATUSES
} from "@/packages/db/schema";
