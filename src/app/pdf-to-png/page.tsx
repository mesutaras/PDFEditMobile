import { Metadata } from "next";
import { PDFToPNGClient } from "@/components/pages/pdf-to-png/PDFToPNGClient";

export const metadata: Metadata = {
  title: "PDF to PNG Converter | Free Online PDF to Image Tool",
  description: "Convert PDF pages to high-quality PNG images free online. No sign up, 100% browser-based. Extract every page as lossless PNG.",
  keywords: ["pdf to png", "convert pdf to png", "pdf to image", "pdf png converter", "free pdf to png"],
  openGraph: {
    title: "PDF to PNG Converter | #1 Free Online PDF to PNG Tool",
    description: "Convert PDF to PNG images instantly. Free, secure, browser-based.",
    url: "https://pdfeditmobile.com/pdf-to-png",
  },
};

export default function Page() {
  return <PDFToPNGClient />;
}