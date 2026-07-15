import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { deleteCoverLetter } from "@/lib/data/cover-letters";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getCurrentUserId();
    await deleteCoverLetter(userId, id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete cover letter";
    const status = message === "Unauthorized" ? 401 : message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
