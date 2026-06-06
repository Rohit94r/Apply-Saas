import { NextResponse } from "next/server";
import { assertAdmin } from "@/lib/admin/auth";

export async function GET() {
  try {
    const profile = await assertAdmin();
    return NextResponse.json({
      isAdmin: true,
      email: profile.email
    });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
