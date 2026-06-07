import { Metadata } from "next";
import { SplitPDFClient } from "@/components/pages/split-pdf/SplitPDFClient";

export const metadata: Metadata = {
  title: "PDF Böl | PDF Sayfalarını Ücretsiz Ayır",
  description:
    "PDF dosyalarını kolayca ayrı sayfalara bölün veya belirli sayfa aralıklarını yeni belgelere çıkarın. Tarayıcınızda %100 gizli, ücretsiz ve güvenli işleme.",
  keywords: [
    "PDF Böl",
    "PDF Sayfalarını Ayır",
    "PDF Sayfası Çıkar",
    "Ücretsiz PDF Bölücü",
    "PDFEditMobile",
  ],
  openGraph: {
    title: "PDF Böl | #1 Ücretsiz PDF Bölme Aracı",
    description:
      "PDF sayfalarını saniyeler içinde ayırın veya çıkarın. Hızlı, ücretsiz ve güvenli.",
    url: "https://pdfeditmobile.vercel.app/split-pdf",
  },
};

export default function Page() {
  return <SplitPDFClient />;
}
