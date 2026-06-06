import { NextResponse } from "next/server";
import { confirmPayment, rejectPayment } from "@/lib/billing/payments";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentId = searchParams.get("id");
  const key = searchParams.get("key");
  const action = searchParams.get("action") ?? "confirm";

  if (!paymentId) {
    return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
  }

  const adminSecret = process.env.PAYMENT_ADMIN_SECRET;

  if (!adminSecret || key !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (action === "reject") {
      await rejectPayment(paymentId);
      return NextResponse.redirect(
        new URL("/dashboard/upgrade?payment=rejected", request.url)
      );
    }

    await confirmPayment(paymentId);
    return NextResponse.redirect(
      new URL("/dashboard/upgrade?payment=confirmed", request.url)
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update payment";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
