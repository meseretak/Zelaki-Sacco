import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  const items = await db.navItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const b = await req.json();
  const max = await db.navItem.aggregate({ _max: { order: true } });
  const item = await db.navItem.create({
    data: {
      label: String(b.label ?? "New Link"),
      href: String(b.href ?? "#"),
      order: b.order ?? (max._max.order ?? -1) + 1,
      visible: b.visible !== false,
      openInNew: Boolean(b.openInNew),
    },
  });
  return NextResponse.json({ ok: true, id: item.id });
}

export async function PUT(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  const b = await req.json();
  await db.navItem.update({
    where: { id },
    data: {
      label: String(b.label ?? ""),
      href: String(b.href ?? "#"),
      order: Number(b.order ?? 0),
      visible: b.visible !== false,
      openInNew: Boolean(b.openInNew),
    },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  await db.navItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
