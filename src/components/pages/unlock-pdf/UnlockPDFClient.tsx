"use client";

export const dynamic = "force-dynamic";

import { PageInfo } from "@/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, Download, CheckCircle2, RefreshCw, AlertCircle, Key, Unlock, Shield, ArrowRight, Lock } from "lucide-react";
import { formatFileSize, uint8ArrayToBlob, unlockPDFWithFallback } from "@/lib/pdf-utils";
import { PDFPreviewModal } from "@/components/pdf/PDFPreviewModal";
import { AnimatedBackground, FloatingDecorations, ToolHeader, ToolCard, ProcessingState } from "@/components/ui/ToolPageElements";
import { EducationalContent } from "@/components/layout/EducationalContent";
import { useHistory } from "@/context/HistoryContext";
import { useI18n } from "@/lib/i18n";

export function UnlockPDFClient() {
  const { addToHistory } = useHistory();
  const { t } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "processing" | "success" | "error">("idle");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewPage, setPreviewPage] = useState(0);
  const [customFileName, setCustomFileName] = useState("unlocked.pdf");

  const handleDrop = async (e: React.DragEvent) => { e.preventDefault(); setDragActive(false); const df = e.dataTransfer.files[0]; if (df?.type === "application/pdf") { setFile(df); await loadPages(df); } };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => { const sf = e.target.files?.[0]; if (sf) { setFile(sf); await loadPages(sf); } };
  const loadPages = async (pdfFile: File, userPwd?: string) => {
    setStatus("loading"); setErrorMessage(""); setPages([]);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      const arrayBuffer = await pdfFile.arrayBuffer();
      const params: { data: Uint8Array; useWorkerFetch: boolean; isEvalSupported: boolean; password?: string } = { data: new Uint8Array(arrayBuffer), useWorkerFetch: true, isEvalSupported: false };
      if (userPwd) params.password = userPwd;
      const loadingTask = pdfjsLib.getDocument(params);
      loadingTask.onPassword = () => { setStatus("ready"); };
      const pdfDoc = await loadingTask.promise;
      const pageInfos: PageInfo[] = [];
      for (let i = 1; i <= Math.min(pdfDoc.numPages, 5); i++) { const page = await pdfDoc.getPage(i); const vp = page.getViewport({ scale: 0.4 }); const c = document.createElement("canvas"); c.height = vp.height; c.width = vp.width; const ctx = c.getContext("2d")!; await page.render({ canvasContext: ctx, viewport: vp }).promise; pageInfos.push({ pageNumber: i, image: c.toDataURL("image/jpeg", 0.7) }); (page as { cleanup?: () => void }).cleanup?.(); }
      setPages(pageInfos); setCustomFileName(`unlocked_${pdfFile.name}`); setStatus("ready"); await pdfDoc.destroy();
    } catch (error: unknown) { if (error instanceof Error && (error.name === "PasswordException" || error.message.includes("password"))) { setCustomFileName(`unlocked_${pdfFile.name}`); setStatus("ready"); } else { setErrorMessage("Failed to load PDF"); setStatus("error"); } }
  };
  const [unlockMethod, setUnlockMethod] = useState<"decrypt" | "render" | null>(null);
  const handleUnlock = async () => { if (!file) return; setStatus("processing"); setErrorMessage(""); setUnlockMethod(null); try { const result = await unlockPDFWithFallback(file, password); setResultBlob(uint8ArrayToBlob(result.data)); setUnlockMethod(result.method); setStatus("success"); addToHistory("Unlocked PDF", file.name, result.method === "decrypt" ? "Security removed" : "Rendered as image"); } catch (error: unknown) { setErrorMessage(error instanceof Error ? error.message : "Failed to unlock PDF"); setStatus("error"); } };
  const handleDownload = () => { if (!resultBlob) return; const url = URL.createObjectURL(resultBlob); const l = document.createElement("a"); l.href = url; l.download = customFileName; l.click(); URL.revokeObjectURL(url); };
  const reset = () => { setFile(null); setPassword(""); setStatus("idle"); setResultBlob(null); setPages([]); setErrorMessage(""); };

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden pt-24 pb-16"><AnimatedBackground /><FloatingDecorations />
      <div className="relative z-10 container mx-auto px-4">
        <AnimatePresence mode="wait">
          {status === "idle" && (<motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mx-auto max-w-4xl"><ToolHeader title={t("unlock_title")} description={t("unlock_desc")} icon={Unlock} /><ToolCard className="p-8"><div className={`drop-zone ${dragActive ? "active" : ""}`} onDragOver={e => { e.preventDefault(); setDragActive(true); }} onDragLeave={() => setDragActive(false)} onDrop={handleDrop} onClick={() => document.getElementById("file-input")?.click()}><input id="file-input" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} /><Upload className="mb-4 h-12 w-12 text-gray-400" /><p className="mb-2 text-lg font-medium">{t("unlock_drop")}</p><p className="text-sm text-gray-400">{t("compress_browse")}</p></div></ToolCard></motion.div>)}
          {status === "loading" && <ProcessingState message={t("unlock_analyzing")} description={t("unlock_analyzing_desc")} />}
          {status === "ready" && (<motion.div key="ready" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mx-auto max-w-6xl"><div className="grid items-stretch gap-8 lg:grid-cols-12"><div className="lg:col-span-12"><ToolCard className="flex flex-col items-center p-8"><div className="relative mb-8 h-32 w-32"><div className="absolute inset-0 flex items-center justify-center rounded-[40px] bg-black/5"><File className="h-12 w-12 text-gray-300" /></div><motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -right-2 -bottom-2 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-white bg-black text-white shadow-xl"><Lock className="h-5 w-5" /></motion.div></div><h2 className="mb-2 text-2xl font-bold text-gray-900">{file?.name}</h2><p className="mb-10 text-[10px] font-bold tracking-widest text-gray-400 uppercase">{formatFileSize(file?.size || 0)} • {t("unlock_protected")}</p><div className="w-full max-w-md space-y-4"><div className="group relative"><Key className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-black" /><input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => { if (e.key === "Enter") handleUnlock(); }} placeholder={t("unlock_password_placeholder")} className="w-full rounded-2xl border-2 border-transparent bg-gray-50 py-4 pr-4 pl-11 font-medium transition-all outline-none focus:border-black focus:ring-4 focus:ring-black/5" />{password && pages.length === 0 && <button onClick={() => file && loadPages(file, password)} className="absolute top-1/2 right-3 -translate-y-1/2 rounded-xl bg-black px-3 py-1.5 text-[10px] font-bold text-white transition-colors hover:bg-gray-800">{t("unlock_load_preview")}</button>}</div><div className="flex gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4"><AlertCircle className="h-5 w-5 shrink-0 text-orange-500" /><p className="text-xs leading-relaxed font-medium text-orange-700">{t("unlock_warning")}</p></div><div className="flex gap-4 pt-4"><button onClick={reset} className="btn-outline flex-1 rounded-2xl py-4 font-bold">{t("unlock_cancel")}</button><button onClick={handleUnlock} className="btn-primary group flex flex-2 items-center justify-center gap-2 rounded-2xl py-4 shadow-xl shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98]"><Unlock className="h-5 w-5 transition-transform group-hover:rotate-12" /><span className="font-bold">{t("unlock_btn")}</span><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></button></div></div></ToolCard></div></div></motion.div>)}
          {status === "processing" && <ProcessingState message={t("unlock_processing")} description={t("unlock_processing_desc")} />}
          {status === "success" && (<motion.div key="success" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl"><div className="mb-12 text-center"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-black text-white shadow-xl shadow-black/10"><CheckCircle2 className="h-10 w-10" /></motion.div><h2 className="mb-2 text-4xl font-black text-gray-900">{t("unlock_success")}</h2><p className="text-lg font-medium text-gray-500">{t("unlock_success_desc")}</p></div><ToolCard className="mx-auto max-w-2xl p-10 shadow-2xl"><div className="flex flex-col items-center gap-8"><div className="grid w-full grid-cols-2 gap-4"><div className="rounded-2xl bg-gray-50 p-6 text-center"><Unlock className="mx-auto mb-3 h-6 w-6 text-emerald-500" /><p className="mb-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">{t("unlock_restrictions")}</p><p className="font-bold text-gray-900">{t("unlock_removed")}</p></div><div className="rounded-2xl bg-gray-50 p-6 text-center"><Shield className="mx-auto mb-3 h-6 w-6 text-emerald-500" /><p className="mb-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">{t("unlock_security")}</p><p className="font-bold text-gray-900">{t("unlock_clean")}</p></div></div><div className="h-px w-full bg-gray-100" /><div className="w-full space-y-4"><button onClick={handleDownload} className="btn-primary group flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"><Download className="h-6 w-6 transition-transform group-hover:translate-y-0.5" /><span className="font-bold">{t("unlock_download_btn")}</span></button><button onClick={reset} className="btn-outline flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-lg transition-all"><RefreshCw className="h-5 w-5" />{t("unlock_new")}</button></div></div></ToolCard></motion.div>)}
          {status === "error" && (<motion.div key="error" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mx-auto flex max-w-lg flex-col items-center justify-center py-24 text-center"><div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600"><AlertCircle className="h-10 w-10" /></div><h2 className="mb-2 text-3xl font-bold">{t("unlock_error_title")}</h2><p className="mb-10 text-gray-500">{errorMessage}</p><button onClick={reset} className="btn-primary flex items-center gap-2 px-10 py-4"><RefreshCw className="h-5 w-5" />{t("common_error_retry")}</button></motion.div>)}
        </AnimatePresence>
        <EducationalContent howItWorks={{ title: t("unlock_how_title"), steps: [t("unlock_how_step1"), t("unlock_how_step2"), t("unlock_how_step3")] }} benefits={{ title: t("unlock_benefits_title"), items: [{ title: t("unlock_benefit1_title"), desc: t("unlock_benefit1_desc") }, { title: t("unlock_benefit2_title"), desc: t("unlock_benefit2_desc") }, { title: t("unlock_benefit3_title"), desc: t("unlock_benefit3_desc") }, { title: t("unlock_benefit4_title"), desc: t("unlock_benefit4_desc") }] }} />
      </div>
      <PDFPreviewModal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} images={pages.map(p => p.image)} currentPage={previewPage} onPageChange={setPreviewPage} title={t("unlock_preview_title")} />
    </div>
  );
}