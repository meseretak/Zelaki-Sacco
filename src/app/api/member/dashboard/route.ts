import { NextResponse } from "next/server";
import { getMember } from "@/lib/auth";

export async function GET() {
  const member = await getMember();
  if (!member) {
    return NextResponse.json({ error: "Not authenticated", ok: false }, { status: 401 });
  }
  const totalSavings =
    member.compulsorySavings + member.voluntarySavings + member.childSavings + member.timeDeposit;
  const shareValue = member.shareCount * 10; // ETB 10 per share
  const projectedDividend = (totalSavings + shareValue) * 0.3; // up to 30% p.a

  return NextResponse.json({
    ok: true,
    member: {
      id: member.id,
      memberNumber: member.memberNumber,
      fullName: member.fullName,
      email: member.email,
      phone: member.phone,
      city: member.city,
      branch: member.branch,
      occupation: member.occupation,
      joinedAt: member.joinedAt,
      shareCount: member.shareCount,
      balances: {
        compulsory: member.compulsorySavings,
        voluntary: member.voluntarySavings,
        child: member.childSavings,
        timeDeposit: member.timeDeposit,
        total: totalSavings,
      },
      shareValue,
      projectedDividend,
      status: member.status,
    },
    transactions: member.transactions,
    loans: member.loans,
  });
}
