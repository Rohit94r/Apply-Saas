import { AuthSetupNotice } from "@/components/auth/auth-setup-notice";
import { Logo } from "@/components/landing/logo";
import { isGoogleAuthConfigured } from "@/lib/auth-config";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import Link from "next/link";

export default function SignUpPage() {
  if (!isGoogleAuthConfigured()) {
    return <AuthSetupNotice />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-5 py-10 dark:bg-[#131318]">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-sm dark:bg-[#1a1a20]">
        <h1 className="font-serif text-3xl text-primary">Create account</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sign up with Google. We save your profile in Postgres for web and
          future desktop sync.
        </p>
        <div className="mt-6">
          <GoogleSignInButton
            callbackUrl="/dashboard"
            label="Continue with Google"
          />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-primary underline-offset-2 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
