import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Sinergiya - O'zbekiston yoshlari uchun karyera platformasi",
    template: "%s | Sinergiya",
  },
  description: "Sinergiya — O'zbekistonning eng yirik talabalar va startaplar platformasi. Karyerangizni biz bilan birga quring va yuksak natijalarga erishing.",
  keywords: ["Sinergiya", "ish", "karyera", "startap", "O'zbekiston", "talabalar", "bitiruvchilar", "ish o'rinlari", "vakansiyalar"],
  authors: [{ name: "Sinergiya Team" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL('https://sinergiya.uz'),
  alternates: {
    canonical: '/',
    languages: {
      'uz-UZ': '/uz',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: "Sinergiya - O'zbekiston yoshlari uchun karyera platformasi",
    description: "O'zbekistonning eng yirik talabalar va startaplar platformasi. Karyerangizni biz bilan birga quring va yuksak natijalarga erishing.",
    url: "https://sinergiya.uz",
    siteName: "Sinergiya",
    type: "website",
    locale: "uz_UZ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sinergiya - Karyera platformasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sinergiya",
    description: "O'zbekiston yoshlari uchun karyera platformasi",
    images: ["/twitter-image.jpg"],
    creator: "@sinergiya",
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
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sinergiya" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Sinergiya" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
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
