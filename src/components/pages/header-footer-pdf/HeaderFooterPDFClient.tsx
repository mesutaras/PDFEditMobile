"use client";

import { useState, useCallback } from "react";
import { Download, Upload, FileText } from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export function HeaderFooterPDFClient() {
  const [file, setFile] = useState<File | null>(null);
  const [headerText, setHeaderText] = useState("");
  const [footerText, setFooterText] = useState("");
  const [includePageNum, setIncludePageNum] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setIsProcessing(true);
    try {
      const buf = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      
      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        
        if (headerText) {
          page.drawText(headerText.replace("{page}", String(i + 1)).replace("{total}", String(pages.length)), {
            x: 50, y: height - 30, size: 10, font, color: rgb(0.5, 0.5, 0.5),
          });
        }
        if (footerText || includePageNum) {
          const text = [footerText, includePageNum ? `Page ${i + 1} of ${pages.length}` : ""].filter(Boolean).join(" | ");
          if (text) {
            const tw = font.widthOfTextAtSize(text, 10);
            page.drawText(text, { x: (width - tw) / 2, y: 20, size: 10, font, color: rgb(0.5, 0.5, 0.5) });
          }
        }
      });

      const bytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "with-header-footer-" + f.name;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsProcessing(false);
    }
  }, [headerText, footerText, includePageNum]);

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">Add Header & Footer to PDF</h1>
        <p className="mb-8 text-center text-gray-500">Add page numbers, titles, and custom text to headers and footers.</p>

        {!file ? (
          <div
            onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type === "application/pdf") handleFile(f); }}
            onDragOver={e => e.preventDefault()}
            className="mx-auto flex max-w-lg cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 hover:border-gray-400"
          >
            <Upload className="mb-4 h-12 w-12 text-gray-300" />
            <p className="text-lg font-medium">Drop PDF or click to select</p>
          </div>
        ) : isProcessing ? (
          <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
            <FileText className="mx-auto mb-4 h-12 w-12 animate-pulse text-gray-400" />
            <p className="text-lg text-gray-600">Adding headers and footers...</p>
          </div>
        ) : (
          <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
            <div>
              <label className="mb-2 block font-medium text-gray-700">Header Text</label>
              <input value={headerText} onChange={e => setHeaderText(e.target.value)} placeholder="e.g. Document Title" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="mb-2 block font-medium text-gray-700">Footer Text</label>
              <input value={footerText} onChange={e => setFooterText(e.target.value)} placeholder="e.g. Confidential" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm" />
            </div>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={includePageNum} onChange={e => setIncludePageNum(e.target.checked)} className="h-5 w-5 rounded" />
              <span className="text-sm text-gray-600">Include page numbers (Page X of Y)</span>
            </label>
            <div className="flex gap-3 pt-4">
              <button onClick={() => setFile(null)} className="flex-1 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => file && handleFile(file)} className="flex-1 rounded-xl bg-black py-3 text-sm font-medium text-white hover:bg-gray-800">Apply & Download</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}