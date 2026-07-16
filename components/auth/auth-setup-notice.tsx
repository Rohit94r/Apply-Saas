import { getAuthSetupHints } from "@/lib/auth-config";
import { Logo } from "@/components/landing/logo";

type AuthSetupNoticeProps = {
  fullPage?: boolean;
};

export function AuthSetupNotice({ fullPage = true }: AuthSetupNoticeProps) {
  const hints = getAuthSetupHints();

  const body = (
    <div className="mx-auto max-w-xl rounded-2xl border border-border bg-white p-8 shadow-sm dark:bg-[#1a1a20]">
      <h1 className="font-serif text-3xl text-primary">Google auth setup</h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Apply uses Auth.js (JWT) + Google sign-in. Users are stored in your Neon
        Postgres <code className="text-xs">users</code> table — independent of
        Neon Auth / Clerk.
      </p>
      <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-foreground">
        <li>
          Open{" "}
          <a
            className="font-semibold text-primary underline-offset-2 hover:underline"
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noreferrer"
          >
            Google Cloud Console → Credentials
          </a>{" "}
          and create an <strong>OAuth 2.0 Client ID</strong> (Web application).
        </li>
        <li>
          Add authorized redirect URI:{" "}
          <code className="text-xs">
            http://localhost:3000/api/auth/callback/google
          </code>{" "}
          and your production{" "}
          <code className="text-xs">
            https://YOUR_DOMAIN/api/auth/callback/google
          </code>
          .
        </li>
        <li>
          Set in <code className="text-xs">.env.local</code> (and Vercel):
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              <code className="text-xs">AUTH_SECRET</code> —{" "}
              {hints.secretOk ? "set" : "missing"} ·{" "}
              <code className="text-xs">openssl rand -base64 32</code>
            </li>
            <li>
              <code className="text-xs">AUTH_GOOGLE_ID</code> —{" "}
              {hints.googleIdOk ? "set" : "missing"}
            </li>
            <li>
              <code className="text-xs">AUTH_GOOGLE_SECRET</code> —{" "}
              {hints.googleSecretOk ? "set" : "missing"}
            </li>
          </ul>
        </li>
        <li>Restart <code className="text-xs">next dev</code>.</li>
      </ol>
      <p className="mt-5 text-xs text-muted-foreground">
        Status: Secret {hints.secretOk ? "ok" : "missing"} · Google ID{" "}
        {hints.googleIdOk ? "ok" : "missing"} · Google secret{" "}
        {hints.googleSecretOk ? "ok" : "missing"}
      </p>
    </div>
  );

  if (!fullPage) {
    return body;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-5 py-10 dark:bg-[#131318]">
      <div className="mb-8">
        <Logo />
      </div>
      {body}
    </main>
  );
}
