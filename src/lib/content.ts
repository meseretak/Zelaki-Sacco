import { db } from "@/lib/db";
import { getSettings, type Settings } from "@/lib/settings";
import type {
  NavItemData,
  NewsData,
  EventData,
  SaccoData,
  TestimonialData,
  ImageData,
} from "@/components/site/content-provider";

export type SiteContent = {
  settings: Settings;
  nav: NavItemData[];
  news: NewsData[];
  events: EventData[];
  saccos: SaccoData[];
  testimonials: TestimonialData[];
  images: ImageData[];
  memberCount: number;
};

export async function getContent(): Promise<SiteContent> {
  const [settings, nav, news, events, saccos, testimonials, images, memberCount] = await Promise.all([
    getSettings(),
    db.navItem.findMany({ orderBy: { order: "asc" } }),
    db.newsItem.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 8 }),
    db.eventItem.findMany({ orderBy: { createdAt: "asc" }, take: 8 }),
    db.sacco.findMany({ orderBy: [{ featured: "desc" }, { name: "asc" }] }),
    db.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 6 }),
    db.contentImage.findMany(),
    db.member.count(),
  ]);

  return {
    settings,
    nav: nav.map((n) => ({
      id: n.id, label: n.label, href: n.href, slug: n.slug, parentId: n.parentId,
      group: n.group, icon: n.icon, order: n.order, visible: n.visible, openInNew: n.openInNew,
    })),
    news: news.map((n) => ({
      id: n.id, title: n.title, date: n.date, excerpt: n.excerpt, tag: n.tag, icon: n.icon, published: n.published,
    })),
    events: events.map((e) => ({
      id: e.id, day: e.day, month: e.month, dayName: e.dayName, title: e.title, time: e.time, location: e.location, type: e.type, description: e.description,
    })),
    saccos: saccos.map((s) => ({
      id: s.id, name: s.name, region: s.region, city: s.city, type: s.type,
      established: s.established ?? 0, members: s.members ?? 0, assetsBirr: s.assetsBirr ?? 0,
      phone: s.phone ?? "", email: s.email ?? "",
      services: (s.services || "").split(",").map((x) => x.trim()).filter(Boolean),
      description: s.description ?? "", featured: s.featured,
    })),
    testimonials: testimonials.map((t) => ({
      id: t.id, name: t.name, role: t.role, quote: t.quote, initials: t.initials,
    })),
    images: images.map((i) => ({ id: i.id, section: i.section, key: i.key, url: i.url, alt: i.alt })),
    memberCount,
  };
}
