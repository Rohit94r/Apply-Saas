const PLACEHOLDER_PATTERNS = [
  "your-secret",
  "placeholder",
  "replace-me",
  "change-me",
  "ep-xxx",
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

/**
 * Derive the expected Neon Auth URL from a Neon DATABASE_URL host.
 * Format (from Neon docs): https://ep-XXXX.neonauth.[c-N.]<region>.aws.neon.tech/<db>/auth
 * Include the cell id (c-N) when present on the DB host — without it Auth returns
 * "endpoint not found". Do not confuse with Data API (apirest host + /rest/v1).
 * Auth must still be enabled in the Console before this URL works.
 */
export function suggestNeonAuthBaseUrlFromDatabaseUrl(
  databaseUrl = process.env.DATABASE_URL?.trim() ?? ""
) {
  if (!databaseUrl) {
    return "";
  }

  try {
    const parsed = new URL(databaseUrl);
    // e.g. ep-curly-voice-ahtglisi-pooler.c-3.us-east-1.aws.neon.tech
    const host = parsed.hostname;
    const dbName = parsed.pathname.replace(/^\//, "").split("/")[0] || "neondb";

    const endpointMatch = host.match(/^(ep-[a-z0-9-]+?)(?:-pooler)?\./i);
    const cellMatch = host.match(/\.((?:c-\d+)\.)([a-z0-9-]+)\.aws\.neon\.tech$/i);
    const regionOnlyMatch = host.match(/\.([a-z0-9-]+)\.aws\.neon\.tech$/i);

    if (!endpointMatch) {
      return "";
    }

    const endpointId = endpointMatch[1];
    const cellAndRegion = cellMatch
      ? `${cellMatch[1]}${cellMatch[2]}`
      : regionOnlyMatch?.[1];

    if (!cellAndRegion) {
      return "";
    }

    return `https://${endpointId}.neonauth.${cellAndRegion}.aws.neon.tech/${dbName}/auth`;
  } catch {
    return "";
  }
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

export function getNeonAuthSetupHints() {
  const baseUrl = getNeonAuthBaseUrl();
  const cookieSecret = getNeonAuthCookieSecret();
  const suggestedUrl = suggestNeonAuthBaseUrlFromDatabaseUrl();
  const baseUrlOk = isUsableValue(baseUrl, 20) &&
    /^https:\/\/.+\.neonauth\..+\/.+\/auth\/?$/i.test(baseUrl);
  const cookieOk = isUsableValue(cookieSecret, 32);

  return {
    baseUrlOk,
    cookieOk,
    suggestedUrl,
    consolePath: "Neon Console → Project → Branch → Auth → Enable Auth → Configuration → Auth URL"
  };
}

export const neonAuthIsConfigured = isNeonAuthConfigured();
