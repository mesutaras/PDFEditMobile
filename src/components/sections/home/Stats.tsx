"use client";

import { stats } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";

export const Stats = () => {
  const { t } = useI18n();

  return (
    <section className="border-y border-gray-100 bg-gray-50/50 py-16">
      <div className="container mx-auto px-4">
        <div className="stagger-up grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center">
              <div className="mb-3 text-5xl font-black tracking-tighter text-black transition-transform duration-500 group-hover:scale-110 md:text-7xl">
                {t(stat.valueKey)}
              </div>
              <div className="whitespace-nowrap text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase md:text-xs">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};