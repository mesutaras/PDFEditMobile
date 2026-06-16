"use client";

import { useState, useRef, useCallback } from "react";
import { Scissors, RotateCw, X, Upload } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function CropPDFClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalPDF, setOriginalPDF] = useState<ArrayBuffer | null>(null);
  const [pageDims, setPageDims] = useState({ w: 0, h: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRefCallback = useRef<HTMLImageElement | null>(null);

  const loadPDF = useCallback(async (f: File) => {
    setFile(f);
    const buf = await f.arrayBuffer();
    setOriginalPDF(buf);
    const pdf = await pdfjsLib.getDocument(buf).promise;
    setTotalPages(pdf.numPages);
    const imgs: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const vp = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      canvas.width = vp.width;
      canvas.height = vp.height;
      await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;
      imgs.push(canvas.toDataURL("image/png"));
    }
    setPages(imgs);
    const fp = await pdf.getPage(1);
    const vp = fp.getViewport({ scale: 1 });
    setPageDims({ w: vp.width, h: vp.height });
  }, []);

  const getCoords = (e: React.MouseEvent) => {
    const el = imgRefCallback.current;
    if (!el) return { x: 0, y: 0 };
    const r = el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const handleDown = (e: React.MouseEvent) => {
    const p = getCoords(e);
    setDragStart(p);
    setIsDragging(true);
    setCropArea({ x: p.x, y: p.y, width: 0, height: 0 });
  };

  const handleMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const p = getCoords(e);
    setCropArea({
      x: Math.min(dragStart.x, p.x),
      y: Math.min(dragStart.y, p.y),
      width: Math.abs(p.x - dragStart.x),
      height: Math.abs(p.y - dragStart.y),
    });
  };

  const handleUp = () => setIsDragging(false);

  const applyCrop = async () => {
    const el = imgRefCallback.current;
    if (!originalPDF || !cropArea || !el) return;
    setIsProcessing(true);
    try {
      const sx = pageDims.w / el.offsetWidth;
      const sy = pageDims.h / el.offsetHeight;
      const doc = await PDFDocument.load(originalPDF);
      for (const p of doc.getPages()) {
        const { height } = p.getSize();
        const left = cropArea.x * sx;
        const bottom = height - (cropArea.y + cropArea.height) * sy;
        const right = (cropArea.x + cropArea.width) * sx;
        const top = cropArea.y * sy;
        p.setCropBox(left, bottom, right, top);
        p.setMediaBox(left, bottom, right, top);
      }
      const bytes = await doc.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cropped.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">PDF Kırpma Aracı</h1>
          <p className="text-gray-500">PDF sayfalarınızdaki istenmeyen alanları sürükle-bırak ile kesin. %100 ücretsiz ve gizli.</p>
        </div>

        {!file ? (
          <div
            onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type === "application/pdf") loadPDF(f); }}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-16 transition-colors hover:border-gray-400"
          >
            <Upload className="mb-4 h-12 w-12 text-gray-300" />
            <p className="mb-2 text-lg font-medium text-gray-600">PDF'inizi buraya bırakın</p>
            <p className="text-sm text-gray-400">veya seçmek için tıklayın</p>
            <input ref={fileInputRef} type="file" accept="application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) loadPDF(f); }} className="hidden" />
          </div>
        ) : (
          <div className="space-y-6">
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                {pages.map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={`rounded-lg px-4 py-2 text-sm font-medium ${currentPage === i + 1 ? "bg-black text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}>
                    Sayfa {i + 1}
                  </button>
                ))}
              </div>
            )}

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="relative mx-auto overflow-hidden rounded-lg bg-gray-100" style={{ width: "fit-content" }}>
                {pages[currentPage - 1] && (
                  <div onMouseDown={handleDown} onMouseMove={handleMove} onMouseUp={handleUp} onMouseLeave={handleUp} style={{ position: "relative", userSelect: "none" }}>
                    <img
                      ref={(el) => { imgRefCallback.current = el; }}
                      src={pages[currentPage - 1]}
                      alt={`Sayfa ${currentPage}`}
                      className="max-h-[70vh] w-auto"
                      draggable={false}
                    />
                    {cropArea && cropArea.width > 5 && cropArea.height > 5 && (
                      <div className="absolute border-2 border-blue-500 bg-blue-500/10" style={{ left: cropArea.x, top: cropArea.y, width: cropArea.width, height: cropArea.height, pointerEvents: "none" }} />
                    )}
                  </div>
                )}
              </div>
              <p className="mt-3 text-center text-sm text-gray-400">Kırpmak istediğiniz alanı fare ile sürükleyerek seçin</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button onClick={() => { setFile(null); setPages([]); setCropArea(null); }} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <X className="h-4 w-4" />Yeni PDF
              </button>
              <button onClick={() => setCropArea(null)} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <RotateCw className="h-4 w-4" />Seçimi Temizle
              </button>
              <button onClick={applyCrop} disabled={!cropArea || isProcessing} className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-gray-800 disabled:opacity-50">
                {isProcessing ? "Kırpılıyor..." : <><Scissors className="h-4 w-4" />Kırp ve İndir</>}
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 rounded-xl bg-white p-6">
          <h2 className="mb-2 font-semibold text-gray-900">Nasıl Kullanılır?</h2>
          <ol className="list-inside list-decimal space-y-1 text-sm text-gray-500">
            <li>PDF dosyanızı sürükleyip bırakın veya seçin</li>
            <li>Kırpmak istediğiniz alanı fare ile sürükleyerek seçin</li>
            <li>"Kırp ve İndir" butonuna tıklayın</li>
            <li>Kırpılmış PDF'iniz anında indirilecektir</li>
          </ol>
          <p className="mt-3 text-xs text-gray-400">%100 tarayıcı tabanlı. Dosyalarınız asla sunucuya yüklenmez.</p>
        </div>
      </div>
    </main>
  );
}