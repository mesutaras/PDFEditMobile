"use client";

import { Shield, Mail } from "lucide-react";
import { privacySections } from "@/lib/legal-data";
import { LegalHeader } from "@/components/sections/legal/LegalHeader";
import { PrivacyHighlights } from "@/components/sections/legal/PrivacyHighlights";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { SimpleCTA } from "@/components/sections/common/SimpleCTA";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { useI18n } from "@/lib/i18n";

export default function PrivacyClient() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen px-4 pt-32 pb-20">
      <BackgroundGradient />

      <div className="container mx-auto max-w-4xl">
        <LegalHeader
          title={t("legal_privacy_title")}
          description={t("legal_privacy_desc")}
          lastUpdated="December 22, 2024"
          icon={Shield}
        />

        <PrivacyHighlights />

        <LegalContent sections={privacySections} />

        <SimpleCTA
          title={t("legal_privacy_questions")}
          description={t("legal_privacy_questions_desc")}
          primaryBtnText={t("legal_contact_us")}
          primaryBtnLink="/contact"
          primaryBtnIcon={Mail}
        />
      </div>
    </main>
  );
}