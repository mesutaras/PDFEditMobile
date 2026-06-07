"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const AboutHero = () => {
  const { t } = useI18n();

  return (
    <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative order-2 lg:order-1"
      >
        <div className="relative mx-auto aspect-square w-full max-w-md">
          {/* Decorative elements */}
          <div className="rounded-5xl absolute -inset-4 -rotate-3 bg-linear-to-br from-gray-200 via-gray-100 to-white" />
          <div className="rounded-5xl absolute -inset-4 rotate-2 bg-linear-to-tr from-gray-100 via-white to-gray-50 opacity-80" />

          {/* Main photo container */}
          <div className="relative overflow-hidden rounded-4xl border-4 border-white shadow-2xl">
            <Image
              src="/arsh-verma.jpg"
              alt="Mesut Aras"
              width={500}
              height={500}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -right-4 -bottom-4 rounded-2xl bg-black px-5 py-3 text-white shadow-xl"
          >
            <p className="text-sm font-medium">{t("about_full_stack_creator")}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="order-1 lg:order-2"
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          {t("about_badge")}
        </span>

        <h1 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {t("about_title")} <span className="animate-text-shimmer">Mesut Aras</span>
        </h1>

        <p className="mb-6 text-lg leading-relaxed text-gray-600">
          {t("about_description_1")}
        </p>

        <p className="mb-8 leading-relaxed text-gray-500">
          {t("about_description_2")}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="https://pdfeditmobile.com/"
            target="_blank"
            className="btn-primary inline-flex items-center gap-2"
          >
            {t("about_view_portfolio")}
            <ExternalLink className="h-4 w-4" />
          </Link>
          <Link
            href="mailto:info@pdfeditmobile.com"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            {t("about_get_in_touch")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
