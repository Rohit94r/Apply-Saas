"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export async function signUpWithEmail(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Name, email, and password are required." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const { error } = await auth.signUp.email({
    name,
    email,
    password
  });

  if (error) {
    return { error: error.message || "Failed to create account." };
  }

  redirect("/dashboard");
}
