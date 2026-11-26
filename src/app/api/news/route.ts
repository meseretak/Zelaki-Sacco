import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Public: published news ordered by date desc
export async function GET() {
  const items = await db.newsItem.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
  return NextResponse.json({ ok: true, items });
}
