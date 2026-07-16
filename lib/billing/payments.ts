import { eq } from "drizzle-orm";
import { WHATSAPP_NUMBER } from "@/lib/billing/constants";
import { resolveDiscountCode } from "@/lib/billing/discount-codes";
import { sendPaymentNotificationEmail } from "@/lib/billing/email";
import { db } from "@/lib/db";
import { paymentRequests } from "@/packages/db/schema";

export function buildWhatsAppPaymentUrl(input: {
  userName: string;
  userEmail: string;
  amountInr: number;
  discountCode?: string | null;
}) {
  const lines = [
    "Hi, I completed payment for Apply Pro.",
    `Name: ${input.userName}`,
    `Email: ${input.userEmail}`,
    `Amount paid: ₹${input.amountInr}`,
    input.discountCode ? `Discount code: ${input.discountCode}` : "No discount code",
    "Please activate my Pro subscription. Thank you!"
  ];

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export async function completeManualPayment(input: {
  userId: string;
  userName: string;
  userEmail: string;
  deviceId?: string;
  discountCode?: string;
}) {
  const pricing = resolveDiscountCode(input.discountCode);

  const [payment] = await db
    .insert(paymentRequests)
    .values({
      userId: input.userId,
      userName: input.userName,
      userEmail: input.userEmail,
      deviceId: input.deviceId,
      amountInr: pricing.amountInr,
      originalAmountInr: pricing.originalAmountInr,
      discountCode: pricing.code ?? undefined,
      status: "pending",
      proActivated: false,
      whatsappOpenedAt: new Date()
    })
    .returning();

  await sendPaymentNotificationEmail({
    userName: input.userName,
    userEmail: input.userEmail,
    amountInr: pricing.amountInr,
    originalAmountInr: pricing.originalAmountInr,
    discountCode: pricing.code,
    paymentId: payment.id,
    userId: input.userId
  });

  return {
    paymentId: payment.id,
    amountInr: pricing.amountInr,
    originalAmountInr: pricing.originalAmountInr,
    discountCode: pricing.code,
    discountLabel: pricing.label,
    whatsappUrl: buildWhatsAppPaymentUrl({
      userName: input.userName,
      userEmail: input.userEmail,
      amountInr: pricing.amountInr,
      discountCode: pricing.code
    }),
    pending: true
  };
}

export async function confirmPayment(paymentId: string, days = 30) {
  const payment = await db.query.paymentRequests.findFirst({
    where: eq(paymentRequests.id, paymentId)
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  const { applySubscriptionDays } = await import("@/lib/admin/subscription");
  const result = await applySubscriptionDays(payment.userId, days);

  await db
    .update(paymentRequests)
    .set({
      status: "confirmed",
      proActivated: true,
      proExpiresAt: new Date(result.proExpiresAt),
      updatedAt: new Date()
    })
    .where(eq(paymentRequests.id, paymentId));

  return result;
}

export async function rejectPayment(paymentId: string) {
  const payment = await db.query.paymentRequests.findFirst({
    where: eq(paymentRequests.id, paymentId)
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  await db
    .update(paymentRequests)
    .set({ status: "rejected", updatedAt: new Date() })
    .where(eq(paymentRequests.id, paymentId));
}
