"use client";

import { signIn, signOut, useSession } from "next-auth/react";

type CredentialsSignInOptions = {
  email: string;
  password: string;
  callbackUrl?: string;
};

/** Thin client helpers so UI code stays stable if the auth library changes. */
export const authClient = {
  useSession,
  signIn: (provider: "google" | "credentials" = "google", callbackUrl = "/dashboard") =>
    signIn(provider, { callbackUrl }),
  signInWithCredentials: (options: CredentialsSignInOptions) =>
    signIn("credentials", {
      email: options.email,
      password: options.password,
      callbackUrl: options.callbackUrl ?? "/dashboard",
      redirect: false
    }),
  signOut: (options?: { callbackUrl?: string }) => signOut(options)
};
