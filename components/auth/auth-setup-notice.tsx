import { Logo } from "@/components/landing/logo";
import { getNeonAuthSetupHints } from "@/lib/auth-config";

type AuthSetupNoticeProps = {
  /** When true, wraps content in a full-page main (sign-in / sign-up). */
  fullPage?: boolean;
};

export function AuthSetupNotice({ fullPage = true }: AuthSetupNoticeProps) {
  const { baseUrlOk, cookieOk, suggestedUrl, consolePath } =
    getNeonAuthSetupHints();

  const body = (
    <div className="max-w-lg rounded-xl border border-border bg-white p-6 text-left shadow-sm dark:bg-[#1a1a20]">
      <div className="mb-4 flex justify-center">
        <Logo />
      </div>
      <h1 className="text-center text-xl font-semibold text-foreground">
        Neon Auth needs setup
      </h1>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
        <li>
          Open {consolePath}. Click <strong>Enable Auth</strong> if it is not
          already on.
        </li>
        <li>
          Copy the Auth URL from Configuration into{" "}
          <code className="text-xs">NEON_AUTH_BASE_URL</code> in{" "}
          <code className="text-xs">.env.local</code>
          {suggestedUrl ? (
            <>
              . Expected shape for this project:
              <code className="mt-2 block break-all rounded-md bg-muted px-2 py-1.5 text-xs text-foreground">
                {suggestedUrl}
              </code>
            </>
          ) : (
            "."
          )}
        </li>
        <li>
          Ensure <code className="text-xs">NEON_AUTH_COOKIE_SECRET</code> is set
          (≥32 chars). Generate with:{" "}
          <code className="text-xs">openssl rand -base64 32</code>
          {cookieOk ? " — cookie secret looks set." : " — cookie secret missing."}
        </li>
        <li>
          In Neon Auth settings, add{" "}
          <code className="text-xs">http://localhost:3000</code> (and your
          production origin) under Trusted domains. Restart the Next.js server.
        </li>
      </ol>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Status: Auth URL {baseUrlOk ? "set" : "missing/placeholder"} · Cookie
        secret {cookieOk ? "set" : "missing"}
      </p>
    </div>
  );

  if (!fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f4ee] px-5 dark:bg-[#131318]">
        {body}
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ee] px-5 py-10 dark:bg-[#131318]">
      {body}
    </main>
  );
}
