const PLACEHOLDER_PATTERNS = [
  "your-secret",
  "placeholder",
  "replace-me",
  "change-me",
  "xxx",
  "<"
];

function isUsableValue(value: string, minLength = 1) {
  const trimmed = value.trim();
  if (trimmed.length < minLength) {
    return false;
  }
  const lower = trimmed.toLowerCase();
  return !PLACEHOLDER_PATTERNS.some((pattern) => lower.includes(pattern));
}

export function getNeonAuthBaseUrl() {
  return process.env.NEON_AUTH_BASE_URL?.trim() ?? "";
}

export function getNeonAuthCookieSecret() {
  return process.env.NEON_AUTH_COOKIE_SECRET?.trim() ?? "";
}

export function isNeonAuthConfigured(
  baseUrl = getNeonAuthBaseUrl(),
  cookieSecret = getNeonAuthCookieSecret()
) {
  const looksLikeAuthUrl =
    /^https:\/\/.+\.neonauth\..+\/.+\/auth\/?$/i.test(baseUrl) ||
    /^https:\/\/.+\/auth\/?$/i.test(baseUrl);

  return (
    looksLikeAuthUrl &&
    isUsableValue(baseUrl, 20) &&
    isUsableValue(cookieSecret, 32)
  );
}

export const neonAuthIsConfigured = isNeonAuthConfigured();
