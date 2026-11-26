import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body || {};

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required", ok: false },
        { status: 400 }
      );
    }

    // Upsert: if email exists, reactivate; otherwise create
    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      await db.newsletterSubscriber.update({
        where: { email },
        data: { active: true, name: name || existing.name },
      });
      return NextResponse.json({ ok: true, message: "Re-subscribed" });
    }

    const record = await db.newsletterSubscriber.create({
      data: { email, name: name || null, active: true },
    });
    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json(
      { error: "Failed to subscribe", ok: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Email required", ok: false }, { status: 400 });
    }
    await db.newsletterSubscriber.updateMany({
      where: { email },
      data: { active: false },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter unsubscribe error:", err);
    return NextResponse.json(
      { error: "Failed to unsubscribe", ok: false },
      { status: 500 }
    );
  }
}
