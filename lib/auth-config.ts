const PLACEHOLDER_PATTERNS = [
  "your-secret",
  "your-client",
  "placeholder",
  "replace-me",
  "replace-with",
  "change-me",
  "paste-google",
  "<"
];

function isUsableValue(value: string | undefined, minLength = 1) {
  const trimmed = (value ?? "").trim().replace(/^["']|["']$/g, "");
  if (trimmed.length < minLength) {
    return false;
  }
  const lower = trimmed.toLowerCase();
  return !PLACEHOLDER_PATTERNS.some((pattern) => lower.includes(pattern));
}

function readEnv(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim().replace(/^["']|["']$/g, "");
    }
  }
  return "";
}

export function getAuthSecret() {
  // Auth.js accepts AUTH_SECRET; older docs used NEXTAUTH_SECRET
  return readEnv("AUTH_SECRET", "NEXTAUTH_SECRET");
}

export function getGoogleClientId() {
  return readEnv("AUTH_GOOGLE_ID", "GOOGLE_CLIENT_ID");
}

export function getGoogleClientSecret() {
  return readEnv("AUTH_GOOGLE_SECRET", "GOOGLE_CLIENT_SECRET");
}

/** True when JWT sessions can be issued (email/password and/or Google). */
export function isAuthConfigured() {
  return isUsableValue(getAuthSecret(), 16);
}

/** True when Google OAuth + JWT secret are ready for Google login. */
export function isGoogleAuthConfigured() {
  return (
    isAuthConfigured() &&
    isUsableValue(getGoogleClientId(), 12) &&
    isUsableValue(getGoogleClientSecret(), 12)
  );
}

function describeEnvStatus(value: string, minLength: number) {
  const trimmed = (value ?? "").trim().replace(/^["']|["']$/g, "");
  if (!trimmed) {
    return { ok: false, label: "missing" };
  }
  const lower = trimmed.toLowerCase();
  if (PLACEHOLDER_PATTERNS.some((pattern) => lower.includes(pattern))) {
    return {
      ok: false,
      label: `placeholder (length ${trimmed.length}) — paste the real value, not from .env.vercel.example`
    };
  }
  if (trimmed.length < minLength) {
    return { ok: false, label: `too short (length ${trimmed.length})` };
  }
  return { ok: true, label: "set" };
}

export function getAuthSetupHints() {
  const secret = getAuthSecret();
  const googleId = getGoogleClientId();
  const googleSecret = getGoogleClientSecret();
  const secretStatus = describeEnvStatus(secret, 16);
  const googleIdStatus = describeEnvStatus(googleId, 12);
  const googleSecretStatus = describeEnvStatus(googleSecret, 12);

  return {
    secretOk: secretStatus.ok,
    googleIdOk: googleIdStatus.ok,
    googleSecretOk: googleSecretStatus.ok,
    secretLabel: secretStatus.label,
    googleIdLabel: googleIdStatus.label,
    googleSecretLabel: googleSecretStatus.label,
    secretLength: secret.length,
    consolePath:
      "Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID"
  };
}

/** @deprecated Use isGoogleAuthConfigured() at call time — do not cache at import. */
export function neonAuthIsConfigured() {
  return isGoogleAuthConfigured();
}

/** Runtime check: AUTH_SECRET is enough for email/password auth. */
export function authIsConfigured() {
  return isAuthConfigured();
}
