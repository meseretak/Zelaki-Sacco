"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Store,
  GraduationCap,
  Home,
  Quote,
  ArrowRight,
  Phone,
  Heart,
  Users,
  TrendingUp,
  Building,
  Wifi,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { faqs, testimonials, successStories, partners } from "@/lib/sacco-data";
import { SectionLabel, SectionTitle } from "./section-utils";
import { useContent } from "@/components/site/content-provider";

const partnerIcons: Record<string, React.ElementType> = {
  Phone,
  Wifi,
  Building,
  ShieldCheck,
};

const successIcons: Record<string, React.ElementType> = {
  Store,
  GraduationCap,
  Home,
};

export function FaqTestimonials() {
  const content = useContent();
  const testList = content && content.testimonials.length > 0 ? content.testimonials : testimonials;
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <SectionLabel>Common Questions</SectionLabel>
              <SectionTitle className="mt-3">
                Frequently Asked <span className="text-[#6DBE45]">Questions</span>
              </SectionTitle>
              <p className="text-[#6B7785] mt-4 leading-relaxed">
                Find answers to common questions about our services, membership, loans, savings
                and operations. Can&apos;t find the answer you&apos;re looking for? Our team is
                one call away.
              </p>
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-6 inline-flex items-center gap-2 gradient-brand text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:col-span-7">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={f.question}
                    value={`item-${i}`}
                    className="border border-[#E5E9EE] rounded-xl px-5 bg-[#F8F9FA] data-[state=open]:bg-white data-[state=open]:border-[#6DBE45]"
                  >
                    <AccordionTrigger className="font-display font-semibold text-[#2C3E50] text-left hover:no-underline">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[#6B7785] leading-relaxed">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-[#F8F9FA] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6DBE45]/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <SectionLabel center>Testimonials</SectionLabel>
            <SectionTitle center className="mt-3">
              What Our <span className="text-[#6DBE45]">Members Say</span>
            </SectionTitle>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testList.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-[#E5E9EE] card-hover relative">
                <Quote className="w-8 h-8 text-[#6DBE45]/30 mb-3" />
                <p className="text-sm text-[#2C3E50] leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#E5E9EE]">
                  <div className="w-11 h-11 rounded-full gradient-brand flex items-center justify-center text-white font-display font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-[#2C3E50]">{t.name}</div>
                    <div className="text-xs text-[#6B7785]">{t.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-[#FFD700]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories + Impact */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F8F9FA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel center>Real Stories, Real Impact</SectionLabel>
            <SectionTitle center className="mt-3">
              Inspiring Member <span className="text-[#6DBE45]">Achievements</span>
            </SectionTitle>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {successStories.map((s) => {
              const Icon = successIcons[s.icon] || Store;
              return (
                <div key={s.title} className="bg-white rounded-2xl p-6 border border-[#E5E9EE] card-hover">
                  <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-lg mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#2C3E50] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#6B7785] leading-relaxed mb-4">{s.description}</p>
                  <div className="flex items-center gap-2 pt-3 border-t border-[#E5E9EE]">
                    <div className="w-8 h-8 rounded-full gradient-brand-blue flex items-center justify-center text-white font-display font-bold text-[11px]">
                      {s.author.split(" ").map((w) => w[0]).join("")}
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold text-[#2C3E50]">{s.author}</div>
                      <div className="text-[#6B7785]">{s.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Community impact */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#1F4E8C] to-[#2C5FA8] text-white rounded-2xl p-7 shadow-xl">
              <SectionLabel className="!bg-white/15 !text-white"><Heart className="w-3.5 h-3.5" /> Community Development</SectionLabel>
              <h3 className="font-display font-bold text-xl mt-3 mb-3">Micro-loan program for underserved communities</h3>
              <p className="text-white/85 text-sm leading-relaxed mb-5">
                Our micro-loan program has helped over 400 small business owners in underserved
                communities start or expand their businesses, creating more than 500 jobs in the
                local economy.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <Users className="w-6 h-6 mx-auto mb-1 text-[#FFD700]" />
                  <div className="font-display text-2xl font-bold">400+</div>
                  <div className="text-[10px] uppercase opacity-80">Business Owners</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-1 text-[#FFD700]" />
                  <div className="font-display text-2xl font-bold">500+</div>
                  <div className="text-[10px] uppercase opacity-80">Jobs Created</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#6DBE45] to-[#2E7D32] text-white rounded-2xl p-7 shadow-xl">
              <SectionLabel className="!bg-white/15 !text-white"><Sparkles className="w-3.5 h-3.5" /> Financial Education</SectionLabel>
              <h3 className="font-display font-bold text-xl mt-3 mb-3">Free financial literacy outreach</h3>
              <p className="text-white/85 text-sm leading-relaxed mb-5">
                We&apos;ve conducted over 50 free financial literacy workshops reaching more than
                community members, helping them make informed financial decisions for their
                families.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <GraduationCap className="w-6 h-6 mx-auto mb-1 text-[#FFD700]" />
                  <div className="font-display text-2xl font-bold">50+</div>
                  <div className="text-[10px] uppercase opacity-80">Free Workshops</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <Users className="w-6 h-6 mx-auto mb-1 text-[#FFD700]" />
                  <div className="font-display text-2xl font-bold">Soon</div>
                  <div className="text-[10px] uppercase opacity-80">Community Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <SectionLabel center>Trusted Partners</SectionLabel>
            <SectionTitle center className="mt-3">
              Strategic <span className="text-[#6DBE45]">Partners</span>
            </SectionTitle>
            <p className="text-[#6B7785] mt-4 max-w-2xl mx-auto">
              Collaborating with industry leaders across telecom, banking and insurance to serve
              you better.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {partners.map((p) => {
              const Icon = partnerIcons[p.icon] || Building;
              return (
                <div key={p.name} className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#E5E9EE] text-center card-hover">
                  <div className="w-12 h-12 mx-auto rounded-xl gradient-brand-blue flex items-center justify-center text-white shadow-md mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-display font-bold text-sm text-[#2C3E50] leading-tight">{p.name}</div>
                  <div className="text-[10px] text-[#6B7785] uppercase tracking-wide mt-1">{p.type}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
