const CLERK_PLACEHOLDER_PATTERNS = [
  "your-clerk",
  "placeholder",
  "replace-me",
  "<"
];

export function getClerkPublishableKey() {
  return process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() ?? "";
}

export function isUsableClerkPublishableKey(
  key = getClerkPublishableKey()
) {
  return (
    /^pk_(test|live)_[A-Za-z0-9_-]+$/.test(key) &&
    !CLERK_PLACEHOLDER_PATTERNS.some((pattern) =>
      key.toLowerCase().includes(pattern)
    )
  );
}

export const clerkPublishableKey = getClerkPublishableKey();
export const clerkIsConfigured = isUsableClerkPublishableKey(
  clerkPublishableKey
);
