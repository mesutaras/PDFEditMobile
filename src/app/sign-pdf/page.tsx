import { Metadata } from "next";
import { SignPDFClient } from "@/components/pages/sign-pdf/SignPDFClient";

export const metadata: Metadata = {
  title: "PDF İmzala | Dijital İmza Ekleme Aracı",
  description:
    "Belgelerinizi profesyonel bir dijital imza ile güvenli bir şekilde imzalayın. Çizerek, yazarak veya yükleyerek imza oluşturun. %100 ücretsiz, gizli ve tarayıcıda işlenir.",
  keywords: [
    "PDF İmzala",
    "Dijital İmza",
    "PDF İmza Ekle",
    "Elektronik İmza",
    "Ücretsiz İmza Aracı",
    "PDFEditMobile",
  ],
  openGraph: {
    title: "PDF İmzala | #1 Ücretsiz Dijital İmza Aracı",
    description:
      "PDF'lerinizi saniyeler içinde imzalayın. Hızlı, ücretsiz ve %100 gizli.",
    url: "https://pdfeditmobile.vercel.app/sign-pdf",
  },
};

export default function Page() {
  return <SignPDFClient />;
}