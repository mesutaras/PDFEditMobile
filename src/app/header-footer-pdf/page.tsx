import { Metadata } from "next";
import { HeaderFooterPDFClient } from "@/components/pages/header-footer-pdf/HeaderFooterPDFClient";

export const metadata: Metadata = {
  title: "Add Header & Footer to PDF | Free Online PDF Header Footer Tool",
  description: "Add page numbers, titles, dates to PDF headers and footers free online. No sign up, 100% browser-based.",
  keywords: ["add header footer pdf", "pdf header footer", "add page numbers pdf", "pdf header tool"],
  openGraph: {
    title: "Add Header & Footer to PDF | Free Online Tool",
    description: "Add headers and footers to PDF free online. Browser-based, secure.",
    url: "https://pdfeditmobile.com/header-footer-pdf",
  },
};

export default function Page() {
  return <HeaderFooterPDFClient />;
}