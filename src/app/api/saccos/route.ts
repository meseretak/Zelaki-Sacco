import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/saccos?region=&type=&q=  — public directory from DB
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const region = url.searchParams.get("region");
    const type = url.searchParams.get("type");
    const q = url.searchParams.get("q")?.toLowerCase().trim();

    let where: Record<string, unknown> = {};
    if (region && region !== "All Regions") where.region = region;
    if (type && type !== "All Types") where.type = type;

    let items = await db.sacco.findMany({ where, orderBy: [{ featured: "desc" }, { name: "asc" }] });

    if (q) {
      items = items.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          (s.services || "").toLowerCase().includes(q) ||
          (s.description || "").toLowerCase().includes(q)
      );
    }

    const mapped = items.map((s) => ({
      id: s.id,
      name: s.name,
      region: s.region,
      city: s.city,
      type: s.type,
      established: s.established ?? 0,
      members: s.members ?? 0,
      assetsBirr: s.assetsBirr ?? 0,
      phone: s.phone ?? "",
      email: s.email ?? "",
      services: (s.services || "").split(",").map((x) => x.trim()).filter(Boolean),
      description: s.description ?? "",
      featured: s.featured,
    }));

    return NextResponse.json({ ok: true, total: mapped.length, items: mapped });
  } catch (err) {
    console.error("SACCO directory error:", err);
    return NextResponse.json({ error: "Failed", ok: false }, { status: 500 });
  }
}
