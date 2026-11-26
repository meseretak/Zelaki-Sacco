import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getMemberId } from "@/lib/auth";

export async function POST(req: Request) {
  const memberId = await getMemberId();
  if (!memberId) {
    return NextResponse.json({ error: "Please log in to apply for a loan", ok: false }, { status: 401 });
  }
  try {
    const b = await req.json();
    const loanType = String(b.loanType ?? "");
    const amount = Number(b.amount ?? 0);
    const termMonths = Number(b.termMonths ?? 0);
    const monthlyIncome = b.monthlyIncome ? Number(b.monthlyIncome) : null;
    if (!loanType || !amount || !termMonths) {
      return NextResponse.json({ error: "loanType, amount and termMonths are required", ok: false }, { status: 400 });
    }
    const member = await db.member.findUnique({ where: { id: memberId } });
    const app = await db.loanApplication.create({
      data: {
        fullName: member?.fullName ?? "",
        email: member?.email ?? "",
        phone: member?.phone ?? "",
        loanType,
        amount,
        termMonths,
        monthlyIncome,
        memberId,
        status: "pending",
      },
    });
    return NextResponse.json({ ok: true, id: app.id });
  } catch (e) {
    console.error("member loan apply error:", e);
    return NextResponse.json({ error: "Failed", ok: false }, { status: 500 });
  }
}
