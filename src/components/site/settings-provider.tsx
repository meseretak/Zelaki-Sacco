"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Settings } from "@/lib/settings";

const SettingsContext = createContext<Settings>({});

export function SettingsProvider({
  settings,
  children,
}: {
  settings: Settings;
  children: ReactNode;
}) {
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useSetting(key: string, fallback = "") {
  const s = useContext(SettingsContext);
  return s[key] ?? fallback;
}
