"use client";

import { GraduationCap, Users, Calendar, Globe, ArrowRight, ExternalLink, Clock } from "lucide-react";
import { boardMembers, managementTeam, announcements, events, blogPosts } from "@/lib/sacco-data";
import { SectionLabel, SectionTitle } from "./section-utils";
import { useContent } from "@/components/site/content-provider";

const annIcons: Record<string, React.ElementType> = {
  GraduationCap,
  Users,
  Calendar,
  Globe,
};

const blogColors: Record<string, string> = {
  emerald: "from-emerald-500 to-emerald-700",
  blue: "from-blue-500 to-blue-700",
  amber: "from-amber-500 to-orange-600",
};

export function Leadership() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel center>Our Board</SectionLabel>
          <SectionTitle center className="mt-3">
            Dedicated <span className="text-[#6DBE45]">Leadership Team</span>
          </SectionTitle>
          <p className="text-[#6B7785] mt-4 max-w-2xl mx-auto">
            Experienced professionals committed to your financial success — guiding ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ
            with integrity, vision and operational excellence.
          </p>
        </div>

        {/* Board of Directors */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {boardMembers.map((m) => {
            const tbn = (m as { tbn?: boolean }).tbn;
            return (
            <div key={m.role} className={`bg-white rounded-2xl p-6 border-2 ${tbn ? "border-dashed border-amber-400" : "border-[#E5E9EE]"} card-hover text-center relative overflow-hidden`}>
              <div className="absolute top-0 left-0 right-0 h-20 gradient-brand opacity-10" />
              {tbn ? (
                <div className="relative w-24 h-24 mx-auto rounded-full bg-amber-50 border-2 border-dashed border-amber-400 flex items-center justify-center text-amber-600 mb-4">
                  <Clock className="w-9 h-9" />
                </div>
              ) : (
                <div className="relative w-24 h-24 mx-auto rounded-full gradient-brand flex items-center justify-center text-white font-display font-bold text-3xl shadow-lg border-4 border-white mb-4">
                  {m.initials}
                </div>
              )}
              {tbn && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 px-2.5 py-1 rounded-full mb-2">
                  <Clock className="w-3 h-3" /> To Be Nominated
                </span>
              )}
              <h3 className="font-display font-bold text-lg text-[#2C3E50]">{m.name}</h3>
              <div className="text-sm font-semibold text-[#6DBE45] mb-3">{m.role}</div>
              {m.bio && <p className="text-xs text-[#6B7785] leading-relaxed">{m.bio}</p>}
            </div>
            );
          })}
        </div>

        {/* Management Team */}
        <div className="text-center mb-8">
          <SectionLabel center>Management Team</SectionLabel>
          <h3 className="font-display font-extrabold text-2xl text-[#2C3E50] mt-2">
            The people driving daily operations
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {managementTeam.map((m) => {
            const tbn = (m as { tbn?: boolean }).tbn;
            return (
            <div key={m.role} className={`rounded-2xl p-5 border-2 ${tbn ? "border-dashed border-amber-400 bg-amber-50/40" : "border-[#E5E9EE] bg-[#F8F9FA]"} card-hover text-center`}>
              {tbn ? (
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 border-2 border-dashed border-amber-400 flex items-center justify-center text-amber-600 mb-3">
                  <Clock className="w-7 h-7" />
                </div>
              ) : (
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-brand-blue flex items-center justify-center text-white font-display font-bold text-xl shadow-md mb-3">
                  {m.initials}
                </div>
              )}
              <h4 className="font-display font-bold text-sm text-[#2C3E50] leading-tight">{m.name}</h4>
              <div className="text-[11px] font-semibold text-[#1F4E8C] mt-1 uppercase tracking-wide">{m.role}</div>
              {tbn && <div className="text-[10px] font-semibold text-amber-600 mt-1">Coming Soon</div>}
            </div>
            );
          })}
        </div>

        <blockquote className="mt-10 text-center italic text-[#6B7785] max-w-3xl mx-auto border-l-4 border-[#6DBE45] pl-6 py-2">
          &ldquo;Our dedicated management team works tirelessly to ensure ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ members
          receive the best financial services and cooperative experience. Together, we grow
          stronger.&rdquo;
          <footer className="text-xs font-semibold text-[#2C3E50] mt-2 not-italic">— The ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ Leadership</footer>
        </blockquote>
      </div>
    </section>
  );
}

export function NewsEvents() {
  const content = useContent();
  const newsList = content && content.news.length > 0 ? content.news : announcements;
  const eventList = content && content.events.length > 0 ? content.events : events;
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="news" className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel center>Stay Informed</SectionLabel>
          <SectionTitle center className="mt-3">
            Announcements &amp; <span className="text-[#6DBE45]">Updates</span>
          </SectionTitle>
          <p className="text-[#6B7785] mt-4 max-w-2xl mx-auto">
            Latest news and important updates from ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ — events, products, careers and
            member announcements.
          </p>
        </div>

        {/* News grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {newsList.map((n) => {
            const Icon = annIcons[n.icon] || Globe;
            return (
              <article key={n.title} className="bg-white rounded-2xl border border-[#E5E9EE] overflow-hidden card-hover group">
                <div className="h-32 gradient-brand-blue relative flex items-center justify-center">
                  <Icon className="w-12 h-12 text-white/80" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur">
                    {n.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-[11px] text-[#6B7785] font-semibold mb-1.5">{n.date}</div>
                  <h4 className="font-display font-bold text-[#2C3E50] leading-tight mb-2 line-clamp-2 group-hover:text-[#6DBE45] transition-colors">
                    {n.title}
                  </h4>
                  <p className="text-xs text-[#6B7785] leading-relaxed line-clamp-2 mb-3">{n.excerpt}</p>
                  <button className="text-xs font-semibold text-[#1F4E8C] flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Read More <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Events + Blog */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-extrabold text-xl text-[#2C3E50] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#6DBE45]" /> Upcoming Events
              </h3>
              <button className="text-xs font-semibold text-[#1F4E8C] hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {eventList.map((e) => (
                <div key={e.title} className="bg-white rounded-2xl p-4 border border-[#E5E9EE] flex gap-4 card-hover">
                  <div className="shrink-0 w-16 h-16 rounded-2xl gradient-brand flex flex-col items-center justify-center text-white">
                    <span className="font-display text-2xl font-extrabold leading-none">{e.day}</span>
                    <span className="text-[10px] font-semibold uppercase">{e.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#6DBE45]/10 text-[#2E7D32] px-2 py-0.5 rounded-full">
                        {e.type}
                      </span>
                      <span className="text-[11px] text-[#6B7785]">{e.dayName}</span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-[#2C3E50] leading-tight">{e.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6B7785] mt-1.5">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {e.time}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {e.location}</span>
                    </div>
                    <p className="text-[11px] text-[#6B7785] mt-1.5 line-clamp-1">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blog */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-extrabold text-xl text-[#2C3E50] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#6DBE45]" /> Financial Blog
              </h3>
              <button className="text-xs font-semibold text-[#1F4E8C] hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {blogPosts.map((b) => {
                const Icon = annIcons[b.icon] || Globe;
                return (
                  <div key={b.title} className="bg-white rounded-2xl border border-[#E5E9EE] overflow-hidden card-hover flex">
                    <div className={`shrink-0 w-24 bg-gradient-to-br ${blogColors[b.color] || blogColors.emerald} flex items-center justify-center`}>
                      <Icon className="w-7 h-7 text-white/90" />
                    </div>
                    <div className="p-4 flex-1">
                      <span className="text-[10px] text-[#6B7785] font-semibold uppercase tracking-wider">{b.readTime}</span>
                      <h4 className="font-display font-bold text-sm text-[#2C3E50] leading-tight mt-0.5 mb-1 group-hover:text-[#6DBE45]">
                        {b.title}
                      </h4>
                      <p className="text-[11px] text-[#6B7785] leading-relaxed line-clamp-2">{b.excerpt}</p>
                      <button className="text-[11px] font-semibold text-[#1F4E8C] flex items-center gap-1 mt-1.5">
                        Read More <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Newsletter strip */}
        <div className="mt-10 bg-gradient-to-r from-[#6DBE45] to-[#2E7D32] text-white rounded-3xl p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center shadow-xl">
          <div>
            <h3 className="font-display font-extrabold text-xl md:text-2xl mb-1">Subscribe to Newsletter</h3>
            <p className="text-white/85 text-sm">Get the latest updates, promotions and financial tips directly to your inbox.</p>
          </div>
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
                alert("Subscribed! Thank you for joining our newsletter.");
              } catch {
                alert("Subscription failed. Please try again.");
              }
            }}
            className="flex gap-2"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full text-[#2C3E50] text-sm outline-none border-2 border-white/30 bg-white/10 backdrop-blur text-white placeholder:text-white/60 focus:border-white"
            />
            <button type="submit" className="bg-[#1F4E8C] hover:bg-[#2C5FA8] text-white px-5 py-3 rounded-full font-semibold text-sm transition-colors flex items-center gap-1.5">
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
