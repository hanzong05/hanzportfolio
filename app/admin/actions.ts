"use server";
import { redirect } from "next/navigation";
import { checkPassword, endSession, startSession } from "@/lib/admin-auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (checkPassword(password)) {
    await startSession();
    redirect("/admin");
  }
  await new Promise((r) => setTimeout(r, 800)); // slows down guessing
  redirect("/admin?error=1");
}

export async function logout() {
  await endSession();
  redirect("/admin");
}
