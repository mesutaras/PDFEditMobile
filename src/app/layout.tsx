import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/components/auth/Providers";
import { CookieConsent } from "@/components/ui/CookieConsent";
import WelcomeAuthModal from "@/components/auth/WelcomeAuthModal";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import { Great_Vibes, Alex_Brush } from "next/font/google";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive",
});

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://pdfeditmobile.vercel.app"
  ),
  title: {
    default: "PDFEditMobile | #1 Ücretsiz Çevrimiçi PDF Editörü, Birleştirici ve Dönüştürücü",
    template: "%s | PDFEditMobile",
  },
  description:
    "PDFEditMobile, dünyanın en kaliteli ücretsiz çevrimiçi PDF aracıdır. PDF'leri tarayıcınızda %100 yerel olarak düzenleyin, birleştirin, bölün, sıkıştırın ve dönüştürün. Hızlı, güvenli ve kayıt gerektirmez.",
  applicationName: "PDFEditMobile",
  authors: [{ name: "PDFEditMobile Ekibi" }],
  keywords: [
    "PDF Editör",
    "PDF Birleştir",
    "PDF Sıkıştır",
    "PDF Dönüştürücü",
    "PDF Böl",
    "PDF Çevrimiçi Düzenle",
    "PDF İmzala",
    "PDF'ten Word'e",
    "JPG'den PDF'e",
    "OCR PDF",
    "Ücretsiz PDF Araçları",
    "Güvenli PDF işleme",
    "Yüklemesiz PDF aracı",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "PDFEditMobile | En Kolay ve En Güvenli PDF Aracı",
    description:
      "PDF'lerinizi yönetmenin en kaliteli yolu. %100 tarayıcı tabanlı düzenleme, birleştirme ve dönüştürme. Dosyalarınız asla cihazınızdan çıkmaz.",
    url: "https://pdfeditmobile.vercel.app",
    siteName: "PDFEditMobile",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PDFEditMobile - Ücretsiz Çevrimiçi PDF Araçları",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFEditMobile | #1 Ücretsiz Çevrimiçi PDF Araçları",
    description:
      "Premium PDF düzenleme ve yönetim, %100 gizli ve güvenli. Yükleme yok, sınır yok.",
    images: ["/og-image.png"],
  },
  other: {
    "google-adsense-account":
      process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || "ca-pub-4266443141083729",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PDFEditMobile",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://pdfeditmobile.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || "https://pdfeditmobile.vercel.app"}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${greatVibes.variable} ${alexBrush.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
            process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || "ca-pub-4266443141083729"
          }`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Providers>
          <Header />
          <WelcomeAuthModal />
          <CookieConsent />
          <main className="grow">{children}</main>
          {/* AdSense - Footer üstü tek zarif reklam */}
          <div className="mx-auto w-full max-w-4xl px-4 pb-8">
            <div className="rounded-xl bg-gray-50/50 py-4">
              <ins className="adsbygoogle"
                style={{ display: "block", textAlign: "center" }}
                data-ad-client="ca-pub-4266443141083729"
                data-ad-slot="8901234567"
                data-ad-format="auto"
                data-full-width-responsive="true" />
            </div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
