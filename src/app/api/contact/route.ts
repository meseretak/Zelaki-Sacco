import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, category } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required", ok: false },
        { status: 400 }
      );
    }

    const record = await db.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || "General enquiry",
        message,
        category: category || "general",
        status: "new",
      },
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("Contact message error:", err);
    return NextResponse.json(
      { error: "Failed to send message", ok: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const items = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ ok: true, items });
  } catch (err) {
    console.error("Contact list error:", err);
    return NextResponse.json(
      { error: "Failed to fetch messages", ok: false },
      { status: 500 }
    );
  }
}
