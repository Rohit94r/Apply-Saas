import {
  DISCOUNT_CODES,
  PRO_MONTHLY_PRICE_INR,
  type DiscountCode
} from "@/lib/billing/constants";

export function normalizeDiscountCode(value: string) {
  return value.trim().toUpperCase();
}

export function resolveDiscountCode(code?: string) {
  if (!code?.trim()) {
    return {
      code: null as DiscountCode | null,
      originalAmountInr: PRO_MONTHLY_PRICE_INR,
      amountInr: PRO_MONTHLY_PRICE_INR,
      percentOff: 0,
      label: "Full price"
    };
  }

  const normalized = normalizeDiscountCode(code) as DiscountCode;
  const config = DISCOUNT_CODES[normalized];

  if (!config) {
    throw new Error("That code didn't work — DM Rohit on Instagram or LinkedIn for a private one");
  }

  const amountInr =
    config.percentOff >= 100 ? 1 : Math.round(PRO_MONTHLY_PRICE_INR * (1 - config.percentOff / 100));

  return {
    code: normalized,
    originalAmountInr: PRO_MONTHLY_PRICE_INR,
    amountInr,
    percentOff: config.percentOff,
    label: config.label
  };
}
