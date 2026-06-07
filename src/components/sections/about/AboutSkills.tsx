"use client";

import { motion } from "framer-motion";
import { Gamepad2, Globe, Code2, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const skillKeys = [
  { key: "about_skill_game", detailKey: "about_skill_game_detail", icon: Gamepad2 },
  { key: "about_skill_web", detailKey: "about_skill_web_detail", icon: Globe },
  { key: "about_skill_app", detailKey: "about_skill_app_detail", icon: Code2 },
  { key: "about_skill_design", detailKey: "about_skill_design_detail", icon: Sparkles },
];

export const AboutSkills = () => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-20"
    >
      <h2 className="mb-8 text-center text-2xl font-bold">{t("about_what_i_do")}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {skillKeys.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-gray-200 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition-all group-hover:bg-black group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-semibold">{t(skill.key)}</h3>
              <p className="text-sm text-gray-500">{t(skill.detailKey)}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};