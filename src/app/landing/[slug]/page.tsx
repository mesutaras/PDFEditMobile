import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLandingPage, getAllLandingSlugs } from "@/lib/landing-data";
import { ArrowRight, Shield, Zap, Star } from "lucide-react";

export async function generateStaticParams() {
  return getAllLandingSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
    },
    alternates: { canonical: `https://pdfeditmobile.com/landing/${slug}` },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{page.h1}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">{page.intro}</p>
          <Link
            href={page.toolLink}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:scale-105"
          >
            Use {page.toolName} Now <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-400">Free • No Sign Up • Files Never Leave Your Device</p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {page.steps.map((s) => (
              <div key={s.step} className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-xl font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Why Choose PDFEditMobile?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: "100% Secure", desc: "All processing happens in your browser. Files never leave your device." },
              { icon: Zap, title: "Lightning Fast", desc: "Optimized engine processes your files in seconds." },
              { icon: Star, title: "Completely Free", desc: "No hidden fees, no registration, no file limits." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-100 p-6 text-center">
                <item.icon className="mx-auto mb-4 h-10 w-10 text-gray-900" />
                <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {page.faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl bg-white p-6 shadow-sm">
                <summary className="cursor-pointer font-semibold text-gray-900">{faq.q}</summary>
                <p className="mt-3 text-gray-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <div className="rounded-2xl bg-gray-900 p-12 text-white">
            <h2 className="mb-4 text-2xl font-bold">Ready to {page.title.split(" - ")[0].toLowerCase()}?</h2>
            <p className="mb-8 text-gray-300">Free, secure, and no registration required.</p>
            <Link
              href={page.toolLink}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:scale-105"
            >
              Try {page.toolName} Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}