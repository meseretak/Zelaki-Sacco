import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

// POST { email, password } -> sets member_session cookie
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const e = String(email ?? "").toLowerCase().trim();
    if (!e || !password) {
      return NextResponse.json({ error: "Email and password required", ok: false }, { status: 400 });
    }
    const member = await db.member.findUnique({ where: { email: e } });
    if (!member || !verifyPassword(String(password), member.passwordHash)) {
      return NextResponse.json({ error: "Invalid credentials", ok: false }, { status: 401 });
    }
    if (member.status !== "active") {
      return NextResponse.json({ error: "Account is not active", ok: false }, { status: 403 });
    }
    const store = await cookies();
    store.set("member_session", member.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return NextResponse.json({
      ok: true,
      member: {
        id: member.id,
        memberNumber: member.memberNumber,
        fullName: member.fullName,
        email: member.email,
      },
    });
  } catch (e) {
    console.error("member login error:", e);
    return NextResponse.json({ error: "Failed", ok: false }, { status: 500 });
  }
}

export async function DELETE() {
  const store = await cookies();
  store.delete("member_session");
  return NextResponse.json({ ok: true });
}
