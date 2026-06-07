"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const socials = [
  { icon: Twitter, href: "", label: "Twitter" },
  { icon: Github, href: "", label: "GitHub" },
  { icon: Linkedin, href: "", label: "LinkedIn" },
];

const footerLinks = {
  product: [
    { key: "footer_features", href: "/features" },
    { key: "footer_how_it_works", href: "/how-it-works" },
  ],
  legal: [
    { key: "footer_privacy", href: "/privacy" },
    { key: "footer_terms", href: "/terms" },
    { key: "footer_disclaimer", href: "/disclaimer" },
    { key: "footer_cookie_policy", href: "/cookie-policy" },
  ],
  company: [
    { key: "footer_about", href: "/about" },
    { key: "footer_contact", href: "/contact" },
    { key: "footer_support", href: "/support" },
    { key: "footer_faq", href: "/faq" },
    { key: "footer_changelog", href: "/changelog" },
    { key: "footer_sitemap", href: "/all-tools" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="group mb-6 flex items-center gap-2">
              <div className="relative h-10 w-10 transition-transform group-hover:scale-110 group-hover:rotate-3">
                <Image
                  src="/logo.png"
                  alt="PDFEditMobile Logo"
                  fill
                  className="rounded-xl bg-white object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                PDFEdit<span className="text-gray-400">Mobile</span>
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              {t("footer_tagline")}
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
              {t("footer_product")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {t(item.key)}
                    <ArrowUpRight className="h-3 w-3 translate-x-1 -translate-y-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
              {t("footer_legal")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-wider text-gray-400 uppercase">
              {t("footer_company")}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="mb-3 text-sm font-semibold">{t("footer_stay_updated")}</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t("footer_email_placeholder")}
                  className="flex-1 rounded-l-lg border border-white/10 bg-white/10 px-4 py-2.5 text-sm transition-colors focus:border-white/30 focus:outline-none"
                />
                <button className="rounded-r-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-200">
                  {t("footer_subscribe")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center gap-6 text-sm text-gray-400 md:flex-row md:gap-12">
            <div className="flex items-center gap-6">
              <span>© {currentYear} {t("footer_copyright")}</span>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
            <div className="text-center">
              <p className="text-sm tracking-wide text-gray-500">
                Built with{" "}
                <span className="inline-block animate-pulse text-rose-500">❤️</span>{" "}
                by <span className="ml-1 font-black text-white">Mesut Aras</span>
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs font-medium md:text-sm">
                {t("footer_processing")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}