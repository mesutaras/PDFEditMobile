"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Shield,
  Globe,
  ArrowLeft,
  Merge,
  Split,
  Minimize2,
  FileImage,
  Lock,
  Type,
} from "lucide-react";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { useI18n } from "@/lib/i18n";

export default function FeaturesClient() {
  const { t } = useI18n();

  const mainFeatures = [
    { icon: Zap, titleKey: "features_lightning_fast", descKey: "features_lightning_fast_desc" },
    { icon: Shield, titleKey: "features_secure", descKey: "features_secure_desc" },
    { icon: Globe, titleKey: "features_works_anywhere", descKey: "features_works_anywhere_desc" },
  ];

  const toolFeatures = [
    { icon: Merge, titleKey: "features_merge_title", descKey: "features_merge_desc" },
    { icon: Split, titleKey: "features_split_title_feat", descKey: "features_split_desc_feat" },
    { icon: Minimize2, titleKey: "features_compress_title_feat", descKey: "features_compress_desc_feat" },
    { icon: FileImage, titleKey: "features_pdf_to_image", descKey: "features_pdf_to_image_desc" },
    { icon: Lock, titleKey: "features_protect_unlock", descKey: "features_protect_unlock_desc" },
    { icon: Type, titleKey: "features_edit_pdf_feat", descKey: "features_edit_pdf_desc_feat" },
  ];

  return (
    <main className="min-h-screen px-4 pt-32 pb-20">
      <BackgroundGradient />

      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("features_back_home")}
          </Link>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl whitespace-pre-line">
            {t("features_page_title")}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-500">
            {t("features_page_subtitle")}
          </p>
        </motion.div>

        {/* Core Benefits */}
        <div className="mb-24 grid gap-8 md:grid-cols-3">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="rounded-3xl border border-white bg-white/50 p-8 backdrop-blur-sm transition-all hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{t(feature.titleKey)}</h3>
              <p className="text-gray-600">{t(feature.descKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* Tools Detailed */}
        <div className="relative overflow-hidden rounded-[3rem] bg-gray-950 p-12 text-white md:p-20">
          <div className="grid-pattern absolute inset-0 opacity-10" />

          <div className="relative z-10 mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              {t("features_complete_toolkit")}
            </h2>
            <p className="text-gray-400">
              {t("features_toolkit_desc")}
            </p>
          </div>

          <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {toolFeatures.map((tool) => (
              <div
                key={tool.titleKey}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                  <tool.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{t(tool.titleKey)}</h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {t(tool.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}