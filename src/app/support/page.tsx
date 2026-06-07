import { Metadata } from "next";
import SupportClient from "@/components/pages/support/SupportClient";

export const metadata: Metadata = {
  title: "Destek | PDFEditMobile",
  description:
    "PDFEditMobile ile ilgili yardım alın. Ekibimizle iletişime geçin, SSS'leri görüntüleyin veya dokümantasyonumuza göz atın.",
};

export default function SupportPage() {
  return <SupportClient />;
}