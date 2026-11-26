"use client";

import { ContentProvider } from "@/components/site/content-provider";
import type { SiteContent } from "@/components/site/content-provider";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { LoanCalculator } from "@/components/site/loan-calculator";
import { Membership } from "@/components/site/membership";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export function MarketingSite({ content }: { content: SiteContent }) {
  return (
    <ContentProvider content={content}>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          <Hero />
          <Stats />
          <LoanCalculator />
          <Membership />
          <Contact />
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}
