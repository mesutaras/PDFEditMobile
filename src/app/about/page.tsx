import { Metadata } from "next";
import AboutClient from "@/components/pages/about/AboutClient";

export const metadata: Metadata = {
  title: "Hakkımızda | PDFEditMobile",
  description:
    "PDFEditMobile hakkında bilgi edinin. Ücretsiz, gizli ve hızlı PDF araçları sunuyoruz.",
};

export default function AboutPage() {
  return <AboutClient />;
}