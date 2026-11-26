"use client";

import { useMemo, useState } from "react";
import { Calculator as CalcIcon, ArrowRight, Info, Lightbulb, TrendingDown, Wallet, ShieldCheck, Clock } from "lucide-react";
import { loanProducts } from "@/lib/sacco-data";
import { SectionLabel } from "./section-utils";

const loanQuickSelect: Record<string, { amount: number; rate: number; term: number }> = {
  Social: { amount: 500000, rate: 15.5, term: 36 },
  Business: { amount: 1500000, rate: 15.5, term: 48 },
  House: { amount: 5000000, rate: 16.5, term: 120 },
  Furniture: { amount: 250000, rate: 14.5, term: 24 },
  Electronics: { amount: 150000, rate: 14.5, term: 12 },
  Car: { amount: 3000000, rate: 15.5, term: 60 },
  Machinery: { amount: 5000000, rate: 14.5, term: 120 },
};

const fmt = (n: number) => n.toLocaleString("en-US");

export function LoanCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(14.5);
  const [term, setTerm] = useState(48);
  const [activeLoan, setActiveLoan] = useState("Business");

  const { monthly, totalInterest, totalPayment } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term;
    const m = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = m * n;
    return { monthly: Math.round(m), totalInterest: Math.round(total - amount), totalPayment: Math.round(total) };
  }, [amount, rate, term]);

  const applyQuick = (name: string) => {
    const q = loanQuickSelect[name];
    if (q) { setAmount(q.amount); setRate(q.rate); setTerm(q.term); setActiveLoan(name); }
  };

  const principalPct = Math.round((amount / totalPayment) * 100);
  const interestPct = 100 - principalPct;

  return (
    <section id="loans" className="py-16 md:py-20 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <SectionLabel center>Loan Calculator</SectionLabel>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#2C3E50] mt-3">
            Calculate Your Monthly Payment
          </h2>
          <p className="text-[#6B7785] mt-3 max-w-2xl mx-auto">
            Pick a loan type or adjust the sliders to see your monthly repayment. The calculator is on the left, with a full explanation on the right.
          </p>
        </div>

        {/* Side-by-side: calculator (left) + explanation (right) */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* LEFT: Calculator */}
          <div className="bg-gradient-to-br from-[#1F4E8C] to-[#2C5FA8] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#6DBE45]/10 rounded-full blur-3xl" />
            <div className="relative">
              {/* loan type pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {Object.keys(loanQuickSelect).map((name) => (
                  <button
                    key={name}
                    onClick={() => applyQuick(name)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${activeLoan === name ? "bg-[#FFD700] text-[#1F4E8C]" : "bg-white/10 text-white hover:bg-white/20"}`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              {/* sliders */}
              <div className="space-y-4 mb-5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-white">Loan Amount (ETB)</span>
                    <span className="text-[#FFD700]">{fmt(amount)}</span>
                  </div>
                  <input type="range" min={50000} max={16000000} step={50000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-[#6DBE45]" />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-white">Interest Rate (%)</span>
                    <span className="text-[#FFD700]">{rate}%</span>
                  </div>
                  <input type="range" min={14.5} max={17.5} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[#6DBE45]" />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-white">Loan Term (Months)</span>
                    <span className="text-[#FFD700]">{term} months</span>
                  </div>
                  <input type="range" min={6} max={120} step={6} value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full accent-[#6DBE45]" />
                </div>
              </div>

              {/* result panel */}
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7785]">Your Monthly Payment</div>
                <div className="font-display text-3xl font-extrabold text-[#6DBE45] my-1">ETB {fmt(monthly)}<span className="text-sm text-[#6B7785] font-semibold"> / month</span></div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-[#F8F9FA] rounded-lg p-2.5">
                    <div className="text-[10px] text-[#6B7785] uppercase">Principal</div>
                    <div className="font-bold text-sm text-[#2C3E50]">ETB {fmt(amount)}</div>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-lg p-2.5">
                    <div className="text-[10px] text-[#6B7785] uppercase">Interest</div>
                    <div className="font-bold text-sm text-[#1F4E8C]">ETB {fmt(totalInterest)}</div>
                  </div>
                </div>
                <div className="mt-2 bg-gradient-to-r from-[#6DBE45]/10 to-[#1F4E8C]/10 rounded-lg p-2.5">
                  <div className="text-[10px] text-[#6B7785] uppercase">Total Payment</div>
                  <div className="font-display text-xl font-extrabold text-[#2C3E50]">ETB {fmt(totalPayment)}</div>
                </div>
                <div className="mt-3">
                  <div className="flex h-2.5 rounded-full overflow-hidden bg-[#E5E9EE]">
                    <div className="bg-[#6DBE45]" style={{ width: `${principalPct}%` }} />
                    <div className="bg-[#1F4E8C]" style={{ width: `${interestPct}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#6B7785] mt-1.5">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#6DBE45]" /> Principal {principalPct}%</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#1F4E8C]" /> Interest {interestPct}%</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const el = document.querySelector("#contact");
                    if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 90; window.scrollTo({ top: y, behavior: "smooth" }); }
                  }}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 gradient-brand text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-md hover:opacity-90 transition-opacity"
                >
                  Apply for this Loan <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Explanation panel */}
          <div className="space-y-4">
            {/* How it works */}
            <div className="bg-white rounded-2xl p-5 border border-[#E5E9EE] shadow-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#6DBE45]/10 flex items-center justify-center"><Info className="w-5 h-5 text-[#6DBE45]" /></div>
                <h3 className="font-display font-bold text-lg text-[#2C3E50]">How the Calculator Works</h3>
              </div>
              <p className="text-sm text-[#6B7785] leading-relaxed mb-3">
                The calculator uses the standard amortization formula to compute your equal monthly installment (EMI). Adjust the amount, rate, and term to see how each affects your payment.
              </p>
              <div className="bg-[#F8F9FA] rounded-lg p-3 font-mono text-xs text-[#2C3E50]">
                Monthly Payment = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)
                <div className="text-[10px] text-[#6B7785] mt-1">P = principal · r = monthly rate · n = term in months</div>
              </div>
            </div>

            {/* What each metric means */}
            <div className="bg-white rounded-2xl p-5 border border-[#E5E9EE] shadow-sm">
              <h3 className="font-display font-bold text-lg text-[#2C3E50] mb-3">Understanding the Numbers</h3>
              <div className="space-y-2.5">
                {[
                  { icon: Wallet, color: "text-[#6DBE45] bg-[#6DBE45]/10", title: "Monthly Payment", desc: "The fixed amount you pay every month until the loan is fully repaid." },
                  { icon: TrendingDown, color: "text-[#1F4E8C] bg-[#1F4E8C]/10", title: "Total Interest", desc: "The total cost of borrowing — what you pay above the principal over the full term." },
                  { icon: CalcIcon, color: "text-[#B8860B] bg-[#B8860B]/10", title: "Total Payment", desc: "Principal + Interest. This is the total amount you will have paid by the end." },
                ].map((m) => (
                  <div key={m.title} className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-[#F8F9FA] transition-colors">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.color}`}><m.icon className="w-4 h-4" /></span>
                    <div>
                      <div className="text-sm font-bold text-[#2C3E50]">{m.title}</div>
                      <div className="text-xs text-[#6B7785] leading-snug">{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-[#1F4E8C] to-[#2C5FA8] rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-[#FFD700]" />
                <h3 className="font-display font-bold text-lg">Smart Borrowing Tips</h3>
              </div>
              <div className="space-y-2">
                {[
                  { icon: ShieldCheck, text: "Maintain 20-50% savings balance of the loan amount to qualify." },
                  { icon: Clock, text: "Longer terms = lower monthly payments but more total interest." },
                  { icon: TrendingDown, text: "Higher savings % can unlock lower interest rates." },
                  { icon: Wallet, text: "Choose the shortest term you can afford to save on interest." },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-white/90">
                    <t.icon className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
                    <span>{t.text}</span>
                  </div>
                ))}
              </div>
              <a href="/?page=loan-social" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#FFD700] hover:underline">
                View all 7 loan products <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
