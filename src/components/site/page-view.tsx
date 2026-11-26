"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronRight, FileText, ArrowRight } from "lucide-react";
import { ContentProvider, useContent, useSettings, type NavItemData, type SiteContent } from "@/components/site/content-provider";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import {
  Building2, Target, Flag, ShieldCheck, Users, Wallet, Baby, TrendingUp, Coins,
  Award, Lightbulb, Smartphone, Globe, Briefcase, Home, Sofa, Laptop, Car, Truck,
  Calculator, UserPlus, Gift, FileCheck, Newspaper, Calendar, PenLine, Download,
  HelpCircle, Sparkles, MapPin, Mail, Quote, Handshake, BarChart3, Lock,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Building2, Target, Flag, ShieldCheck, Users, FileText, Quote, Handshake, BarChart3,
  Lock, Wallet, Baby, TrendingUp, Coins, Award, Lightbulb, Smartphone, Globe,
  Briefcase, Home, Sofa, Laptop, Car, Truck, Calculator, UserPlus, Gift, FileCheck,
  Newspaper, Calendar, PenLine, Download, HelpCircle, Sparkles, MapPin, Mail,
};

const sectionLabels: Record<string, string> = {
  about: "About Us", services: "Services", loans: "Loans",
  members: "Members", resources: "Resources", contact: "Contact",
};

type PageData = {
  slug: string; title: string; subtitle: string | null;
  content: string; section: string; icon: string | null;
};

export function PageView({ slug, content }: { slug: string; content: SiteContent }) {
  return (
    <ContentProvider content={content}>
      <PageContent key={slug} slug={slug} />
    </ContentProvider>
  );
}

function PageContent({ slug }: { slug: string }) {
  const s = useSettings();
  const ctx = useContent();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/page?slug=${encodeURIComponent(slug)}`)
      .then((r) => { if (!r.ok) throw new Error("not found"); return r.json(); })
      .then((j) => { if (active) setPage(j.page); })
      .catch(() => { if (active) setNotFound(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  // find sibling pages from the nav (the parent menu whose children include this slug)
  const nav = ctx?.nav ?? [];
  const allTop: NavItemData[] = nav.filter((n) => !n.parentId);
  let parent: NavItemData | null = null;
  let siblings: NavItemData[] = [];
  for (const t of allTop) {
    const kids = nav.filter((n) => n.parentId === t.id);
    if (kids.some((k) => k.slug === slug)) {
      parent = t;
      siblings = kids;
      break;
    }
  }

  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      window.location.href = "/" + href;
    } else {
      window.location.href = href;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="pt-[112px] md:pt-[148px] flex-1 flex items-center justify-center">
          <div className="text-[#6B7785]">Loading page...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !page) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="pt-[112px] md:pt-[148px] flex-1 flex flex-col items-center justify-center px-4 text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-[#6DBE45]/10 flex items-center justify-center text-[#6DBE45] mb-4"><FileText className="w-8 h-8" /></div>
          <h1 className="font-display font-extrabold text-2xl text-[#2C3E50] mb-2">Page not found</h1>
          <p className="text-[#6B7785] mb-6">The page "{slug}" doesn't exist or isn't published yet.</p>
          <a href="/" className="inline-flex items-center gap-2 gradient-brand text-white px-6 py-3 rounded-full font-semibold"><ArrowLeft className="w-4 h-4" /> Back to Home</a>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = (page.icon && iconMap[page.icon]) || FileText;
  const sectionLabel = sectionLabels[page.section] || parent?.label || "Page";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-[112px] md:pt-[148px] relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #6DBE45 0, transparent 35%)" }} />
        <div className="container mx-auto px-4 relative py-12 md:py-16 text-white">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-4">
            <a href="/" className="hover:text-[#6DBE45]">Home</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90">{sectionLabel}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#FFD700] font-semibold">{page.title}</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-[#FFD700]">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#6DBE45]">{sectionLabel}</div>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl leading-tight">{page.title}</h1>
            </div>
          </div>
          {page.subtitle && <p className="text-white/85 mt-3 max-w-2xl">{page.subtitle}</p>}
        </div>
        <svg viewBox="0 0 1440 60" className="w-full h-[30px] md:h-[40px]" preserveAspectRatio="none">
          <path d="M0,30 C240,60 480,0 720,20 C960,40 1200,5 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </section>

      {/* Body with sidebar */}
      <section className="py-12 md:py-16 bg-white flex-1">
        <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-8">
          {/* Sidebar - sibling pages */}
          {siblings.length > 0 && (
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-28">
                <div className="bg-[#F8F9FA] rounded-2xl border border-[#E5E9EE] p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6DBE45] mb-3 px-2">{parent?.label || sectionLabel}</div>
                  <ul className="space-y-1">
                    {siblings.map((c) => {
                      const CIcon = (c.icon && iconMap[c.icon]) || FileText;
                      const active = c.slug === slug;
                      return (
                        <li key={c.id}>
                          <a
                            href={c.href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                              active
                                ? "gradient-brand text-white font-semibold"
                                : "text-[#2C3E50] hover:bg-[#6DBE45]/10 hover:text-[#6DBE45]"
                            }`}
                          >
                            <CIcon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{c.label}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* CTA */}
                <div className="mt-4 bg-gradient-to-br from-[#1F4E8C] to-[#2C5FA8] text-white rounded-2xl p-5">
                  <div className="font-display font-bold mb-1">Need help?</div>
                  <div className="text-sm text-white/85 mb-3">Call our 24/7 hotline at {s.hotline || "6671"}.</div>
                  <a href={`tel:${s.hotline || "6671"}`} className="inline-flex items-center gap-1.5 bg-[#FFD700] text-[#1F4E8C] px-4 py-2 rounded-full text-sm font-bold">{s.hotline || "6671"} <ArrowRight className="w-3.5 h-3.5" /></a>
                </div>
              </div>
            </aside>
          )}

          {/* Main content */}
          <div className={`order-1 lg:order-2 ${siblings.length > 0 ? "lg:col-span-9" : "lg:col-span-12"}`}>
            <article
              className="prose prose-sm max-w-none text-[#2C3E50] [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:text-[#1F4E8C] [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:font-bold [&_h3]:text-[#2E7D32] [&_p]:text-[#445] [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-[#445] [&_a]:text-[#1F4E8C] [&_a]:font-semibold"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
            <div className="mt-10 pt-6 border-t border-[#E5E9EE] flex flex-wrap items-center justify-between gap-3">
              <a href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F4E8C] hover:text-[#6DBE45]"><ArrowLeft className="w-4 h-4" /> Back to Home</a>
              <a href="/#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6DBE45] hover:underline">Contact us <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
