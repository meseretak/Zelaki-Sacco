import { db } from "@/lib/db";

export type Settings = Record<string, string>;

const DEFAULTS: Settings = {
  siteName: "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ",
  siteShortName: "ዘላቂ",
  fullEnglishName: "",
  amharicName: "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ",
  amharicShort: "ዘላቂ",
  tagline: "የገንዘብ ቁጠባና ብድር ሕብረት",
  heroBadge: "24/7 Digital Banking",
  hotline: "6671",
  phone: "+251 6671",
  email: "info@sustainablesacco.com",
  supportEmail: "support@sustainablesacco.com",
  address: "Addis Ababa, Ethiopia",
  hours: "Mon - Sat: 8:00 AM - 5:00 PM",
  proclamation: "Established 2026 under Proclamation No. 985/2009",
  foundedYear: "2026",
  branchCount: "1",
  memberCount: "",
  adminPasscode: "admin123",
};

let cache: Settings | null = null;
let cacheAt = 0;
const TTL = 30_000; // 30s in-memory cache

export async function getSettings(): Promise<Settings> {
  const now = Date.now();
  if (cache && now - cacheAt < TTL) return cache;
  try {
    const rows = await db.siteSetting.findMany();
    const merged: Settings = { ...DEFAULTS };
    for (const r of rows) merged[r.key] = r.value;
    cache = merged;
    cacheAt = now;
    return merged;
  } catch {
    return { ...DEFAULTS };
  }
}

export function s(settings: Settings, key: keyof typeof DEFAULTS | string): string {
  return settings[key] ?? DEFAULTS[key as string] ?? "";
}

export function clearSettingsCache() {
  cache = null;
  cacheAt = 0;
}
