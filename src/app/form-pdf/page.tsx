import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Form Creator | Create Fillable PDF Forms Free Online",
  description: "Create fillable PDF forms free online. Add text fields, checkboxes, and signatures. No sign up, 100% browser-based.",
  keywords: ["create pdf form", "fillable pdf", "pdf form creator", "pdf form builder"],
  openGraph: { title: "PDF Form Creator | Free Online", description: "Create fillable PDF forms free online.", url: "https://pdfeditmobile.com/form-pdf" },
};

export default function Page() {
  return <main className="min-h-screen bg-gray-50 py-16 text-center"><div className="container mx-auto max-w-lg"><h1 className="text-3xl font-bold">PDF Form Creator</h1><p className="mt-4 text-gray-500">Create fillable PDF forms with text fields and checkboxes.</p><p className="mt-8 text-sm text-gray-400">Coming soon. Use <a href="/edit-pdf" className="underline">Edit PDF</a> in the meantime.</p></div></main>;
}