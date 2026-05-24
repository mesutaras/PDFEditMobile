import { Metadata } from "next";
import TermsClient from "@/components/pages/legal/TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | PDFEditMobile",
  description:
    "Read the Terms of Service for using PDFEditMobile's free online PDF tools.",
};

export default function TermsPage() {
  return <TermsClient />;
}
