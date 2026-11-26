import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  const items = await db.contentImage.findMany({ orderBy: { section: "asc" } });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const b = await req.json();
  const url: string = b.url ?? "";
  const key: string = b.key ?? "";
  const section: string = b.section ?? "misc";
  if (!url || !key) return NextResponse.json({ error: "url and key required", ok: false }, { status: 400 });
  const item = await db.contentImage.upsert({
    where: { key },
    update: { url, alt: String(b.alt ?? ""), section },
    create: { section, key, url, alt: String(b.alt ?? "") },
  });
  return NextResponse.json({ ok: true, id: item.id });
}

export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const key = url.searchParams.get("key");
  if (!key) return NextResponse.json({ error: "key required", ok: false }, { status: 400 });
  await db.contentImage.deleteMany({ where: { key } });
  return NextResponse.json({ ok: true });
}
