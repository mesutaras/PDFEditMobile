"use client";

import { LoadingOverlay } from "@/components/ui/Loader";
import { useI18n } from "@/lib/i18n";

export default function Loading() {
  const { t } = useI18n();
  return <LoadingOverlay text={t("loading_initializing")} />;
}
