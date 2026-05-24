import { Metadata } from "next";
import AboutClient from "@/components/pages/about/AboutClient";

export const metadata: Metadata = {
  title: "About | Arsh Verma - PDFEditMobile",
  description:
    "Learn more about Arsh Verma, the creator of PDFEditMobile, and his mission to build polished, engaging digital realities.",
};

export default function AboutPage() {
  return <AboutClient />;
}
