"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SignInModal from "@/components/auth/SignInModal";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import { useI18n } from "@/lib/i18n";
import {
  Merge, Split, Minimize2, RotateCw, FileImage, Lock, Unlock,
  Layers, Stamp, FileSignature, Type, ScanLine, FileText, FileUp,
  FileDown, ChevronDown, History, LogOut, User, Wrench, LogIn,
  PlusCircle, Globe, BookOpen, ImagePlus,
  Table as TableIcon, Presentation,
  Scissors, Trash2, GripVertical, Copy,
} from "lucide-react";

const headerTools = [
  { key: "header_merge", icon: Merge, href: "/merge-pdf" },
  { key: "header_split", icon: Split, href: "/split-pdf" },
  { key: "header_compress", icon: Minimize2, href: "/compress-pdf" },
  { key: "header_extract", icon: Scissors, href: "/extract-pages" },
  { key: "header_delete", icon: Trash2, href: "/delete-pages" },
  { key: "header_reorder", icon: GripVertical, href: "/reorder-pages" },
  { key: "header_rotate", icon: RotateCw, href: "/rotate-pdf" },
  { key: "header_duplicate", icon: Copy, href: "/duplicate-pages" },
  { key: "header_insert", icon: PlusCircle, href: "/insert-pages" },
  { key: "header_jpg_to_pdf", icon: ImagePlus, href: "/jpg-to-pdf" },
  { key: "header_pdf_to_jpg", icon: FileImage, href: "/pdf-to-jpg" },
  { key: "header_word_to_pdf", icon: FileUp, href: "/word-to-pdf" },
  { key: "header_pdf_to_word", icon: FileText, href: "/pdf-to-word" },
  { key: "header_excel_to_pdf", icon: TableIcon, href: "/excel-to-pdf" },
  { key: "header_pdf_to_excel", icon: FileDown, href: "/pdf-to-excel" },
  { key: "header_ppt_to_pdf", icon: Presentation, href: "/powerpoint-to-pdf" },
  { key: "header_pdf_to_ppt", icon: Presentation, href: "/pdf-to-powerpoint" },
  { key: "header_web_to_pdf", icon: Globe, href: "/html-to-pdf" },
  { key: "header_pdf_to_html", icon: Globe, href: "/pdf-to-html" },
  { key: "header_text_to_pdf", icon: FileText, href: "/text-to-pdf" },
  { key: "header_pdf_to_text", icon: FileText, href: "/pdf-to-text" },
  { key: "header_epub_to_pdf", icon: BookOpen, href: "/epub-to-pdf" },
  { key: "header_pdf_to_epub", icon: BookOpen, href: "/pdf-to-epub" },
  { key: "header_unlock", icon: Unlock, href: "/unlock-pdf" },
  { key: "header_protect", icon: Lock, href: "/protect-pdf" },
  { key: "header_organize", icon: Layers, href: "/organize-pdf" },
  { key: "header_watermark", icon: Stamp, href: "/watermark-pdf" },
  { key: "header_sign", icon: FileSignature, href: "/sign-pdf" },
  { key: "header_edit", icon: Type, href: "/edit-pdf" },
  { key: "header_ocr", icon: ScanLine, href: "/ocr-pdf" },
  { key: "header_repair", icon: Wrench, href: "/repair-pdf" },
  { key: "header_metadata", icon: FileText, href: "/edit-metadata" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout, isLoading } = useAuth();
  const { t, lang, setLang } = useI18n();

  // 📖 Öğrenme Notu: t() hook'u sadece bileşen içinde çalışır.
  // Bu yüzden tools dizisini dışarıda key ile tanımlayıp,
  // içeride useMemo ile t() uyguluyoruz.
  const tools = useMemo(() => headerTools.map((tDef) => ({
    ...tDef,
    title: t(tDef.key),
  })), [t]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled ? "border-b border-gray-100 bg-white/80 shadow-sm backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative h-10 w-10 transition-transform group-hover:scale-110 group-hover:rotate-3">
              <Image src="/logo.png" alt="PDFEditMobile Logo" fill className="rounded-xl object-contain" priority />
            </div>
            <span className="text-xl font-bold tracking-tight">
              PDFEdit<span className="text-gray-400">Mobile</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <div className="relative" onMouseEnter={() => setShowTools(true)} onMouseLeave={() => setShowTools(false)}>
              <button className="underline-hover flex items-center gap-1 py-2 font-medium text-gray-700 transition-colors hover:text-black">
                {t("nav_all_tools")}
                <ChevronDown className={`h-4 w-4 transition-transform ${showTools ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showTools && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                  >
                    <div className="grid w-[640px] grid-cols-3 gap-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl">
                      {tools.map((tool) => (
                        <Link key={tool.key} href={tool.href} className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition-all group-hover:bg-black group-hover:text-white">
                            <tool.icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium">{tool.title}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/merge-pdf" className="underline-hover font-medium text-gray-700 transition-colors hover:text-black">{t("nav_merge")}</Link>
            <Link href="/split-pdf" className="underline-hover font-medium text-gray-700 transition-colors hover:text-black">{t("nav_split")}</Link>
            <Link href="/compress-pdf" className="underline-hover font-medium text-gray-700 transition-colors hover:text-black">{t("nav_compress")}</Link>
            <Link href="/about" className="underline-hover font-medium text-gray-700 transition-colors hover:text-black">{t("nav_about")}</Link>
            <Link href="/blog" className="underline-hover font-medium text-gray-700 transition-colors hover:text-black">{t("nav_blog")}</Link>
          </div>

          {/* Language + Auth */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => setLang(lang === "tr" ? "en" : "tr")}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-black hover:text-black hover:shadow-md"
            >
              <span className="text-base">{lang === "tr" ? "🇬🇧" : "🇹🇷"}</span>
              <span>{lang === "tr" ? "EN" : "TR"}</span>
            </button>

            {isLoading ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-gray-100" />
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-gray-100">
                  {user.picture ? (
                    <div className="relative h-9 w-9">
                      <Image src={user.picture} alt={user.name ?? ""} fill className="rounded-full border-2 border-gray-200 object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                  <div className="hidden text-left xl:block">
                    <p className="line-clamp-1 text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="line-clamp-1 text-xs text-gray-500">{user.email}</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
                    >
                      <div className="border-b border-gray-100 p-3">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="truncate text-xs text-gray-500">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <Link href="/history" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50">
                          <History className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{t("nav_my_history")}</span>
                        </Link>
                        <button
                          onClick={() => { logout(); setShowUserMenu(false); }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-red-600 transition-colors hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">{t("nav_sign_out")}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="group flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                {t("nav_sign_in")}
              </button>
            )}
          </div>

          {/* Mobile Language + Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setLang(lang === "tr" ? "en" : "tr")}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-black hover:text-black hover:shadow-md"
            >
              <span className="text-base">{lang === "tr" ? "🇬🇧" : "🇹🇷"}</span>
              <span>{lang === "tr" ? "EN" : "TR"}</span>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="rounded-xl p-2 transition-colors hover:bg-gray-100">
              <div className="relative h-6 w-6">
                <span className={`absolute left-0 h-0.5 w-6 bg-black transition-all duration-300 ${isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"}`} />
                <span className={`absolute top-1/2 left-0 h-0.5 w-6 -translate-y-1/2 bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 h-0.5 w-6 bg-black transition-all duration-300 ${isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1"}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="mb-6 border-b border-gray-100 pb-6">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {user.picture ? (
                        <div className="relative h-10 w-10">
                          <Image src={user.picture} alt={user.name ?? ""} fill className="rounded-full border-2 border-gray-200 object-cover" unoptimized />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50">
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setIsMenuOpen(false); setShowSignInModal(true); }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
                  >
                    <LogIn className="h-5 w-5" />
                    {t("nav_sign_in_with_google")}
                  </button>
                )}
              </div>
              {user && (
                <Link href="/history" onClick={() => setIsMenuOpen(false)} className="mb-4 flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                  <History className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">{t("nav_my_history")}</span>
                </Link>
              )}
              <div className="grid grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <Link key={tool.key} href={tool.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                    <tool.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{tool.title}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/merge-pdf" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full justify-center">
                  {t("nav_get_started")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SignInModal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)} />
    </header>
  );
}