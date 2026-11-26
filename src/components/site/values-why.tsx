"use client";

import {
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  Award,
  Users,
  Leaf,
  Percent,
  Crown,
  Headset,
  Zap,
  LayoutGrid,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { coreValues, whyChooseUs } from "@/lib/sacco-data";
import { SectionLabel, SectionTitle } from "./section-utils";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  HeartHandshake,
  Lightbulb,
  Award,
  Users,
  Leaf,
  Percent,
  Crown,
  Headset,
  Zap,
  LayoutGrid,
  TrendingUp,
};

export function ValuesAndWhy() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* CORE VALUES */}
      <section className="py-16 md:py-24 bg-[#F8F9FA] relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <SectionLabel center>Our Principles</SectionLabel>
            <SectionTitle center className="mt-3">
              Core Values That <span className="text-[#6DBE45]">Guide Us</span>
            </SectionTitle>
            <p className="text-[#6B7785] mt-4 max-w-2xl mx-auto">
              The principles that shape every decision and interaction at ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreValues.map((v) => {
              const Icon = iconMap[v.icon] || ShieldCheck;
              return (
                <div
                  key={v.name}
                  className="group bg-white rounded-2xl p-6 border border-[#E5E9EE] card-hover relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 gradient-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                  <div className="w-14 h-14 rounded-2xl bg-[#6DBE45]/10 flex items-center justify-center text-[#6DBE45] mb-4 group-hover:gradient-brand group-hover:text-white transition-all">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#2C3E50] mb-2">{v.name}</h3>
                  <p className="text-sm text-[#6B7785] leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1F4E8C]/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <SectionLabel>Why Choose Us</SectionLabel>
              <SectionTitle className="mt-3">
                Few Reasons Members <span className="text-[#6DBE45]">Choose Us</span>
              </SectionTitle>
              <p className="text-[#6B7785] mt-4 leading-relaxed">
                At ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ, we put our members first with transparency and excellence. Here
                are six reasons why thousands of Ethiopians trust us with their financial future.
              </p>
              <button
                onClick={() => scrollTo("#membership")}
                className="mt-6 inline-flex items-center gap-2 gradient-brand text-white px-6 py-3 rounded-full font-semibold shadow-md hover:-translate-y-0.5 transition-all"
              >
                Become a Member Today <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
              {whyChooseUs.map((w) => {
                const Icon = iconMap[w.icon] || Award;
                return (
                  <div
                    key={w.title}
                    className="flex gap-4 p-5 rounded-2xl border border-[#E5E9EE] bg-[#F8F9FA] card-hover"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[#2C3E50] mb-1.5">{w.title}</h3>
                      <p className="text-sm text-[#6B7785] leading-relaxed">{w.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
