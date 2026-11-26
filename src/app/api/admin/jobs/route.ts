import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

// GET — list all jobs (admin) with application counts
export async function GET() {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const jobs = await db.job.findMany({ orderBy: { createdAt: "desc" }, include: { applications: { select: { id: true, status: true } } } });
  return NextResponse.json({ ok: true, jobs: jobs.map((j) => ({ ...j, applicationCount: j.applications.length, applications: undefined })) });
}

// POST — create a job posting
export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const b = await req.json();
  const job = await db.job.create({
    data: {
      title: String(b.title || ""), department: String(b.department || "Operations"), type: String(b.type || "Full-time"),
      location: String(b.location || "Addis Ababa"), description: String(b.description || ""),
      requirements: b.requirements ? String(b.requirements) : null, salary: b.salary ? String(b.salary) : null,
      closingDate: b.closingDate ? new Date(String(b.closingDate)) : null,
      status: String(b.status || "open"),
    },
  });
  return NextResponse.json({ ok: true, id: job.id });
}

// PUT — update a job
export async function PUT(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url); const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  const b = await req.json();
  const data: Record<string, unknown> = {};
  for (const k of ["title", "department", "type", "location", "description", "requirements", "salary", "status"]) {
    if (b[k] !== undefined) data[k] = String(b[k]);
  }
  if (b.closingDate !== undefined) data.closingDate = b.closingDate ? new Date(String(b.closingDate)) : null;
  await db.job.update({ where: { id }, data });
  return NextResponse.json({ ok: true });
}

// DELETE — delete a job
export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url); const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  await db.job.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
