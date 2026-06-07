"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthProvider";
import { HistoryProvider } from "@/context/HistoryContext";
import { I18nProvider } from "@/lib/i18n";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <HistoryProvider>
          <I18nProvider>{children}</I18nProvider>
        </HistoryProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
