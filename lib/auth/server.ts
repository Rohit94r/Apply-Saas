import "@/lib/auth/types";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { authConfig } from "@/lib/auth/auth.config";
import { touchCredentialsLogin } from "@/lib/auth/register";
import {
  normalizeEmail,
  verifyPassword
} from "@/lib/auth/password";
import { db } from "@/lib/db";
import { users } from "@/packages/db/schema";

async function upsertGoogleUser(input: {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}) {
  if (!input.email) {
    return null;
  }

  const email = normalizeEmail(input.email);
  const name = input.name?.trim() || email;

  const existingByProviderId = await db.query.users.findFirst({
    where: eq(users.userId, input.id)
  });

  if (existingByProviderId) {
    await db
      .update(users)
      .set({
        name,
        email,
        ...(input.image ? { image: input.image } : {}),
        lastLoginAt: new Date(),
        loginCount: (existingByProviderId.loginCount ?? 0) + 1,
        updatedAt: new Date()
      })
      .where(eq(users.userId, input.id));
    return existingByProviderId.userId;
  }

  // Link Google sign-in to an existing email/password account (same email).
  const existingByEmail = await db.query.users.findFirst({
    where: eq(users.email, email)
  });

  if (existingByEmail) {
    await db
      .update(users)
      .set({
        name,
        email,
        ...(input.image ? { image: input.image } : {}),
        lastLoginAt: new Date(),
        loginCount: (existingByEmail.loginCount ?? 0) + 1,
        updatedAt: new Date()
      })
      .where(eq(users.userId, existingByEmail.userId));
    return existingByEmail.userId;
  }

  await db.insert(users).values({
    userId: input.id,
    name,
    email,
    image: input.image ?? undefined,
    subscriptionPlan: "free",
    lastLoginAt: new Date(),
    loginCount: 1
  });

  return input.id;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const emailRaw =
          typeof credentials?.email === "string" ? credentials.email : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";
        const email = normalizeEmail(emailRaw);

        if (!email || !password) {
          return null;
        }

        const row = await db.query.users.findFirst({
          where: eq(users.email, email)
        });

        if (!row?.passwordHash) {
          return null;
        }

        const valid = await verifyPassword(password, row.passwordHash);
        if (!valid) {
          return null;
        }

        try {
          await touchCredentialsLogin(row.userId);
        } catch (error) {
          console.error("Failed to update login timestamps", error);
        }

        return {
          id: row.userId,
          email: row.email,
          name: row.name,
          image: row.image
        };
      }
    })
  ],
  secret:
    process.env.AUTH_SECRET?.trim() ||
    process.env.NEXTAUTH_SECRET?.trim() ||
    undefined,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return Boolean(user?.id);
      }

      const authUserId = account?.providerAccountId || user.id;
      if (account?.provider !== "google" || !authUserId || !user.email) {
        return false;
      }

      try {
        const stableUserId = await upsertGoogleUser({
          id: authUserId,
          name: user.name,
          email: user.email,
          image: user.image
        });
        if (!stableUserId) {
          return false;
        }
        // Stash for jwt callback so linked email accounts keep a stable id.
        user.id = stableUserId;
        return true;
      } catch (error) {
        console.error("Failed to upsert Google user", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials" && user?.id) {
        token.id = user.id;
      } else if (account?.provider === "google" && user?.id) {
        token.id = user.id;
      } else if (account?.providerAccountId) {
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
