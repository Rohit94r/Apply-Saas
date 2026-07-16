import { AuthSetupNotice } from "@/components/auth/auth-setup-notice";
import { Logo } from "@/components/landing/logo";
import { neonAuthIsConfigured } from "@/lib/auth-config";
import { SignUpForm } from "./sign-up-form";

export default function SignUpPage() {
  if (!neonAuthIsConfigured) {
    return <AuthSetupNotice />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-5 py-10 dark:bg-[#131318]">
      <div className="mb-8">
        <Logo />
      </div>
      <SignUpForm />
    </main>
  );
}
