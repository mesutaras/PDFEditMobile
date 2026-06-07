import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-types";

const categoryLabels: Record<string, Record<string, string>> = {
  tr: {
    donusturme: "Dönüştürme",
    duzenleme: "Düzenleme",
    genel: "Genel",
  },
  en: {
    donusturme: "Conversion",
    duzenleme: "Editing",
    genel: "General",
  },
};

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  const catLabel =
    categoryLabels[post.lang]?.[post.category] || post.category;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg"
    >
      {post.image && (
        <div className="aspect-[16/9] overflow-hidden bg-gray-50">
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${post.image})` }}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {catLabel}
          </span>
          <span className="text-xs text-gray-400">{post.date}</span>
          <span className="text-xs text-gray-400">
            {post.readingTime} dk okuma
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-black">
          {post.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
          {post.description}
        </p>
        <div className="mt-auto">
          <span className="text-sm font-medium text-gray-900 underline-offset-2 transition-all group-hover:underline">
            {post.lang === "tr" ? "Devamını Oku" : "Read More"} →
          </span>
        </div>
      </div>
    </Link>
  );
}