import { SignUp } from "@clerk/nextjs";
import { Logo } from "@/components/landing/logo";
import { clerkIsConfigured } from "@/lib/clerk-config";

export default function SignUpPage() {
  if (!clerkIsConfigured) {
    return <ClerkSetupNotice />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-5 py-10">
      <div className="mb-8">
        <Logo />
      </div>
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/dashboard"
      />
    </main>
  );
}

function ClerkSetupNotice() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-5 py-10 text-center">
      <Logo />
      <div className="mt-8 max-w-md rounded-xl border border-border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-foreground">
          Clerk key needs setup
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Add a real NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in Vercel. Placeholder
          keys are ignored so deployment builds can finish safely.
        </p>
      </div>
    </main>
  );
}
