"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const FAQHeader = () => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 text-center"
    >
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("faq_back_home")}
      </Link>

      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-black text-white">
        <HelpCircle className="h-10 w-10" />
      </div>
      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
        {t("faq_heading")}
      </h1>
      <p className="mx-auto max-w-2xl text-lg text-gray-500">
        {t("faq_subtitle")}
      </p>
    </motion.div>
  );
};