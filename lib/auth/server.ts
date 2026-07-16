import "@/lib/auth/types";
import NextAuth from "next-auth";
import { eq } from "drizzle-orm";
import { authConfig } from "@/lib/auth/auth.config";
import { db } from "@/lib/db";
import { users } from "@/packages/db/schema";

async function upsertGoogleUser(input: {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}) {
  if (!input.email) {
    return;
  }

  const name = input.name?.trim() || input.email;
  const existing = await db.query.users.findFirst({
    where: eq(users.userId, input.id)
  });

  if (existing) {
    await db
      .update(users)
      .set({
        name,
        email: input.email,
        ...(input.image ? { image: input.image } : {}),
        lastLoginAt: new Date(),
        loginCount: (existing.loginCount ?? 0) + 1,
        updatedAt: new Date()
      })
      .where(eq(users.userId, input.id));
    return;
  }

  await db.insert(users).values({
    userId: input.id,
    name,
    email: input.email,
    image: input.image ?? undefined,
    subscriptionPlan: "free",
    lastLoginAt: new Date(),
    loginCount: 1
  });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      const authUserId = account?.providerAccountId || user.id;
      if (account?.provider !== "google" || !authUserId || !user.email) {
        return false;
      }

      try {
        await upsertGoogleUser({
          id: authUserId,
          name: user.name,
          email: user.email,
          image: user.image
        });
        return true;
      } catch (error) {
        console.error("Failed to upsert Google user", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account?.providerAccountId) {
        token.id = account.providerAccountId;
      } else if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || token.sub || "";
      }
      return session;
    }
  }
});
