import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "Apply",
    timestamp: new Date().toISOString()
  });
}
