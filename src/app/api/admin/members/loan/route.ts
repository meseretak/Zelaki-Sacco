import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

// POST — add a loan for a member
// body: { memberId, loanType, principal, rate, termMonths, startDate? }
export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  try {
    const b = await req.json();
    const memberId = String(b.memberId || "");
    if (!memberId) return NextResponse.json({ error: "memberId required", ok: false }, { status: 400 });
    const principal = Number(b.principal || 0);
    const rate = Number(b.rate || 14.5);
    const termMonths = Number(b.termMonths || 12);
    if (!principal) return NextResponse.json({ error: "principal required", ok: false }, { status: 400 });
    // monthly payment (amortized)
    const r = rate / 100 / 12;
    const monthlyPayment = termMonths > 0
      ? Math.round((principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1))
      : Math.round(principal / termMonths);
    const loan = await db.memberLoan.create({
      data: {
        memberId,
        loanType: String(b.loanType || "Personal Loan"),
        principal,
        remaining: principal,
        rate,
        termMonths,
        monthlyPayment,
        paidMonths: 0,
        status: "active",
        startDate: b.startDate ? new Date(String(b.startDate)) : new Date(),
      },
    });
    return NextResponse.json({ ok: true, id: loan.id, monthlyPayment });
  } catch (e) {
    console.error("add loan error:", e);
    return NextResponse.json({ error: "Failed", ok: false }, { status: 500 });
  }
}

// PUT — update a loan (record a payment / adjust)
// ?id=loanId  body: { action: "payment", amount } or { remaining, paidMonths, status }
export async function PUT(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  const b = await req.json();
  const loan = await db.memberLoan.findUnique({ where: { id } });
  if (!loan) return NextResponse.json({ error: "Loan not found", ok: false }, { status: 404 });

  if (b.action === "payment") {
    const amt = Number(b.amount || loan.monthlyPayment);
    const newRemaining = Math.max(0, loan.remaining - amt);
    const newPaidMonths = Math.min(loan.termMonths, loan.paidMonths + 1);
    await db.memberLoan.update({
      where: { id },
      data: { remaining: newRemaining, paidMonths: newPaidMonths, status: newRemaining === 0 ? "closed" : "active" },
    });
    // also record a transaction
    if (loan.memberId) {
      await db.memberTransaction.create({
        data: {
          memberId: loan.memberId,
          type: "loan_payment",
          amount: -amt,
          balance: 0,
          description: `${loan.loanType} repayment`,
          date: new Date(),
        },
      });
    }
    return NextResponse.json({ ok: true, remaining: newRemaining, paidMonths: newPaidMonths });
  }

  // direct update
  const data: Record<string, unknown> = {};
  if (b.remaining !== undefined) data.remaining = Number(b.remaining);
  if (b.paidMonths !== undefined) data.paidMonths = Number(b.paidMonths);
  if (b.status !== undefined) data.status = String(b.status);
  await db.memberLoan.update({ where: { id }, data });
  return NextResponse.json({ ok: true });
}

// DELETE — delete a loan
export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  await db.memberLoan.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
