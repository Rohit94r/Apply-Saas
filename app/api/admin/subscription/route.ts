import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdmin } from "@/lib/admin/auth";
import { setUserSubscriptionByEmail, setUserSubscriptionByClerkId } from "@/lib/admin/subscription";
import { confirmPayment } from "@/lib/billing/payments";

const subscriptionSchema = z.object({
  email: z.string().email().optional(),
  clerkId: z.string().optional(),
  paymentId: z.string().optional(),
  days: z.number().int().min(1).max(365)
});

export async function POST(request: Request) {
  try {
    await assertAdmin();
    const body = subscriptionSchema.parse(await request.json());

    if (body.paymentId) {
      const result = await confirmPayment(body.paymentId, body.days);
      return NextResponse.json({ ok: true, ...result });
    }

    if (body.clerkId) {
      const result = await setUserSubscriptionByClerkId(body.clerkId, body.days);
      return NextResponse.json({ ok: true, ...result });
    }

    if (!body.email) {
      throw new Error("Email or clerkId is required");
    }

    const result = await setUserSubscriptionByEmail(body.email, body.days);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update subscription";
    const status = message === "Forbidden" ? 403 : message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
