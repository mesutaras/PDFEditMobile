import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare PDF Files | Diff Two PDFs Free Online",
  description: "Compare two PDF files and find differences free online. Side-by-side PDF comparison tool. No sign up, browser-based.",
  keywords: ["compare pdf", "pdf diff", "compare two pdfs", "pdf comparison tool"],
  openGraph: { title: "Compare PDF Files | Free Online", description: "Compare two PDFs side by side free online.", url: "https://pdfeditmobile.com/compare-pdf" },
};

export default function Page() {
  return <main className="min-h-screen bg-gray-50 py-16 text-center"><div className="container mx-auto max-w-lg"><h1 className="text-3xl font-bold">Compare PDF Files</h1><p className="mt-4 text-gray-500">Compare two PDFs side by side and spot the differences.</p><p className="mt-8 text-sm text-gray-400">Coming soon. Use <a href="/merge-pdf" className="underline">Merge PDF</a> in the meantime.</p></div></main>;
}