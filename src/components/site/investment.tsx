"use client";

import { TrendingUp, Coins, Sparkles, Award, ArrowRight, Smartphone, Globe, ShieldCheck, Lock, BellRing } from "lucide-react";
import { dividendHistory } from "@/lib/sacco-data";
import { SectionLabel, SectionTitle } from "./section-utils";

export function Investment() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel center>Investment Opportunities</SectionLabel>
          <SectionTitle center className="mt-3">
            Grow Your <span className="text-[#6DBE45]">Wealth</span>
          </SectionTitle>
          <p className="text-[#6B7785] mt-4 max-w-2xl mx-auto">
            Smart investment solutions to build your financial future — from member shares to
            annual dividends up to 30% and free advisory.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mb-12">
          {/* Member Shares */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E9EE] card-hover">
            <div className="w-14 h-14 rounded-2xl gradient-brand-blue flex items-center justify-center text-white shadow-lg mb-4">
              <Coins className="w-7 h-7" />
            </div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#1F4E8C] bg-[#1F4E8C]/10 px-2.5 py-1 rounded-full mb-2">
              Member Shares
            </span>
            <h3 className="font-display font-bold text-lg text-[#2C3E50]">Become a Co-Owner</h3>
            <div className="font-display text-2xl font-extrabold text-[#6DBE45] my-2">ETB 1,000 min</div>
            <p className="text-sm text-[#6B7785] leading-relaxed mb-4">
              Purchase shares and become a part-owner of ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ. Earn annual dividends based
              on cooperative performance with voting rights in the AGM.
            </p>
            <ul className="space-y-1.5 text-xs text-[#2C3E50]">
              <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#6DBE45]" /> Voting rights in AGM</li>
              <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#6DBE45]" /> Annual dividend earnings</li>
              <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#6DBE45]" /> Ownership stake</li>
            </ul>
          </div>

          {/* Annual Dividends */}
          <div className="relative bg-gradient-to-br from-[#6DBE45] to-[#2E7D32] text-white rounded-2xl p-6 shadow-xl overflow-hidden">
            <span className="absolute top-0 right-0 bg-[#FFD700] text-[#1F4E8C] text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> BEST VALUE
            </span>
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-white shadow-lg mb-4">
              <TrendingUp className="w-7 h-7" />
            </div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-white bg-white/15 px-2.5 py-1 rounded-full mb-2">
              Annual Dividends
            </span>
            <h3 className="font-display font-bold text-lg">Up to 30% p.a</h3>
            <p className="text-sm text-white/85 leading-relaxed my-3">
              Our members enjoy attractive dividend returns on share capital and savings with
              consistent annual payouts.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-white/10 rounded-lg p-2">
                <div className="text-[10px] uppercase opacity-80">This Year&apos;s Target</div>
                <div className="font-display font-bold">30%</div>
              </div>
              <div className="bg-white/10 rounded-lg p-2">
                <div className="text-[10px] uppercase opacity-80">Historical Return</div>
                <div className="font-display font-bold">25–30%</div>
              </div>
            </div>
            <button
              onClick={() => scrollTo("#membership")}
              className="mt-4 w-full bg-[#FFD700] text-[#1F4E8C] px-4 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Invest Now
            </button>
          </div>

          {/* Investment Advisory */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E9EE] card-hover relative">
            <span className="absolute top-0 right-0 bg-gradient-to-l from-[#FFD700] to-[#FFA500] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> COMPLETELY FREE
            </span>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg mb-4">
              <Award className="w-7 h-7" />
            </div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#1F4E8C] bg-[#1F4E8C]/10 px-2.5 py-1 rounded-full mb-2">
              Advisory
            </span>
            <h3 className="font-display font-bold text-lg text-[#2C3E50]">Investment Advisory</h3>
            <p className="text-sm text-[#6B7785] leading-relaxed mb-4 mt-2">
              Get professional advice on investment opportunities, portfolio diversification and
              wealth management — at no cost to members.
            </p>
            <ul className="space-y-1.5 text-xs text-[#2C3E50]">
              <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#6DBE45]" /> Portfolio diversification</li>
              <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#6DBE45]" /> Risk assessment</li>
              <li className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#6DBE45]" /> Wealth management strategies</li>
            </ul>
          </div>
        </div>

        {/* Dividend history */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E5E9EE] shadow-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <SectionLabel>Dividend History & Performance</SectionLabel>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-[#2C3E50] mt-2">
                Celebrating member wealth growth since foundation
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#F8F9FA] rounded-xl p-3 text-center">
                <div className="font-display text-xl font-bold text-[#6DBE45]">TBD</div>
                <div className="text-[10px] text-[#6B7785] uppercase">Target Rate</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-xl p-3 text-center">
                <div className="font-display text-xl font-bold text-[#1F4E8C]">Soon</div>
                <div className="text-[10px] text-[#6B7785] uppercase">First Payout</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-xl p-3 text-center">
                <div className="font-display text-xl font-bold text-[#2E7D32]">Soon</div>
                <div className="text-[10px] text-[#6B7785] uppercase">Members Benefited</div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-[#E5E9EE] text-[#6B7785] text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Year</th>
                  <th className="py-3 px-4 font-semibold">Dividend Rate</th>
                  <th className="py-3 px-4 font-semibold">Total Payout</th>
                  <th className="py-3 px-4 font-semibold">Growth</th>
                </tr>
              </thead>
              <tbody>
                {dividendHistory.map((d) => (
                  <tr key={d.year} className="border-b border-[#E5E9EE] hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3 px-4 font-display font-bold text-[#2C3E50]">
                      {d.year} {d.projected && <span className="text-[10px] text-[#6DBE45] font-semibold ml-1">PROJECTED</span>}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 font-bold text-[#6DBE45]">
                        <TrendingUp className="w-3.5 h-3.5" /> {d.rate}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#2C3E50] font-semibold">{d.payout}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#6DBE45]/10 text-[#2E7D32] text-xs font-bold">
                        {d.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Growth chart */}
          <div className="mt-8 grid md:grid-cols-4 gap-4 items-end">
            {[
              { y: "2026", h: "TBD", w: 100, best: true },
            ].map((b) => (
              <div key={b.y} className="flex flex-col items-center">
                <div className="w-full flex items-end justify-center" style={{ height: 160 }}>
                  <div
                    className={`w-full max-w-[80px] rounded-t-xl ${
                      b.best ? "gradient-brand" : "gradient-brand-blue"
                    } flex items-start justify-center pt-2`}
                    style={{ height: `${b.w}%` }}
                  >
                    <span className="text-white text-xs font-bold">{b.h}</span>
                  </div>
                </div>
                <div className="mt-2 text-xs font-semibold text-[#6B7785]">{b.y}</div>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="font-display text-2xl font-extrabold text-[#6DBE45]">Coming Soon</div>
              <div className="text-xs text-[#6B7785] mt-1">first dividend after FY 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DigitalBanking() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-[#6DBE45]/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mobile Banking */}
          <div>
            <SectionLabel>Digital Banking</SectionLabel>
            <SectionTitle className="mt-3">
              Mobile <span className="text-[#6DBE45]">Banking</span>
            </SectionTitle>
            <p className="text-[#6B7785] mt-4 leading-relaxed mb-6">
              Bank on the go with our mobile banking app. Your finances, always at your fingertips.
              Check balances, transfer funds, apply for loans and pay bills — 24/7 from anywhere
              in Ethiopia.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                { icon: BellRing, t: "Receive instant notifications" },
                { icon: Smartphone, t: "Check balances anytime" },
                { icon: Globe, t: "Transfer funds between accounts" },
                { icon: ShieldCheck, t: "Apply for loans online securely" },
              ].map(({ icon: I, t }) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-[#6DBE45]/10 text-[#6DBE45] flex items-center justify-center">
                    <I className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-[#2C3E50] font-medium">{t}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 bg-[#2C3E50] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                <Smartphone className="w-4 h-4" /> GET IT ON Google Play
              </button>
              <button className="inline-flex items-center gap-2 bg-[#2C3E50] text-white px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                <Globe className="w-4 h-4" /> DOWNLOAD ON App Store
              </button>
            </div>
            <span className="inline-block mt-3 text-xs text-[#6B7785] italic">Coming Soon</span>
          </div>

          {/* Phone mockup */}
          <div className="relative">
            <div className="mx-auto w-[260px] h-[520px] bg-[#2C3E50] rounded-[42px] p-3 shadow-2xl border-4 border-[#1F4E8C]">
              <div className="w-full h-full bg-[#F8F9FA] rounded-[34px] overflow-hidden flex flex-col">
                <div className="gradient-brand text-white px-5 py-4">
                  <div className="text-[10px] opacity-80">9:41</div>
                  <div className="text-xs font-semibold mt-1">ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ</div>
                  <div className="font-display text-2xl font-bold">ETB 45,250.00</div>
                  <div className="text-[10px] opacity-80">****1234 · Total Balance</div>
                </div>
                <div className="p-4 flex-1 flex flex-col gap-2.5">
                  <div className="flex gap-2">
                    {["Transfer", "Scan", "Statements"].map((b) => (
                      <div key={b} className="flex-1 bg-white rounded-lg p-2 text-center text-[10px] font-semibold text-[#1F4E8C] border border-[#E5E9EE]">
                        {b}
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-bold text-[#6B7785] uppercase tracking-wider mt-1">Recent Transactions</div>
                  <div className="bg-white rounded-lg p-2.5 border border-[#E5E9EE]">
                    <div className="text-[10px] text-[#6B7785]">Today, 09:30 AM</div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#2C3E50]">Salary Deposit</span>
                      <span className="text-xs font-bold text-[#6DBE45]">+ETB 25,000</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2.5 border border-[#E5E9EE]">
                    <div className="text-[10px] text-[#6B7785]">Yesterday</div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#2C3E50]">Bill Payment</span>
                      <span className="text-xs font-bold text-[#1F4E8C]">-ETB 2,500</span>
                    </div>
                  </div>
                  <div className="mt-auto bg-white rounded-xl p-3 border border-[#E5E9EE]">
                    <div className="text-[10px] text-[#6B7785]">Active Loan</div>
                    <div className="font-display text-base font-bold text-[#2C3E50]">ETB 150,000</div>
                    <div className="text-[10px] text-[#6B7785]">Remaining: ETB 95,000</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-[#E5E9EE] max-w-[200px]">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#6DBE45]" />
                <span className="text-xs font-bold text-[#2C3E50]">256-bit SSL</span>
              </div>
              <div className="text-[11px] text-[#6B7785]">Two-Factor Authentication · 24/7 Availability</div>
            </div>
          </div>
        </div>

        {/* Internet Banking strip */}
        <div className="mt-16 bg-gradient-to-r from-[#1F4E8C] to-[#2C5FA8] text-white rounded-3xl p-6 md:p-8 grid md:grid-cols-3 gap-6 items-center shadow-xl">
          <div className="md:col-span-2">
            <SectionLabel className="!bg-white/15 !text-white"><Globe className="w-3.5 h-3.5" /> Online Banking</SectionLabel>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl mt-2">
              Manage your finances from your computer
            </h3>
            <p className="text-white/80 text-sm mt-2 max-w-xl">
              Secure online portal with full account management, downloadable statements (PDF/Excel),
              online loan applications, payments and secure messaging with support.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-[#FFD700]" /> 256-bit SSL Encryption
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-[#FFD700]" /> Two-Factor Authentication
            </div>
            <button className="mt-1 inline-flex items-center justify-center gap-2 bg-[#FFD700] text-[#1F4E8C] px-5 py-2.5 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
              Login to Internet Banking <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
