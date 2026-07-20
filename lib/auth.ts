  import { auth } from "@/lib/auth/server";

export type AuthSessionUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export async function getSession() {
  return auth();
}

export async function getCurrentUser(): Promise<AuthSessionUser | null> {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) {
    return null;
  }

  return {
    id: user.id,
    name: user.name ?? user.email ?? "Apply user",
    email: user.email ?? "",
    image: user.image
  };
}

export async function getCurrentUserId() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user.id;
}

/** Soft check used by API routes that return 401 instead of throwing. */
export async function getOptionalUserId() {
  const user = await getCurrentUser();
  return user?.id ?? null;
}
