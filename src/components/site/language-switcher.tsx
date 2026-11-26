"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English", native: "English", short: "EN" },
  { code: "am", label: "Amharic", native: "አማርኛ", short: "አማ" },
  { code: "om", label: "Oromo", native: "Afaan Oromoo", short: "OM" },
  { code: "ti", label: "Tigrinya", native: "ትግርኛ", short: "ትግ" },
  { code: "ar", label: "Arabic", native: "العربية", short: "AR" },
  { code: "fr", label: "French", native: "Français", short: "FR" },
];

function getCurrentLang(): string {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return m ? m[1] : "en";
}

// Module-scope cookie helper (the compiler disallows document.cookie mutation inside components)
function setGoogTransCookie(code: string) {
  if (code === "en") {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + location.hostname;
  } else {
    const val = `/auto/${code}`;
    document.cookie = `googtrans=${val}; path=/`;
    document.cookie = `googtrans=${val}; path=/; domain=.${location.hostname}`;
  }
}

export function LanguageSwitcher({ variant = "bar" }: { variant?: "bar" | "pill" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // read current language from the googtrans cookie (SSR returns "en", client reads actual)
  const current = getCurrentLang();

  const select = (code: string) => {
    setOpen(false);
    setGoogTransCookie(code);
    // small delay so cookie is written before reload
    setTimeout(() => window.location.reload(), 80);
  };

  const cur = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];
  const isBar = variant === "bar";

  return (
    <div ref={ref} className="relative notranslate" translate="no">
      <button
        onClick={() => setOpen(!open)}
        suppressHydrationWarning
        className={
          isBar
            ? "flex items-center gap-1.5 hover:text-[#6DBE45] transition-colors text-[13px] font-semibold"
            : "flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white px-3 py-1.5 rounded-full text-sm font-semibold transition-colors border border-white/20"
        }
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className={isBar ? "w-3.5 h-3.5" : "w-4 h-4"} />
        <span className={isBar ? "" : "hidden sm:inline"}>{cur.short}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 bg-white rounded-xl shadow-2xl border border-[#E5E9EE] py-1.5 min-w-[180px] z-[60] overflow-hidden">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6B7785] border-b border-[#F0F2F5] mb-1">
            Select Language
          </div>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => select(l.code)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                l.code === current
                  ? "bg-[#6DBE45]/10 text-[#2E7D32] font-semibold"
                  : "text-[#2C3E50] hover:bg-[#F8F9FA]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="w-7 text-center font-bold text-[11px] text-[#6DBE45]">{l.short}</span>
                <span>
                  <span className="block leading-tight">{l.native}</span>
                  <span className="block text-[11px] text-[#6B7785] leading-tight">{l.label}</span>
                </span>
              </span>
              {l.code === current && <Check className="w-4 h-4 text-[#6DBE45]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
