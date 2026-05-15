import { auth } from "@clerk/nextjs/server";

export async function getCurrentUserId() {
  try {
    const session = await auth();
    return session.userId ?? "demo-user";
  } catch {
    return "demo-user";
  }
}
