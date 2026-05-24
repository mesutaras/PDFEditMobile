import { Metadata } from "next";
import FAQClient from "@/components/pages/faq/FAQClient";

export const metadata: Metadata = {
  title: "FAQ | PDFEditMobile",
  description:
    "Get answers to frequently asked questions about PDFEditMobile tools, privacy, security, and more.",
};

export default function FAQPage() {
  return <FAQClient />;
}
