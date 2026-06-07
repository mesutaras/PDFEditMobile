import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image?: string;
  readingTime: number;
  lang: "tr" | "en";
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = join(process.cwd(), "content", "blog");

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/g).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function getBlogSlugs(lang: "tr" | "en"): string[] {
  const dir = join(BLOG_DIR, lang);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f: string) => f.endsWith(".md"))
    .map((f: string) => f.replace(/\.md$/, ""));
}

export function getBlogPost(slug: string, lang: "tr" | "en"): BlogPost | null {
  const filePath = join(BLOG_DIR, lang, `${slug}.md`);
  if (!existsSync(filePath)) return null;

  const source = readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    category: data.category || "general",
    image: data.image || "",
    readingTime: getReadingTime(content),
    lang,
    content,
  };
}

export function getAllPosts(lang: "tr" | "en"): BlogPost[] {
  const slugs = getBlogSlugs(lang);
  const posts = slugs
    .map((slug) => getBlogPost(slug, lang))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostsByCategory(
  lang: "tr" | "en",
  category: string,
): BlogPost[] {
  return getAllPosts(lang).filter((p) => p.category === category);
}

export function getCategories(lang: "tr" | "en"): string[] {
  const posts = getAllPosts(lang);
  return [...new Set(posts.map((p) => p.category))];
}