"use client";

import { useEffect, useState } from "react";
import {
  Wallet, Users, Landmark, TrendingUp, LogOut, ArrowLeft, Lock, Mail,
  PiggyBank, Coins, Award, ArrowRight, Clock, Building2, CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { SiteContent } from "@/components/site/content-provider";
import { useSettings } from "@/components/site/content-provider";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { loanProducts } from "@/lib/sacco-data";

type Dashboard = {
  member: {
    id: string; memberNumber: string; fullName: string; email: string; phone: string | null;
    city: string | null; branch: string | null; occupation: string | null; joinedAt: string;
    shareCount: number; status: string;
    balances: { compulsory: number; voluntary: number; child: number; timeDeposit: number; total: number };
    shareValue: number; projectedDividend: number;
  };
  transactions: { id: string; type: string; amount: number; balance: number; description: string; date: string }[];
  loans: { id: string; loanType: string; principal: number; remaining: number; rate: number; termMonths: number; monthlyPayment: number; paidMonths: number; status: string; startDate: string }[];
};

const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

export function MemberApp({ view, content }: { view: string; content: SiteContent }) {
  if (view === "login") return <MemberLogin content={content} />;
  return <MemberDashboard content={content} />;
}

function BrandBar() {
  const s = useSettings();
  return (
    <div className="bg-[#1F4E8C] text-white">
      <div className="container mx-auto px-4 h-12 flex items-center justify-between text-sm">
        <a href="/" className="flex items-center gap-2 font-display font-bold notranslate" translate="no">
          <img src="/logo-official.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain bg-white" />
          {s.siteName || "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ"}
        </a>
        <div className="flex items-center gap-4">
          <LanguageSwitcher variant="bar" />
          <a href="/" className="flex items-center gap-1.5 hover:text-[#6DBE45]"><ArrowLeft className="w-4 h-4" /> Back to website</a>
        </div>
      </div>
    </div>
  );
}

function MemberLogin({ content }: { content: SiteContent }) {
  const { toast } = useToast();
  const s = content.settings;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    setLoading(true);
    try {
      const res = await fetch("/api/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");
      toast({ title: "Welcome back!", description: "Login successful. Redirecting..." });
      window.location.href = "/?view=member";
    } catch (err) {
      toast({ title: "Login failed", description: (err as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <BrandBar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-[#E5E9EE] overflow-hidden">
            <div className="gradient-brand p-6 text-white text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mx-auto mb-3">
                <img src="/logo-official.png" alt="Logo" className="w-14 h-14 object-contain rounded-xl" />
              </div>
              <h1 className="font-display font-bold text-xl">Member Login</h1>
              <p className="text-sm text-white/85 mt-1">Access your account securely</p>
            </div>
            <form onSubmit={onSubmit} className="p-6 space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" required defaultValue="member@sustainable.com" placeholder="you@example.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required defaultValue="demo123" placeholder="••••••••" className="mt-1.5" />
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-brand hover:opacity-90 h-11 font-semibold">
                {loading ? "Signing in..." : "Login to Account"}
              </Button>
              <div className="bg-[#6DBE45]/10 border border-[#6DBE45]/20 rounded-lg p-3 text-xs text-[#2E7D32]">
                <strong>Demo member:</strong> member@sustainable.com · demo123
              </div>
              <p className="text-center text-xs text-[#6B7785]">
                Not a member?{" "}
                <a href="/#membership" className="text-[#6DBE45] font-semibold hover:underline">Join Now</a>
              </p>
            </form>
          </div>
          <p className="text-center text-xs text-[#6B7785] mt-4 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> 256-bit SSL · {s.siteName || "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ"}
          </p>
        </div>
      </div>
    </div>
  );
}

function MemberDashboard({ content }: { content: SiteContent }) {
  const { toast } = useToast();
  const s = content.settings;
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLoanForm, setShowLoanForm] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/member/dashboard");
      if (!res.ok) {
        window.location.href = "/?view=login";
        return;
      }
      const json = await res.json();
      setData(json);
    } catch {
      toast({ title: "Failed to load dashboard", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const logout = async () => {
    await fetch("/api/member/logout", { method: "POST" });
    window.location.href = "/?view=login";
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        <BrandBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-[#6B7785]">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  const m = data.member;
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const txIcon: Record<string, React.ElementType> = { salary: CreditCard, deposit: PiggyBank, withdrawal: Wallet, interest: TrendingUp, dividend: Coins, loan_payment: CreditCard, fee: Building2, loan_disbursement: Landmark };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <BrandBar />
      <div className="bg-white border-b border-[#E5E9EE]">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center text-white font-display font-bold">
              {m.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-[#2C3E50]">{m.fullName}</h1>
              <div className="text-xs text-[#6B7785]">{m.memberNumber} · Member since {fmtDate(m.joinedAt)}</div>
            </div>
          </div>
          <Button onClick={logout} variant="outline" className="border-[#E5E9EE] text-[#6B7785] hover:text-[#E5484D]">
            <LogOut className="w-4 h-4 mr-1.5" /> Logout
          </Button>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Compulsory Savings", value: m.balances.compulsory, icon: PiggyBank, color: "from-emerald-500 to-emerald-700" },
            { label: "Voluntary Savings", value: m.balances.voluntary, icon: Wallet, color: "from-blue-500 to-blue-700" },
            { label: "Child Savings", value: m.balances.child, icon: Users, color: "from-amber-500 to-orange-600" },
            { label: "Time Deposit", value: m.balances.timeDeposit, icon: Landmark, color: "from-green-600 to-emerald-800" },
          ].map((c) => (
            <div key={c.label} className="bg-white rounded-2xl p-5 border border-[#E5E9EE] card-hover">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-3`}>
                <c.icon className="w-5 h-5" />
              </div>
              <div className="text-xs text-[#6B7785] uppercase font-semibold">{c.label}</div>
              <div className="font-display text-2xl font-extrabold text-[#2C3E50]">ETB {fmt(c.value)}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#1F4E8C] to-[#2C5FA8] text-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2"><Award className="w-5 h-5 text-[#FFD700]" /> <span className="font-semibold">Member Shares</span></div>
            <div className="font-display text-3xl font-extrabold">{m.shareCount}</div>
            <div className="text-sm text-white/80">Value: ETB {fmt(m.shareValue)} · {m.shareCount} × ETB 10</div>
          </div>
          <div className="bg-gradient-to-br from-[#6DBE45] to-[#2E7D32] text-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-[#FFD700]" /> <span className="font-semibold">Projected Dividend</span></div>
            <div className="font-display text-3xl font-extrabold">ETB {fmt(m.projectedDividend)}</div>
            <div className="text-sm text-white/80">Up to 30% p.a on savings + shares</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#E5E9EE]">
            <div className="flex items-center gap-2 mb-2 text-[#6B7785]"><Wallet className="w-5 h-5 text-[#6DBE45]" /> <span className="font-semibold">Total Savings</span></div>
            <div className="font-display text-3xl font-extrabold text-[#6DBE45]">ETB {fmt(m.balances.total)}</div>
            <div className="text-sm text-[#6B7785]">Across all accounts</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E9EE] overflow-hidden">
          <div className="p-5 border-b border-[#E5E9EE] flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-[#2C3E50] flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#6DBE45]" /> Active Loans</h2>
            <Button onClick={() => setShowLoanForm(!showLoanForm)} size="sm" className="gradient-brand hover:opacity-90">
              {showLoanForm ? "Cancel" : "Apply for Loan"}
            </Button>
          </div>
          {showLoanForm && <LoanApplicationForm onDone={() => { setShowLoanForm(false); toast({ title: "Loan application submitted!" }); }} />}
          <div className="p-5 space-y-3">
            {data.loans.length === 0 && <div className="text-sm text-[#6B7785] py-4 text-center">No active loans. Apply above to get started.</div>}
            {data.loans.map((l) => {
              const pct = Math.round((l.paidMonths / l.termMonths) * 100);
              return (
                <div key={l.id} className="border border-[#E5E9EE] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-display font-bold text-[#2C3E50]">{l.loanType}</div>
                      <div className="text-xs text-[#6B7785]">{l.rate}% p.a · {l.termMonths} months · started {fmtDate(l.startDate)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-[#1F4E8C]">ETB {fmt(l.remaining)}</div>
                      <div className="text-xs text-[#6B7785]">remaining of ETB {fmt(l.principal)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-[#F0F2F5] overflow-hidden">
                      <div className="h-full gradient-brand rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-[#6B7785]">{l.paidMonths}/{l.termMonths} months ({pct}%)</span>
                  </div>
                  <div className="text-xs text-[#6B7785] mt-1.5">Monthly payment: ETB {fmt(l.monthlyPayment)}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E9EE] overflow-hidden">
          <div className="p-5 border-b border-[#E5E9EE]">
            <h2 className="font-display font-bold text-lg text-[#2C3E50] flex items-center gap-2"><Clock className="w-5 h-5 text-[#6DBE45]" /> Recent Transactions</h2>
          </div>
          <div className="divide-y divide-[#E5E9EE] max-h-96 overflow-y-auto">
            {data.transactions.map((t) => {
              const Icon = txIcon[t.type] || Wallet;
              const positive = t.amount >= 0;
              return (
                <div key={t.id} className="p-4 flex items-center gap-3 hover:bg-[#F8F9FA]">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${positive ? "bg-[#6DBE45]/10 text-[#6DBE45]" : "bg-[#1F4E8C]/10 text-[#1F4E8C]"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#2C3E50]">{t.description}</div>
                    <div className="text-xs text-[#6B7785]">{fmtDate(t.date)} · {t.type}</div>
                  </div>
                  <div className={`font-display font-bold text-sm ${positive ? "text-[#6DBE45]" : "text-[#1F4E8C]"}`}>
                    {positive ? "+" : "-"}ETB {fmt(Math.abs(t.amount))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

function LoanApplicationForm({ onDone }: { onDone: () => void }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await fetch("/api/member/loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loanType: String(d.get("loanType")),
          amount: Number(d.get("amount")),
          termMonths: Number(d.get("termMonths")),
          monthlyIncome: d.get("monthlyIncome") ? Number(d.get("monthlyIncome")) : null,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      onDone();
    } catch (err) {
      toast({ title: "Failed", description: (err as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="p-5 border-b border-[#E5E9EE] bg-[#F8F9FA] grid sm:grid-cols-3 gap-3">
      <div>
        <Label className="text-xs">Loan Type</Label>
        <select name="loanType" defaultValue="Business Loan" className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm outline-none focus:border-[#6DBE45]">
          {loanProducts.map((l) => <option key={l.name}>{l.name}</option>)}
        </select>
      </div>
      <div>
        <Label className="text-xs">Amount (ETB)</Label>
        <Input name="amount" type="number" min={1000} defaultValue={500000} required className="mt-1 h-9" />
      </div>
      <div>
        <Label className="text-xs">Term (months)</Label>
        <Input name="termMonths" type="number" min={6} max={120} defaultValue={36} required className="mt-1 h-9" />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-xs">Monthly Income (ETB, optional)</Label>
        <Input name="monthlyIncome" type="number" className="mt-1 h-9" />
      </div>
      <div className="flex items-end">
        <Button type="submit" disabled={loading} className="w-full gradient-brand hover:opacity-90 h-9">
          {loading ? "Submitting..." : "Submit"} {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </form>
  );
}
