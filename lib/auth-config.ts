const PLACEHOLDER_PATTERNS = [
  "your-secret",
  "your-client",
  "placeholder",
  "replace-me",
  "replace-with",
  "change-me",
  "<"
];

function isUsableValue(value: string | undefined, minLength = 1) {
  const trimmed = value?.trim() ?? "";
  if (trimmed.length < minLength) {
    return false;
  }
  const lower = trimmed.toLowerCase();
  return !PLACEHOLDER_PATTERNS.some((pattern) => lower.includes(pattern));
}

export function getAuthSecret() {
  return process.env.AUTH_SECRET?.trim() ?? "";
}

export function getGoogleClientId() {
  return process.env.AUTH_GOOGLE_ID?.trim() ?? "";
}

export function getGoogleClientSecret() {
  return process.env.AUTH_GOOGLE_SECRET?.trim() ?? "";
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
  return {
    secretOk: isUsableValue(getAuthSecret(), 16),
    googleIdOk: isUsableValue(getGoogleClientId(), 12),
    googleSecretOk: isUsableValue(getGoogleClientSecret(), 12),
    consolePath:
      "Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID"
  };
}

/** @deprecated Use isGoogleAuthConfigured — kept for any leftover imports. */
export const neonAuthIsConfigured = isGoogleAuthConfigured();

/** Runtime check (prefer calling the function, not the module constant). */
export function authIsConfigured() {
  return isGoogleAuthConfigured();
}
