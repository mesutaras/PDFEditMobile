import { Metadata } from "next";
import { MergePDFClient } from "@/components/pages/merge-pdf/MergePDFClient";

export const metadata: Metadata = {
  title: "PDF Birleştir | Birden Fazla PDF'i Tek Dosyada Birleştir",
  description:
    "Birden fazla PDF dosyasını hızlı ve kolay bir şekilde tek bir belgede birleştirin. Sayfaları sürükleyip bırakarak yeniden sıralayın, döndürün veya silin. %100 ücretsiz, gizli ve güvenli.",
  keywords: [
    "PDF Birleştir",
    "PDF Birleştirici",
    "PDF'leri Birleştir",
    "Ücretsiz PDF Birleştirme",
    "PDF Düzenle",
    "PDFEditMobile",
  ],
  openGraph: {
    title: "PDF Birleştir | #1 Ücretsiz PDF Birleştirme Aracı",
    description:
      "PDF'lerinizi saniyeler içinde birleştirin. Hızlı, ücretsiz ve %100 gizli.",
    url: "https://pdfeditmobile.vercel.app/merge-pdf",
  },
};

export default function Page() {
  return <MergePDFClient />;
}