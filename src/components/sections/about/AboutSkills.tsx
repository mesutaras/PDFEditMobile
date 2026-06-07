"use client";

import { motion } from "framer-motion";
import { Zap, Shield, HeartHandshake } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const values = [
  { key: "about_value_free_title", descKey: "about_value_free_desc", icon: HeartHandshake },
  { key: "about_value_privacy_title", descKey: "about_value_privacy_desc", icon: Shield },
  { key: "about_value_fast_title", descKey: "about_value_fast_desc", icon: Zap },
];

export const AboutSkills = () => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-20"
    >
      <h2 className="mb-10 text-center text-2xl font-bold">{t("about_values_title")}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <motion.div
              key={value.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="group rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all duration-300 hover:border-gray-200 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition-all group-hover:bg-black group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold">{t(value.key)}</h3>
              <p className="text-sm text-gray-500">{t(value.descKey)}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};