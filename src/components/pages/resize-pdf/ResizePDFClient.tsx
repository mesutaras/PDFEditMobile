"use client";

import { useState, useCallback } from "react";
import { Download, Upload, Maximize } from "lucide-react";
import { PDFDocument } from "pdf-lib";

const PAGE_SIZES: Record<string, [number, number]> = {
  "A4": [595, 842],
  "A3": [842, 1191],
  "Letter": [612, 792],
  "Legal": [612, 1008],
  "A5": [420, 595],
};

export function ResizePDFClient() {
  const [file, setFile] = useState<File | null>(null);
  const [targetSize, setTargetSize] = useState("A4");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setIsProcessing(true);
    try {
      const buf = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buf);
      const [tw, th] = PAGE_SIZES[targetSize];
      
      pdfDoc.getPages().forEach(page => {
        page.setSize(tw, th);
      });

      const bytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${targetSize.toLowerCase()}-` + f.name;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsProcessing(false);
    }
  }, [targetSize]);

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Resize PDF Pages</h1>
        <p className="mb-8 text-gray-500">Change PDF page size between A4, Letter, A3 and more.</p>
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
          <div className="rounded-2xl bg-white p-16 shadow-sm">
            <Maximize className="mx-auto mb-4 h-12 w-12 animate-pulse text-gray-400" />
            <p className="text-lg text-gray-600">Resizing pages...</p>
          </div>
        ) : (
          <div className="mx-auto max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-sm">
            <label className="block font-medium text-gray-700">Select Target Page Size</label>
            <select value={targetSize} onChange={e => setTargetSize(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              {Object.keys(PAGE_SIZES).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={() => file && handleFile(file)} className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white hover:bg-gray-800">
              Resize & Download
            </button>
            <button onClick={() => setFile(null)} className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          </div>
        )}
      </div>
    </main>
  );
}