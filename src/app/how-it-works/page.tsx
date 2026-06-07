import { Metadata } from "next";
import HowItWorksClient from "@/components/pages/how-it-works/HowItWorksClient";

export const metadata: Metadata = {
  title: "Nasıl Çalışır | PDFEditMobile",
  description:
    "PDFEditMobile'ın dosyalarınızı tarayıcınızda yerel ve güvenli bir şekilde nasıl işlediğini öğrenin.",
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}