"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Send,
  ArrowRight,
  Smartphone,
  Globe,
  ShieldCheck,
  MessageCircle,
  X,
  Headset,
  ChevronUp,
} from "lucide-react";
import { contactInfo, branches, navItems } from "@/lib/sacco-data";
import { useSettings, useContent } from "@/components/site/content-provider";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Loans", href: "#loans" },
  { label: "Membership", href: "#membership" },
  { label: "SACCO Directory", href: "#sacco-directory" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Savings Accounts",
  "Loan Products",
  "Investments",
  "Insurance",
  "Mobile Banking",
  "Internet Banking",
  "Time Deposits",
  "Member Shares",
];

export function Footer() {
  const s = useSettings();
  const content = useContent();
  // Quick Links: show only the top-level menu items (the main navigation).
  // For dropdown triggers (href "#"), resolve to the first child's page link.
  const allNav = content && content.nav.length > 0 ? content.nav : navItems.map((n, i) => ({ id: String(i), label: n.label, href: n.href, order: i, visible: true }));
  const tops = allNav.filter((n) => !n.parentId && n.visible).sort((a, b) => a.order - b.order);
  const nav = tops.map((t) => {
    if (t.href && t.href !== "#") return t;
    const firstChild = allNav.find((c) => c.parentId === t.id);
    return { ...t, href: firstChild ? firstChild.href : "#" };
  });
  const scrollTo = (href: string) => {
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

  return (
    <footer className="bg-[#0F1A2C] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4 notranslate" translate="no">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md overflow-hidden">
                <img src="/logo-official.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="leading-tight">
                <div className="font-display font-extrabold text-lg amharic" lang="am">
                  {s.siteShortName || "ዘላቂ"} <span className="text-[#6DBE45]">የገንዘብ ቁጠባና ብድር</span>
                </div>
                <div className="text-[12px] text-[#6DBE45] font-bold amharic" lang="am">
                  {s.amharicName || "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ"}
                </div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Member-owned financial cooperative under Proclamation No. 985/2009. Your trusted
              partner for savings, loans and investments in Ethiopia since 2026.
            </p>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6DBE45]" /> {s.address || contactInfo.address}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6DBE45]" />
                <a href={`tel:${s.hotline || contactInfo.hotline}`} className="hover:text-[#6DBE45]">{s.phone || contactInfo.phone}</a>
                <span className="text-white/50">· 24/7 Hotline</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6DBE45]" />
                <a href={`mailto:${s.email || contactInfo.email}`} className="hover:text-[#6DBE45]">{s.email || contactInfo.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#6DBE45]" /> {s.hours || contactInfo.hours}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5">
              {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:gradient-brand flex items-center justify-center transition-all hover:-translate-y-0.5"
                  aria-label="social link"
                >
                  <I className="w-4 h-4" />
                </a>
              ))}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:gradient-brand flex items-center justify-center transition-all"
                aria-label="telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold mb-4 text-[#6DBE45]">Quick Links</h4>
            <ul className="space-y-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-sm text-white/70 hover:text-[#6DBE45] flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold mb-4 text-[#6DBE45]">Our Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("#services")}
                    className="text-sm text-white/70 hover:text-[#6DBE45]"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + app */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold mb-4 text-[#6DBE45]">Stay Connected</h4>
            <p className="text-sm text-white/70 mb-3">
              Subscribe for updates on promotions, events and financial tips.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const email = String(new FormData(form).get("email") || "");
                if (!email.includes("@")) return;
                try {
                  await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  });
                  form.reset();
                  alert("Subscribed! 🎉");
                } catch {
                  alert("Could not subscribe. Try again.");
                }
              }}
              className="flex gap-2 mb-5"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 px-3 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/50 text-sm outline-none focus:border-[#6DBE45]"
              />
              <button className="gradient-brand text-white px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-1.5 hover:opacity-90 transition-opacity">
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="space-y-2">
              <div className="text-xs text-white/60 uppercase font-semibold">Download Our App</div>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-white/10 hover:bg-white/15 rounded-lg p-2.5 flex items-center gap-2 transition-colors">
                  <Smartphone className="w-5 h-5 text-[#6DBE45]" />
                  <div className="text-left">
                    <div className="text-[9px] text-white/60 uppercase">GET IT ON</div>
                    <div className="text-xs font-bold">Google Play</div>
                  </div>
                </button>
                <button className="bg-white/10 hover:bg-white/15 rounded-lg p-2.5 flex items-center gap-2 transition-colors">
                  <Globe className="w-5 h-5 text-[#6DBE45]" />
                  <div className="text-left">
                    <div className="text-[9px] text-white/60 uppercase">Download on</div>
                    <div className="text-xs font-bold">App Store</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Branches row */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
          {branches.map((b) => (
            <div key={b.name} className="text-sm">
              <div className="font-semibold text-[#6DBE45] mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {b.name}
              </div>
              <div className="text-xs text-white/60">{b.address}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6DBE45]" />
            © 2026 <span className="amharic" lang="am">{s.siteName || "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ"}</span>. All Rights Reserved.
            <span className="hidden sm:inline">· {s.proclamation || "Established 2026 under Proclamation No. 985/2009"}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#6DBE45]">Privacy Policy</a>
            <a href="#" className="hover:text-[#6DBE45]">Terms of Use</a>
            <a href="#" className="hover:text-[#6DBE45]">Bylaws</a>
            <a href="/?view=login" className="hover:text-[#6DBE45]">Member Login</a>
            <a href="/?view=admin" className="hover:text-[#6DBE45]">Admin</a>
          </div>
        </div>
      </div>

      <FloatingChat />
      <BackToTop />
    </footer>
  );
}

function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Welcome to ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ! 👋 I'm your virtual assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const quickReplies = ["Loans", "Savings", "Membership", "Investment", "Contact"];

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: getReply(text),
        },
      ]);
    }, 600);
  };

  const getReply = (q: string): string => {
    const t = q.toLowerCase();
    if (t.includes("loan")) return "We offer 7 loan products: Social, Business, House, Furniture, Electronics, Car and Machinery. Starting rate is 14.5% p.a. Approval within 24-48 hrs. Use the Loan Calculator to estimate payments!";
    if (t.includes("sav")) return "Our savings products: Compulsory (7%), Voluntary (7%), Child (10%) and Time Deposit (up to 27% p.a). Visit the Services section for details.";
    if (t.includes("member") || t.includes("join")) return "Becoming a member is easy! Visit any branch with your National ID, 2 photos and ETB 10,000 (registration + shares + compulsory saving). Process takes about 30 minutes.";
    if (t.includes("invest")) return "Members earn up to 30% annual dividends on shares and savings! Minimum share purchase is ETB 5,000. Investment advisory is completely FREE for members.";
    if (t.includes("contact") || t.includes("phone") || t.includes("call")) return "Call our 24/7 hotline at 6671, email info@sustainablesacco.com, or visit our Addis Ababa branch.";
    if (t.includes("rate") || t.includes("interest")) return "Loan rates start at 14.5% p.a. Savings rates: Compulsory 7%, Voluntary 7%, Child 10%, Time Deposit up to 27%. Historical dividends 25-30%!";
    if (t.includes("hello") || t.includes("hi") || t.includes("hey")) return "Hello! 👋 Welcome to ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ. How can I assist you with savings, loans, membership or investment today?";
    return "Great question! For detailed info, please call our 24/7 hotline at 6671, email info@sustainablesacco.com, or browse the relevant section on this page. Our team is always happy to help!";
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full gradient-brand text-white shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFD700] text-[10px] font-bold text-[#1F4E8C] flex items-center justify-center">1</span>}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[340px] max-w-[calc(100vw-2.5rem)] bg-white rounded-2xl shadow-2xl border border-[#E5E9EE] overflow-hidden flex flex-col" style={{ height: 460 }}>
          <div className="gradient-brand p-4 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Headset className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold">የዘላቂ አስተዋጽዖ</div>
                <div className="text-[11px] text-white/85 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" /> Online · 24/7 Support
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#F8F9FA]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    m.role === "user"
                      ? "gradient-brand text-white rounded-br-sm"
                      : "bg-white text-[#2C3E50] border border-[#E5E9EE] rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-[#E5E9EE] bg-white">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#6DBE45]/10 text-[#2E7D32] hover:bg-[#6DBE45]/20"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-1.5"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-full bg-[#F8F9FA] border border-[#E5E9EE] text-xs outline-none focus:border-[#6DBE45]"
              />
              <button type="submit" className="w-9 h-9 rounded-full gradient-brand text-white flex items-center justify-center shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 left-5 z-40 w-11 h-11 rounded-full gradient-brand-blue text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
