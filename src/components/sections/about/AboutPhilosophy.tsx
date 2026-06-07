"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export const AboutPhilosophy = () => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative mb-20 overflow-hidden rounded-3xl bg-black px-8 py-12 text-center text-white"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="relative z-10">
        <h2 className="mb-4 text-2xl font-bold">{t("about_mission_title")}</h2>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-300">
          {t("about_mission_text")}
        </p>
      </div>
    </motion.div>
  );
};