import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import {
  getGoogleClientId,
  getGoogleClientSecret,
  isAuthConfigured,
  isGoogleAuthConfigured
} from "@/lib/auth-config";

function googleProviders() {
  const clientId = getGoogleClientId();
  const clientSecret = getGoogleClientSecret();
  if (!clientId || !clientSecret) {
    return [];
  }

  return [
    Google({
      clientId,
      clientSecret,
      allowDangerousEmailAccountLinking: true
    })
  ];
}

/**
 * Edge-safe Auth.js config (no DB / Node-only imports).
 * Used by middleware. Credentials provider + DB callbacks live in `server.ts`.
 */
export const authConfig = {
  providers: googleProviders(),
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
      if (!isAuthConfigured()) {
        return true;
      }
      return Boolean(auth?.user);
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
  },
  trustHost: true
} satisfies NextAuthConfig;

/** Re-export for callers that previously imported from this module. */
export { isGoogleAuthConfigured };
