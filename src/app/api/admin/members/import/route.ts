import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin, hashPassword } from "@/lib/auth";

// POST — bulk import members from an array of rows
// body: { members: [{ fullName, email, phone, city, branch, occupation, compulsorySavings, voluntarySavings, shareCount, password }] }
export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  try {
    const b = await req.json();
    const rows: Record<string, unknown>[] = Array.isArray(b.members) ? b.members : [];
    if (rows.length === 0) return NextResponse.json({ error: "No members provided", ok: false }, { status: 400 });

    const baseCount = await db.member.count();
    let created = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const email = String(r.email || "").toLowerCase().trim();
      const fullName = String(r.fullName || r.name || "").trim();
      if (!email || !fullName) { skipped++; errors.push(`Row ${i + 2}: missing name or email`); continue; }
      const existing = await db.member.findUnique({ where: { email } });
      if (existing) { skipped++; errors.push(`Row ${i + 2}: ${email} already exists`); continue; }
      const memberNumber = `HDS-${String(baseCount + created + 1).padStart(4, "0")}`;
      await db.member.create({
        data: {
          memberNumber,
          fullName,
          email,
          passwordHash: hashPassword(String(r.password || "demo123")),
          phone: String(r.phone || ""),
          city: String(r.city || ""),
          branch: String(r.branch || "Addis Ababa Branch (Head Office)"),
          occupation: String(r.occupation || r.role || ""),
          compulsorySavings: Number(r.compulsorySavings || 0),
          voluntarySavings: Number(r.voluntarySavings || 0),
          childSavings: Number(r.childSavings || 0),
          shareCount: Number(r.shareCount || 0),
          status: "active",
        },
      });
      created++;
    }
    return NextResponse.json({ ok: true, created, skipped, errors });
  } catch (e) {
    console.error("bulk import error:", e);
    return NextResponse.json({ error: "Failed", ok: false }, { status: 500 });
  }
}
