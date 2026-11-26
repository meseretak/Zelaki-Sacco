import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Public: visible nav items ordered
export async function GET() {
  const items = await db.navItem.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ ok: true, items });
}
