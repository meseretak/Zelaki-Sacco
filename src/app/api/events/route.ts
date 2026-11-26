import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Public: upcoming events ordered
export async function GET() {
  const items = await db.eventItem.findMany({
    orderBy: { createdAt: "asc" },
    take: 8,
  });
  return NextResponse.json({ ok: true, items });
}
