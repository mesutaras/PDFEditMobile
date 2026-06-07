import { getBlogPost, getBlogSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const trSlugs = getBlogSlugs("tr");
  const enSlugs = getBlogSlugs("en");
  const allSlugs = [...new Set([...trSlugs, ...enSlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post =
    getBlogPost(slug, "tr") || getBlogPost(slug, "en");

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Try TR first, fallback to EN
  const post = getBlogPost(slug, "tr") || getBlogPost(slug, "en");

  if (!post) {
    notFound();
  }

  const categoryLabels: Record<string, string> = {
    donusturme: "Dönüştürme",
    duzenleme: "Düzenleme",
    genel: "Genel",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "PDFEditMobile",
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container mx-auto max-w-3xl px-4">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {post.lang === "tr" ? "Blog'a Dön" : "Back to Blog"}
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
              {categoryLabels[post.category] || post.category}
            </span>
            <span className="text-sm text-gray-400">{post.date}</span>
            <span className="text-sm text-gray-400">
              {post.readingTime} dk okuma
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-gray-500">{post.description}</p>
        </header>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white">
            <h3 className="mb-2 text-xl font-bold">
              {post.lang === "tr"
                ? "PDF'lerinizi Şimdi Düzenleyin"
                : "Edit Your PDFs Now"}
            </h3>
            <p className="mb-6 text-gray-300">
              {post.lang === "tr"
                ? "PDFEditMobile ile PDF'lerinizi ücretsiz olarak düzenleyin, birleştirin ve dönüştürün. Kayıt gerekmez, %100 tarayıcı tabanlı."
                : "Edit, merge and convert your PDFs for free with PDFEditMobile. No registration needed, 100% browser-based."}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-100"
            >
              {post.lang === "tr" ? "Araçları Keşfet" : "Explore Tools"} →
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}