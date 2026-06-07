"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const AboutConnect = () => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="mb-8 text-center text-2xl font-bold">
        {t("about_connect_title")}
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-center text-gray-500">
        {t("about_connect_text")}
      </p>
      <div className="mx-auto max-w-sm">
        <motion.a
          href="mailto:info@pdfeditmobile.com"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-transform group-hover:scale-110 group-hover:bg-red-100">
            <Mail className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium">{t("about_contact_email")}</p>
            <p className="truncate text-sm text-gray-500">info@pdfeditmobile.com</p>
          </div>
          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-current" />
        </motion.a>
      </div>
    </motion.div>
  );
};