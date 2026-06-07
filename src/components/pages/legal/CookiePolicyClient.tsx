"use client";

import { Cookie } from "lucide-react";
import { cookieSections } from "@/lib/legal-data";
import { LegalHeader } from "@/components/sections/legal/LegalHeader";
import { LegalContent } from "@/components/sections/legal/LegalContent";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { useI18n } from "@/lib/i18n";

export default function CookiePolicyClient() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen px-4 pt-32 pb-20">
      <BackgroundGradient />

      <div className="container mx-auto max-w-4xl">
        <LegalHeader
          title={t("legal_cookie_title")}
          description={t("legal_cookie_desc")}
          icon={Cookie}
        />

        <LegalContent sections={cookieSections} />
      </div>
    </main>
  );
}