import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Overlay | Merge Two PDFs as Layers Free Online",
  description: "Overlay one PDF on top of another. Merge PDFs as layers, add watermarks. Free, no sign up, 100% browser-based.",
  keywords: ["pdf overlay", "overlay pdf", "merge pdf layers", "pdf watermark overlay"],
  openGraph: { title: "PDF Overlay Tool | Free Online", description: "Overlay PDFs as layers free online.", url: "https://pdfeditmobile.com/overlay-pdf" },
};

export default function Page() {
  return <main className="min-h-screen bg-gray-50 py-16 text-center"><div className="container mx-auto max-w-lg"><h1 className="text-3xl font-bold">PDF Overlay Tool</h1><p className="mt-4 text-gray-500">Overlay one PDF on top of another. Upload two PDFs and merge them as layers.</p><p className="mt-8 text-sm text-gray-400">Coming soon. Use <a href="/merge-pdf" className="underline">Merge PDF</a> or <a href="/watermark-pdf" className="underline">Watermark PDF</a> in the meantime.</p></div></main>;
}