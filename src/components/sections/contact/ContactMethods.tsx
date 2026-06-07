"use client";

import { motion } from "framer-motion";
import { Clock, Mail, Twitter, Linkedin, Github, LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const contactMethods = [
  { name: "Email", nameKey: "contact_email", descKey: "contact_email_desc", value: "info@pdfeditmobile.com", href: "mailto:info@pdfeditmobile.com", icon: Mail, color: "hover:bg-red-50 hover:border-red-200" },
  { name: "X (Twitter)", nameKey: "contact_twitter", descKey: "contact_twitter_desc", value: "@TheArshVerma", href: "https://x.com/", icon: Twitter, color: "hover:bg-gray-100 hover:border-gray-300" },
  { name: "LinkedIn", nameKey: "contact_linkedin", descKey: "contact_linkedin_desc", value: "linkedin.com/in/", href: "https://www.linkedin.com/in//", icon: Linkedin, color: "hover:bg-blue-50 hover:border-blue-200" },
  { name: "GitHub", nameKey: "contact_github", descKey: "contact_github_desc", value: "github.com/", href: "https://github.com/", icon: Github, color: "hover:bg-gray-100 hover:border-gray-300" },
];

export const ContactMethods = () => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="mb-6 text-2xl font-bold">{t("contact_reach_out")}</h2>
      <div className="space-y-4">
        {contactMethods.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.a
              key={method.name}
              href={method.href}
              target={method.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className={`group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 ${method.color}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition-transform group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{t(method.nameKey)}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400">
                    {t(method.descKey)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{method.value}</p>
              </div>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 rounded-2xl bg-gray-50 p-5"
      >
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-5 w-5 text-gray-400" />
          <div>
            <h3 className="mb-1 font-semibold">{t("contact_response_time")}</h3>
            <p className="text-sm text-gray-500">{t("contact_response_time_desc")}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};