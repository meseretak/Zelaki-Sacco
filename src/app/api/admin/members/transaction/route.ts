import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

// POST — add a transaction for a member (auto-updates the relevant balance)
// body: { memberId, type, amount, description, account?, loanId? }
// type: deposit | withdrawal | interest | dividend | loan_payment | fee | salary | loan_disbursement | compulsory_monthly
// account (for deposits/withdrawals): compulsory | voluntary | child | timeDeposit (default voluntary)
export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  try {
    const b = await req.json();
    const memberId = String(b.memberId || "");
    if (!memberId) return NextResponse.json({ error: "memberId required", ok: false }, { status: 400 });
    const amount = Number(b.amount || 0);
    if (!amount) return NextResponse.json({ error: "amount required (non-zero)", ok: false }, { status: 400 });
    const type = String(b.type || "deposit");
    const description = String(b.description || type);

    const member = await db.member.findUnique({ where: { id: memberId } });
    if (!member) return NextResponse.json({ error: "Member not found", ok: false }, { status: 404 });

    // determine which balance to update
    const account = String(b.account || "voluntary"); // compulsory | voluntary | child | timeDeposit
    const balField =
      account === "compulsory" ? "compulsorySavings" :
      account === "child" ? "childSavings" :
      account === "timeDeposit" ? "timeDeposit" : "voluntarySavings";

    // For loan payments, update the loan remaining
    if (type === "loan_payment" && b.loanId) {
      const loan = await db.memberLoan.findUnique({ where: { id: String(b.loanId) } });
      if (loan) {
        const newRemaining = Math.max(0, loan.remaining - Math.abs(amount));
        const newPaidMonths = Math.min(loan.termMonths, loan.paidMonths + 1);
        await db.memberLoan.update({
          where: { id: loan.id },
          data: { remaining: newRemaining, paidMonths: newPaidMonths, status: newRemaining === 0 ? "closed" : "active" },
        });
      }
    }

    // update the balance based on type
    const positive = ["deposit", "interest", "dividend", "salary", "loan_disbursement", "compulsory_monthly"].includes(type);
    const delta = positive ? Math.abs(amount) : -Math.abs(amount);
    const currentBalance = (member as Record<string, number>)[balField] || 0;
    const newBalance = currentBalance + delta;

    // create transaction + update balance in a transaction
    const tx = await db.memberTransaction.create({
      data: {
        memberId,
        type,
        amount: delta,
        balance: newBalance,
        description,
        date: b.date ? new Date(String(b.date)) : new Date(),
      },
    });
    await db.member.update({ where: { id: memberId }, data: { [balField]: newBalance } });

    return NextResponse.json({ ok: true, id: tx.id, newBalance });
  } catch (e) {
    console.error("add transaction error:", e);
    return NextResponse.json({ error: "Failed", ok: false }, { status: 500 });
  }
}
