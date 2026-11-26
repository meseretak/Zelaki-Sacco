import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

// GET — admin list (all, including unpublished/featured ordering)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (id) {
    const item = await db.sacco.findUnique({ where: { id } });
    return NextResponse.json({ ok: true, item });
  }
  const items = await db.sacco.findMany({ orderBy: [{ featured: "desc" }, { name: "asc" }] });
  return NextResponse.json({ ok: true, items });
}

async function bodyToSacco(body: Record<string, unknown>) {
  return {
    name: String(body.name ?? ""),
    region: String(body.region ?? ""),
    city: String(body.city ?? ""),
    type: String(body.type ?? "Urban"),
    established: Number(body.established ?? 2024),
    members: Number(body.members ?? 0),
    assetsBirr: Number(body.assetsBirr ?? 0),
    phone: String(body.phone ?? ""),
    email: String(body.email ?? ""),
    services: Array.isArray(body.services) ? body.services.join(", ") : String(body.services ?? ""),
    description: String(body.description ?? ""),
    featured: Boolean(body.featured),
  };
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const body = await req.json();
  const item = await db.sacco.create({ data: await bodyToSacco(body) });
  return NextResponse.json({ ok: true, id: item.id });
}

export async function PUT(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  const body = await req.json();
  const item = await db.sacco.update({ where: { id }, data: await bodyToSacco(body) });
  return NextResponse.json({ ok: true, id: item.id });
}

export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  await db.sacco.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
