import { NextResponse } from "next/server";
import { z } from "zod";
import { completeManualPayment } from "@/lib/billing/payments";
import { logFeatureUse } from "@/lib/admin/session";
import { getCurrentUserProfile } from "@/lib/billing/users";
import { getDeviceIdFromRequest } from "@/lib/billing/request";

const paymentSchema = z.object({
  discountCode: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const profile = await getCurrentUserProfile();
    const body = paymentSchema.parse(await request.json());
    const deviceId = getDeviceIdFromRequest(request);

    const result = await completeManualPayment({
      userId: profile.userId,
      userName: profile.name,
      userEmail: profile.email,
      deviceId,
      discountCode: body.discountCode
    });

    void logFeatureUse("payment", `₹${result.amountInr} pending`);

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to complete payment flow";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
