import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Hammer, Info, Layout } from "lucide-react";

export const metadata: Metadata = {
  title: "Tüm Araçlar | PDFEditMobile Site Haritası",
  description:
    "PDFEditMobile'daki tüm ücretsiz çevrimiçi PDF araçları, yasal sayfalar ve kaynakların tam listesi.",
};

const sections = [
  {
    title: "Ana Araçlar",
    icon: Hammer,
    pages: [
      { name: "PDF Birleştir", href: "/merge-pdf" },
      { name: "PDF Böl", href: "/split-pdf" },
      { name: "PDF Sıkıştır", href: "/compress-pdf" },
      { name: "PDF Düzenle", href: "/edit-pdf" },
      { name: "PDF'ten Word'e", href: "/pdf-to-word" },
      { name: "Word'den PDF'e", href: "/word-to-pdf" },
      { name: "JPG'den PDF'e", href: "/jpg-to-pdf" },
      { name: "PDF'ten JPG'ye", href: "/pdf-to-jpg" },
      { name: "OCR PDF", href: "/ocr-pdf" },
      { name: "PDF İmzala", href: "/sign-pdf" },
      { name: "Filigran Ekle", href: "/watermark-pdf" },
      { name: "PDF Koru", href: "/protect-pdf" },
      { name: "PDF Kilit Aç", href: "/unlock-pdf" },
      { name: "PDF Döndür", href: "/rotate-pdf" },
      { name: "PDF Düzenle", href: "/organize-pdf" },
      { name: "PDF'ten Excel'e", href: "/pdf-to-excel" },
      { name: "PDF Onar", href: "/repair-pdf" },
      { name: "Meta Veri Düzenle", href: "/edit-metadata" },
    ],
  },
  {
    title: "Kaynaklar",
    icon: Info,
    pages: [
      { name: "Nasıl Çalışır", href: "/how-it-works" },
      { name: "Özellikler", href: "/features" },
      { name: "SSS", href: "/faq" },
      { name: "Değişiklikler", href: "/changelog" },
      { name: "Destek", href: "/support" },
      { name: "Hakkımızda", href: "/about" },
      { name: "İletişim", href: "/contact" },
    ],
  },
  {
    title: "Yasal",
    icon: Layout,
    pages: [
      { name: "Gizlilik Politikası", href: "/privacy" },
      { name: "Kullanım Şartları", href: "/terms" },
      { name: "Sorumluluk Reddi", href: "/disclaimer" },
      { name: "Çerez Politikası", href: "/cookie-policy" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto max-w-5xl px-4">
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Ana Sayfaya Dön
        </Link>

        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-black tracking-tight">
            Tüm PDF Araçları
          </h1>
          <p className="text-lg font-medium text-gray-500">
            Her araç, özellik ve yasal belge{" "}
            <span className="text-black">PDFEditMobile</span> — hepsi bir arada.
          </p>
        </div>

        <div className="stagger-up grid grid-cols-1 gap-12 md:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-gray-50 p-2.5">
                  <section.icon className="h-5 w-5 text-gray-400" />
                </div>
                <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-4">
                {section.pages.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-sm font-bold text-gray-500 transition-colors hover:text-black"
                    >
                      {link.name}
                      <ArrowLeft className="h-3.5 w-3.5 -translate-x-2 rotate-180 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}