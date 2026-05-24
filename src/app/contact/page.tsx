import { Metadata } from "next";
import ContactClient from "@/components/pages/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | PDFEditMobile",
  description:
    "Get in touch with the PDFEditMobile team. Have a question, feedback, or need support? We're here to help.",
};

export default function ContactPage() {
  return <ContactClient />;
}
