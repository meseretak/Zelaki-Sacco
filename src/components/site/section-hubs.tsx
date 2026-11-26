"use client";

import { useRouter } from "next/navigation";
import {
  Users, Wallet, Briefcase, UserPlus, FileText, MapPin,
  ArrowRight, ChevronRight,
} from "lucide-react";
import { useContent, type NavItemData } from "@/components/site/content-provider";
import { SectionLabel } from "./section-utils";

const sectionMeta: { label: string; icon: React.ElementType; gradient: string; desc: string }[] = [
  { label: "About Us", icon: Users, gradient: "from-[#1F4E8C] to-[#2C5FA8]", desc: "Who we are, mission, history, values & leadership" },
  { label: "Services", icon: Wallet, gradient: "from-[#6DBE45] to-[#2E7D32]", desc: "Savings, investments, digital banking & insurance" },
  { label: "Loans", icon: Briefcase, gradient: "from-[#B8860B] to-[#FFA500]", desc: "7 loan products + calculator, from 14.5% p.a" },
  { label: "Members", icon: UserPlus, gradient: "from-[#7C3AED] to-[#A855F7]", desc: "Join, benefits, requirements & member portal" },
  { label: "Resources", icon: FileText, gradient: "from-[#0F766E] to-[#14B8A6]", desc: "News, events, blog, downloads & FAQ" },
  { label: "Contact", icon: MapPin, gradient: "from-[#BE123C] to-[#E11D48]", desc: "Branches, get in touch & careers" },
];

export function SectionHubs() {
  const ctx = useContent();
  const router = useRouter();
  const nav = ctx?.nav ?? [];

  const tops = nav.filter((n) => !n.parentId && n.visible).sort((a, b) => a.order - b.order);

  const goTo = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  // build section tiles with their first sub-page link + count
  const tiles = sectionMeta.map((meta) => {
    const top = tops.find((t) => t.label === meta.label);
    const children = top ? nav.filter((c) => c.parentId === top.id && c.visible) : [];
    const firstHref = children[0]?.href || top?.href || "#";
    return { ...meta, count: children.length, href: firstHref, top };
  });

  return (
    <section id="explore" className="py-14 md:py-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6DBE45]/4 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <SectionLabel center>Explore</SectionLabel>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#2C3E50] mt-3 mb-3">
            Quick Access to Every Section
          </h2>
          <p className="text-[#6B7785] max-w-xl mx-auto text-sm">
            Pick a category to open its dedicated pages — savings, loans, membership and more.
          </p>
        </div>

        {/* colorful section tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.label}
                onClick={() => goTo(t.href)}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.gradient} p-5 md:p-6 text-left text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all`}
              >
                {/* decorative circle */}
                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10 group-hover:scale-125 transition-transform" />
                <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/5" />
                <div className="relative flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
                    {t.count} pages
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl mb-1 relative">{t.label}</h3>
                <p className="text-xs md:text-sm text-white/80 leading-snug mb-3 relative line-clamp-2">{t.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold relative">
                  Open section
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            );
          })}
        </div>

        {/* secondary quick actions */}
        <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-5xl mx-auto">
          {[
            { label: "Become a Member", href: "#membership", icon: UserPlus },
            { label: "Loan Calculator", href: "#loans", icon: Briefcase },
            { label: "Contact Us", href: "#contact", icon: MapPin },
          ].map((q) => {
            const QIcon = q.icon;
            return (
              <button
                key={q.label}
                onClick={() => goTo(q.href)}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-[#E5E9EE] bg-[#F8F9FA] hover:border-[#6DBE45] hover:bg-[#6DBE45]/5 transition-all group"
              >
                <span className="w-9 h-9 rounded-lg bg-[#6DBE45]/10 text-[#6DBE45] flex items-center justify-center group-hover:bg-[#6DBE45] group-hover:text-white transition-colors">
                  <QIcon className="w-4 h-4" />
                </span>
                <span className="text-sm font-semibold text-[#2C3E50] flex-1 text-left">{q.label}</span>
                <ArrowRight className="w-4 h-4 text-[#6B7785] group-hover:text-[#6DBE45] group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
