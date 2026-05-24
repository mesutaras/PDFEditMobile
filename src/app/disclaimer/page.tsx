import { Metadata } from "next";
import DisclaimerClient from "@/components/pages/legal/DisclaimerClient";

export const metadata: Metadata = {
  title: "Disclaimer | PDFEditMobile",
  description:
    "Read the disclaimer for PDFEditMobile. We provide our tools as-is and are not liable for any damages.",
};

export default function DisclaimerPage() {
  return <DisclaimerClient />;
}
