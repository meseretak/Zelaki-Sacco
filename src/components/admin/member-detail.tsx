"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft, Wallet, PiggyBank, Users, Landmark, Coins, Plus, Trash2, Save,
  TrendingUp, CreditCard, Clock, Check, UserPlus, DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

type Txn = { id: string; type: string; amount: number; balance: number; description: string; date: string };
type Loan = { id: string; loanType: string; principal: number; remaining: number; rate: number; termMonths: number; monthlyPayment: number; paidMonths: number; status: string; startDate: string };
type Member = {
  id: string; memberNumber: string; fullName: string; email: string; phone: string | null;
  city: string | null; branch: string | null; occupation: string | null; status: string; joinedAt: string;
  idType: string | null; idNumber: string | null; sex: string | null; education: string | null; maritalStatus: string | null;
  compulsorySavings: number; voluntarySavings: number; childSavings: number; timeDeposit: number; shareCount: number;
  transactions: Txn[]; loans: Loan[];
};

export function MemberDetail({ memberId, onBack }: { memberId: string; onBack: () => void }) {
  const { toast } = useToast();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTxnForm, setShowTxnForm] = useState(false);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [editBalances, setEditBalances] = useState(false);

  // transaction form state
  const [txn, setTxn] = useState({ type: "deposit", amount: "", description: "", account: "voluntary", date: new Date().toISOString().slice(0, 10) });
  // loan form state
  const [loan, setLoan] = useState({ loanType: "Social Loan", principal: "", rate: "14.5", termMonths: "36", startDate: new Date().toISOString().slice(0, 10) });
  // editable balances
  const [bal, setBal] = useState({ compulsorySavings: 0, voluntarySavings: 0, childSavings: 0, timeDeposit: 0, shareCount: 0 });

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/members?id=${memberId}`);
      const j = await r.json();
      if (j.ok) {
        setMember(j.member);
        setBal({
          compulsorySavings: j.member.compulsorySavings,
          voluntarySavings: j.member.voluntarySavings,
          childSavings: j.member.childSavings,
          timeDeposit: j.member.timeDeposit,
          shareCount: j.member.shareCount,
        });
      }
    } catch { toast({ title: "Failed to load member", variant: "destructive" }); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [memberId]);

  const addTxn = async () => {
    const r = await fetch("/api/admin/members/transaction", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId, ...txn, amount: Number(txn.amount) }),
    });
    const j = await r.json();
    if (j.ok) { toast({ title: "Transaction added", description: `New balance: ETB ${fmt(j.newBalance)}` }); setShowTxnForm(false); setTxn({ type: "deposit", amount: "", description: "", account: "voluntary", date: new Date().toISOString().slice(0, 10) }); load(); }
    else toast({ title: "Failed", description: j.error, variant: "destructive" });
  };

  const addLoan = async () => {
    const r = await fetch("/api/admin/members/loan", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId, ...loan, principal: Number(loan.principal), rate: Number(loan.rate), termMonths: Number(loan.termMonths) }),
    });
    const j = await r.json();
    if (j.ok) { toast({ title: "Loan added", description: `Monthly payment: ETB ${fmt(j.monthlyPayment)}` }); setShowLoanForm(false); setLoan({ loanType: "Social Loan", principal: "", rate: "14.5", termMonths: "36", startDate: new Date().toISOString().slice(0, 10) }); load(); }
    else toast({ title: "Failed", description: j.error, variant: "destructive" });
  };

  const recordPayment = async (loanId: string, amount: number) => {
    const r = await fetch(`/api/admin/members/loan?id=${loanId}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "payment", amount }),
    });
    const j = await r.json();
    if (j.ok) { toast({ title: "Payment recorded", description: `Remaining: ETB ${fmt(j.remaining)}` }); load(); }
    else toast({ title: "Failed", variant: "destructive" });
  };

  const saveBalances = async () => {
    const r = await fetch(`/api/admin/members?id=${memberId}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bal),
    });
    if (r.ok) { toast({ title: "Balances updated" }); setEditBalances(false); load(); }
    else toast({ title: "Failed", variant: "destructive" });
  };

  // monthly tracking — last 12 months, check if a compulsory_monthly transaction exists
  const monthlyTracking = (() => {
    if (!member) return [];
    const months: { label: string; key: string; paid: boolean }[] = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("en", { month: "short", year: "2-digit" });
      const paid = member.transactions.some((t) => {
        const td = new Date(t.date);
        return t.type === "compulsory_monthly" && `${td.getFullYear()}-${String(td.getMonth() + 1).padStart(2, "0")}` === key;
      });
      months.push({ label, key, paid });
    }
    return months;
  })();

  if (loading || !member) return <div className="p-8 text-center text-[#6B7785]">Loading member...</div>;

  const totalSavings = member.compulsorySavings + member.voluntarySavings + member.childSavings + member.timeDeposit;
  const shareValue = member.shareCount * 10;

  const balanceCards = [
    { label: "Compulsory", value: bal.compulsorySavings, icon: PiggyBank, color: "text-emerald-600", field: "compulsorySavings" },
    { label: "Voluntary", value: bal.voluntarySavings, icon: Wallet, color: "text-blue-600", field: "voluntarySavings" },
    { label: "Child", value: bal.childSavings, icon: Users, color: "text-amber-600", field: "childSavings" },
    { label: "Time Deposit", value: bal.timeDeposit, icon: Landmark, color: "text-green-700", field: "timeDeposit" },
    { label: "Shares", value: bal.shareCount, icon: Coins, color: "text-purple-600", field: "shareCount", isCount: true },
  ];

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-semibold text-[#1F4E8C] hover:text-[#6DBE45]"><ArrowLeft className="w-4 h-4" /> Back to Members</button>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowTxnForm(!showTxnForm)} size="sm" className="gradient-brand hover:opacity-90"><Plus className="w-4 h-4 mr-1" /> Add Transaction</Button>
          <Button onClick={() => setShowLoanForm(!showLoanForm)} size="sm" variant="outline"><DollarSign className="w-4 h-4 mr-1" /> Add Loan</Button>
        </div>
      </div>

      {/* member info card */}
      <div className="bg-white rounded-2xl border border-[#E5E9EE] p-5 mb-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full gradient-brand flex items-center justify-center text-white font-display font-bold text-xl">
              {member.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-[#2C3E50]">{member.fullName}</h2>
              <div className="text-sm text-[#6B7785]">{member.memberNumber} · Member since {fmtDate(member.joinedAt)}</div>
              <div className="text-xs text-[#6B7785] mt-0.5">{member.email} · {member.phone || "no phone"}</div>
              <div className="text-xs text-[#6B7785] mt-0.5">{member.city || ""}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${member.status === "active" ? "bg-[#6DBE45]/10 text-[#2E7D32]" : "bg-[#E5484D]/10 text-[#E5484D]"}`}>{member.status}</span>
            <span className="text-xs font-semibold text-[#6B7785]">Total: ETB {fmt(totalSavings)}</span>
          </div>
        </div>
        {/* Google Form details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4 pt-4 border-t border-[#E5E9EE]">
          {[
            { l: "ID Type", v: member.idType },
            { l: "ID Number", v: member.idNumber },
            { l: "Sex", v: member.sex },
            { l: "Position", v: member.occupation },
            { l: "Education", v: member.education },
            { l: "Marital Status", v: member.maritalStatus },
          ].map((f) => (
            <div key={f.l} className="bg-[#F8F9FA] rounded-lg p-2">
              <div className="text-[10px] text-[#6B7785] uppercase font-semibold">{f.l}</div>
              <div className="text-xs text-[#2C3E50] font-medium truncate">{f.v || "—"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* balance cards */}
      <div className="bg-white rounded-2xl border border-[#E5E9EE] p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-[#2C3E50]">Account Balances</h3>
          {!editBalances ? (
            <Button onClick={() => setEditBalances(true)} size="sm" variant="outline">Edit Balances</Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => setEditBalances(false)} size="sm" variant="outline">Cancel</Button>
              <Button onClick={saveBalances} size="sm" className="gradient-brand hover:opacity-90"><Save className="w-3.5 h-3.5 mr-1" /> Save</Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {balanceCards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.field} className="bg-[#F8F9FA] rounded-xl p-3 border border-[#E5E9EE]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={`w-4 h-4 ${c.color}`} />
                  <span className="text-[11px] text-[#6B7785] font-semibold uppercase">{c.label}</span>
                </div>
                {editBalances ? (
                  <Input
                    type="number"
                    value={bal[c.field as keyof typeof bal]}
                    onChange={(e) => setBal({ ...bal, [c.field]: Number(e.target.value) })}
                    className="h-8 text-sm"
                  />
                ) : (
                  <div className={`font-display font-bold ${c.color}`}>
                    {c.isCount ? c.value : `ETB ${fmt(c.value)}`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-sm text-[#6B7785]">Share value: ETB {fmt(shareValue)} ({member.shareCount} × ETB 10) · Total savings: ETB {fmt(totalSavings)}</div>
      </div>

      {/* monthly payment tracking */}
      <div className="bg-white rounded-2xl border border-[#E5E9EE] p-5 mb-5">
        <h3 className="font-display font-bold text-[#2C3E50] mb-3">Monthly Compulsory Savings Tracking</h3>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
          {monthlyTracking.map((m) => (
            <div key={m.key} className={`text-center p-2 rounded-lg text-[11px] font-semibold ${m.paid ? "bg-[#6DBE45]/15 text-[#2E7D32]" : "bg-gray-100 text-gray-400"}`}>
              <div>{m.label}</div>
              {m.paid ? <Check className="w-3 h-3 mx-auto mt-1 text-[#6DBE45]" /> : <Clock className="w-3 h-3 mx-auto mt-1" />}
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-[#6B7785]">{monthlyTracking.filter((m) => m.paid).length}/12 months paid · Add a &quot;Compulsory Monthly&quot; transaction to mark a month as paid</div>
      </div>

      {/* add transaction form */}
      {showTxnForm && (
        <div className="bg-white rounded-2xl border-2 border-[#6DBE45] p-5 mb-5">
          <h3 className="font-display font-bold text-[#2C3E50] mb-3">Add Transaction</h3>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div><Label className="text-xs">Type</Label><select value={txn.type} onChange={(e) => setTxn({ ...txn, type: e.target.value })} className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">{["deposit", "withdrawal", "interest", "dividend", "compulsory_monthly", "loan_payment", "fee", "salary"].map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
            <div><Label className="text-xs">Amount (ETB)</Label><Input type="number" value={txn.amount} onChange={(e) => setTxn({ ...txn, amount: e.target.value })} className="mt-1 h-9" placeholder="5000" /></div>
            <div><Label className="text-xs">Account</Label><select value={txn.account} onChange={(e) => setTxn({ ...txn, account: e.target.value })} className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">{["voluntary", "compulsory", "child", "timeDeposit"].map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
            <div><Label className="text-xs">Date</Label><Input type="date" value={txn.date} onChange={(e) => setTxn({ ...txn, date: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Description</Label><Input value={txn.description} onChange={(e) => setTxn({ ...txn, description: e.target.value })} className="mt-1 h-9" placeholder="Monthly savings" /></div>
          </div>
          <div className="mt-3 flex gap-2"><Button onClick={addTxn} size="sm" className="gradient-brand hover:opacity-90"><Plus className="w-3.5 h-3.5 mr-1" /> Add</Button><Button onClick={() => setShowTxnForm(false)} size="sm" variant="outline">Cancel</Button></div>
        </div>
      )}

      {/* add loan form */}
      {showLoanForm && (
        <div className="bg-white rounded-2xl border-2 border-[#1F4E8C] p-5 mb-5">
          <h3 className="font-display font-bold text-[#2C3E50] mb-3">Add Loan</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div><Label className="text-xs">Loan Type</Label><select value={loan.loanType} onChange={(e) => setLoan({ ...loan, loanType: e.target.value })} className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">{["Social Loan", "Business Loan", "House Loan", "Furniture Loan", "Electronics Loan", "Car Loan", "Machinery Loan"].map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
            <div><Label className="text-xs">Principal (ETB)</Label><Input type="number" value={loan.principal} onChange={(e) => setLoan({ ...loan, principal: e.target.value })} className="mt-1 h-9" placeholder="500000" /></div>
            <div><Label className="text-xs">Rate (%)</Label><Input type="number" step="0.5" value={loan.rate} onChange={(e) => setLoan({ ...loan, rate: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Term (months)</Label><Input type="number" value={loan.termMonths} onChange={(e) => setLoan({ ...loan, termMonths: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Start Date</Label><Input type="date" value={loan.startDate} onChange={(e) => setLoan({ ...loan, startDate: e.target.value })} className="mt-1 h-9" /></div>
          </div>
          <div className="mt-3 flex gap-2"><Button onClick={addLoan} size="sm" className="gradient-brand hover:opacity-90"><Plus className="w-3.5 h-3.5 mr-1" /> Add Loan</Button><Button onClick={() => setShowLoanForm(false)} size="sm" variant="outline">Cancel</Button></div>
        </div>
      )}

      {/* loans */}
      <div className="bg-white rounded-2xl border border-[#E5E9EE] p-5 mb-5">
        <h3 className="font-display font-bold text-[#2C3E50] mb-3 flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#6DBE45]" /> Loans ({member.loans.length})</h3>
        {member.loans.length === 0 ? (
          <div className="text-sm text-[#6B7785] py-4 text-center">No loans. Click &quot;Add Loan&quot; to create one.</div>
        ) : (
          <div className="space-y-3">
            {member.loans.map((l) => {
              const pct = Math.round((l.paidMonths / l.termMonths) * 100);
              return (
                <div key={l.id} className="border border-[#E5E9EE] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-display font-bold text-[#2C3E50]">{l.loanType}</div>
                      <div className="text-xs text-[#6B7785]">{l.rate}% p.a · {l.termMonths} months · started {fmtDate(l.startDate)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${l.status === "active" ? "bg-[#6DBE45]/10 text-[#2E7D32]" : "bg-gray-200 text-gray-600"}`}>{l.status}</span>
                      {l.status === "active" && (
                        <Button onClick={() => recordPayment(l.id, l.monthlyPayment)} size="sm" className="h-7 text-xs bg-[#1F4E8C] hover:bg-[#2C5FA8]">Record Payment (ETB {fmt(l.monthlyPayment)})</Button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm mb-2">
                    <div><div className="text-[10px] text-[#6B7785] uppercase">Principal</div><div className="font-bold">ETB {fmt(l.principal)}</div></div>
                    <div><div className="text-[10px] text-[#6B7785] uppercase">Remaining</div><div className="font-bold text-[#1F4E8C]">ETB {fmt(l.remaining)}</div></div>
                    <div><div className="text-[10px] text-[#6B7785] uppercase">Monthly</div><div className="font-bold">ETB {fmt(l.monthlyPayment)}</div></div>
                    <div><div className="text-[10px] text-[#6B7785] uppercase">Paid</div><div className="font-bold">{l.paidMonths}/{l.termMonths} ({pct}%)</div></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-[#F0F2F5] overflow-hidden"><div className="h-full gradient-brand rounded-full" style={{ width: `${pct}%` }} /></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* transactions */}
      <div className="bg-white rounded-2xl border border-[#E5E9EE] p-5">
        <h3 className="font-display font-bold text-[#2C3E50] mb-3 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#6DBE45]" /> Recent Transactions ({member.transactions.length})</h3>
        <div className="max-h-80 overflow-y-auto divide-y divide-[#E5E9EE]">
          {member.transactions.length === 0 ? (
            <div className="text-sm text-[#6B7785] py-4 text-center">No transactions yet.</div>
          ) : member.transactions.map((t) => {
            const positive = t.amount >= 0;
            return (
              <div key={t.id} className="py-2.5 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${positive ? "bg-[#6DBE45]/10 text-[#6DBE45]" : "bg-[#1F4E8C]/10 text-[#1F4E8C]"}`}>{positive ? "+" : "−"}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#2C3E50]">{t.description}</div>
                  <div className="text-[11px] text-[#6B7785]">{fmtDate(t.date)} · {t.type}</div>
                </div>
                <div className={`font-display font-bold text-sm ${positive ? "text-[#6DBE45]" : "text-[#1F4E8C]"}`}>{positive ? "+" : "−"}ETB {fmt(Math.abs(t.amount))}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
