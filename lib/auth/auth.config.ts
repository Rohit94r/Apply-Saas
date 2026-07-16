import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { isGoogleAuthConfigured } from "@/lib/auth-config";

/**
 * Edge-safe Auth.js config (no DB / Node-only imports).
 * Used by middleware. Full callbacks with DB live in `server.ts`.
 */
export const authConfig = {
  providers: isGoogleAuthConfigured()
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID!,
          clientSecret: process.env.AUTH_GOOGLE_SECRET!
        })
      ]
    : [],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in"
  },
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (!pathname.startsWith("/dashboard")) {
        return true;
      }
      if (!isGoogleAuthConfigured()) {
        return true;
      }
      return Boolean(auth?.user);
    },
    async jwt({ token, user, account }) {
      if (user?.id) {
        token.id = user.id;
      } else if (account?.providerAccountId) {
        token.id = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || token.sub || "";
      }
      return session;
    }
  },
  trustHost: true
} satisfies NextAuthConfig;
