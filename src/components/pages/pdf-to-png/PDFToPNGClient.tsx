"use client";

import { useState, useRef, useCallback } from "react";
import { Download, FileImage, Package, Upload } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import JSZip from "jszip";

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export function PDFToPNGClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<{ number: number; dataUrl: string; blob: Blob }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPDF = useCallback(async (f: File) => {
    setFile(f);
    setIsProcessing(true);
    setProgress(0);
    const buf = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(buf).promise;
    const results: { number: number; dataUrl: string; blob: Blob }[] = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const vp = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement("canvas");
      canvas.width = vp.width;
      canvas.height = vp.height;
      await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;
      
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();
      results.push({ number: i, dataUrl, blob });
      setProgress(Math.round((i / pdf.numPages) * 100));
    }
    setPages(results);
    setIsProcessing(false);
  }, []);

  const downloadAll = async () => {
    const zip = new JSZip();
    pages.forEach(p => zip.file(`page-${p.number}.png`, p.blob));
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name?.replace(".pdf", "") || "pdf"}-pages.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadSingle = (page: { number: number; dataUrl: string }) => {
    const a = document.createElement("a");
    a.href = page.dataUrl;
    a.download = `page-${page.number}.png`;
    a.click();
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">PDF to PNG Converter</h1>
          <p className="text-gray-500">Convert PDF pages to high-quality PNG images. Free, secure, 100% browser-based.</p>
        </div>

        {!file ? (
          <div
            onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type === "application/pdf") loadPDF(f); }}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 transition-colors hover:border-gray-400"
          >
            <Upload className="mb-4 h-12 w-12 text-gray-300" />
            <p className="text-lg font-medium text-gray-600">Drop your PDF here</p>
            <p className="text-sm text-gray-400">or click to browse</p>
            <input ref={fileInputRef} type="file" accept="application/pdf" onChange={e => { const f = e.target.files?.[0]; if (f) loadPDF(f); }} className="hidden" />
          </div>
        ) : isProcessing ? (
          <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
            <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-black transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-gray-500">Converting pages to PNG... {progress}%</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">{file.name} — {pages.length} pages</h2>
              <div className="flex gap-3">
                <button onClick={downloadAll} className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800">
                  <Package className="h-4 w-4" /> Download All (ZIP)
                </button>
                <button onClick={() => { setFile(null); setPages([]); }} className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  New PDF
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {pages.map(p => (
                <div key={p.number} className="group relative cursor-pointer rounded-xl border bg-white p-3 shadow-sm transition-all hover:shadow-md" onClick={() => downloadSingle(p)}>
                  <img src={p.dataUrl} alt={`Page ${p.number}`} className="mb-2 w-full rounded-lg" />
                  <p className="text-center text-xs text-gray-500">Page {p.number}</p>
                  <Download className="absolute top-4 right-4 h-5 w-5 text-white opacity-0 drop-shadow transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}