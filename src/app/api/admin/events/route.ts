import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    const item = await db.eventItem.findUnique({ where: { id } });
    return NextResponse.json({ ok: true, item });
  }
  const items = await db.eventItem.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const b = await req.json();
  const item = await db.eventItem.create({
    data: {
      day: String(b.day ?? ""),
      month: String(b.month ?? ""),
      dayName: String(b.dayName ?? ""),
      title: String(b.title ?? ""),
      time: String(b.time ?? ""),
      location: String(b.location ?? ""),
      type: String(b.type ?? "Event"),
      description: String(b.description ?? ""),
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
  await db.eventItem.update({
    where: { id },
    data: {
      day: String(b.day ?? ""),
      month: String(b.month ?? ""),
      dayName: String(b.dayName ?? ""),
      title: String(b.title ?? ""),
      time: String(b.time ?? ""),
      location: String(b.location ?? ""),
      type: String(b.type ?? "Event"),
      description: String(b.description ?? ""),
    },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  await db.eventItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
