import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    const item = await db.newsItem.findUnique({ where: { id } });
    return NextResponse.json({ ok: true, item });
  }
  const items = await db.newsItem.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const b = await req.json();
  const item = await db.newsItem.create({
    data: {
      title: String(b.title ?? ""),
      date: String(b.date ?? new Date().toISOString().slice(0, 10)),
      excerpt: String(b.excerpt ?? ""),
      tag: String(b.tag ?? "Update"),
      icon: String(b.icon ?? "Globe"),
      published: b.published !== false,
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
  await db.newsItem.update({
    where: { id },
    data: {
      title: String(b.title ?? ""),
      date: String(b.date ?? ""),
      excerpt: String(b.excerpt ?? ""),
      tag: String(b.tag ?? "Update"),
      icon: String(b.icon ?? "Globe"),
      published: b.published !== false,
    },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  await db.newsItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
