import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CursorGlow from "@/components/ui/cursor-glow";
import PageTransition from "@/components/PageTransition";
import MotionProvider from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://www.jfcoded.com";
const SITE_TITLE = "Jacob Furtaw | Agentic AI Engineer";
const SITE_TAGLINE =
  "I build privacy-first AI agents — transparent, local, and reliable enough to use every day.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: "Agentic AI Engineer | Building intelligent systems that explore the unknown",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "JFCoded",
    title: SITE_TITLE,
    description: SITE_TAGLINE,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@JFurtaw97",
    title: SITE_TITLE,
    description: SITE_TAGLINE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MotionProvider>
          <CursorGlow />
          <Navbar />
          <main className="pt-20 min-h-[calc(100vh-5rem)]"> {/* padding to account for fixed navbar */}
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}