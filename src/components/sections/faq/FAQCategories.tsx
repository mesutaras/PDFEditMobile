"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { useI18n } from "@/lib/i18n";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: React.ElementType;
  faqs: FAQItem[];
}

interface FAQCategoriesProps {
  filteredCategories: FAQCategory[];
  openItems: Set<string>;
  toggleItem: (key: string) => void;
}

export const FAQCategories = ({
  filteredCategories,
  openItems,
  toggleItem,
}: FAQCategoriesProps) => {
  const { t } = useI18n();

  if (filteredCategories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl bg-gray-50 py-16 text-center"
      >
        <Search className="mx-auto mb-4 h-12 w-12 text-gray-300" />
        <h3 className="mb-2 text-xl font-bold">{t("faq_no_results")}</h3>
        <p className="text-gray-500">{t("faq_no_results_hint")}</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {filteredCategories.map((category, catIndex) => (
        <motion.div
          key={category.title}
          id={category.title.toLowerCase().replace(/\s+/g, "-")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + catIndex * 0.05 }}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
        >
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
              <category.icon className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold">{t(category.title)}</h2>
            <span className="ml-auto text-sm text-gray-400">
              {category.faqs.length} {t("faq_questions_count")}
            </span>
          </div>
          <div className="px-6">
            {category.faqs.map((faq, faqIndex) => {
              const key = `${catIndex}-${faqIndex}`;
              return (
                <FAQAccordion
                  key={key}
                  item={faq}
                  isOpen={openItems.has(key)}
                  onToggle={() => toggleItem(key)}
                />
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};