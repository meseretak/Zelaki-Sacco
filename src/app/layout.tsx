import type { Metadata } from "next";
import { Jost, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GoogleTranslateLoader } from "@/components/site/google-translate";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const AMHARIC_NAME = "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ";

export const metadata: Metadata = {
  title: `${AMHARIC_NAME} | የገንዘብ ቁጠባና ብድር ሕብረት - Ethiopia`,
  description:
    "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ — Your trusted member-owned financial cooperative in Ethiopia. Savings accounts, loans, investments and member benefits.",
  keywords: [
    "ዘላቂ",
    "ቁጠባ",
    "ብድር",
    "ሕብረት",
    "SACCO",
    "Savings",
    "Credit",
    "Cooperative",
    "Ethiopia",
    "Addis Ababa",
  ],
  authors: [{ name: AMHARIC_NAME }],
  icons: {
    icon: "/logo-official.png",
    apple: "/logo-official.png",
  },
  openGraph: {
    title: `${AMHARIC_NAME} | Ethiopia`,
    description:
      "Member-owned financial cooperative in Ethiopia. Savings, loans, investments and member benefits.",
    siteName: AMHARIC_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${AMHARIC_NAME} | Ethiopia`,
    description:
      "Member-owned financial cooperative in Ethiopia. Savings, loans, investments and member benefits.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="am" suppressHydrationWarning>
      <body
        className={`${jost.variable} ${openSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <GoogleTranslateLoader />
        <Toaster />
      </body>
    </html>
  );
}
