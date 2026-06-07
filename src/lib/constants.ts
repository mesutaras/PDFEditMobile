import {
  Merge,
  Split,
  Minimize2,
  RotateCw,
  FileImage,
  Unlock,
  Lock,
  Layers,
  Stamp,
  FileSignature,
  Type,
  FileText,
  FileUp,
  FileDown,
  ScanLine,
  Zap,
  Shield,
  HelpCircle,
  Wrench,
  Scissors,
  Trash2,
  GripVertical,
  Copy,
  PlusCircle,
  Globe,
  BookOpen,
  ImagePlus,
  Table as TableIcon,
  Presentation,
} from "lucide-react";

export interface Tool {
  title: string;
  titleKey: string;
  description: string;
  descKey: string;
  icon: typeof Merge;
  href: string;
  featured?: boolean;
}

export const tools: Tool[] = [
  { title: "Merge PDF", titleKey: "tool_merge_pdf", description: "Combine multiple PDFs into one", descKey: "tool_merge_pdf_desc", icon: Merge, href: "/merge-pdf", featured: true },
  { title: "Split PDF", titleKey: "tool_split_pdf", description: "Separate pages into files", descKey: "tool_split_pdf_desc", icon: Split, href: "/split-pdf", featured: true },
  { title: "Compress PDF", titleKey: "tool_compress_pdf", description: "Reduce file size instantly", descKey: "tool_compress_pdf_desc", icon: Minimize2, href: "/compress-pdf", featured: true },
  { title: "Extract Pages", titleKey: "tool_extract_pages", description: "Extract specific pages from PDF", descKey: "tool_extract_pages_desc", icon: Scissors, href: "/extract-pages" },
  { title: "Delete Pages", titleKey: "tool_delete_pages", description: "Remove unwanted pages from PDF", descKey: "tool_delete_pages_desc", icon: Trash2, href: "/delete-pages" },
  { title: "Reorder Pages", titleKey: "tool_reorder_pages", description: "Change page order of PDF", descKey: "tool_reorder_pages_desc", icon: GripVertical, href: "/reorder-pages" },
  { title: "Rotate PDF", titleKey: "tool_rotate_pdf", description: "Rotate pages any direction", descKey: "tool_rotate_pdf_desc", icon: RotateCw, href: "/rotate-pdf" },
  { title: "Duplicate Pages", titleKey: "tool_duplicate_pages", description: "Copy pages within the same PDF", descKey: "tool_duplicate_pages_desc", icon: Copy, href: "/duplicate-pages" },
  { title: "Insert Pages", titleKey: "tool_insert_pages", description: "Add pages from other PDFs", descKey: "tool_insert_pages_desc", icon: PlusCircle, href: "/insert-pages" },
  { title: "JPG to PDF", titleKey: "tool_jpg_to_pdf", description: "Convert images to PDF", descKey: "tool_jpg_to_pdf_desc", icon: ImagePlus, href: "/jpg-to-pdf", featured: true },
  { title: "PDF to JPG", titleKey: "tool_pdf_to_jpg", description: "Extract images from PDF", descKey: "tool_pdf_to_jpg_desc", icon: FileImage, href: "/pdf-to-jpg" },
  { title: "Word to PDF", titleKey: "tool_word_to_pdf", description: "Convert Word to PDF", descKey: "tool_word_to_pdf_desc", icon: FileUp, href: "/word-to-pdf", featured: true },
  { title: "PDF to Word", titleKey: "tool_pdf_to_word", description: "Convert PDF to Word", descKey: "tool_pdf_to_word_desc", icon: FileText, href: "/pdf-to-word" },
  { title: "Excel to PDF", titleKey: "tool_excel_to_pdf", description: "Convert Excel to PDF", descKey: "tool_excel_to_pdf_desc", icon: TableIcon, href: "/excel-to-pdf" },
  { title: "PDF to Excel", titleKey: "tool_pdf_to_excel", description: "Convert PDF to Excel", descKey: "tool_pdf_to_excel_desc", icon: FileDown, href: "/pdf-to-excel" },
  { title: "PowerPoint to PDF", titleKey: "tool_ppt_to_pdf", description: "Convert PPT to PDF", descKey: "tool_ppt_to_pdf_desc", icon: Presentation, href: "/powerpoint-to-pdf" },
  { title: "PDF to PowerPoint", titleKey: "tool_pdf_to_ppt", description: "Convert PDF to PPT", descKey: "tool_pdf_to_ppt_desc", icon: Presentation, href: "/pdf-to-powerpoint" },
  { title: "HTML to PDF", titleKey: "tool_html_to_pdf", description: "Convert webpage to PDF", descKey: "tool_html_to_pdf_desc", icon: Globe, href: "/html-to-pdf" },
  { title: "PDF to HTML", titleKey: "tool_pdf_to_html", description: "Convert PDF to HTML", descKey: "tool_pdf_to_html_desc", icon: Globe, href: "/pdf-to-html" },
  { title: "Text to PDF", titleKey: "tool_text_to_pdf", description: "Convert text to PDF", descKey: "tool_text_to_pdf_desc", icon: FileText, href: "/text-to-pdf" },
  { title: "PDF to Text", titleKey: "tool_pdf_to_text", description: "Extract text from PDF", descKey: "tool_pdf_to_text_desc", icon: FileText, href: "/pdf-to-text" },
  { title: "EPUB to PDF", titleKey: "tool_epub_to_pdf", description: "Convert EPUB to PDF", descKey: "tool_epub_to_pdf_desc", icon: BookOpen, href: "/epub-to-pdf" },
  { title: "PDF to EPUB", titleKey: "tool_pdf_to_epub", description: "Convert PDF to EPUB", descKey: "tool_pdf_to_epub_desc", icon: BookOpen, href: "/pdf-to-epub" },
  { title: "Unlock PDF", titleKey: "tool_unlock_pdf", description: "Remove PDF passwords", descKey: "tool_unlock_pdf_desc", icon: Unlock, href: "/unlock-pdf" },
  { title: "Protect PDF", titleKey: "tool_protect_pdf", description: "Secure with password", descKey: "tool_protect_pdf_desc", icon: Lock, href: "/protect-pdf" },
  { title: "Organize PDF", titleKey: "tool_organize_pdf", description: "Reorder & delete pages", descKey: "tool_organize_pdf_desc", icon: Layers, href: "/organize-pdf" },
  { title: "Watermark", titleKey: "tool_watermark", description: "Add text watermarks", descKey: "tool_watermark_desc", icon: Stamp, href: "/watermark-pdf" },
  { title: "Sign PDF", titleKey: "tool_sign_pdf", description: "Add digital signature", descKey: "tool_sign_pdf_desc", icon: FileSignature, href: "/sign-pdf" },
  { title: "Edit PDF", titleKey: "tool_edit_pdf", description: "Modify PDF content", descKey: "tool_edit_pdf_desc", icon: Type, href: "/edit-pdf" },
  { title: "OCR PDF", titleKey: "tool_ocr_pdf", description: "Extract text from scans", descKey: "tool_ocr_pdf_desc", icon: ScanLine, href: "/ocr-pdf" },
  { title: "Repair PDF", titleKey: "tool_repair_pdf", description: "Fix corrupted PDF files", descKey: "tool_repair_pdf_desc", icon: Wrench, href: "/repair-pdf" },
  { title: "Edit Metadata", titleKey: "tool_edit_metadata", description: "Edit PDF properties", descKey: "tool_edit_metadata_desc", icon: FileText, href: "/edit-metadata" },
];

export const features = [
  { icon: Zap, title: "Lightning Fast", description: "Process files in seconds with our optimized engine", titleKey: "features_lightning_fast", descKey: "features_lightning_fast_desc" },
  { icon: Shield, title: "100% Secure", description: "Files processed locally, never uploaded to servers", titleKey: "features_secure", descKey: "features_secure_desc" },
  { icon: Globe, title: "Works Anywhere", description: "Use on any device, any browser, anytime", titleKey: "features_works_anywhere", descKey: "features_works_anywhere_desc" },
];

export const stats = [
  { value: "Secure", label: "Local Processing", valueKey: "stats_secure", labelKey: "stats_local_processing" },
  { value: "Fast", label: "Optimized Engine", valueKey: "stats_fast", labelKey: "stats_optimized_engine" },
  { value: "0", label: "Data Stored", valueKey: "stats_zero_data", labelKey: "stats_data_stored" },
  { value: "Free", label: "Accessibility", valueKey: "stats_free", labelKey: "stats_accessibility" },
];

export const aboutSocials = [
  { name: "Email", href: "mailto:info@pdfeditmobile.com", label: "info@pdfeditmobile.com", color: "hover:bg-red-50 hover:text-red-600 hover:border-red-200" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in//", label: "linkedin.com/in/arshvermadev", color: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" },
  { name: "GitHub", href: "https://github.com/", label: "github.com/ArshVermaGit", color: "hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300" },
  { name: "X (Twitter)", href: "https://x.com/", label: "x.com/", color: "hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300" },
];

export const aboutSkills = [
  { label: "Game Development", detail: "Unity & C#" },
  { label: "Web Development", detail: "Full-Stack Apps" },
  { label: "App Development", detail: "Cross-Platform" },
  { label: "Digital Creation", detail: "UI/UX Design" },
];

export const contactMethods = [
  { name: "Email", description: "Best for detailed inquiries", value: "info@pdfeditmobile.com", href: "mailto:info@pdfeditmobile.com", color: "hover:bg-red-50 hover:border-red-200" },
  { name: "X (Twitter)", description: "Quick questions & updates", value: "@TheArshVerma", href: "https://x.com/", color: "hover:bg-gray-100 hover:border-gray-300" },
  { name: "LinkedIn", description: "Professional inquiries", value: "linkedin.com/in/", href: "https://www.linkedin.com/in//", color: "hover:bg-blue-50 hover:border-blue-200" },
  { name: "GitHub", description: "Bug reports & contributions", value: "github.com/", href: "https://github.com/", color: "hover:bg-gray-100 hover:border-gray-300" },
];

export const contactFaqs = [
  { q: "How quickly will I get a response?", a: "I typically respond within 24-48 hours for email inquiries. For urgent matters, Twitter/X DMs usually get faster responses." },
  { q: "Can I request new features?", a: "Absolutely! I love hearing feature suggestions. Send them via email or create an issue on GitHub." },
  { q: "Is PDFEditMobile open source?", a: "The core functionality uses open-source libraries. For full source access or collaboration opportunities, please reach out directly." },
];

export const faqCategories = [
  {
    title: "General Questions",
    icon: HelpCircle,
    faqs: [
      { question: "What is PDFEditMobile?", answer: "PDFEditMobile is a free online tool that lets you work with PDF files directly in your browser. You can merge, split, compress, convert, rotate, and edit PDFs without uploading them to any server. All processing happens locally on your device for maximum privacy and speed." },
      { question: "Is PDFEditMobile really free?", answer: "Yes, PDFEditMobile is completely free to use with no hidden costs. All features are available at no charge. We sustain the service through non-intrusive advertising. There are no premium tiers, file limits, or watermarks on your documents." },
      { question: "Do I need to create an account?", answer: "No account is required to use any of our PDF tools. You can optionally sign in with Google to keep a history of your actions across sessions, but this is completely optional. All core features work without signing in." },
      { question: "What file size limits are there?", answer: "Since all processing happens in your browser, file limits depend on your device's available memory. Most modern devices can handle files up to 100MB without issues. For very large files (100MB+), performance may vary based on your device." },
      { question: "What browsers are supported?", answer: "PDFEditMobile works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version of your browser for the best experience. Mobile browsers are also fully supported." },
    ],
  },
  {
    title: "Privacy & Security",
    icon: Shield,
    faqs: [
      { question: "Are my files uploaded to your servers?", answer: "No, your files are NEVER uploaded to our servers. All PDF processing happens entirely in your web browser using JavaScript. This means your sensitive documents never leave your device, ensuring complete privacy and security." },
      { question: "Is PDFEditMobile safe to use for sensitive documents?", answer: "Yes, PDFEditMobile is extremely safe for sensitive documents. Since we process everything locally in your browser, confidential information like contracts, financial documents, or personal records never leave your computer. Your data stays on your device." },
      { question: "What happens to my files after processing?", answer: "Your files exist only in your browser's memory while you're using the tool. When you close the tab or navigate away, all file data is automatically cleared. We don't store, cache, or have any access to your documents." },
      { question: "Do you use cookies?", answer: "We use minimal cookies for essential functionality (like remembering theme preferences) and analytics to improve our service. We also use Google AdSense cookies for advertising. You can manage cookie preferences through your browser settings." },
    ],
  },
  {
    title: "PDF Tools",
    icon: FileText,
    faqs: [
      { question: "How do I merge multiple PDFs?", answer: "Go to the Merge PDF tool, drag and drop your PDF files or click to browse and select them. You can reorder files by dragging them into your preferred order. You can also expand each file to see pages, rotate or remove specific pages. When ready, click 'Merge & Download' to combine them into a single PDF." },
      { question: "How do I split a PDF into multiple files?", answer: "Use the Split PDF tool. Upload your PDF, then choose how to split: by specific page ranges (e.g., '1-5, 8-10'), extract all pages as separate files, or select specific pages visually. Click 'Split PDF' to process and download your split files." },
      { question: "How does PDF compression work?", answer: "Our compression tool optimizes your PDF by removing redundant data, optimizing images, and streamlining the file structure. The compression maintains document quality while reducing file size, typically achieving 30-70% size reduction depending on the original file's content." },
      { question: "Can I convert scanned PDFs to editable text?", answer: "Yes! Our OCR (Optical Character Recognition) tool can extract text from scanned documents and image-based PDFs. Upload your scanned PDF, and our tool will process it to extract readable, searchable text. The accuracy depends on the scan quality." },
      { question: "How do I add a password to my PDF?", answer: "Use the Protect PDF tool. Upload your PDF, enter your desired password, and optionally set permissions (like preventing printing or copying). The tool will encrypt your PDF with industry-standard AES encryption." },
      { question: "What image formats can I convert to PDF?", answer: "Our JPG to PDF tool supports JPG, JPEG, PNG, and other common image formats. You can upload multiple images and combine them into a single PDF, or convert each image to its own PDF file." },
    ],
  },
  {
    title: "Troubleshooting",
    icon: Zap,
    faqs: [
      { question: "Why is processing taking a long time?", answer: "Processing time depends on your file size and your device's capabilities. Large PDFs with many pages or high-resolution images take longer. If processing seems stuck, try refreshing the page and using a smaller file, or try on a device with more RAM." },
      { question: "Why can't I upload my PDF?", answer: "Make sure your file has a .pdf extension and is a valid PDF document. Some PDFs may be corrupted or use unsupported features. If the file opens in other PDF readers, try saving it as a new PDF and uploading the new copy." },
      { question: "The output PDF looks different from the original", answer: "PDF processing can sometimes affect formatting, especially for complex documents with special fonts or interactive elements. For best results, use source PDFs that are print-ready. If you're having issues, try using a different tool or contact us." },
      { question: "My protected PDF won't unlock", answer: "Our unlock tool can only remove restrictions (like no-printing) from PDFs. If the PDF requires a password to open (fully encrypted), you'll need to enter the correct password. We cannot bypass password protection without the password." },
      { question: "The download didn't start", answer: "Check if your browser is blocking downloads or pop-ups. Try using a different browser. If the issue persists, make sure you have enough disk space and try right-clicking the download button and selecting 'Save As'." },
    ],
  },
];