import { Logo } from "@/components/landing/logo";
import { neonAuthIsConfigured } from "@/lib/auth-config";
import { SignInForm } from "./sign-in-form";

export default function SignInPage() {
  if (!neonAuthIsConfigured) {
    return <AuthSetupNotice />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-5 py-10 dark:bg-[#131318]">
      <div className="mb-8">
        <Logo />
      </div>
      <SignInForm />
    </main>
  );
}

function AuthSetupNotice() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-5 py-10 text-center dark:bg-[#131318]">
      <Logo />
      <div className="mt-8 max-w-md rounded-xl border border-border bg-white p-6 shadow-sm dark:bg-[#1a1a20]">
        <h1 className="text-xl font-semibold text-foreground">
          Neon Auth needs setup
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Enable Auth in the Neon Console (Project → Branch → Auth), then set{" "}
          <code className="text-xs">NEON_AUTH_BASE_URL</code> and{" "}
          <code className="text-xs">NEON_AUTH_COOKIE_SECRET</code> in{" "}
          <code className="text-xs">.env.local</code>.
        </p>
      </div>
    </main>
  );
}
