"use client";

import { Lock, Wallet, Baby, TrendingUp, ArrowRight, Flame, Star } from "lucide-react";
import { savingsProducts, timeDepositTiers } from "@/lib/sacco-data";
import { SectionLabel, SectionTitle } from "./section-utils";

const iconMap: Record<string, React.ElementType> = {
  Lock,
  Wallet,
  Baby,
  TrendingUp,
};

export function Savings() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel center>Savings Products</SectionLabel>
          <SectionTitle center className="mt-3">
            Build Your Future With <span className="text-[#6DBE45]">Our Savings Plans</span>
          </SectionTitle>
          <p className="text-[#6B7785] mt-4 max-w-2xl mx-auto">
            Choose the savings option that best fits your financial goals — from flexible
            voluntary savings to premium time deposits earning up to 27% p.a.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {savingsProducts.map((p) => {
            const Icon = iconMap[p.icon] || Wallet;
            const isBest = p.badge === "Best Value";
            return (
              <div
                key={p.name}
                className={`relative bg-white rounded-2xl p-6 border-2 card-hover overflow-hidden ${
                  isBest ? "border-[#6DBE45] shadow-xl" : "border-[#E5E9EE]"
                }`}
              >
                {isBest && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#FFD700] to-[#FFA500] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                    <Flame className="w-3 h-3" /> BEST VALUE
                  </div>
                )}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#1F4E8C] bg-[#1F4E8C]/10 px-2.5 py-1 rounded-full mb-2">
                  {p.badge}
                </span>
                <h3 className="font-display font-bold text-lg text-[#2C3E50]">{p.name}</h3>
                <div className="font-display text-2xl font-extrabold text-[#6DBE45] my-2">{p.rate}</div>
                <p className="text-sm text-[#6B7785] mb-4 leading-relaxed">{p.description}</p>
                <ul className="space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[#2C3E50]">
                      <Star className="w-3.5 h-3.5 text-[#6DBE45] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("#contact")}
                  className={`mt-5 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full font-semibold text-sm transition-all ${
                    isBest
                      ? "gradient-brand text-white hover:opacity-90"
                      : "border-2 border-[#6DBE45] text-[#6DBE45] hover:bg-[#6DBE45] hover:text-white"
                  }`}
                >
                  Start Saving <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Time Deposit Tiers */}
        <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 border border-[#E5E9EE] shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <SectionLabel>Time Deposit Rates</SectionLabel>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-[#2C3E50] mt-2">
                1 Year Fixed Term · Guaranteed Returns
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#FFD700] to-[#FFA500] px-3 py-1.5 rounded-full">
              <Flame className="w-3.5 h-3.5" /> Up to 27% p.a
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {timeDepositTiers.map((t) => (
              <div
                key={t.tier}
                className={`relative rounded-2xl p-6 border-2 card-hover ${
                  t.best
                    ? "border-[#6DBE45] bg-gradient-to-br from-[#6DBE45]/5 to-transparent shadow-xl"
                    : "border-[#E5E9EE] bg-[#F8F9FA]"
                }`}
              >
                {t.best && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#6DBE45] to-[#2E7D32] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> BEST VALUE
                  </span>
                )}
                <div className="text-xs font-bold uppercase tracking-wider text-[#6B7785]">{t.tier} Tier</div>
                <div className="font-display text-3xl font-extrabold text-[#6DBE45] my-1">{t.rate}</div>
                <div className="text-sm font-semibold text-[#2C3E50] mt-2">Deposit Range</div>
                <div className="text-sm text-[#6B7785]">{t.range}</div>
                <div className="text-sm font-semibold text-[#2C3E50] mt-3">Maturity Return (per 1M)</div>
                <div className="font-display text-lg font-bold text-[#1F4E8C]">{t.maturity}</div>
                <p className="text-xs text-[#6B7785] mt-2">{t.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1F4E8C] text-white rounded-2xl p-5">
            <div>
              <div className="font-display font-bold text-lg">Start Investing Today</div>
              <div className="text-xs text-white/80">Terms and conditions apply. Interest rates subject to change.</div>
            </div>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 bg-[#FFD700] text-[#1F4E8C] px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Contact for Details <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
