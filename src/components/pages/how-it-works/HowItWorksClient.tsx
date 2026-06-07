"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HelpCircle,
  ArrowLeft,
  Shield,
  Cpu,
  Zap,
  CloudOff,
  FileCheck,
} from "lucide-react";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { useI18n } from "@/lib/i18n";

export default function HowItWorksClient() {
  const { t } = useI18n();

  const steps = [
    {
      icon: Cpu,
      title: "1. " + t("how_step1_title"),
      description: t("how_step1_desc"),
    },
    {
      icon: CloudOff,
      title: "2. " + t("how_step2_title"),
      description: t("how_step2_desc"),
    },
    {
      icon: Zap,
      title: "3. " + t("how_step3_title"),
      description: t("how_step3_desc"),
    },
    {
      icon: FileCheck,
      title: "4. " + t("how_step4_title"),
      description: t("how_step4_desc"),
    },
  ];

  return (
    <main className="min-h-screen px-4 pt-32 pb-20">
      <BackgroundGradient />

      <div className="container mx-auto max-w-4xl">
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
            {t("common_back_home")}
          </Link>

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-black text-white">
            <HelpCircle className="h-10 w-10" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            {t("how_title")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            {t("how_subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-gray-200 hover:shadow-lg"
            >
              <div className="flex flex-col items-start gap-6 md:flex-row">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-white">
                  <step.icon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="mb-3 text-2xl font-bold">{step.title}</h2>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-[3rem] border border-green-100 bg-green-50 p-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500 text-white">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-green-900">
            {t("how_highlight_title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-green-800">
            {t("how_highlight_desc")}
          </p>
        </motion.div>
      </div>
    </main>
  );
}