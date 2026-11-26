"use client";

import { useMemo, useState } from "react";
import {
  Users,
  Briefcase,
  Home,
  Sofa,
  Laptop,
  Car,
  Truck,
  Calculator as CalcIcon,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { loanProducts } from "@/lib/sacco-data";
import { SectionLabel, SectionTitle } from "./section-utils";

const iconMap: Record<string, React.ElementType> = {
  Users,
  Briefcase,
  Home,
  Sofa,
  Laptop,
  Car,
  Truck,
};

const loanQuickSelect: Record<string, { amount: number; rate: number; term: number }> = {
  Social: { amount: 500000, rate: 15.5, term: 36 },
  Business: { amount: 1500000, rate: 15.5, term: 48 },
  House: { amount: 5000000, rate: 16.5, term: 120 },
  Furniture: { amount: 250000, rate: 14.5, term: 24 },
  Electronics: { amount: 150000, rate: 14.5, term: 12 },
  Car: { amount: 3000000, rate: 15.5, term: 60 },
  Machinery: { amount: 5000000, rate: 14.5, term: 120 },
};

export function Loans() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(14.5);
  const [term, setTerm] = useState(48);
  const [activeLoan, setActiveLoan] = useState("Business");

  const { monthly, totalInterest, totalPayment } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term;
    const m = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = m * n;
    return {
      monthly: Math.round(m),
      totalInterest: Math.round(total - amount),
      totalPayment: Math.round(total),
    };
  }, [amount, rate, term]);

  const fmt = (n: number) => n.toLocaleString("en-US");

  const applyQuick = (name: string) => {
    const q = loanQuickSelect[name];
    if (q) {
      setAmount(q.amount);
      setRate(q.rate);
      setTerm(q.term);
      setActiveLoan(name);
    }
  };

  return (
    <section id="loans" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel center>Loan Products</SectionLabel>
          <SectionTitle center className="mt-3">
            Complete Loan <span className="text-[#6DBE45]">Solutions</span>
          </SectionTitle>
          <p className="text-[#6B7785] mt-4 max-w-2xl mx-auto">
            7 specialized loan products tailored to your unique needs — from social and business
            loans to house, vehicle and machinery financing. Starting rate just 14.5%.
          </p>
        </div>

        {/* Loan cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {loanProducts.map((l) => {
            const Icon = iconMap[l.icon] || Briefcase;
            return (
              <div
                key={l.name}
                className={`relative bg-white rounded-2xl p-6 border-2 card-hover overflow-hidden ${
                  l.premium ? "border-[#6DBE45] shadow-lg" : "border-[#E5E9EE]"
                }`}
              >
                {l.premium && (
                  <span className="absolute top-0 right-0 bg-gradient-to-l from-[#FFD700] to-[#FFA500] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                    PREMIUM
                  </span>
                )}
                <div className={`w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-md mb-4 p-3 ${
                  l.color === "emerald" ? "gradient-brand" : l.color === "blue" ? "gradient-brand-blue" : "bg-gradient-to-br from-amber-500 to-orange-600"
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#1F4E8C] bg-[#1F4E8C]/10 px-2.5 py-1 rounded-full mb-2">
                  {l.category}
                </span>
                <h3 className="font-display font-bold text-lg text-[#2C3E50]">{l.name}</h3>
                <div className="font-display text-2xl font-extrabold text-[#6DBE45] my-1">
                  Up to {l.maxAmount}
                </div>
                <div className="text-xs text-[#6B7785] mb-3">ETB · {l.rate} interest</div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="bg-[#F8F9FA] rounded-lg p-2">
                    <div className="text-[10px] text-[#6B7785] uppercase">Saving</div>
                    <div className="font-bold text-[#2C3E50]">{l.saving}</div>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-lg p-2">
                    <div className="text-[10px] text-[#6B7785] uppercase">Saving Period</div>
                    <div className="font-bold text-[#2C3E50]">{l.savingMonths}</div>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-lg p-2 col-span-2">
                    <div className="text-[10px] text-[#6B7785] uppercase">Repayment</div>
                    <div className="font-bold text-[#2C3E50]">{l.term}</div>
                  </div>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {l.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-[#2C3E50]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#6DBE45] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Loan Calculator */}
        <div className="bg-gradient-to-br from-[#1F4E8C] to-[#2C5FA8] rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6DBE45]/10 rounded-full blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-8">
            <div className="text-white">
              <SectionLabel className="!bg-white/15 !text-white">
                <CalcIcon className="w-3.5 h-3.5" /> Loan Calculator
              </SectionLabel>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl mt-3 mb-4">
                Calculate your monthly payment instantly
              </h3>
              <p className="text-white/80 text-sm mb-6">
                Adjust the sliders or pick a loan type to see your monthly repayment, total
                interest and total payment in real time.
              </p>

              {/* Quick select */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(loanQuickSelect).map((name) => (
                  <button
                    key={name}
                    onClick={() => applyQuick(name)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeLoan === name
                        ? "bg-[#FFD700] text-[#1F4E8C]"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              {/* Sliders */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span>Loan Amount (ETB)</span>
                    <span className="text-[#FFD700]">{fmt(amount)}</span>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={16000000}
                    step={50000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-[#6DBE45]"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span>Interest Rate (%)</span>
                    <span className="text-[#FFD700]">{rate}%</span>
                  </div>
                  <input
                    type="range"
                    min={14.5}
                    max={17.5}
                    step={0.5}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full accent-[#6DBE45]"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span>Loan Term (Months)</span>
                    <span className="text-[#FFD700]">{term} months</span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={120}
                    step={6}
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="w-full accent-[#6DBE45]"
                  />
                </div>
              </div>
            </div>

            {/* Result panel */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl flex flex-col">
              <div className="text-xs font-bold uppercase tracking-wider text-[#6B7785]">Your Monthly Payment</div>
              <div className="font-display text-4xl md:text-5xl font-extrabold text-[#6DBE45] my-2">
                ETB {fmt(monthly)}
                <span className="text-base text-[#6B7785] font-semibold"> / month</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-[#F8F9FA] rounded-xl p-4">
                  <div className="text-xs text-[#6B7785] uppercase">Total Principal</div>
                  <div className="font-display text-lg font-bold text-[#2C3E50]">ETB {fmt(amount)}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-4">
                  <div className="text-xs text-[#6B7785] uppercase">Total Interest</div>
                  <div className="font-display text-lg font-bold text-[#1F4E8C]">ETB {fmt(totalInterest)}</div>
                </div>
              </div>

              <div className="mt-3 bg-gradient-to-r from-[#6DBE45]/10 to-[#1F4E8C]/10 rounded-xl p-4">
                <div className="text-xs text-[#6B7785] uppercase">Total Payment</div>
                <div className="font-display text-2xl font-extrabold text-[#2C3E50]">ETB {fmt(totalPayment)}</div>
              </div>

              {/* Principal vs interest bar */}
              <div className="mt-4">
                <div className="flex h-3 rounded-full overflow-hidden bg-[#E5E9EE]">
                  <div className="bg-[#6DBE45]" style={{ width: `${(amount / totalPayment) * 100}%` }} />
                  <div className="bg-[#1F4E8C]" style={{ width: `${(totalInterest / totalPayment) * 100}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-[#6B7785] mt-1.5">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#6DBE45]" /> Principal</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#1F4E8C]" /> Interest</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 gradient-brand text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity"
              >
                Apply for this Loan <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
