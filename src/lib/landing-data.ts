export interface LandingPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  steps: { step: number; title: string; desc: string }[];
  toolLink: string;
  toolName: string;
  faqs: { q: string; a: string }[];
  keywords: string[];
}

export const landingPages: LandingPage[] = [
  {
    slug: "pdf-to-word-online-free",
    title: "PDF to Word Converter - Free Online, No Sign Up",
    description: "Convert PDF to Word free online. Keep formatting, no registration. 100% browser-based, your files never leave your device.",
    h1: "Convert PDF to Word Online Free",
    intro: "Need to convert your PDF to an editable Word document? You're in the right place. Our PDF to Word converter is 100% free, requires no registration, and works directly in your browser — your files never leave your computer.",
    steps: [
      { step: 1, title: "Upload Your PDF", desc: "Drag and drop your PDF file or click to browse. No file size limits." },
      { step: 2, title: "Convert Automatically", desc: "Our engine instantly converts your PDF to .docx format while preserving formatting." },
      { step: 3, title: "Download & Edit", desc: "Download your Word document and start editing immediately." },
    ],
    toolLink: "/pdf-to-word",
    toolName: "PDF to Word Converter",
    faqs: [
      { q: "Is this PDF to Word converter really free?", a: "Yes! No hidden costs, no registration, unlimited conversions." },
      { q: "Will my formatting be preserved?", a: "Yes, our converter preserves fonts, tables, images and layout as much as possible." },
      { q: "Are my files safe?", a: "100%. All processing happens in your browser. Files never leave your device." },
    ],
    keywords: ["pdf to word", "pdf to docx", "pdf converter", "free pdf to word", "pdf to word online", "convert pdf to word free"],
  },
  {
    slug: "merge-pdf-files-online",
    title: "Merge PDF Files - Free Online PDF Merger",
    description: "Combine multiple PDF files into one document. Free online PDF merger, no sign up, 100% secure browser-based merging.",
    h1: "Merge PDF Files Online Free",
    intro: "Combine multiple PDF documents into a single file in seconds. Our PDF merger lets you reorder pages, rotate them, and merge unlimited PDFs — all for free, directly in your browser.",
    steps: [
      { step: 1, title: "Upload Your PDFs", desc: "Drag multiple PDF files or select them. No limit on file count." },
      { step: 2, title: "Arrange Pages", desc: "Reorder, rotate or delete pages before merging. Full control." },
      { step: 3, title: "Merge & Download", desc: "Click merge and get your combined PDF instantly." },
    ],
    toolLink: "/merge-pdf",
    toolName: "PDF Merger",
    faqs: [
      { q: "How many PDFs can I merge?", a: "Unlimited. Our tool has no file count restrictions." },
      { q: "Can I reorder pages?", a: "Yes! Drag and drop to reorder, rotate or delete individual pages before merging." },
      { q: "Is my data secure?", a: "Absolutely. All merging happens locally in your browser." },
    ],
    keywords: ["merge pdf", "combine pdf", "pdf merger", "merge pdf files", "join pdf", "combine pdf files online"],
  },
  {
    slug: "compress-pdf-under-1mb",
    title: "Compress PDF File Size - Free Online PDF Compressor",
    description: "Reduce PDF file size without losing quality. Compress PDF to under 1MB free online. No sign up, browser-based.",
    h1: "Compress PDF Files Online Free",
    intro: "Got a PDF that's too large to email or upload? Compress it instantly with our free online PDF compressor. Reduce file size by up to 90% while maintaining quality — all in your browser.",
    steps: [
      { step: 1, title: "Upload Your PDF", desc: "Drag your large PDF file. No size limits." },
      { step: 2, title: "Choose Compression", desc: "Select low, recommended or extreme compression level." },
      { step: 3, title: "Download Compressed PDF", desc: "Get your optimized PDF, ready to share or upload." },
    ],
    toolLink: "/compress-pdf",
    toolName: "PDF Compressor",
    faqs: [
      { q: "How much can I compress a PDF?", a: "Typically 30-90% depending on content. Images compress the most." },
      { q: "Will quality be affected?", a: "Recommended mode keeps quality high. Extreme mode reduces quality for max compression." },
      { q: "Is there a file size limit?", a: "No. Works with any size PDF." },
    ],
    keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "compress pdf free", "pdf size reducer", "smaller pdf"],
  },
  {
    slug: "pdf-to-excel-online-free",
    title: "PDF to Excel Converter - Free Online, No Sign Up",
    description: "Convert PDF tables to Excel spreadsheets free online. Extract data from PDF to XLSX instantly. Browser-based, secure.",
    h1: "Convert PDF to Excel Online Free",
    intro: "Need to extract tables from a PDF into an Excel spreadsheet? Our free PDF to Excel converter does exactly that — no registration, no software, just your browser.",
    steps: [
      { step: 1, title: "Upload PDF", desc: "Drop your PDF containing tables or data." },
      { step: 2, title: "Convert", desc: "Our engine extracts tables and data into Excel format." },
      { step: 3, title: "Download XLSX", desc: "Get your Excel file ready for analysis." },
    ],
    toolLink: "/pdf-to-excel",
    toolName: "PDF to Excel Converter",
    faqs: [
      { q: "Does it handle scanned PDFs?", a: "For best results use text-based PDFs. Scanned PDFs may need OCR first." },
      { q: "Are my financial data safe?", a: "Yes! All conversion happens locally in your browser." },
    ],
    keywords: ["pdf to excel", "pdf to xlsx", "extract pdf table", "convert pdf to excel free", "pdf to spreadsheet"],
  },
  {
    slug: "jpg-to-pdf-multiple-images",
    title: "JPG to PDF Converter - Convert Images to PDF Free",
    description: "Convert JPG, PNG images to PDF online. Combine multiple images into one PDF. Free, no sign up, browser-based.",
    h1: "Convert JPG to PDF Online Free",
    intro: "Turn your images into professional PDF documents. Convert single or multiple JPG, PNG images into one PDF file — perfect for scanned documents, photo albums, and portfolios.",
    steps: [
      { step: 1, title: "Upload Images", desc: "Select one or multiple JPG/PNG files." },
      { step: 2, title: "Arrange Order", desc: "Reorder images as you want them in the PDF." },
      { step: 3, title: "Convert & Download", desc: "Get your PDF instantly." },
    ],
    toolLink: "/jpg-to-pdf",
    toolName: "JPG to PDF Converter",
    faqs: [
      { q: "Can I combine multiple images into one PDF?", a: "Yes! Upload all your images and arrange them in order." },
      { q: "What formats are supported?", a: "JPG, JPEG, PNG, and most common image formats." },
      { q: "Is quality preserved?", a: "Yes, images are embedded at original quality." },
    ],
    keywords: ["jpg to pdf", "image to pdf", "convert jpg to pdf", "png to pdf", "photo to pdf", "images to pdf"],
  },
  {
    slug: "word-to-pdf-online-free",
    title: "Word to PDF Converter - Free Online Conversion",
    description: "Convert Word DOCX to PDF free online. Preserve formatting, fonts, and layout. No sign up, browser-based security.",
    h1: "Convert Word to PDF Online Free",
    intro: "Convert your Word documents to PDF format instantly. Our free Word to PDF converter preserves all formatting, fonts, and images — and everything happens in your browser.",
    steps: [
      { step: 1, title: "Upload Word File", desc: "Select your .docx file." },
      { step: 2, title: "Convert", desc: "Instantly converts to PDF." },
      { step: 3, title: "Download PDF", desc: "Your PDF is ready to share." },
    ],
    toolLink: "/word-to-pdf",
    toolName: "Word to PDF Converter",
    faqs: [
      { q: "Will formatting be preserved?", a: "Yes, fonts, images, tables and layout are preserved." },
      { q: "Is it free?", a: "Completely free, no limits." },
    ],
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf", "word to pdf converter", "doc to pdf"],
  },
  {
    slug: "split-pdf-online-free",
    title: "Split PDF - Free Online PDF Splitter",
    description: "Split PDF pages into separate files free online. Extract specific pages, split by range. No sign up, browser-based.",
    h1: "Split PDF Files Online Free",
    intro: "Need to extract specific pages from a PDF or split a large document into smaller files? Our free PDF splitter makes it easy — choose pages, split, and download instantly.",
    steps: [
      { step: 1, title: "Upload PDF", desc: "Select the PDF you want to split." },
      { step: 2, title: "Choose Split Method", desc: "Split all pages, by range, or select specific pages." },
      { step: 3, title: "Download Files", desc: "Get individual PDFs or a ZIP of all files." },
    ],
    toolLink: "/split-pdf",
    toolName: "PDF Splitter",
    faqs: [
      { q: "Can I extract specific pages?", a: "Yes, choose any pages or ranges to extract." },
      { q: "How many files can I create?", a: "As many as you need. No limits." },
    ],
    keywords: ["split pdf", "pdf splitter", "extract pdf pages", "split pdf online", "separate pdf pages"],
  },
  {
    slug: "unlock-pdf-online-free",
    title: "Unlock PDF - Remove PDF Password Free Online",
    description: "Remove password protection from PDF files free online. Unlock PDF restrictions instantly. No sign up, browser-based.",
    h1: "Unlock PDF Files Online Free",
    intro: "Got a PDF that's password protected or has restrictions? Our free PDF unlocker removes owner passwords and restrictions — all in your browser, with no upload to any server.",
    steps: [
      { step: 1, title: "Upload Protected PDF", desc: "Select your locked PDF file." },
      { step: 2, title: "Enter Password (Optional)", desc: "If you know the password, enter it. Otherwise we'll try to remove restrictions." },
      { step: 3, title: "Download Unlocked PDF", desc: "Get your restriction-free PDF." },
    ],
    toolLink: "/unlock-pdf",
    toolName: "PDF Unlocker",
    faqs: [
      { q: "Can you remove any PDF password?", a: "Owner/restriction passwords can be removed. User passwords (to open) need the correct password." },
      { q: "Is my document secure?", a: "All processing is local. Files never leave your browser." },
    ],
    keywords: ["unlock pdf", "remove pdf password", "pdf password remover", "unlock pdf free", "pdf unlocker"],
  },
  {
    slug: "protect-pdf-with-password",
    title: "Protect PDF - Add Password to PDF Free Online",
    description: "Add password protection to PDF files free online. Encrypt PDF with AES-256. No sign up, browser-based security.",
    h1: "Protect PDF with Password Online Free",
    intro: "Secure your sensitive PDF documents with password protection. Our free PDF protector uses AES-256 encryption — industry standard security — all done in your browser.",
    steps: [
      { step: 1, title: "Upload PDF", desc: "Select the PDF to protect." },
      { step: 2, title: "Set Password", desc: "Create a strong password and set permissions." },
      { step: 3, title: "Download Protected PDF", desc: "Your encrypted PDF is ready." },
    ],
    toolLink: "/protect-pdf",
    toolName: "PDF Protector",
    faqs: [
      { q: "What encryption is used?", a: "AES-256 bit encryption — the same standard used by banks and governments." },
      { q: "Can I set printing restrictions?", a: "Yes, you can control printing, copying, and editing permissions." },
    ],
    keywords: ["protect pdf", "pdf password", "encrypt pdf", "pdf security", "lock pdf", "password protect pdf"],
  },
  {
    slug: "pdf-editor-online-free",
    title: "Edit PDF - Free Online PDF Editor, No Sign Up",
    description: "Edit PDF text and images online free. Modify PDF content directly in your browser. No registration, 100% secure.",
    h1: "Edit PDF Online Free - No Sign Up",
    intro: "Need to make changes to a PDF document? Our free online PDF editor lets you add text and modify content directly in your browser — no downloads, no registration.",
    steps: [
      { step: 1, title: "Upload PDF", desc: "Select the PDF document to edit." },
      { step: 2, title: "Edit Content", desc: "Add text, modify existing content." },
      { step: 3, title: "Download Edited PDF", desc: "Save and download your modified PDF." },
    ],
    toolLink: "/edit-pdf",
    toolName: "PDF Editor",
    faqs: [
      { q: "What can I edit in a PDF?", a: "Add text overlays, annotations, and modify existing content." },
      { q: "Is this a full PDF editor?", a: "It covers common editing needs. For complex layouts, dedicated software may work better." },
    ],
    keywords: ["edit pdf", "pdf editor", "online pdf editor", "free pdf editor", "modify pdf", "edit pdf free"],
  },
  {
    slug: "sign-pdf-online-free",
    title: "Sign PDF - Free Online PDF Signature Tool, No Sign Up",
    description: "Add digital signature to PDF free online. Draw, type or upload your signature. Browser-based, 100% secure.",
    h1: "Sign PDF Documents Online Free",
    intro: "Add your signature to any PDF document in seconds. Draw your signature, type it, or upload an image — all free, all in your browser with no registration.",
    steps: [
      { step: 1, title: "Upload PDF", desc: "Select the document to sign." },
      { step: 2, title: "Create Signature", desc: "Draw, type or upload your signature." },
      { step: 3, title: "Place & Download", desc: "Position your signature and download the signed PDF." },
    ],
    toolLink: "/sign-pdf",
    toolName: "PDF Signer",
    faqs: [
      { q: "Is this legally binding?", a: "This provides a digital signature. For legally binding e-signatures, consult local regulations." },
      { q: "Can I save my signature?", a: "You can upload and reuse a saved signature image." },
    ],
    keywords: ["sign pdf", "pdf signature", "digital signature pdf", "esign pdf", "sign pdf free", "pdf sign online"],
  },
  {
    slug: "rotate-pdf-online-free",
    title: "Rotate PDF Pages - Free Online PDF Rotator",
    description: "Rotate PDF pages online free. Flip individual or all pages. No sign up, browser-based, instant rotation.",
    h1: "Rotate PDF Pages Online Free",
    intro: "Got a PDF with pages in the wrong orientation? Rotate individual pages or all pages at once — 90°, 180°, or 270° — totally free and in your browser.",
    steps: [
      { step: 1, title: "Upload PDF", desc: "Select the PDF with rotated pages." },
      { step: 2, title: "Choose Pages & Rotation", desc: "Select pages and rotate direction." },
      { step: 3, title: "Download Rotated PDF", desc: "Get your correctly oriented PDF." },
    ],
    toolLink: "/rotate-pdf",
    toolName: "PDF Rotator",
    faqs: [
      { q: "Can I rotate individual pages?", a: "Yes, rotate any page independently." },
      { q: "Does rotation affect quality?", a: "No, rotation is lossless." },
    ],
    keywords: ["rotate pdf", "pdf rotator", "rotate pdf pages", "flip pdf", "rotate pdf online"],
  },
  {
    slug: "ocr-pdf-to-text",
    title: "OCR PDF - Extract Text from Scanned PDF Free",
    description: "Extract text from scanned PDFs with OCR free online. Convert image PDFs to searchable text. No sign up, browser-based.",
    h1: "OCR PDF - Extract Text from Scanned PDF Free",
    intro: "Have a scanned document or image-based PDF you need to extract text from? Our free OCR (Optical Character Recognition) tool converts your scanned PDFs into readable, searchable text — right in your browser.",
    steps: [
      { step: 1, title: "Upload Scanned PDF", desc: "Select your image-based or scanned PDF." },
      { step: 2, title: "OCR Processing", desc: "Our OCR engine extracts text from images." },
      { step: 3, title: "Get Editable Text", desc: "Copy or download the extracted text." },
    ],
    toolLink: "/ocr-pdf",
    toolName: "PDF OCR",
    faqs: [
      { q: "How accurate is the OCR?", a: "Accuracy depends on scan quality. Clear, high-resolution scans work best." },
      { q: "What languages are supported?", a: "Multiple languages including Turkish and English." },
    ],
    keywords: ["ocr pdf", "pdf ocr", "scanned pdf to text", "extract text from pdf", "pdf text recognition", "ocr free"],
  },
  {
    slug: "high-quality-pdf-to-jpg",
    title: "PDF to JPG - High Quality Image Conversion Free",
    description: "Convert PDF pages to high quality JPG images free online. Extract single or all pages as images. No sign up, browser-based.",
    h1: "Convert PDF to JPG Images Online Free",
    intro: "Need to extract pages from a PDF as images? Our free PDF to JPG converter creates high-resolution images from your PDF pages — perfect for presentations, social media, and archiving.",
    steps: [
      { step: 1, title: "Upload PDF", desc: "Select your PDF file." },
      { step: 2, title: "Choose Pages", desc: "Convert all pages or specific ones." },
      { step: 3, title: "Download JPGs", desc: "Get high-quality JPG images of each page." },
    ],
    toolLink: "/pdf-to-jpg",
    toolName: "PDF to JPG Converter",
    faqs: [
      { q: "What resolution are the images?", a: "High resolution, suitable for printing and web use." },
      { q: "Can I convert all pages at once?", a: "Yes, every page becomes a separate JPG file." },
    ],
    keywords: ["pdf to jpg", "pdf to image", "convert pdf to jpg", "pdf to png", "pdf page to image", "high quality pdf to jpg"],
  },
  {
    slug: "repair-corrupted-pdf",
    title: "Repair PDF - Fix Corrupted PDF Files Free Online",
    description: "Repair damaged and corrupted PDF files free online. Fix PDFs that won't open. No sign up, browser-based recovery.",
    h1: "Repair Corrupted PDF Files Online Free",
    intro: "Can't open a PDF file? It might be corrupted. Our free PDF repair tool can fix many common PDF corruption issues and recover your document — all in your browser.",
    steps: [
      { step: 1, title: "Upload Damaged PDF", desc: "Select the PDF that won't open." },
      { step: 2, title: "Auto-Detect & Repair", desc: "Our engine detects and fixes common issues." },
      { step: 3, title: "Download Repaired PDF", desc: "Get your recovered PDF file." },
    ],
    toolLink: "/repair-pdf",
    toolName: "PDF Repair Tool",
    faqs: [
      { q: "What kinds of corruption can be fixed?", a: "Structural corruption, header issues, and common file errors." },
      { q: "Is recovery guaranteed?", a: "Not always, but our tool has a high success rate with common corruption." },
    ],
    keywords: ["repair pdf", "fix corrupted pdf", "recover pdf", "broken pdf fix", "pdf repair tool", "pdf error fix"],
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find(p => p.slug === slug);
}

export function getAllLandingSlugs(): string[] {
  return landingPages.map(p => p.slug);
}