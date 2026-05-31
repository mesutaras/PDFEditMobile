"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthProvider";
import { HistoryProvider } from "@/context/HistoryContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <HistoryProvider>{children}</HistoryProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
