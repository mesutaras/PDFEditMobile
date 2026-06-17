import { Metadata } from "next";
import { ResizePDFClient } from "@/components/pages/resize-pdf/ResizePDFClient";

export const metadata: Metadata = {
  title: "Resize PDF Pages | Free Online PDF Page Resizer",
  description: "Change PDF page size online free. Convert A4 to Letter, A3 to A4. No sign up, 100% browser-based.",
  keywords: ["resize pdf", "pdf page resizer", "a4 to letter pdf", "change pdf page size"],
  openGraph: {
    title: "Resize PDF Pages | Free Online Tool",
    description: "Change PDF page size free online. Browser-based, secure.",
    url: "https://pdfeditmobile.com/resize-pdf",
  },
};

export default function Page() {
  return <ResizePDFClient />;
}