import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Public: published testimonials
export async function GET() {
  const items = await db.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
  return NextResponse.json({ ok: true, items });
}
