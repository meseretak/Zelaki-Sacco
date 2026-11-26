"use client";

import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Users,
  Landmark,
  Phone,
  Mail,
  Building2,
  Globe,
  Star,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { ethiopianSaccos, ethiopiaRegions, type Sacco } from "@/lib/sacco-data";
import { SectionLabel, SectionTitle } from "./section-utils";
import { useContent } from "@/components/site/content-provider";

const typeColors: Record<string, string> = {
  Urban: "bg-[#1F4E8C]/10 text-[#1F4E8C]",
  Rural: "bg-[#6DBE45]/10 text-[#2E7D32]",
  Workplace: "bg-[#FFD700]/15 text-[#B8860B]",
  Community: "bg-purple-500/10 text-purple-700",
};

export function SaccoDirectory() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [type, setType] = useState("All Types");
  const content = useContent();
  const allSaccos = content && content.saccos.length > 0 ? content.saccos : ethiopianSaccos;

  const filtered = useMemo(() => {
    return allSaccos.filter((s) => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.services.join(" ").toLowerCase().includes(q);
      const matchesRegion = region === "All Regions" || s.region === region;
      const matchesType = type === "All Types" || s.type === type;
      return matchesQuery && matchesRegion && matchesType;
    });
  }, [allSaccos, query, region, type]);

  // regional stats
  const regionStats = useMemo(() => {
    const map: Record<string, number> = {};
    allSaccos.forEach((s) => {
      map[s.region] = (map[s.region] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [allSaccos]);

  const totalMembers = allSaccos.reduce((a, s) => a + s.members, 0);
  const totalAssets = allSaccos.reduce((a, s) => a + s.assetsBirr, 0);

  return (
    <section id="sacco-directory" className="py-16 md:py-24 bg-gradient-to-b from-[#1F4E8C] to-[#0F1A2C] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6DBE45]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-10">
          <SectionLabel center className="!bg-white/15 !text-[#6DBE45]">
            <Globe className="w-3.5 h-3.5" /> SACCO Directory
          </SectionLabel>
          <SectionTitle center className="mt-3 !text-white">
            SACCOs Across <span className="text-[#6DBE45]">Ethiopia</span>
          </SectionTitle>
          <p className="text-white/70 mt-4 max-w-3xl mx-auto">
            A comprehensive directory of Savings &amp; Credit Cooperatives across every region of
            Ethiopia — from the largest rural microfinance institutions to workplace and
            community SACCOs. Find the right cooperative for your financial journey.
          </p>
        </div>

        {/* Aggregate stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { icon: Building2, v: allSaccos.length.toString(), l: "SACCOs Listed" },
            { icon: Users, v: `${(totalMembers / 1000).toFixed(0)}K+`, l: "Total Members" },
            { icon: Landmark, v: `${(totalAssets / 1000).toFixed(1)}B+`, l: "ETB Assets" },
            { icon: Globe, v: ethiopiaRegions.length - 1, l: "Regions Covered" },
          ].map((s) => (
            <div key={s.l} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10">
              <s.icon className="w-6 h-6 text-[#6DBE45] mb-2" />
              <div className="font-display text-2xl md:text-3xl font-extrabold">{s.v}</div>
              <div className="text-xs text-white/70 uppercase tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 md:p-5 border border-white/10 mb-6">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, city or service..."
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-white/50 text-sm outline-none focus:border-[#6DBE45]"
              />
            </div>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white text-sm outline-none focus:border-[#6DBE45]"
            >
              {ethiopiaRegions.map((r) => (
                <option key={r} value={r} className="bg-[#1F4E8C]">
                  {r}
                </option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white text-sm outline-none focus:border-[#6DBE45]"
            >
              {["All Types", "Urban", "Rural", "Workplace", "Community"].map((t) => (
                <option key={t} value={t} className="bg-[#1F4E8C]">
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Showing{" "}
              <span className="text-white font-bold">{filtered.length}</span> of{" "}
              {allSaccos.length} SACCOs
            </span>
            {(query || region !== "All Regions" || type !== "All Types") && (
              <button
                onClick={() => {
                  setQuery("");
                  setRegion("All Regions");
                  setType("All Types");
                }}
                className="text-[#6DBE45] font-semibold hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* SACCO cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[700px] overflow-y-auto pr-1">
          {filtered.map((s) => (
            <SaccoCard key={s.id} sacco={s} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-white/60">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              No SACCOs match your filters. Try clearing them.
            </div>
          )}
        </div>

        {/* Regional distribution */}
        <div className="mt-10 bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
          <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#6DBE45]" /> Regional Distribution
          </h3>
          <div className="space-y-2">
            {regionStats.map(([r, count]) => {
              const max = regionStats[0][1];
              const pct = (count / max) * 100;
              return (
                <div key={r} className="flex items-center gap-3">
                  <span className="text-xs text-white/80 w-40 shrink-0 truncate">{r}</span>
                  <div className="flex-1 h-6 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-brand rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${pct}%` }}
                    >
                      <span className="text-[10px] font-bold text-white">{count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SaccoCard({ sacco }: { sacco: Sacco }) {
  return (
    <div className="bg-white text-[#2C3E50] rounded-2xl p-5 border border-[#E5E9EE] card-hover relative overflow-hidden group">
      {sacco.featured && (
        <span className="absolute top-0 right-0 bg-gradient-to-l from-[#FFD700] to-[#FFA500] text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-xl flex items-center gap-1">
          <Star className="w-3 h-3" /> FEATURED
        </span>
      )}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center text-white font-display font-bold shrink-0">
          {sacco.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h4 className="font-display font-bold text-[15px] text-[#2C3E50] leading-tight line-clamp-2">
            {sacco.name}
          </h4>
          <div className="flex items-center gap-1 text-[11px] text-[#6B7785] mt-0.5">
            <MapPin className="w-3 h-3" /> {sacco.city}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[sacco.type]}`}>
          {sacco.type}
        </span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F8F9FA] text-[#6B7785]">
          Est. {sacco.established}
        </span>
      </div>

      <p className="text-xs text-[#6B7785] leading-relaxed mb-3 line-clamp-3">{sacco.description}</p>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-[#F8F9FA] rounded-lg p-2">
          <div className="text-[10px] text-[#6B7785] uppercase flex items-center gap-1">
            <Users className="w-3 h-3" /> Members
          </div>
          <div className="font-display font-bold text-sm text-[#2E7D32]">
            {sacco.members >= 1000 ? `${(sacco.members / 1000).toFixed(0)}K+` : sacco.members}
          </div>
        </div>
        <div className="bg-[#F8F9FA] rounded-lg p-2">
          <div className="text-[10px] text-[#6B7785] uppercase flex items-center gap-1">
            <Landmark className="w-3 h-3" /> Assets
          </div>
          <div className="font-display font-bold text-sm text-[#1F4E8C]">
            ETB {sacco.assetsBirr >= 1000 ? `${(sacco.assetsBirr / 1000).toFixed(1)}B` : `${sacco.assetsBirr}M`}+
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {sacco.services.slice(0, 3).map((s) => (
          <span key={s} className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#6DBE45]/10 text-[#2E7D32]">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#E5E9EE]">
        <div className="flex items-center gap-1.5">
          <a href={`tel:${sacco.phone}`} className="w-7 h-7 rounded-full bg-[#6DBE45]/10 text-[#6DBE45] flex items-center justify-center hover:gradient-brand hover:text-white transition-all">
            <Phone className="w-3 h-3" />
          </a>
          <a href={`mailto:${sacco.email}`} className="w-7 h-7 rounded-full bg-[#1F4E8C]/10 text-[#1F4E8C] flex items-center justify-center hover:gradient-brand-blue hover:text-white transition-all">
            <Mail className="w-3 h-3" />
          </a>
        </div>
        <span className="text-[11px] font-semibold text-[#1F4E8C] flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
          View <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
