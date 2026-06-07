import { Metadata } from "next";
import { WatermarkPDFClient } from "@/components/pages/watermark-pdf/WatermarkPDFClient";

export const metadata: Metadata = {
  title: "PDF Filigran Ekle | Ücretsiz PDF Filigran Aracı",
  description:
    "PDF belgelerinize gerçek zamanlı konumlandırma ile profesyonel metin filigranı ekleyin. %100 ücretsiz, gizli ve güvenli tarayıcı içi işleme.",
  keywords: [
    "PDF Filigran",
    "PDF Filigran Ekle",
    "PDF Damga",
    "Ücretsiz Filigran Aracı",
    "PDFEditMobile",
  ],
  openGraph: {
    title: "PDF Filigran Ekle | #1 Ücretsiz PDF Filigran Aracı",
    description:
      "PDF'lerinize saniyeler içinde profesyonel filigran ekleyin. Hızlı, ücretsiz ve güvenli.",
    url: "https://pdfeditmobile.vercel.app/watermark-pdf",
  },
};

export default function Page() {
  return <WatermarkPDFClient />;
}