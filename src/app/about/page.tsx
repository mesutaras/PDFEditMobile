import { Metadata } from "next";
import AboutClient from "@/components/pages/about/AboutClient";

export const metadata: Metadata = {
  title: "Hakkında | Mesut Aras - PDFEditMobile",
  description:
    "PDFEditMobile'ın yaratıcısı Mesut Aras ve onun kusursuz, etkileyici dijital gerçeklikler inşa etme misyonu hakkında daha fazla bilgi edinin.",
};

export default function AboutPage() {
  return <AboutClient />;
}
