"use client";

import { useCallback, useMemo, createContext, useContext, useState, useEffect, type ReactNode } from "react";
import enMessages from "../../messages/en.json";
import trMessages from "../../messages/tr.json";

type Language = "en" | "tr";
type Messages = Record<string, string>;

const messagesMap: Record<Language, Messages> = {
  en: enMessages,
  tr: trMessages,
};

function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("tr")) return "tr";
  return "en";
}

function getStoredLanguage(): Language {
  if (typeof localStorage === "undefined") return "en";
  const stored = localStorage.getItem("lang") as Language | null;
  if (stored === "tr" || stored === "en") return stored;
  return "en";
}

// ---------- Context ----------

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  tList: <T extends { [k: string]: unknown }>(list: T[], keyField: string) => T[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const stored = getStoredLanguage();
    if (stored !== "en") {
      setLangState(stored);
    } else {
      const detected = detectBrowserLanguage();
      setLangState(detected);
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const messages = messagesMap[lang];
      if (key in messages) return messages[key];
      // English fallback
      if (lang !== "en" && key in messagesMap.en) return messagesMap.en[key];
      return fallback ?? key;
    },
    [lang],
  );

  const tList = useCallback(
    <T extends { [k: string]: unknown }>(list: T[], keyField: string): T[] => {
      const messages = messagesMap[lang];
      return list.map((item) => {
        const keyValue = item[keyField] as string | undefined;
        if (!keyValue) return item;
        const translated =
          messages[keyValue] ?? (lang !== "en" ? messagesMap.en[keyValue] : undefined);
        if (!translated) return item;
        return { ...item, [keyField]: translated };
      });
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t, tList }), [lang, setLang, t, tList]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

// Standalone (non-React) helper — uses stored language
export function getLang(): Language {
  return getStoredLanguage() === "tr" ? "tr" : "en";
}

export function tStatic(key: string, fallback?: string): string {
  const lang = getLang();
  const messages = messagesMap[lang];
  if (key in messages) return messages[key];
  if (lang !== "en" && key in messagesMap.en) return messagesMap.en[key];
  return fallback ?? key;
}