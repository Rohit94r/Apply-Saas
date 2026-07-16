"use client";

import { signIn, signOut, useSession } from "next-auth/react";

/** Thin client helpers so UI code stays stable if the auth library changes. */
export const authClient = {
  useSession,
  signIn: (provider = "google", options?: { callbackUrl?: string }) =>
    signIn(provider, options),
  signOut: (options?: { callbackUrl?: string }) => signOut(options)
};
