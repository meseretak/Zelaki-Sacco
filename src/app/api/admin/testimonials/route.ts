import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  const items = await db.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const b = await req.json();
  const item = await db.testimonial.create({
    data: {
      name: String(b.name ?? ""),
      role: String(b.role ?? ""),
      quote: String(b.quote ?? ""),
      initials: String(b.initials ?? ""),
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
  await db.testimonial.update({
    where: { id },
    data: {
      name: String(b.name ?? ""),
      role: String(b.role ?? ""),
      quote: String(b.quote ?? ""),
      initials: String(b.initials ?? ""),
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
  await db.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
