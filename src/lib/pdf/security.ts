import { PDFDocument } from "pdf-lib";

/**
 * Protect PDF with password using industrial-grade qpdf-wasm
 */
export async function protectPDF(
  file: File,
  userPassword?: string,
  ownerPassword?: string,
  permissions: {
    printing?: boolean;
    modifying?: boolean;
    copying?: boolean;
    annotating?: boolean;
  } = {}
): Promise<Uint8Array> {
  const createModule = (await import("@neslinesli93/qpdf-wasm")).default;
  const arrayBuffer = await file.arrayBuffer();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const qpdf: any = await createModule({
    locateFile: (path: string) => `/${path}`,
  } as any);

  const inputName = "/input.pdf";
  const outputName = "/output.pdf";
  qpdf.FS.writeFile(inputName, new Uint8Array(arrayBuffer));

  const args = [
    inputName, "--encrypt",
    userPassword || "", ownerPassword || userPassword || "", "256",
  ];
  if (!permissions.printing) args.push("--print=none");
  if (!permissions.copying) args.push("--extract=n");
  if (!permissions.modifying) args.push("--modify=none");
  if (!permissions.annotating) args.push("--annotate=n");
  args.push("--", outputName);

  try {
    const exitCode = qpdf.callMain(args);
    if (exitCode !== 0 && exitCode !== 3) throw new Error(`qpdf exit ${exitCode}`);
  } catch (err: any) {
    const ok = err && typeof err === "object" && (err.status === 3 || err.exitCode === 3 || err.code === 3);
    if (!ok) throw new Error("Encryption engine failed.");
  }

  try { qpdf.FS.stat(outputName); } catch { throw new Error("Output not generated."); }
  const out = qpdf.FS.readFile(outputName);
  qpdf.FS.unlink(inputName); qpdf.FS.unlink(outputName);
  return out;
}

/**
 * Unlock PDF - 3 tier strategy
 */
export async function unlockPDFWithFallback(
  file: File,
  password?: string
): Promise<{ data: Uint8Array; method: "decrypt" | "render" }> {
  const arrayBuffer = await file.arrayBuffer();

  // Tier 1: qpdf decrypt (no password or with password)
  try {
    const createModule2 = (await import("@neslinesli93/qpdf-wasm")).default;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const qpdf: any = await createModule2({
      locateFile: (path: string) => `/${path}`,
    } as any);
    const inputName = "/input.pdf";
    const outputName = "/output.pdf";
    qpdf.FS.writeFile(inputName, new Uint8Array(arrayBuffer));

    const args = [inputName, "--decrypt"];
    if (password) args.splice(1, 0, `--password=${password}`);
    args.push(outputName);

    try {
      const exitCode = qpdf.callMain(args);
      if (exitCode === 0 || exitCode === 3) {
        try { qpdf.FS.stat(outputName); } catch { throw new Error("no output"); }
        const out = qpdf.FS.readFile(outputName);
        qpdf.FS.unlink(inputName); qpdf.FS.unlink(outputName);
        if (out.byteLength > 1024) return { data: out, method: "decrypt" };
      }
    } catch { /* fall through */ }
    try { qpdf.FS.unlink(inputName); } catch {}
    try { qpdf.FS.unlink(outputName); } catch {}
  } catch { /* fall through */ }

  // Tier 2: PDF.js high-quality render (last resort)
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    password: password || undefined,
  });
  const pdfDoc = await loadingTask.promise;
  const newPdf = await PDFDocument.create();

  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: 3.0 }); // 300 DPI için yüksek kalite
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport }).promise;
    
    const imgData = canvas.toDataURL("image/png"); // PNG = kayıpsız
    const imgBytes = await fetch(imgData).then(r => r.arrayBuffer());
    const pdfImg = await newPdf.embedPng(imgBytes);
    const p = newPdf.addPage([pdfImg.width, pdfImg.height]);
    p.drawImage(pdfImg, { x: 0, y: 0, width: pdfImg.width, height: pdfImg.height });
    (page as any).cleanup?.();
  }

  await pdfDoc.destroy();
  return { data: await newPdf.save(), method: "render" };
}