import { Metadata } from "next";
import { GrayscalePDFClient } from "@/components/pages/grayscale-pdf/GrayscalePDFClient";

export const metadata: Metadata = {
  title: "Grayscale PDF - Convert Color PDF to Black & White Free",
  description: "Convert your colored PDF to grayscale/black and white free online. Reduce file size, save ink. No sign up, 100% browser-based.",
  keywords: ["grayscale pdf", "black and white pdf", "pdf to grayscale", "convert pdf to bw", "pdf grayscale converter"],
  openGraph: {
    title: "PDF Grayscale Converter | Free Online Tool",
    description: "Convert PDF to grayscale instantly. Free, browser-based, secure.",
    url: "https://pdfeditmobile.com/grayscale-pdf",
  },
};

export default function Page() {
  return <GrayscalePDFClient />;
}