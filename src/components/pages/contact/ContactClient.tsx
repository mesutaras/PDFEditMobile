"use client";

import { ContactHeader } from "@/components/sections/contact/ContactHeader";
import { ContactMethods } from "@/components/sections/contact/ContactMethods";
import { ContactFAQ } from "@/components/sections/contact/ContactFAQ";
import { SimpleCTA } from "@/components/sections/common/SimpleCTA";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { useI18n } from "@/lib/i18n";

export default function ContactClient() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen overflow-hidden px-4 pt-32 pb-20">
      <BackgroundGradient />

      <div className="container mx-auto max-w-5xl">
        <ContactHeader />
        <div className="mx-auto max-w-2xl">
          <ContactMethods />
        </div>
        <ContactFAQ />
        <SimpleCTA
          title={t("contact_need_help")}
          description={t("contact_need_help_desc")}
          primaryBtnText={t("contact_visit_faq")}
          primaryBtnLink="/faq"
          className="bg-black text-white"
          primaryBtnClass="bg-white text-black font-semibold py-3 px-8 rounded-full border-2 border-white hover:bg-gray-100 transition-colors"
        />
      </div>
    </main>
  );
}