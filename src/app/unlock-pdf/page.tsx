import { Metadata } from "next";
import { UnlockPDFClient } from "@/components/pages/unlock-pdf/UnlockPDFClient";

export const metadata: Metadata = {
  title: "PDF Kilit Aç | PDF Şifresini Ücretsiz Kaldır",
  description:
    "PDF dosyalarınızdaki şifre korumasını ve kısıtlamaları anında kaldırın. Yazdırma, kopyalama ve düzenleme kısıtlamalarını kolayca kaldırın. %100 ücretsiz, gizli ve güvenli.",
  keywords: [
    "PDF Kilit Aç",
    "PDF Şifre Kaldır",
    "PDF Koruma Kaldır",
    "Ücretsiz PDF Kilit Açıcı",
    "PDFEditMobile",
  ],
  openGraph: {
    title: "PDF Kilit Aç | #1 Ücretsiz PDF Kilit Açma Aracı",
    description:
      "Korumalı PDF'lerinizin kilidini saniyeler içinde açın. Hızlı, ücretsiz ve güvenli.",
    url: "https://pdfeditmobile.vercel.app/unlock-pdf",
  },
};

export default function Page() {
  return <UnlockPDFClient />;
}