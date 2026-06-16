import { Metadata } from "next";
import { CropPDFClient } from "@/components/pages/crop-pdf/CropPDFClient";

export const metadata: Metadata = {
  title: "PDF Kırpma | Ücretsiz PDF Kesme ve Kırpma Aracı",
  description:
    "PDF sayfalarınızdaki istenmeyen alanları kırpın ve kesin. Sürükle-bırak ile kolayca PDF kırpma. %100 ücretsiz, gizli ve güvenli.",
  keywords: [
    "PDF Kırpma",
    "PDF Kesme",
    "PDF Crop",
    "PDF Sayfa Kırp",
    "PDF Alan Silme",
    "Ücretsiz PDF Kırpma",
    "PDFEditMobile",
  ],
  openGraph: {
    title: "PDF Kırpma | #1 Ücretsiz Online PDF Kırpma Aracı",
    description:
      "PDF sayfalarınızdaki istenmeyen alanları saniyeler içinde kırpın. Hızlı, ücretsiz ve %100 güvenli.",
    url: "https://pdfeditmobile.com/crop-pdf",
  },
};

export default function Page() {
  return <CropPDFClient />;
}