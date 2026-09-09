import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono-data",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://knowbase.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KNOWBASE — India's biggest frauds, ranked and sourced.",
    template: "%s — KNOWBASE",
  },
  description:
    "A sourced record of India's largest financial frauds and governance failures — from the biggest scandals to smaller, systemic ones — ranked, dated, and linked to CAG reports, court records, and independent reporting.",
  openGraph: {
    type: "website",
    siteName: "KNOWBASE",
    title: "KNOWBASE — India's biggest frauds, ranked and sourced.",
    description:
      "A sourced record of India's largest financial frauds and governance failures, ranked from biggest to smallest.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KNOWBASE",
    description: "India's biggest frauds, ranked and sourced.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <div className="grain-overlay" />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
