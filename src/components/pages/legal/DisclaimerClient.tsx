"use client";

import { AlertCircle } from "lucide-react";
import { disclaimerSections } from "@/lib/legal-data";
import { LegalHeader } from "@/components/sections/legal/LegalHeader";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { useI18n } from "@/lib/i18n";

export default function DisclaimerClient() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen px-4 pt-32 pb-20">
      <BackgroundGradient />

      <div className="container mx-auto max-w-4xl">
        <LegalHeader
          title={t("legal_disclaimer_title")}
          description={t("legal_disclaimer_desc")}
          icon={AlertCircle}
        />

        <LegalContent sections={disclaimerSections} />
      </div>
    </main>
  );
}