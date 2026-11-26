import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      idNumber,
      address,
      city,
      branch,
      shareAmount,
      occupation,
    } = body || {};

    if (!fullName || !email || !phone || !idNumber || !address || !city) {
      return NextResponse.json(
        { error: "Missing required fields", ok: false },
        { status: 400 }
      );
    }

    const record = await db.membershipApplication.create({
      data: {
        fullName,
        email,
        phone,
        idNumber,
        address,
        city,
        branch: branch || "Kera Branch (Head Office)",
        shareAmount: Number(shareAmount) || 5000,
        occupation: occupation || null,
        status: "pending",
      },
    });

    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("Membership application error:", err);
    return NextResponse.json(
      { error: "Failed to submit application", ok: false },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const items = await db.membershipApplication.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ ok: true, items });
  } catch (err) {
    console.error("Membership list error:", err);
    return NextResponse.json(
      { error: "Failed to fetch applications", ok: false },
      { status: 500 }
    );
  }
}
