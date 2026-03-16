import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
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
  keywords: ["Step.uz", "ish", "karyera", "startap", "O'zbekiston", "talabalar", "bitiruvchilar", "ish o'rinlari", "vakansiyalar"],
  authors: [{ name: "Step.uz Team" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL('https://step.uz'),
  alternates: {
    canonical: '/',
    languages: {
      'uz-UZ': '/uz',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: "Step.uz - O'zbekiston yoshlari uchun karyera platformasi",
    description: "Ish toping, startap yarating, karyeringizni rivojlantiring.",
    url: "https://step.uz",
    siteName: "Step.uz",
    type: "website",
    locale: "uz_UZ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Step.uz - Karyera platformasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Step.uz",
    description: "O'zbekiston yoshlari uchun karyera platformasi",
    images: ["/twitter-image.jpg"],
    creator: "@stepuz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Step.uz" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Step.uz" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
