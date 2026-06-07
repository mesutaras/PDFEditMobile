"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const CTA = () => {
  const { t } = useI18n();

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="scroll-reveal-scale relative mx-auto max-w-4xl overflow-hidden rounded-[3rem] bg-gray-50 p-12 text-center md:p-20">
          <div className="grid-pattern absolute inset-0 opacity-50" />
          <div className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-200 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">
              {t("cta_heading")}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg font-medium text-gray-500">
              {t("cta_subtitle")}{" "}
              <span className="font-bold text-black">
                info@pdfeditmobile.com
              </span>
            </p>
            <a
              href={`mailto:info@pdfeditmobile.com?subject=${encodeURIComponent(t("cta_mailto_subject"))}`}
              className="btn-primary inline-flex items-center gap-2 px-12 py-5 text-lg"
            >
              {t("cta_button")}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};