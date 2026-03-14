import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Step.uz - O'zbekiston yoshlari uchun karyera platformasi",
    template: "%s | Step.uz",
  },
  description: "Step.uz — talabalar, bitiruvchilar va yosh professionallar uchun yagona platforma. Ish toping, startap yarating, karyeringizni rivojlantiring.",
  keywords: ["Step.uz", "ish", "karyera", "startap", "O'zbekiston", "talabalar", "bitiruvchilar"],
  authors: [{ name: "Step.uz Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Step.uz - O'zbekiston yoshlari uchun karyera platformasi",
    description: "Ish toping, startap yarating, karyeringizni rivojlantiring.",
    url: "https://step.uz",
    siteName: "Step.uz",
    type: "website",
    locale: "uz_UZ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Step.uz",
    description: "O'zbekiston yoshlari uchun karyera platformasi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
