import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE = "admin_session";
const TTL_SECONDS = 60 * 60 * 8;

// The password lives only in the ADMIN_PASSWORD environment variable. If it is not set, the admin is disabled.
export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function sign(expires: string): string {
  return crypto.createHmac("sha256", process.env.ADMIN_PASSWORD || "").update(`admin:${expires}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

export async function startSession(): Promise<void> {
  const expires = String(Date.now() + TTL_SECONDS * 1000);
  const jar = await cookies();
  jar.set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TTL_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const jar = await cookies();
  const value = jar.get(COOKIE)?.value;
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires));
}
