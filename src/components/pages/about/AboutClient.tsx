"use client";

"use client";

import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutSkills } from "@/components/sections/about/AboutSkills";
import { AboutPhilosophy } from "@/components/sections/about/AboutPhilosophy";
import { AboutConnect } from "@/components/sections/about/AboutConnect";
import { SimpleCTA } from "@/components/sections/common/SimpleCTA";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { useI18n } from "@/lib/i18n";

export default function AboutClient() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen overflow-hidden px-4 pt-32 pb-20">
      {/* Background Elements */}
      <BackgroundGradient />

      <div className="container mx-auto max-w-5xl">
        <AboutHero />
        <AboutSkills />
        <AboutPhilosophy />
        <AboutConnect />
        <SimpleCTA
          title={t("about_ready_title")}
          description={t("about_ready_desc")}
          primaryBtnText={t("about_ready_btn")}
          primaryBtnLink="/"
        />
      </div>
    </main>
  );
}
