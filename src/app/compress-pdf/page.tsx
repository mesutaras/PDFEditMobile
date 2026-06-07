import { Metadata } from "next";
import { CompressPDFClient } from "@/components/pages/compress-pdf/CompressPDFClient";

export const metadata: Metadata = {
  title: "PDF Sıkıştır | PDF Dosya Boyutunu Ücretsiz Küçült",
  description:
    "PDF dosyalarınızı kaliteden ödün vermeden küçültün. Çevrimiçi sıkıştırıcımız, daha kolay paylaşım ve depolama için dosya boyutunu önemli ölçüde azaltır. %100 ücretsiz ve gizli.",
  keywords: [
    "PDF Sıkıştır",
    "PDF Boyutu Azalt",
    "PDF Küçült",
    "Küçük PDF",
    "Ücretsiz Çevrimiçi Sıkıştırıcı",
    "PDFEditMobile",
  ],
  openGraph: {
    title: "PDF Sıkıştır | #1 Ücretsiz PDF Sıkıştırıcı",
    description:
      "En yüksek kaliteyi korurken PDF'lerinizin boyutunu azaltın. Ücretsiz ve güvenli.",
    url: "https://pdfeditmobile.vercel.app/compress-pdf",
  },
};

export default function Page() {
  return <CompressPDFClient />;
}