import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    const item = await db.page.findUnique({ where: { id } });
    return NextResponse.json({ ok: true, item });
  }
  const items = await db.page.findMany({ orderBy: [{ section: "asc" }, { order: "asc" }] });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const b = await req.json();
  const slug = String(b.slug || "").trim().toLowerCase().replace(/\s+/g, "-");
  if (!slug) return NextResponse.json({ error: "slug required", ok: false }, { status: 400 });
  const item = await db.page.create({
    data: {
      slug,
      title: String(b.title || ""),
      subtitle: b.subtitle ? String(b.subtitle) : null,
      content: String(b.content || ""),
      section: String(b.section || "about"),
      icon: b.icon ? String(b.icon) : null,
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
  const slug = b.slug ? String(b.slug).trim().toLowerCase().replace(/\s+/g, "-") : undefined;
  await db.page.update({
    where: { id },
    data: {
      ...(b.title !== undefined ? { title: String(b.title) } : {}),
      ...(b.subtitle !== undefined ? { subtitle: b.subtitle ? String(b.subtitle) : null } : {}),
      ...(b.content !== undefined ? { content: String(b.content) } : {}),
      ...(b.section !== undefined ? { section: String(b.section) } : {}),
      ...(b.icon !== undefined ? { icon: b.icon ? String(b.icon) : null } : {}),
      ...(b.published !== undefined ? { published: b.published !== false } : {}),
      ...(slug ? { slug } : {}),
    },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  await db.page.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
