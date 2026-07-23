import { AuthSetupNotice } from "@/components/auth/auth-setup-notice";
import {
  AuthProviderDivider,
  CredentialsAuthForm
} from "@/components/auth/credentials-auth-form";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Logo } from "@/components/landing/logo";
import { isAuthConfigured, isGoogleAuthConfigured } from "@/lib/auth-config";
import Link from "next/link";

export default async function SignInPage({
  searchParams
}: {
  searchParams?: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  if (!isAuthConfigured()) {
    return <AuthSetupNotice />;
  }

  const params = await searchParams;
  const callbackUrl = params?.callbackUrl || "/dashboard";
  const error = params?.error;
  const googleReady = isGoogleAuthConfigured();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-5 py-10 dark:bg-[#131318]">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm dark:bg-[#1a1a20]">
        <h1 className="font-serif text-3xl text-primary">Sign in</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Use your email and password
          {googleReady ? ", or continue with Google" : ""}. Your account stays
          in Apply&apos;s database.
        </p>
        {error ? (
          <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
            Sign-in failed. Check your email and password
            {googleReady ? ", or try Google again" : ""}.
          </p>
        ) : null}
        <div className="mt-6">
          <CredentialsAuthForm mode="sign-in" callbackUrl={callbackUrl} />
        </div>
        {googleReady ? (
          <>
            <AuthProviderDivider />
            <GoogleSignInButton callbackUrl={callbackUrl} />
          </>
        ) : null}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
