import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/page?slug=about-mission — public published page
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    if (!slug) return NextResponse.json({ error: "slug required", ok: false }, { status: 400 });
    const page = await db.page.findUnique({ where: { slug } });
    if (!page || !page.published) {
      return NextResponse.json({ error: "Page not found", ok: false }, { status: 404 });
    }
    return NextResponse.json({
      ok: true,
      page: {
        id: page.id, slug: page.slug, title: page.title, subtitle: page.subtitle,
        content: page.content, section: page.section, icon: page.icon,
      },
    });
  } catch (e) {
    console.error("page fetch error:", e);
    return NextResponse.json({ error: "Failed", ok: false }, { status: 500 });
  }
}
