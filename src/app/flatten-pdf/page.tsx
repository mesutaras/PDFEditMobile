import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flatten PDF | Make Annotations Permanent Free Online",
  description: "Flatten PDF files to make annotations, forms, and layers permanent. No sign up, 100% browser-based.",
  keywords: ["flatten pdf", "pdf flatten", "flatten pdf annotations", "make pdf permanent"],
  openGraph: { title: "Flatten PDF | Free Online Tool", description: "Flatten PDF annotations permanently free online.", url: "https://pdfeditmobile.com/flatten-pdf" },
};

export default function Page() {
  return <main className="min-h-screen bg-gray-50 py-16 text-center"><div className="container mx-auto max-w-lg"><h1 className="text-3xl font-bold">Flatten PDF</h1><p className="mt-4 text-gray-500">Make annotations, forms and layers permanent in your PDF.</p><p className="mt-8 text-sm text-gray-400">Coming soon. Use <a href="/edit-pdf" className="underline">Edit PDF</a> in the meantime.</p></div></main>;
}