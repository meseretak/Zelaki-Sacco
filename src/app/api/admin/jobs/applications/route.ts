import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

// GET — list all job applications (admin) with job info
export async function GET(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const jobId = url.searchParams.get("jobId");
  const apps = await db.jobApplication.findMany({
    where: jobId ? { jobId } : undefined,
    include: { job: { select: { title: true } } },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return NextResponse.json({ ok: true, applications: apps });
}

// PUT — update application status
export async function PUT(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url); const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  const b = await req.json();
  await db.jobApplication.update({ where: { id }, data: { status: String(b.status || "new") } });
  return NextResponse.json({ ok: true });
}
