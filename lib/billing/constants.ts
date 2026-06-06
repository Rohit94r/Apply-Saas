export const FREE_RESUME_LIMIT = 5;
export const PRO_MONTHLY_PRICE_INR = 50;
export const PRO_DURATION_DAYS = 30;
export const WHATSAPP_NUMBER = "918459262203";
export const QR_CODE_PATH = "/qrcode.png";

export const DISCOUNT_CODES = {
  APPLY25R: {
    label: "50% off",
    percentOff: 50,
    description: "Pay ₹25 instead of ₹50"
  },
  APPLY100RJ: {
    label: "100% off",
    percentOff: 100,
    description: "Pay ₹1 only (promo unlock)"
  }
} as const;

export type DiscountCode = keyof typeof DISCOUNT_CODES;
