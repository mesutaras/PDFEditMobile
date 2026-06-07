"use client";

import { Scale } from "lucide-react";
import { getLegalData } from "@/lib/legal-data";
import { LegalHeader } from "@/components/sections/legal/LegalHeader";
import { TermsSummary } from "@/components/sections/legal/TermsSummary";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { SimpleCTA } from "@/components/sections/common/SimpleCTA";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { useI18n } from "@/lib/i18n";

export default function TermsClient() {
  const { t, lang } = useI18n();
  const legalData = getLegalData(lang);

  return (
    <main className="min-h-screen px-4 pt-32 pb-20">
      <BackgroundGradient />

      <div className="container mx-auto max-w-4xl">
        <LegalHeader
          title={t("legal_terms_title")}
          description={t("legal_terms_desc")}
          lastUpdated="22 Aralık 2024"
          icon={Scale}
        />

        <TermsSummary />

        <LegalContent sections={legalData.termsSections} />

        <SimpleCTA
          title={t("legal_terms_questions")}
          description={t("legal_terms_questions_desc")}
          primaryBtnText={t("legal_contact_us")}
          primaryBtnLink="/contact"
          secondaryBtnText={t("legal_privacy_policy")}
          secondaryBtnLink="/privacy"
        />
      </div>
    </main>
  );
}