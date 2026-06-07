"use client";

export const dynamic = "force-dynamic";

import { PageInfo, FileInfo } from "@/types";
import { useState, useRef } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Upload, File, X, Download, CheckCircle2, RefreshCw, AlertCircle, GripVertical, Trash2, Plus, Eye, RotateCw, Combine, Undo, Redo, ArrowUpAZ, ArrowDownZA, ArrowUpDown } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import { uint8ArrayToBlob } from "@/lib/pdf-utils";
import { PDFPreviewModal } from "@/components/pdf/PDFPreviewModal";
import { useHistory } from "@/context/HistoryContext";
import { useI18n } from "@/lib/i18n";
import Image from "next/image";
import { AnimatedBackground, FloatingDecorations, ToolHeader, ToolCard, ProcessingState } from "@/components/ui/ToolPageElements";
import { EducationalContent } from "@/components/layout/EducationalContent";

export function MergePDFClient() {
  const { addToHistory: recordAction } = useHistory();
  const { t } = useI18n();
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "processing" | "success" | "error">("idle");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewPage, setPreviewPage] = useState(0);
  const [customFileName, setCustomFileName] = useState("merged.pdf");
  const [metadata, setMetadata] = useState({ title: "", author: "", subject: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);
  const [undoRedoHistory, setUndoRedoHistory] = useState<FileInfo[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const pushToUndoRedo = (newFiles: FileInfo[]) => {
    const newHistory = undoRedoHistory.slice(0, historyIndex + 1);
    newHistory.push(newFiles);
    if (newHistory.length > 20) newHistory.shift();
    setUndoRedoHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setFiles(newFiles);
  };

  const undo = () => { if (historyIndex > 0) { const ni = historyIndex - 1; setHistoryIndex(ni); setFiles(undoRedoHistory[ni]); } };
  const redo = () => { if (historyIndex < undoRedoHistory.length - 1) { const ni = historyIndex + 1; setHistoryIndex(ni); setFiles(undoRedoHistory[ni]); } };

  const sortFiles = (criteria: "name_asc" | "name_desc" | "size_asc" | "size_desc") => {
    const sorted = [...files].sort((a, b) => {
      if (criteria === "name_asc") return a.name.localeCompare(b.name);
      if (criteria === "name_desc") return b.name.localeCompare(a.name);
      if (criteria === "size_asc") return a.size - b.size;
      return b.size - a.size;
    });
    pushToUndoRedo(sorted);
  };

  const handleDrop = async (e: React.DragEvent) => { e.preventDefault(); setDragActive(false); const fs = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf"); if (fs.length > 0) await loadFiles(fs); };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const fs = Array.from(e.target.files || []); if (fs.length > 0) await loadFiles(fs); e.target.value = ""; };

  const loadFiles = async (newFiles: File[]) => {
    const isFirstLoad = files.length === 0;
    setStatus("loading"); setErrorMessage("");
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const loadedFiles: FileInfo[] = [];
      for (const file of newFiles) {
        const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const arrayBuffer = await file.arrayBuffer();
        const originalBuffer = arrayBuffer.slice(0);
        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer), useWorkerFetch: true, isEvalSupported: false });
        const pdfDoc = await loadingTask.promise;
        const filePages: PageInfo[] = [];
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const page = await pdfDoc.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement("canvas");
          canvas.height = viewport.height; canvas.width = viewport.width;
          const ctx = canvas.getContext("2d")!;
          await page.render({ canvasContext: ctx, viewport }).promise;
          filePages.push({ id: `${fileId}-page-${i}`, fileId, fileName: file.name, pageNumber: i, image: canvas.toDataURL("image/jpeg", 0.7), rotation: 0, originalArrayBuffer: originalBuffer });
          (page as { cleanup?: () => void }).cleanup?.();
        }
        loadedFiles.push({ id: fileId, name: file.name, size: file.size, pages: filePages, isExpanded: false });
        await pdfDoc.destroy();
      }
      if (isFirstLoad) { pushToUndoRedo(loadedFiles); if (loadedFiles.length > 0) setCustomFileName(`${loadedFiles[0].name.replace(".pdf", "")}_merged.pdf`); }
      else pushToUndoRedo([...files, ...loadedFiles]);
      setStatus("ready");
    } catch (error) { console.error(error); setErrorMessage("Error loading PDFs"); setStatus("error"); }
  };

  const rotatePage = (fileId: string, pageId: string) => {
    pushToUndoRedo(files.map(f => f.id === fileId ? { ...f, pages: f.pages.map(p => p.id === pageId ? { ...p, rotation: (((p.rotation ?? 0) + 90) % 360) as 0 | 90 | 180 | 270 } : p) } : f));
  };
  const removePage = (fileId: string, pageId: string) => {
    pushToUndoRedo(files.map(f => f.id === fileId ? { ...f, pages: f.pages.filter(p => p.id !== pageId) } : f).filter(f => f.pages.length > 0));
  };
  const toggleFileExpand = (fileId: string) => { setFiles(files.map(f => f.id === fileId ? { ...f, isExpanded: !f.isExpanded } : f)); };
  const removeFile = (fileId: string) => { pushToUndoRedo(files.filter(f => f.id !== fileId)); };

  const handleRangeSelection = (fileId: string, rangeStr: string) => {
    const visiblePages = new Set<number>();
    rangeStr.split(",").map(p => p.trim()).forEach(part => {
      if (part.includes("-")) { const [s, e] = part.split("-").map(Number); if (!isNaN(s) && !isNaN(e)) for (let i = Math.min(s, e); i <= Math.max(s, e); i++) visiblePages.add(i); }
      else { const n = Number(part); if (!isNaN(n)) visiblePages.add(n); }
    });
    pushToUndoRedo(files.map(f => f.id === fileId ? { ...f, pages: f.pages.map(p => ({ ...p, isHidden: rangeStr.trim() !== "" && !visiblePages.has(p.pageNumber) })) } : f));
  };

  const openPreview = (filePages: PageInfo[], startIndex: number) => {
    const visiblePages = filePages.filter(p => !p.isHidden);
    const clickedPageId = filePages[startIndex].id;
    setPreviewImages(visiblePages.map(p => p.image));
    setPreviewPage(Math.max(0, visiblePages.findIndex(p => p.id === clickedPageId)));
    setPreviewOpen(true);
  };

  const handleMerge = async () => {
    if (files.length === 0) return;
    setStatus("processing"); setErrorMessage("");
    try {
      const mergedPdf = await PDFDocument.create();
      if (metadata.title) mergedPdf.setTitle(metadata.title);
      if (metadata.author) mergedPdf.setAuthor(metadata.author);
      if (metadata.subject) mergedPdf.setSubject(metadata.subject);
      mergedPdf.setProducer("PDFEditMobile"); mergedPdf.setCreator("PDFEditMobile");
      const loadedPdfs = new Map<string, PDFDocument>();
      for (const fileInfo of files) {
        for (const pageInfo of fileInfo.pages) {
          if (pageInfo.isHidden || !pageInfo.originalArrayBuffer) continue;
          let sourcePdf = loadedPdfs.get(pageInfo.fileId!);
          if (!sourcePdf) { sourcePdf = await PDFDocument.load(pageInfo.originalArrayBuffer); loadedPdfs.set(pageInfo.fileId!, sourcePdf); }
          const [copiedPage] = await mergedPdf.copyPages(sourcePdf, [pageInfo.pageNumber - 1]);
          if (pageInfo.rotation) copiedPage.setRotation(degrees(pageInfo.rotation));
          mergedPdf.addPage(copiedPage);
        }
      }
      const pdfBytes = await mergedPdf.save();
      setResultBlob(uint8ArrayToBlob(pdfBytes));
      setStatus("success");
      recordAction("Merged PDF", "merged_PDFEditMobile.pdf", `${files.length} files merged`);
    } catch (error) { console.error(error); setErrorMessage("Failed to merge PDFs. Please try again."); setStatus("error"); }
  };

  const handleDownload = () => { if (!resultBlob) return; const url = URL.createObjectURL(resultBlob); const link = document.createElement("a"); link.href = url; link.download = customFileName.endsWith(".pdf") ? customFileName : `${customFileName}.pdf`; link.click(); URL.revokeObjectURL(url); };
  const reset = () => { setFiles([]); setStatus("idle"); setResultBlob(null); setErrorMessage(""); setCustomFileName("merged.pdf"); setMetadata({ title: "", author: "", subject: "" }); setUndoRedoHistory([]); setHistoryIndex(-1); };
  const previewMerged = () => { const all = files.flatMap(f => f.pages.filter(p => !p.isHidden).map(p => p.image)); if (all.length > 0) { setPreviewImages(all); setPreviewPage(0); setPreviewOpen(true); } };

  const totalPages = files.reduce((acc, f) => acc + f.pages.length, 0);

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden pt-24 pb-16">
      <AnimatedBackground /><FloatingDecorations />
      <div className="relative z-10 container mx-auto px-4">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mx-auto max-w-4xl">
              <ToolHeader title={t("merge_title")} description={t("merge_desc")} icon={Combine} />
              <ToolCard className="p-8">
                <div className={`drop-zone active:border-black ${dragActive ? "active" : ""}`} onDragOver={e => { e.preventDefault(); setDragActive(true); }} onDragLeave={() => setDragActive(false)} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
                  <input ref={fileInputRef} type="file" accept=".pdf" multiple className="hidden" onChange={handleFileChange} />
                  <Upload className="mb-4 h-12 w-12 text-gray-400" />
                  <p className="mb-2 text-lg font-medium">{t("merge_drop")}</p>
                  <p className="text-sm text-gray-400">{t("merge_browse")}</p>
                </div>
              </ToolCard>
            </motion.div>
          )}
          {status === "loading" && <ProcessingState message={t("merge_loading")} description={t("merge_loading_desc")} />}
          {status === "ready" && (
            <motion.div key="ready" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mx-auto max-w-6xl">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-black p-3 text-white"><Combine className="h-6 w-6" /></div>
                  <div><h2 className="text-2xl font-bold">{t("merge_merge_pdfs")}</h2><p className="text-sm text-gray-500">{files.length} {files.length !== 1 ? t("merge_pages") : t("merge_page")} • {totalPages} {t("merge_pages")}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={reset} className="btn-outline rounded-xl px-4 py-2 text-sm">{t("merge_reset")}</button>
                  <button onClick={handleMerge} disabled={files.length === 0} className="btn-primary rounded-xl px-6 py-2 shadow-lg shadow-black/10 disabled:opacity-50">{t("merge_merge_download")}</button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                  <div className="mb-4 flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                        <button onClick={undo} disabled={historyIndex <= 0} className="rounded-md p-1.5 transition-colors hover:bg-gray-100 disabled:opacity-30" title={t("merge_undo")}><Undo className="h-4 w-4" /></button>
                        <div className="mx-1 h-4 w-px bg-gray-200" />
                        <button onClick={redo} disabled={historyIndex >= undoRedoHistory.length - 1} className="rounded-md p-1.5 transition-colors hover:bg-gray-100 disabled:opacity-30" title={t("merge_redo")}><Redo className="h-4 w-4" /></button>
                      </div>
                      <div className="mx-2 h-6 w-px bg-gray-200" />
                      <div className="group relative">
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-wider uppercase shadow-sm transition-colors hover:border-black"><ArrowUpDown className="h-3 w-3" />{t("merge_sort")}</button>
                        <div className="absolute top-full left-0 z-20 mt-2 hidden w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl group-hover:block">
                          <p className="border-b border-gray-100 bg-gray-50 px-4 py-2 text-[10px] font-bold text-gray-400 uppercase">{t("merge_sort_files_by")}</p>
                          {[{ fn: "name_asc", label: "merge_name_az", icon: ArrowUpAZ }, { fn: "name_desc", label: "merge_name_za", icon: ArrowDownZA }, { fn: "size_asc", label: "merge_size_smallest", icon: ArrowUpDown }, { fn: "size_desc", label: "merge_size_largest", icon: ArrowUpDown }].map(s => (
                            <button key={s.fn} onClick={() => sortFiles(s.fn as "name_asc" | "name_desc" | "size_asc" | "size_desc")} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-gray-50"><s.icon className="h-4 w-4 text-gray-400" /> {t(s.label)}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button onClick={reset} className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600">{t("merge_clear_all")}</button>
                  </div>
                  <Reorder.Group axis="y" values={files} onReorder={setFiles} className="space-y-4">
                    {files.map(file => (
                      <Reorder.Item key={file.id} value={file} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center justify-between bg-gray-50/50 p-4">
                          <div className="flex items-center gap-3">
                            <div className="cursor-grab rounded p-1 transition-colors hover:bg-gray-200 active:cursor-grabbing"><GripVertical className="h-4 w-4 text-gray-400" /></div>
                            <File className="h-5 w-5 text-gray-400" />
                            <div><p className="max-w-[200px] truncate text-sm font-medium">{file.name}</p><p className="text-[10px] tracking-wider text-gray-400 uppercase">{file.pages.length} {t("merge_pages")} • {(file.size / 1024 / 1024).toFixed(2)} MB</p></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => toggleFileExpand(file.id)} className="rounded-lg p-1.5 transition-colors hover:bg-gray-200" title={file.isExpanded ? t("merge_collapse") : t("merge_manage_pages")}>{file.isExpanded ? <X className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                            <button onClick={() => removeFile(file.id)} className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50" title={t("merge_remove_file")}><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </div>
                        <AnimatePresence>
                          {file.isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-gray-100">
                              <div className="bg-white p-4">
                                <div className="mb-4 flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 sm:flex-row sm:items-center">
                                  <div className="flex min-w-[120px] items-center gap-2 text-xs font-semibold tracking-wider text-gray-500 uppercase"><CheckCircle2 className="h-3.5 w-3.5" />{t("merge_page_range")}</div>
                                  <input type="text" placeholder={t("merge_range_placeholder")} className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm focus:ring-1 focus:ring-black focus:outline-none" onChange={e => handleRangeSelection(file.id, e.target.value)} />
                                  <p className="text-[10px] text-gray-400 italic">{t("merge_range_hint")}</p>
                                </div>
                                <Reorder.Group axis="x" values={file.pages} onReorder={newPages => setFiles(files.map(f => f.id === file.id ? { ...f, pages: newPages } : f))} className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                  {file.pages.map((page, pIdx) => (
                                    <Reorder.Item key={page.id} value={page} className={`group relative cursor-grab transition-opacity duration-300 active:cursor-grabbing ${page.isHidden ? "pointer-events-none opacity-20 grayscale" : "opacity-100"}`}>
                                      <div className="relative aspect-3/4 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                                        <Image src={page.image} alt={`${t("merge_page")} ${page.pageNumber}`} fill className="h-full w-full object-contain" style={{ transform: `rotate(${page.rotation}deg)` }} unoptimized />
                                        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                          <button onClick={() => openPreview(file.pages, pIdx)} className="rounded-lg bg-white p-1.5 shadow-lg transition-transform hover:scale-110"><Eye className="h-4 w-4" /></button>
                                          <button onClick={() => { if (page.fileId && page.id) rotatePage(page.fileId, page.id); }} className="rounded-lg bg-white p-1.5 shadow-lg transition-transform hover:scale-110"><RotateCw className="h-4 w-4" /></button>
                                          <button onClick={() => { if (page.fileId && page.id) removePage(page.fileId, page.id); }} className="rounded-lg bg-red-500 p-1.5 text-white shadow-lg transition-transform hover:scale-110"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                        <div className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm">{t("merge_page")} {page.pageNumber}</div>
                                      </div>
                                    </Reorder.Item>
                                  ))}
                                </Reorder.Group>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                  <button onClick={() => addMoreInputRef.current?.click()} className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-4 text-gray-400 transition-all hover:border-black hover:text-black"><Plus className="h-5 w-5 transition-transform group-hover:scale-110" /><span className="font-medium">{t("merge_add_more")}</span></button>
                  <input ref={addMoreInputRef} type="file" accept=".pdf" multiple className="hidden" onChange={handleFileChange} />
                </div>
                <div className="space-y-6">
                  <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-6 flex items-center gap-2 text-lg font-bold"><Combine className="h-5 w-5" />{t("merge_settings")}</h3>
                    <div className="space-y-4">
                      <div><label className="mb-2 block text-sm font-semibold">{t("merge_output_filename")}</label><input type="text" value={customFileName} onChange={e => setCustomFileName(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-black focus:outline-none" placeholder="merged.pdf" /></div>
                      <div className="border-t border-gray-100 pt-4">
                        <p className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">{t("merge_metadata_editor")}</p>
                        <div className="space-y-4">
                          <div><label className="mb-1.5 block text-xs font-medium text-gray-500">{t("merge_pdf_title")}</label><input type="text" value={metadata.title} onChange={e => setMetadata({ ...metadata, title: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-black focus:outline-none" placeholder={t("merge_enter_title")} /></div>
                          <div><label className="mb-1.5 block text-xs font-medium text-gray-500">{t("merge_author")}</label><input type="text" value={metadata.author} onChange={e => setMetadata({ ...metadata, author: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-black focus:outline-none" placeholder={t("merge_enter_author")} /></div>
                          <div><label className="mb-1.5 block text-xs font-medium text-gray-500">{t("merge_subject")}</label><input type="text" value={metadata.subject} onChange={e => setMetadata({ ...metadata, subject: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-black focus:outline-none" placeholder={t("merge_enter_subject")} /></div>
                        </div>
                      </div>
                      <div className="space-y-3 pt-6">
                        <button onClick={previewMerged} disabled={files.length === 0} className="btn-outline flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold"><Eye className="h-4 w-4" />{t("merge_preview_result")}</button>
                        <button onClick={handleMerge} className="btn-primary flex w-full items-center justify-center gap-2 rounded-2xl py-4 shadow-xl shadow-black/10"><Combine className="h-5 w-5" />{t("merge_merge_save")}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {files.length === 0 && <div className="py-16 text-center text-gray-400"><p>{t("merge_all_removed")}</p></div>}
            </motion.div>
          )}
          {status === "processing" && <ProcessingState message={t("merge_processing")} description={t("merge_processing_desc")} />}
          {status === "success" && (
            <motion.div key="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex max-w-lg flex-col items-center justify-center py-24 text-center">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-black text-white"><CheckCircle2 className="h-10 w-10" /></div>
              <h2 className="mb-2 text-3xl font-bold">{t("merge_success")}</h2>
              <p className="mb-10 text-gray-500">{t("merge_success_desc")}</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button onClick={handleDownload} className="btn-primary flex items-center gap-2 px-10 py-4"><Download className="h-5 w-5" />{t("merge_download_pdf")}</button>
                <button onClick={reset} className="btn-outline flex items-center gap-2 px-10 py-4"><RefreshCw className="h-5 w-5" />{t("merge_merge_another")}</button>
              </div>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div key="error" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex max-w-lg flex-col items-center justify-center py-24 text-center">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600"><AlertCircle className="h-10 w-10" /></div>
              <h2 className="mb-2 text-3xl font-bold">{t("common_error")}</h2>
              <p className="mb-10 text-gray-500">{errorMessage}</p>
              <button onClick={reset} className="btn-primary flex items-center gap-2 px-10 py-4"><RefreshCw className="h-5 w-5" />{t("common_error_retry")}</button>
            </motion.div>
          )}
        </AnimatePresence>
        <EducationalContent
          howItWorks={{ title: t("merge_how_title"), steps: [t("merge_how_step1"), t("merge_how_step2"), t("merge_how_step3")] }}
          benefits={{ title: t("merge_benefits_title"), items: [{ title: t("merge_benefit1_title"), desc: t("merge_benefit1_desc") }, { title: t("merge_benefit2_title"), desc: t("merge_benefit2_desc") }, { title: t("merge_benefit3_title"), desc: t("merge_benefit3_desc") }, { title: t("merge_benefit4_title"), desc: t("merge_benefit4_desc") }] }}
        />
      </div>
      <PDFPreviewModal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} images={previewImages} currentPage={previewPage} onPageChange={setPreviewPage} onDownload={handleMerge} />
    </div>
  );
}