import { MetadataRoute } from "next";
import { getBlogSlugs, getBlogPost } from "@/lib/blog";
import { getAllLandingSlugs } from "@/lib/landing-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pdfeditmobile.com";

  // 1. Core Pages (Highest Priority due to navigation importance)
  const corePages = [
    "", // Homepage
  ];

  // 2. Information Pages (High Priority for trust)
  const infoPages = [
    "about",
    "contact",
    "faq",
    "privacy",
    "terms",
    "changelog",
    "cookie-policy",
    "disclaimer",
    "features",
    "how-it-works",
    "support",
    "all-tools",
  ];

  // 3. All PDF Tools (High Priority - Main Logic)
  // Ordered alphabetically or by importance
  const tools = [
    "crop-pdf",
    "compress-pdf",
    "delete-pages",
    "duplicate-pages",
    "edit-metadata",
    "edit-pdf",
    "epub-to-pdf",
    "excel-to-pdf",
    "extract-pages",
    "html-to-pdf",
    "images-to-pdf",
    "insert-pages",
    "jpg-to-pdf",
    "merge-pdf",
    "ocr-pdf",
    "organize-pdf",
    "pdf-to-epub",
    "pdf-to-excel",
    "pdf-to-html",
    "pdf-to-images",
    "pdf-to-jpg",
    "pdf-to-powerpoint",
    "pdf-to-text",
    "pdf-to-word",
    "powerpoint-to-pdf",
    "protect-pdf",
    "reorder-pages",
    "repair-pdf",
    "rotate-pdf",
    "sign-pdf",
    "split-pdf",
    "text-to-pdf",
    "unlock-pdf",
    "watermark-pdf",
    "word-to-pdf",
  ];

  const routes: MetadataRoute.Sitemap = [
    // Core Pages
    ...corePages.map((page) => ({
      url: `${baseUrl}${page ? `/${page}` : ""}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    })),
    // Info Pages
    ...infoPages.map((page) => ({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Tools
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Blog Index
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    // Blog Posts
    ...getBlogSlugs("tr").map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getBlogSlugs("en").map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Landing Pages
    ...getAllLandingSlugs().map((slug) => ({
      url: `${baseUrl}/landing/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  return routes;
}
