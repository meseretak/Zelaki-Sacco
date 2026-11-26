"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight, Wallet, PiggyBank, Briefcase, Smartphone, Sparkles,
  ChevronLeft, ChevronRight, ShieldCheck, Users, TrendingUp,
} from "lucide-react";
import { useSettings } from "@/components/site/content-provider";

type Slide = {
  eyebrow: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  cta: { label: string; href: string; primary: boolean }[];
  icon: React.ElementType;
  image: string | null;
  panelGradient: string;
  overlay: string;
  stats: { v: string; l: string }[];
};

const slides: Slide[] = [
  {
    eyebrow: "Welcome",
    badge: "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ",
    title: "Your Financial",
    highlight: "Growth Partner",
    subtitle: "Member-owned financial cooperative established in 2026 in Addis Ababa. Accessible savings, loans and investments under Proclamation No. 985/2009.",
    cta: [
      { label: "Become a Member", href: "#membership", primary: true },
      { label: "Explore Loans", href: "#loans", primary: false },
    ],
    icon: Wallet,
    image: "/slider/slide1.png",
    panelGradient: "from-[#0F1A2C] via-[#152238] to-[#1F4E8C]",
    overlay: "linear-gradient(to right, rgba(15,26,44,0.4) 0%, rgba(15,26,44,0.1) 50%, rgba(15,26,44,0.9) 100%)",
    stats: [
      { v: "2026", l: "Established" },
      { v: "128", l: "Members" },
      { v: "1", l: "Branch" },
    ],
  },
  {
    eyebrow: "Smart Savings",
    badge: "Up to 27% p.a",
    title: "Save Smart,",
    highlight: "Grow Faster",
    subtitle: "Compulsory savings at 7%, voluntary savings with instant withdrawal, child savings at 10%, and time deposits earning up to 27% per annum.",
    cta: [
      { label: "View Savings", href: "/?page=svc-compulsory", primary: true },
      { label: "Time Deposits", href: "/?page=svc-time-deposit", primary: false },
    ],
    icon: PiggyBank,
    image: "/slider/slide2.png",
    panelGradient: "from-[#0A1A0A] via-[#0F2A0F] to-[#2E7D32]",
    overlay: "linear-gradient(to right, rgba(10,26,10,0.4) 0%, rgba(10,26,10,0.1) 50%, rgba(10,26,10,0.9) 100%)",
    stats: [
      { v: "7%", l: "Compulsory" },
      { v: "10%", l: "Child" },
      { v: "27%", l: "Time Deposit" },
    ],
  },
  {
    eyebrow: "Loan Products",
    badge: "From 14.5% p.a",
    title: "7 Loan Types",
    highlight: "For Every Need",
    subtitle: "Social, Business, House, Furniture, Electronics, Car and Machinery loans. Quick approval within 24-48 hours. Starting rate just 14.5% per annum.",
    cta: [
      { label: "Calculate Loan", href: "#loans", primary: true },
      { label: "View All Loans", href: "/?page=loan-social", primary: false },
    ],
    icon: Briefcase,
    image: "/slider/slide3.png",
    panelGradient: "from-[#1A1408] via-[#2A1F0A] to-[#B8860B]",
    overlay: "linear-gradient(to right, rgba(26,20,8,0.4) 0%, rgba(26,20,8,0.1) 50%, rgba(26,20,8,0.9) 100%)",
    stats: [
      { v: "7", l: "Loan Types" },
      { v: "14.5%", l: "Starting" },
      { v: "48h", l: "Approval" },
    ],
  },
  {
    eyebrow: "Digital Banking",
    badge: "24/7 Access",
    title: "Bank Anytime,",
    highlight: "Anywhere",
    subtitle: "Mobile banking app and internet banking portal. Check balances, transfer funds, apply for loans and pay bills — 24/7 from anywhere in Ethiopia.",
    cta: [
      { label: "Mobile Banking", href: "/?page=svc-mobile", primary: true },
      { label: "Internet Banking", href: "/?page=svc-internet", primary: false },
    ],
    icon: Smartphone,
    image: null,
    panelGradient: "from-[#051A18] via-[#0A2A26] to-[#0F766E]",
    overlay: "",
    stats: [
      { v: "24/7", l: "Available" },
      { v: "256-bit", l: "SSL" },
      { v: "2FA", l: "Secure" },
    ],
  },
  {
    eyebrow: "Loan Products",
    badge: "7 Types Available",
    title: "7 Loan Products",
    highlight: "For Every Need",
    subtitle: "Social, Business, House, Furniture, Electronics, Car and Machinery loans — each designed for a specific purpose with flexible terms and competitive rates from 14.5%.",
    cta: [
      { label: "View All Loans", href: "/?page=loan-social", primary: true },
      { label: "Calculate Payment", href: "#loans", primary: false },
    ],
    icon: Briefcase,
    image: "/slider/slide5.png",
    panelGradient: "from-[#0A0F1F] via-[#111827] to-[#1E3A5F]",
    overlay: "linear-gradient(to right, rgba(10,15,31,0.5) 0%, rgba(10,15,31,0.2) 50%, rgba(10,15,31,0.95) 100%)",
    stats: [
      { v: "Social", l: "Up to 1M" },
      { v: "Business", l: "Up to 3M" },
      { v: "House", l: "Up to 16M" },
    ],
  },
  {
    eyebrow: "Our Mission",
    badge: "Change Your Life",
    title: "Together We Grow,",
    highlight: "Together We Thrive",
    subtitle: "More than banking — we're building futures. Join a community that believes in your potential, supports your dreams and walks with you toward financial freedom and a better life.",
    cta: [
      { label: "Join the Cooperative", href: "#membership", primary: true },
      { label: "Our Story", href: "/?page=about-overview", primary: false },
    ],
    icon: Sparkles,
    image: "/slider/slide6.png",
    panelGradient: "from-[#1A0F00] via-[#2A1A05] to-[#8B4513]",
    overlay: "linear-gradient(to right, rgba(26,15,0,0.4) 0%, rgba(26,15,0,0.1) 50%, rgba(26,15,0,0.95) 100%)",
    stats: [
      { v: "128", l: "Members" },
      { v: "2026", l: "Established" },
      { v: "∞", l: "Potential" },
    ],
  },
];

const AUTOPLAY_MS = 6000;

export function Hero() {
  const s = useSettings();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, next]);

  const goTo = (href: string) => {
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

  const slide = slides[active];
  const Icon = slide.icon;

  return (
    <section
      id="home"
      className="relative pt-[112px] md:pt-[148px] overflow-hidden bg-[#0F1A2C]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Split layout: image (left) + text panel (right) */}
      <div className="flex min-h-[480px] md:min-h-[520px]">
        {/* Left: image half */}
        <div className="w-1/2 relative overflow-hidden hidden md:block">
          {slide.image ? (
            <img
              key={`img-${active}`}
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover animate-[fadeIn_1s_ease]"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.panelGradient}`}>
              <div
                className="absolute inset-0 opacity-30"
                style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #6DBE45 0, transparent 40%), radial-gradient(circle at 70% 60%, #FFD700 0, transparent 30%)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-32 h-32 text-white/10" />
              </div>
            </div>
          )}
          {/* gradient overlay — fades image into the text panel */}
          {slide.overlay && (
            <div className="absolute inset-0" style={{ backgroundImage: slide.overlay }} />
          )}
        </div>

        {/* Right: text panel */}
        <div className={`w-full md:w-1/2 relative bg-gradient-to-br ${slide.panelGradient} flex items-center`}>
          {/* decorative pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#6DBE45]/8 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-6 md:px-10 py-10 md:py-12 max-w-xl">
            {/* mobile image preview */}
            {slide.image && (
              <div className="md:hidden mb-5 -mx-6 -mt-10 h-40 relative overflow-hidden">
                <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F1A2C]" />
              </div>
            )}

            {/* icon badge — show logo on slide 1, icon on others */}
            <div key={`icon-${active}`} className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-5 animate-[fadeInUp_0.5s_ease] overflow-hidden">
              {active === 0 ? (
                <img src="/logo-official.png" alt="Logo" className="w-full h-full object-contain rounded-2xl" />
              ) : (
                <Icon className="w-7 h-7 text-[#FFD700]" />
              )}
            </div>

            {/* eyebrow + badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-[#FFD700]" />
                {slide.eyebrow}
              </span>
              <span className={`amharic px-3 py-1 rounded-full text-xs font-bold ${active === 0 ? "bg-white/10 border border-white/20 text-[#6DBE45]" : "bg-[#FFD700] text-[#0F1A2C]"}`} lang="am">
                {slide.badge}
              </span>
            </div>

            {/* title */}
            <h1 key={`title-${active}`} className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] mb-3 tracking-tight animate-[fadeInUp_0.5s_ease_0.1s_both]">
              {slide.title}
              <br />
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FFEC8B] bg-clip-text text-transparent">{slide.highlight}</span>
            </h1>

            {/* subtitle */}
            <p key={`sub-${active}`} className="text-white/70 text-sm md:text-base max-w-md mb-6 leading-relaxed animate-[fadeInUp_0.5s_ease_0.2s_both]">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-7">
              {slide.cta.map((c) => (
                <button
                  key={c.label}
                  onClick={() => goTo(c.href)}
                  className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105 ${
                    c.primary ? "bg-[#FFD700] text-[#0F1A2C]" : "bg-white/10 backdrop-blur border border-white/25 text-white hover:bg-white/20"
                  }`}
                >
                  {c.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            {/* stats */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {slide.stats.map((st) => (
                <div key={st.l} className="border-l-2 border-[#6DBE45]/40 pl-3">
                  <div className="font-display text-xl font-bold text-white">{st.v}</div>
                  <div className="text-[10px] text-white/60 uppercase tracking-wide">{st.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-[calc(50%-20px)] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/30 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators + counter */}
      <div className="absolute bottom-4 right-6 z-30 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-[#FFD700]" : "w-2 bg-white/30 hover:bg-white/50"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <span className="text-[10px] text-white/50 font-mono">{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
        <div
          key={active + (paused ? "p" : "r")}
          className="h-full bg-[#FFD700]"
          style={{ animation: paused ? "none" : `progress ${AUTOPLAY_MS}ms linear` }}
        />
      </div>
    </section>
  );
}
