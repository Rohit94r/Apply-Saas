import { WHATSAPP_NUMBER } from "@/lib/billing/constants";
import { resolveDiscountCode } from "@/lib/billing/discount-codes";
import { sendPaymentNotificationEmail } from "@/lib/billing/email";
import { connectToDatabase } from "@/lib/mongodb";
import { PaymentRequest, type PaymentRequestDocument } from "@/models/PaymentRequest";

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
  await connectToDatabase();

  const payment = await PaymentRequest.create({
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
  });

  await sendPaymentNotificationEmail({
    userName: input.userName,
    userEmail: input.userEmail,
    amountInr: pricing.amountInr,
    originalAmountInr: pricing.originalAmountInr,
    discountCode: pricing.code,
    paymentId: payment._id.toString(),
    userId: input.userId
  });

  return {
    paymentId: payment._id.toString(),
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
  await connectToDatabase();
  const payment = await PaymentRequest.findById(paymentId).lean<PaymentRequestDocument>();

  if (!payment) {
    throw new Error("Payment not found");
  }

  const { applySubscriptionDays } = await import("@/lib/admin/subscription");
  const result = await applySubscriptionDays(payment.userId, days);

  await PaymentRequest.updateOne(
    { _id: paymentId },
    {
      $set: {
        status: "confirmed",
        proActivated: true,
        proExpiresAt: new Date(result.proExpiresAt)
      }
    }
  );

  return result;
}

export async function rejectPayment(paymentId: string) {
  await connectToDatabase();
  const payment = await PaymentRequest.findById(paymentId).lean<PaymentRequestDocument>();

  if (!payment) {
    throw new Error("Payment not found");
  }

  await PaymentRequest.updateOne({ _id: paymentId }, { $set: { status: "rejected" } });
}
