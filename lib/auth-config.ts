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

/** True when Google OAuth + JWT secret are ready for login. */
export function isGoogleAuthConfigured() {
  return (
    isUsableValue(getAuthSecret(), 16) &&
    isUsableValue(getGoogleClientId(), 12) &&
    isUsableValue(getGoogleClientSecret(), 12)
  );
}

export function getAuthSetupHints() {
  const secret = getAuthSecret();
  const googleId = getGoogleClientId();
  const googleSecret = getGoogleClientSecret();

  return {
    secretOk: isUsableValue(secret, 16),
    googleIdOk: isUsableValue(googleId, 12),
    googleSecretOk: isUsableValue(googleSecret, 12),
    secretLength: secret.length,
    consolePath:
      "Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID"
  };
}

/** @deprecated Use isGoogleAuthConfigured() at call time — do not cache at import. */
export function neonAuthIsConfigured() {
  return isGoogleAuthConfigured();
}

/** Runtime check (prefer calling the function, not a module constant). */
export function authIsConfigured() {
  return isGoogleAuthConfigured();
}
