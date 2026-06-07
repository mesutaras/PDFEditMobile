import { Metadata } from "next";
import FeaturesClient from "@/components/pages/features/FeaturesClient";

export const metadata: Metadata = {
  title: "Özellikler | PDFEditMobile",
  description:
    "PDFEditMobile'ın güçlü özelliklerini keşfedin. Hızlı, güvenli ve ücretsiz çevrimiçi PDF araçları.",
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}