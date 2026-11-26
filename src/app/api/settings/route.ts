import { NextResponse } from "next/server";
import { getSettings, clearSettingsCache } from "@/lib/settings";
import { verifyAdmin } from "@/lib/auth";

// Public: get all site settings (admin passcode excluded client-side; this is for rendering)
export async function GET() {
  const s = await getSettings();
  // never expose adminPasscode to the public
  const { adminPasscode, ...publicSettings } = s;
  return NextResponse.json({ ok: true, settings: publicSettings });
}

// Admin: update settings (key/value pairs)
export async function PUT(req: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  }
  try {
    const body = await req.json();
    const entries: { key: string; value: string }[] = body.entries || [];
    for (const { key, value } of entries) {
      await (await import("@/lib/db")).db.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }
    clearSettingsCache();
    return NextResponse.json({ ok: true, updated: entries.length });
  } catch (e) {
    console.error("settings update error:", e);
    return NextResponse.json({ error: "Failed", ok: false }, { status: 500 });
  }
}
