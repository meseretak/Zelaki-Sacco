import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSettings } from "@/lib/settings";
import { hashPassword, verifyAdmin } from "@/lib/auth";

// GET — check if currently authenticated as admin
export async function GET() {
  const authed = await verifyAdmin();
  return NextResponse.json({ ok: true, authed });
}

// POST { passcode } -> sets admin_token cookie
export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();
    const s = await getSettings();
    const expected = s.adminPasscode || "admin123";
    if (passcode !== expected) {
      return NextResponse.json({ error: "Invalid passcode", ok: false }, { status: 401 });
    }
    const store = await cookies();
    store.set("admin_token", hashPassword(expected), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("admin login error:", e);
    return NextResponse.json({ error: "Failed", ok: false }, { status: 500 });
  }
}

export async function DELETE() {
  const store = await cookies();
  store.delete("admin_token");
  return NextResponse.json({ ok: true });
}
