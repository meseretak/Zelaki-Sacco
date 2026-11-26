import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET — public list of open jobs
export async function GET() {
  const jobs = await db.job.findMany({ where: { status: "open" }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, jobs });
}
