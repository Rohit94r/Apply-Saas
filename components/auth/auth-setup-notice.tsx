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
        Google Console redirect URIs look fine. This screen appears only when
        env vars are incomplete in the current runtime (local{" "}
        <code className="text-xs">.env.local</code> or Vercel Environment
        Variables).
      </p>
      <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-foreground">
        <li>
          Set all three in <code className="text-xs">.env.local</code>{" "}
          <strong>and</strong> Vercel → Settings → Environment Variables:
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              <code className="text-xs">AUTH_SECRET</code> —{" "}
              {hints.secretOk
                ? "set"
                : `missing (length ${hints.secretLength})`}
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
        <li>
          If Google ID/secret are set but secret is missing on production, add{" "}
          <code className="text-xs">AUTH_SECRET</code> in Vercel and{" "}
          <strong>Redeploy</strong>.
        </li>
        <li>
          Locally: stop the server completely, then run{" "}
          <code className="text-xs">npm run dev</code> again (env changes need a
          full restart).
        </li>
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
