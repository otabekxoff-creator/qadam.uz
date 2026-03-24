import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Step.uz - O'zbekiston yoshlari uchun karyera platformasi",
    template: "%s | Step.uz",
  },
  description: "Step.uz - O'zbekiston yoshlari uchun karyera platformasi. Karyerangizni biz bilan birga qiring va yuksak natijalarga erishing.",
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
    description: "O'zbekistonning eng yirik talabalar va startaplar platformasi. Karyerangizni biz bilan birga qiring va yuksak natijalarga erishing.",
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
    google: '',
    yandex: '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
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