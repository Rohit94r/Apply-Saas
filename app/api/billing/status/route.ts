import { NextResponse } from "next/server";
import { z } from "zod";
import { resolveDiscountCode } from "@/lib/billing/discount-codes";
import { getBillingStatus } from "@/lib/billing/usage";
import { getCurrentUserId } from "@/lib/auth";
import { getDeviceIdFromRequest } from "@/lib/billing/request";

export async function GET(request: Request) {
  try {
    const userId = await getCurrentUserId();
    const deviceId = getDeviceIdFromRequest(request);
    const status = await getBillingStatus(userId, deviceId);

    return NextResponse.json(status);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load billing status";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

const previewSchema = z.object({
  discountCode: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = previewSchema.parse(await request.json());
    const pricing = resolveDiscountCode(body.discountCode);

    return NextResponse.json(pricing);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid discount code";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
