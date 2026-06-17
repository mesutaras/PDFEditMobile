"use client";

import { useState, useCallback } from "react";
import { Download, Upload, PaintBucket } from "lucide-react";

export function GrayscalePDFClient() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setIsProcessing(true);
    try {
      const buf = await f.arrayBuffer();
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
      const pdfDoc = await pdfjsLib.getDocument(buf).promise;
      const { PDFDocument } = await import("pdf-lib");
      const newPdf = await PDFDocument.create();

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const vp = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        canvas.width = vp.width;
        canvas.height = vp.height;
        const ctx = canvas.getContext("2d")!;
        await page.render({ canvasContext: ctx, viewport: vp }).promise;
        
        // Convert to grayscale
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let j = 0; j < data.length; j += 4) {
          const gray = data[j] * 0.299 + data[j + 1] * 0.587 + data[j + 2] * 0.114;
          data[j] = data[j + 1] = data[j + 2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);
        
        const imgData = canvas.toDataURL("image/png");
        const imgBytes = await fetch(imgData).then(r => r.arrayBuffer());
        const pdfImg = await newPdf.embedPng(imgBytes);
        const p = newPdf.addPage([pdfImg.width, pdfImg.height]);
        p.drawImage(pdfImg, { x: 0, y: 0, width: pdfImg.width, height: pdfImg.height });
      }

      const bytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "grayscale-" + f.name;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Convert PDF to Grayscale</h1>
        <p className="mb-8 text-gray-500">Convert your colored PDF to black & white. Reduce file size, save ink.</p>
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
            <PaintBucket className="mx-auto mb-4 h-12 w-12 animate-pulse text-gray-400" />
            <p className="text-lg text-gray-600">Converting to grayscale...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-green-600">✅ Grayscale PDF has been downloaded!</p>
            <button onClick={() => setFile(null)} className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white">Convert Another</button>
          </div>
        )}
      </div>
    </main>
  );
}