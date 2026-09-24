import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CareerProvider } from "@/context/CareerContext";
import { AppShell } from "@/components/layout/AppShell";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} | Career-Readiness & Employment Platform`,
  description: PRODUCT_TAGLINE,
  keywords: [
    "Career Readiness",
    "Technical Assessment",
    "Full Stack Developer",
    "Skill Gap Analysis",
    "Project-Based Learning",
    "Mock Interview",
    "ATS Resume",
    "Tech Jobs",
  ],
  authors: [{ name: PRODUCT_NAME }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <body className="bg-black text-pearl-primary font-sans antialiased selection:bg-champagne/30 selection:text-champagne">
        <CareerProvider>
          <AppShell>{children}</AppShell>
        </CareerProvider>
      </body>
    </html>
  );
}
