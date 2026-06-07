"use client";

import { useState } from "react";
import { faqCategories } from "@/lib/constants";
import { FAQHeader } from "@/components/sections/faq/FAQHeader";
import { FAQSearch } from "@/components/sections/faq/FAQSearch";
import { FAQQuickLinks } from "@/components/sections/faq/FAQQuickLinks";
import { FAQCategories } from "@/components/sections/faq/FAQCategories";
import { SimpleCTA } from "@/components/sections/common/SimpleCTA";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { useI18n } from "@/lib/i18n";

export default function FAQClient() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useI18n();

  const toggleItem = (key: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <main className="min-h-screen px-4 pt-32 pb-20">
      <BackgroundGradient />
      <div className="container mx-auto max-w-4xl">
        <FAQHeader />
        <FAQSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FAQQuickLinks />
        <FAQCategories
          filteredCategories={filteredCategories}
          openItems={openItems}
          toggleItem={toggleItem}
        />
        <SimpleCTA
          title={t("faq_still_questions")}
          description={t("faq_still_questions_desc")}
          primaryBtnText={t("faq_contact_us")}
          primaryBtnLink="/contact"
          secondaryBtnText={t("faq_explore_tools")}
          secondaryBtnLink="/"
        />
      </div>
    </main>
  );
}