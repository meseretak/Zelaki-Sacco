"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Landmark, Banknote, Building2, Flag, Clock } from "lucide-react";
import { stats } from "@/lib/sacco-data";
import { useContent } from "@/components/site/content-provider";

const iconMap: Record<string, React.ElementType> = {
  Users, Landmark, Banknote, Building2, Flag,
};

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * value));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ctx = useContent();
  const realMemberCount = ctx?.memberCount ?? 0;
  // override the "Active Members" stat with the real count
  const displayStats = stats.map((s) =>
    s.label === "Active Members"
      ? { ...s, value: realMemberCount, comingSoon: false, note: realMemberCount > 0 ? `${realMemberCount} registered` : "Coming Soon" }
      : s
  );
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {displayStats.map((s) => {
            const Icon = iconMap[s.icon] || Users;
            const comingSoon = (s as { comingSoon?: boolean }).comingSoon;
            const note = (s as { note?: string }).note;
            return (
              <div
                key={s.label}
                className="relative bg-gradient-to-br from-[#F8F9FA] to-white border border-[#E5E9EE] rounded-2xl p-6 card-hover overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-[#6DBE45]/5" />
                <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white mb-3 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                {comingSoon ? (
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-2xl md:text-3xl font-extrabold text-[#6B7785] tracking-tight">Coming Soon</span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 px-2 py-0.5 rounded-full">
                      <Clock className="w-2.5 h-2.5" /> TBD
                    </span>
                  </div>
                ) : (
                  <div className="font-display text-3xl md:text-4xl font-extrabold text-[#2C3E50] tracking-tight">
                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                )}
                <div className="text-sm font-semibold text-[#6B7785] mt-1 uppercase tracking-wide">{s.label}</div>
                {note && <div className="text-[11px] text-[#6DBE45] font-semibold mt-0.5">{note}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
