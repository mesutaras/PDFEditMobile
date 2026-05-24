import { Metadata } from "next";
import CookiePolicyClient from "@/components/pages/legal/CookiePolicyClient";

export const metadata: Metadata = {
  title: "Cookie Policy | PDFEditMobile",
  description:
    "Understand how PDFEditMobile uses cookies to improve your experience and deliver personalized content.",
};

export default function CookiePolicyPage() {
  return <CookiePolicyClient />;
}
