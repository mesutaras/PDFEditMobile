import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://pdfeditmobile.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/history"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
