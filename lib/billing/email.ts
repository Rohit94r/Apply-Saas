const RESEND_API_URL = "https://api.resend.com/emails";

type PaymentEmailInput = {
  userName: string;
  userEmail: string;
  amountInr: number;
  originalAmountInr: number;
  discountCode: string | null;
  paymentId: string;
  userId: string;
};

export async function sendPaymentNotificationEmail(input: PaymentEmailInput) {
  const notifyEmail = process.env.PAYMENT_NOTIFY_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.PAYMENT_FROM_EMAIL ?? "Apply <onboarding@resend.dev>";

  const subject = `Apply Pro payment — ${input.userName} (₹${input.amountInr})`;
  const body = [
    "New Apply Pro manual payment submitted.",
    "",
    `Name: ${input.userName}`,
    `Email: ${input.userEmail}`,
    `Auth user ID: ${input.userId}`,
    `Payment ID: ${input.paymentId}`,
    `Amount: ₹${input.amountInr}${input.originalAmountInr !== input.amountInr ? ` (was ₹${input.originalAmountInr})` : ""}`,
    input.discountCode ? `Discount code: ${input.discountCode}` : "Discount code: none",
    "",
    "Verify UPI on WhatsApp, then open your admin dashboard to add subscription days:",
    `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard/admin`,
  ].join("\n");

  if (!notifyEmail) {
    console.info("[Apply billing] PAYMENT_NOTIFY_EMAIL not set. Payment alert:\n", body);
    return { sent: false, reason: "PAYMENT_NOTIFY_EMAIL not configured" };
  }

  if (!resendKey) {
    console.info("[Apply billing] RESEND_API_KEY not set. Payment alert:\n", body);
    return { sent: false, reason: "RESEND_API_KEY not configured" };
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notifyEmail],
      subject,
      text: body
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Apply billing] Email failed:", errorText);
    return { sent: false, reason: errorText };
  }

  return { sent: true };
}
