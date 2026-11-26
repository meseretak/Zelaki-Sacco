"use client";

import { Target, Eye, Flag, MapPin, Rocket, Building2, ArrowRight } from "lucide-react";
import { journey } from "@/lib/sacco-data";
import { SectionLabel } from "./section-utils";

const journeyIcons: Record<string, React.ElementType> = {
  Flag,
  MapPin,
  Rocket,
  Building2,
};

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#6DBE45]/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative">
        {/* Intro */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <SectionLabel>ስለ እኛ</SectionLabel>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-[#2C3E50] leading-tight mt-3 mb-5">
              We Help Members Grow Their <span className="text-[#6DBE45]">Financial Future</span>
            </h2>
            <p className="text-[#6B7785] leading-relaxed mb-4">
              ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ was established in 2026 under Proclamation
              No. 985/2009, providing accessible, affordable and sustainable financial services to
              its members. Guided by cooperative principles, we promote financial inclusion and
              economic growth across Ethiopia.
            </p>
            <p className="text-[#6B7785] leading-relaxed mb-6">
              <span className="amharic" lang="am">Our name &ldquo;ዘላቂ&rdquo;</span> is the Amharic word meaning <em>lasting, sustainable and enduring</em>,
              reflecting our commitment to building a financial cooperative that endures for generations of members.
              We currently operate from our Addis Ababa branch and are planning to open many more branches across Ethiopia.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E9EE]">
                <div className="font-display text-2xl font-bold text-[#6DBE45]">2026</div>
                <div className="text-xs text-[#6B7785] font-semibold">Established</div>
              </div>
              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E9EE]">
                <div className="font-display text-2xl font-bold text-[#1F4E8C]">1 Branch</div>
                <div className="text-xs text-[#6B7785] font-semibold">Across Addis Ababa</div>
              </div>
            </div>
          </div>

          {/* Mission / Vision cards */}
          <div className="grid gap-5">
            <div className="relative bg-gradient-to-br from-[#1F4E8C] to-[#2C5FA8] text-white rounded-2xl p-7 shadow-xl overflow-hidden">
              <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
              <div className="flex items-center gap-3 mb-3 relative">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#FFD700]" />
                </div>
                <h3 className="font-display font-bold text-xl">Our Mission</h3>
              </div>
              <p className="text-white/90 text-sm leading-relaxed relative">
                To improve the lives of members by delivering inclusive and affordable financial
                services, leveraging technology, safeguarding members&apos; interests, strengthening
                community ties and building strategic partnerships for sustainable growth.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 relative">
                {["Inclusive", "Affordable", "Tech-Driven", "ዘላቂ"].map((t) => (
                  <span key={t} className="text-[11px] font-semibold bg-white/15 px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-[#6DBE45] to-[#2E7D32] text-white rounded-2xl p-7 shadow-xl overflow-hidden">
              <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
              <div className="flex items-center gap-3 mb-3 relative">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#FFD700]" />
                </div>
                <h3 className="font-display font-bold text-xl">Our Vision</h3>
              </div>
              <p className="text-white/90 text-sm leading-relaxed relative">
                To be a technologically advanced model savings and credit cooperative in Ethiopia,
                promoting the social and economic well-being of its members and ranking among
                Africa&apos;s leading SACCOs by 2035.
              </p>
              <div className="mt-4 relative">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span>2035 Goal Progress</span>
                  <span>40%</span>
                </div>
                <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full w-[40%] bg-[#FFD700] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey timeline */}
        <div className="mt-8">
          <div className="text-center mb-10">
            <SectionLabel center>Our Journey</SectionLabel>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-[#2C3E50] mt-3">
              የዘላቂ ታሪክ — From Humble Beginnings to a Growing Family
            </h3>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-8 h-0.5 bg-gradient-to-r from-[#6DBE45] via-[#1F4E8C] to-[#6DBE45]" />
            <div className="grid md:grid-cols-4 gap-6">
              {journey.map((j, i) => {
                const Icon = journeyIcons[j.icon] || Flag;
                return (
                  <div key={i} className="relative">
                    <div className="flex md:justify-center mb-4">
                      <div className="w-16 h-16 rounded-full gradient-brand flex items-center justify-center text-white shadow-lg relative z-10 border-4 border-white">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="bg-white border border-[#E5E9EE] rounded-2xl p-5 card-hover">
                      <span className="inline-block text-xs font-bold text-[#6DBE45] bg-[#6DBE45]/10 px-2.5 py-1 rounded-full mb-2">
                        {j.year}
                      </span>
                      <h4 className="font-display font-bold text-[#2C3E50] mb-1.5">{j.title}</h4>
                      <p className="text-sm text-[#6B7785] leading-relaxed">{j.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-10 max-w-2xl mx-auto">
            {[
              { v: "2026", l: "Established" },
              { v: "1", l: "Addis Ababa Branch" },
              { v: "Soon", l: "Members & Budget" },
            ].map((s) => (
              <div key={s.l} className="text-center bg-[#F8F9FA] rounded-xl py-4 border border-[#E5E9EE]">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#6DBE45]">{s.v}</div>
                <div className="text-xs text-[#6B7785] font-semibold mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
