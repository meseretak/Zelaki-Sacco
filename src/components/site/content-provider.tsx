"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Settings } from "@/lib/settings";

export type NavItemData = {
  id: string; label: string; href: string; slug: string | null;
  parentId: string | null; group: string | null; icon: string | null;
  order: number; visible: boolean; openInNew: boolean;
};
export type NewsData = { id: string; title: string; date: string; excerpt: string; tag: string; icon: string; published: boolean };
export type EventData = { id: string; day: string; month: string; dayName: string; title: string; time: string; location: string; type: string; description: string };
export type SaccoData = { id: string; name: string; region: string; city: string; type: string; established: number; members: number; assetsBirr: number; phone: string; email: string; services: string[]; description: string; featured: boolean };
export type TestimonialData = { id: string; name: string; role: string; quote: string; initials: string };
export type ImageData = { id: string; section: string; key: string; url: string; alt: string | null };

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

const ContentContext = createContext<SiteContent | null>(null);

export function ContentProvider({ content, children }: { content: SiteContent; children: ReactNode }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): SiteContent | null {
  return useContext(ContentContext);
}

export function useSettings(): Settings {
  const ctx = useContext(ContentContext);
  return ctx?.settings ?? {};
}
