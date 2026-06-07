import { getAllPosts, getCategories } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - PDF İpuçları, Rehberler ve Dönüştürme Kılavuzları",
  description:
    "PDF düzenleme, dönüştürme, birleştirme ve daha fazlası hakkında detaylı rehberler. PDFEditMobile ile PDF işlemlerini öğrenin.",
};

export default function BlogPage() {
  const posts = getAllPosts("tr");

  return (
    <main className="min-h-screen bg-gray-50 pt-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
            PDFEditMobile Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            PDF düzenleme, dönüştürme ve yönetim hakkında kapsamlı rehberler,
            ipuçları ve püf noktaları.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-4 text-6xl">📝</div>
            <h2 className="mb-2 text-2xl font-semibold text-gray-900">
              Henüz blog yazısı yok
            </h2>
            <p className="text-gray-500">
              Blog yazıları yakında eklenecek. Bizi takip edin!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}