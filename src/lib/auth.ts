import { createHash } from "crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const SALT = "sustainable-salt::";

export function hashPassword(p: string) {
  return createHash("sha256").update(`${SALT}${p}`).digest("hex");
}

export function verifyPassword(p: string, hash: string) {
  return hashPassword(p) === hash;
}

// ---- Admin auth ----
export async function verifyAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get("admin_token")?.value;
  if (!token) return false;
  // token is hash of the admin passcode; verify it matches current settings
  const { getSettings } = await import("@/lib/settings");
  const s = await getSettings();
  return token === hashPassword(s.adminPasscode || "admin123");
}

// ---- Member auth ----
export async function getMemberId(): Promise<string | null> {
  const store = await cookies();
  const id = store.get("member_session")?.value;
  if (!id) return null;
  const member = await db.member.findUnique({ where: { id } });
  return member && member.status === "active" ? member.id : null;
}

export async function getMember() {
  const id = await getMemberId();
  if (!id) return null;
  return db.member.findUnique({
    where: { id },
    include: {
      transactions: { orderBy: { date: "desc" }, take: 20 },
      loans: { where: { status: "active" } },
    },
  });
}
