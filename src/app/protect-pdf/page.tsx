import { Metadata } from "next";
import { ProtectPDFClient } from "@/components/pages/protect-pdf/ProtectPDFClient";

export const metadata: Metadata = {
  title: "PDF Koru | PDF Şifrele ve Güvenceye Al",
  description:
    "Belgelerinizi güçlü AES-256 şifreleme ve ayrıntılı erişim kontrolleriyle güvenceye alın. Yazdırma, kopyalama ve düzenleme izinlerini kontrol edin. %100 gizli.",
  keywords: [
    "PDF Koru",
    "PDF Şifrele",
    "PDF Şifre Ekle",
    "PDF Güvenlik",
    "Ücretsiz PDF Koruma",
    "PDFEditMobile",
  ],
  openGraph: {
    title: "PDF Koru | #1 Ücretsiz PDF Şifreleme Aracı",
    description:
      "PDF'lerinizi AES-256 ile şifreleyin. Güvenli, ücretsiz ve %100 gizli.",
    url: "https://pdfeditmobile.vercel.app/protect-pdf",
  },
};

export default function Page() {
  return <ProtectPDFClient />;
}