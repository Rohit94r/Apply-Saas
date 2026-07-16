/**
 * Compatibility types for callers that still import `@/models/User`.
 * App storage is Drizzle (`packages/db`); `clerkId` aliases auth-provider user id.
 */
import type { UserRow } from "@/packages/db/schema";

export type UserDocument = UserRow & {
  /** @deprecated Prefer `userId` — auth provider id (Neon Auth / legacy Clerk). */
  clerkId: string;
};

export function toUserDocument(row: UserRow): UserDocument {
  return { ...row, clerkId: row.userId };
}
