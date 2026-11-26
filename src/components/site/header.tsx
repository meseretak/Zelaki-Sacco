"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Menu, X, Phone, Mail, Clock, ChevronDown, Globe, Lock, ChevronRight,
  Building2, Target, Flag, ShieldCheck, Users, FileText, BarChart3, Quote, Handshake,
  Lock as LockIcon, Wallet, Baby, TrendingUp, Coins, Award, Lightbulb, Smartphone,
  Briefcase, Home, Sofa, Laptop, Car, Truck, Calculator, UserPlus, Gift, FileCheck,
  Newspaper, Calendar, PenLine, Download, HelpCircle, Sparkles, MapPin, Mail as MailIcon,
} from "lucide-react";
import { navItems } from "@/lib/sacco-data";
import { useSettings, useContent, type NavItemData } from "@/components/site/content-provider";

const iconMap: Record<string, React.ElementType> = {
  Building2, Target, Flag, ShieldCheck, Users, FileText, BarChart3, Quote, Handshake,
  Lock: LockIcon, Wallet, Baby, TrendingUp, Coins, Award, Lightbulb, Smartphone,
  Briefcase, Home, Sofa, Laptop, Car, Truck, Calculator, UserPlus, Gift, FileCheck,
  Newspaper, Calendar, PenLine, Download, HelpCircle, Sparkles, MapPin, Mail: MailIcon, Globe,
};
import { LanguageSwitcher } from "@/components/site/language-switcher";

function NavIcon({ name, className }: { name: string | null; className?: string }) {
  const Icon = (name && iconMap[name]) || FileText;
  return <Icon className={className} />;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const s = useSettings();
  const content = useContent();

  // Build a tree from the flat nav list
  const { topLevel, childrenOf } = useMemo(() => {
    const flat: NavItemData[] = content?.nav?.length
      ? content.nav
      : navItems.map((n, i) => ({
          id: String(i), label: n.label, href: n.href, slug: null, parentId: null,
          group: null, icon: null, order: i, visible: true, openInNew: false,
        }));
    const top = flat.filter((n) => !n.parentId);
    const childMap: Record<string, NavItemData[]> = {};
    for (const c of flat.filter((n) => n.parentId)) {
      if (!childMap[c.parentId!]) childMap[c.parentId!] = [];
      childMap[c.parentId!].push(c);
    }
    return { topLevel: top, childrenOf: childMap };
  }, [content]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setMobileSub(null);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      window.location.assign(href);
    }
  };

  const handleNav = (item: NavItemData) => {
    if (item.openInNew) {
      window.open(item.href, "_blank");
      return;
    }
    scrollTo(item.href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="hidden md:block bg-[#1F4E8C] text-white">
        <div className="container mx-auto px-4 flex items-center justify-between h-9 text-[13px]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {s.address || "Addis Ababa, Ethiopia"}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {s.hours || "Mon–Sat: 8AM – 5PM"}</span>
            <a href={`mailto:${s.email || "info@sustainablesacco.com"}`} className="flex items-center gap-1.5 hover:text-[#6DBE45] transition-colors">
              <Mail className="w-3.5 h-3.5" /> {s.email || "info@sustainablesacco.com"}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${s.hotline || "6671"}`} className="flex items-center gap-1.5 hover:text-[#6DBE45] transition-colors font-semibold">
              <Phone className="w-3.5 h-3.5" /> {s.phone || "+251 6671"} · 24/7 Support
            </a>
            <div className="h-4 w-px bg-white/30" />
            <LanguageSwitcher variant="bar" />
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`bg-white transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-md"}`}>
        <div className="container mx-auto px-4 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }} className="flex items-center gap-2.5 shrink-0 notranslate" translate="no">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md overflow-hidden border border-[#E5E9EE]">
              <img src="/logo-official.png" alt="ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ" className="w-full h-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-extrabold text-[#2C3E50] text-[16px] tracking-tight amharic" lang="am">
                {s.siteShortName || "ዘላቂ"} <span className="text-[#6DBE45]">የገንዘብ ቁጠባና ብድር</span>
              </div>
              <div className="text-[11px] text-[#1F4E8C] font-bold tracking-wide amharic" lang="am">{s.amharicName || "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ"}</div>
            </div>
          </a>

          {/* Desktop multi-level nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {topLevel.filter((t) => t.visible).map((item) => {
              const kids = childrenOf[item.id] || [];
              const hasChildren = kids.length > 0;
              if (!hasChildren) {
                return (
                  <button key={item.id} onClick={() => handleNav(item)} className="px-3.5 py-2 text-[14px] font-semibold text-[#2C3E50] hover:text-[#6DBE45] transition-colors rounded-md">
                    {item.label}
                  </button>
                );
              }
              // Group children by their `group` field
              const groups: { name: string | null; items: NavItemData[] }[] = [];
              const groupOrder: string[] = [];
              for (const c of kids) {
                const g = c.group || null;
                let bucket = groups.find((b) => b.name === g);
                if (!bucket) { bucket = { name: g, items: [] }; groups.push(bucket); groupOrder.push(g || ""); }
                bucket.items.push(c);
              }
              return (
                <div key={item.id} className="relative group">
                  <button className="px-3.5 py-2 text-[14px] font-semibold text-[#2C3E50] hover:text-[#6DBE45] transition-colors rounded-md flex items-center gap-1">
                    {item.label} <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                  </button>
                  {/* Dropdown panel */}
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl border border-[#E5E9EE] p-3 min-w-[420px] max-w-[560px]">
                      <div className={`grid gap-2 ${groups.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                        {groups.map((g, gi) => (
                          <div key={gi} className={groups.length > 1 && gi > 0 ? "border-l border-[#E5E9EE] pl-3" : ""}>
                            {g.name && (
                              <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6DBE45]">{g.name}</div>
                            )}
                            {g.items.map((c) => (
                              <button
                                key={c.id}
                                onClick={() => handleNav(c)}
                                className="w-full text-left flex items-start gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#6DBE45]/8 transition-colors group/item"
                              >
                                <span className="w-8 h-8 rounded-lg bg-[#6DBE45]/10 text-[#6DBE45] flex items-center justify-center shrink-0 group-hover/item:bg-[#6DBE45] group-hover/item:text-white transition-colors">
                                  <NavIcon name={c.icon} className="w-4 h-4" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-[13px] font-semibold text-[#2C3E50] leading-tight">{c.label}</span>
                                  <span className="block text-[11px] text-[#6B7785] truncate">{c.slug ? `/${c.slug}` : c.href}</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href="/?view=login" className="flex items-center gap-1.5 px-5 py-2 rounded-full font-semibold text-[14px] border-2 border-[#6DBE45] text-[#6DBE45] hover:bg-[#6DBE45] hover:text-white transition-all">
              <Lock className="w-4 h-4" /> Login
            </a>
            <a href="/#membership" className="flex items-center gap-1.5 px-6 py-2 rounded-full font-semibold text-[14px] gradient-brand text-white shadow-md hover:-translate-y-0.5 transition-all">
              Join Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-md text-[#2C3E50]" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu with accordion sub-menus */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#E5E9EE] bg-white max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
              {topLevel.filter((t) => t.visible).map((item) => {
                const kids = childrenOf[item.id] || [];
                if (kids.length === 0) {
                  return (
                    <button key={item.id} onClick={() => handleNav(item)} className="px-3 py-2.5 text-left text-[15px] font-semibold text-[#2C3E50] hover:bg-[#F8F9FA] hover:text-[#6DBE45] rounded-md">
                      {item.label}
                    </button>
                  );
                }
                const open = mobileSub === item.id;
                const groups: { name: string | null; items: NavItemData[] }[] = [];
                for (const c of kids) {
                  const g = c.group || null;
                  let bucket = groups.find((b) => b.name === g);
                  if (!bucket) { bucket = { name: g, items: [] }; groups.push(bucket); }
                  bucket.items.push(c);
                }
                return (
                  <div key={item.id} className="border-b border-[#F0F2F5] last:border-0">
                    <button onClick={() => setMobileSub(open ? null : item.id)} className="w-full px-3 py-2.5 text-left text-[15px] font-semibold text-[#2C3E50] flex items-center justify-between">
                      {item.label} <ChevronRight className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`} />
                    </button>
                    {open && (
                      <div className="pl-3 pb-2 space-y-1">
                        {groups.map((g, gi) => (
                          <div key={gi}>
                            {g.name && <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#6DBE45]">{g.name}</div>}
                            {g.items.map((c) => (
                              <button key={c.id} onClick={() => handleNav(c)} className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-[14px] text-[#2C3E50] hover:bg-[#F8F9FA] hover:text-[#6DBE45] rounded-md">
                                <NavIcon name={c.icon} className="w-4 h-4 text-[#6DBE45]" />
                                {c.label}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-[#E5E9EE]">
                <a href="/?view=login" className="px-4 py-2.5 rounded-full font-semibold text-sm border-2 border-[#6DBE45] text-[#6DBE45] text-center">Login</a>
                <a href="/#membership" className="px-4 py-2.5 rounded-full font-semibold text-sm gradient-brand text-white text-center">Join Now</a>
              </div>
              <div className="pt-3 mt-2 border-t border-[#E5E9EE] flex justify-center">
                <LanguageSwitcher variant="pill" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
