"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export const AboutHero = () => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-20 text-center"
    >
      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-black shadow-xl">
        <Image
          src="/logo.png"
          alt="PDFEditMobile"
          width={56}
          height={56}
          className="rounded-xl bg-white object-contain"
          priority
        />
      </div>

      <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
        {t("about_title")}
      </h1>

      <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500">
        {t("about_subtitle")}
      </p>
    </motion.div>
  );
};