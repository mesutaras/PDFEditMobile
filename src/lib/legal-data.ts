import {
  Eye,
  Server,
  Cookie,
  Shield,
  Users,
  Lock,
  Mail,
  AlertTriangle,
  FileText,
  Scale,
  Globe,
  Gavel,
  Settings,
  Info,
} from "lucide-react";

type LegalSection = { icon: typeof Eye; title: string; content: string };

interface LegalData {
  privacySections: LegalSection[];
  termsSections: LegalSection[];
  cookieSections: LegalSection[];
  disclaimerSections: LegalSection[];
}

const legalData: Record<"en" | "tr", LegalData> = {
  en: {
    privacySections: [
      {
        icon: Eye,
        title: "Information We Collect",
        content: `PDFEditMobile is designed with privacy as a core principle. We collect minimal information:

**Automatically Collected:**
- Basic analytics data (page views, browser type, device type) through cookies
- IP addresses for analytics and fraud prevention
- Error logs to improve our service

**What We DON'T Collect:**
- Your PDF files or their contents
- Personal documents or data within your files
- Any file metadata

All PDF processing happens directly in your browser. Your files never leave your device or get uploaded to our servers.`,
      },
      {
        icon: Server,
        title: "How We Process Your Files",
        content: `**100% Browser-Based Processing**

Unlike other PDF tools, PDFEditMobile processes all files locally in your web browser using JavaScript. This means:

- Your files are NEVER uploaded to any server
- Processing happens entirely on your device
- Files are automatically cleared from browser memory when you close the tab
- No copies of your documents are ever made or stored

This architecture ensures complete privacy and security for sensitive documents like contracts, financial statements, or personal records.`,
      },
      {
        icon: Cookie,
        title: "Cookies and Tracking Technologies",
        content: `We and our advertising partners use cookies, web beacons, and similar technologies for:

**Essential Cookies:**
- Session management and user preferences
- Authentication state (if you sign in with Google)

**Analytics Cookies:**
- Google Analytics to understand how visitors use our site
- This helps us improve the user experience

**Advertising Cookies:**
- Google AdSense to display advertisements on our site
- Third parties, including Google, use cookies to serve ads based on your prior visits to this website or other websites
- These cookies enable Google and its partners to serve ads based on your visit to our site and/or other sites on the Internet

**How Google Uses Your Data:**
When you visit our site, third parties including Google may place and read cookies on your browser, or use web beacons to collect information. To learn more about how Google uses data when you use our site, visit: https://policies.google.com/technologies/partner-sites

**Managing Cookie Preferences:**
You can control cookie preferences through your browser settings. You may also opt out of personalized advertising by visiting Google's Ads Settings (https://adssettings.google.com) or by visiting https://www.aboutads.info to opt out of third-party advertising cookies. Disabling cookies may affect some functionality.`,
      },
      {
        icon: Shield,
        title: "Third-Party Services & Advertising",
        content: `We integrate with the following third-party services:

**Google AdSense (Advertising):**
- We use Google AdSense to display advertisements
- Google and its partners use cookies to serve ads based on your prior visits to this or other websites
- You may opt out of personalized advertising by visiting Google's Ads Settings
- For more information about how Google collects and uses data, see: https://policies.google.com/technologies/partner-sites

**Google Analytics:**
- Used for website analytics and understanding user behavior
- Google's privacy policy applies to data collected through Analytics
- We use analytics to improve our service, not for advertising purposes

**Google Sign-In:**
- Optional authentication service
- We only receive your name, email, and profile picture when you choose to sign in
- We do not sell, trade, or transfer your personal information

**Interest-Based Advertising:**
We participate in interest-based advertising using Google AdSense. This means ads may be tailored based on your browsing history. You can learn more about this type of advertising and your choices at:
- Digital Advertising Alliance: https://www.aboutads.info
- Network Advertising Initiative: https://www.networkadvertising.org`,
      },
      {
        icon: Users,
        title: "Children's Privacy (COPPA Compliance)",
        content: `**Age Restriction:**
PDFEditMobile is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13.

**COPPA Compliance:**
In compliance with the Children's Online Privacy Protection Act (COPPA):
- We do not target or collect data from users under 13 years of age
- We do not use interest-based advertising to target children under 13
- If we become aware that we have inadvertently collected personal information from a child under 13, we will take steps to delete that information

**Parental Rights:**
If you are a parent or guardian and believe your child has provided us with personal information, please contact us at info@pdfeditmobile.comso we can delete the information.

**Note for Parents:**
We recommend parents supervise their children's online activities and consider using parental control tools available from online services and software manufacturers.`,
      },
      {
        icon: Lock,
        title: "Data Security",
        content: `We implement security measures to protect your information:

- HTTPS encryption for all data transmission
- No server-side storage of user files
- Regular security audits of our codebase
- Secure authentication through Google OAuth

Since files are processed locally in your browser, the primary security consideration is your own device's security.`,
      },
      {
        icon: Mail,
        title: "Your Rights & Choices",
        content: `You have the right to:

**Access:** Request information about data we hold about you
**Deletion:** Request deletion of your account and associated data
**Opt-out:** Disable cookies and tracking through browser settings
**Portability:** Export your history data (if signed in)
**Advertising Opt-out:** Opt out of personalized advertising through Google's Ads Settings

**For EU/EEA Users (GDPR):**
You have additional rights including the right to object to processing, right to rectification, and right to lodge a complaint with a supervisory authority.

**For California Users (CCPA):**
You have the right to know what personal information is collected, request deletion, and opt-out of the sale of personal information (we do not sell personal information).

To exercise any of these rights, contact us at: info@pdfeditmobile.com`,
      },
      {
        icon: AlertTriangle,
        title: "Policy Updates",
        content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

**Contact Us:**
If you have any questions about this Privacy Policy, please contact us at:
- Email: info@pdfeditmobile.com
- Website: https://pdfeditmobile.com/contact`,
      },
    ],
    termsSections: [
      {
        icon: FileText,
        title: "1. Acceptance of Terms",
        content: `By accessing and using PDFEditMobile ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.

These terms apply to all visitors, users, and others who access or use the Service. We reserve the right to modify these terms at any time. Continued use of the Service after any changes constitutes acceptance of the new terms.`,
      },
      {
        icon: Globe,
        title: "2. Description of Service",
        content: `PDFEditMobile provides free online tools for PDF manipulation, including but not limited to:

• Merging multiple PDF files into one document
• Splitting PDF documents into separate files
• Compressing PDF files to reduce size
• Converting between PDF and other formats (JPG, Word, Excel)
• Rotating, organizing, and editing PDF pages
• Adding watermarks and signatures to PDFs
• Password protecting and unlocking PDFs
• Extracting text from scanned documents (OCR)

**Important:** All file processing occurs locally in your web browser. Files are not uploaded to our servers.`,
      },
      {
        icon: Users,
        title: "3. User Responsibilities",
        content: `When using PDFEditMobile, you agree to:

**Lawful Use:**
• Use the Service only for lawful purposes
• Not process documents that infringe on others' intellectual property rights
• Not use the Service to create, distribute, or process illegal content

**Appropriate Conduct:**
• Not attempt to interfere with or disrupt the Service
• Not attempt to access systems or data you're not authorized to access
• Not use automated systems or software to extract data from the Service

**Your Files:**
• You are solely responsible for the files you process
• You must have the legal right to modify any documents you upload
• We are not responsible for the content of your files`,
      },
      {
        icon: Scale,
        title: "4. Intellectual Property",
        content: `**Our Content:**
The PDFEditMobile name, logo, and all associated graphics, code, and content are protected by intellectual property laws. You may not copy, modify, or distribute our proprietary content without written permission.

**Your Content:**
You retain all rights to your PDF files and documents. By using our Service, you do not grant us any rights to your content. Since all processing happens in your browser, we never have access to your files.

**Open Source:**
PDFEditMobile uses various open-source libraries. These libraries retain their respective licenses and attributions.`,
      },
      {
        icon: AlertTriangle,
        title: "5. Disclaimer of Warranties",
        content: `**AS-IS Service:**
PDFEditMobile is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to:

• Implied warranties of merchantability
• Fitness for a particular purpose
• Non-infringement
• Accuracy or completeness of results

**No Guarantees:**
We do not guarantee that:
• The Service will be uninterrupted or error-free
• Results will meet your specific requirements
• Any errors will be corrected
• The Service will be compatible with all systems

**Backup Responsibility:**
Always keep backup copies of your original files. We are not responsible for any data loss.`,
      },
      {
        icon: Gavel,
        title: "6. Limitation of Liability",
        content: `**Maximum Liability:**
To the maximum extent permitted by law, PDFEditMobile and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:

• Loss of profits or revenue
• Loss of data or documents
• Business interruption
• Any other intangible losses

This applies regardless of whether we were advised of the possibility of such damages.

**Your Sole Remedy:**
Your sole remedy for dissatisfaction with the Service is to stop using it.`,
      },
      {
        icon: FileText,
        title: "7. Modifications to Service",
        content: `We reserve the right to:

• Modify or discontinue any part of the Service at any time
• Update features, tools, or functionality without notice
• Change these Terms of Service with notice posted on this page

We are not liable to you or any third party for any modification, suspension, or discontinuance of the Service.`,
      },
      {
        icon: Globe,
        title: "8. Governing Law",
        content: `These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.

Any disputes arising from these terms or your use of the Service shall be resolved in the courts of India.

If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full effect.`,
      },
    ],
    cookieSections: [
      {
        icon: Eye,
        title: "What are cookies?",
        content:
          "Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.",
      },
      {
        icon: Shield,
        title: "How we use cookies",
        content:
          "We use cookies to provide essential website functionality, analyze site traffic, and serve personalized advertisements through Google AdSense. Some cookies are necessary for the site to function, while others help us improve your experience.",
      },
      {
        icon: Settings,
        title: "Managing cookies",
        content:
          "You can manage your cookie preferences through your browser settings. Most browsers allow you to block or delete cookies, but doing so may affect certain features of the website.",
      },
    ],
    disclaimerSections: [
      {
        icon: Info,
        title: "General Information",
        content: `The information provided by PDFEditMobile ("we," "us," or "our") on our website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.`,
      },
      {
        icon: Shield,
        title: "No Liability",
        content: `Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.`,
      },
      {
        icon: Scale,
        title: "Local Processing",
        content: `PDFEditMobile processes all files locally in your browser. While this provides enhanced privacy, we are not responsible for any data loss, file corruption, or security breaches that may occur on your device or as a result of your browser's configuration.`,
      },
    ],
  },
  tr: {
    privacySections: [
      {
        icon: Eye,
        title: "Topladığımız Bilgiler",
        content: `PDFEditMobile, gizliliği temel bir ilke olarak benimseyerek tasarlanmıştır. Minimum düzeyde bilgi topluyoruz:

**Otomatik Olarak Toplananlar:**
- Çerezler aracılığıyla temel analitik verileri (sayfa görüntülemeleri, tarayıcı türü, cihaz türü)
- Analitik ve dolandırıcılık önleme için IP adresleri
- Hizmetimizi iyileştirmek için hata günlükleri

**TOPLAMADIKLARIMIZ:**
- PDF dosyalarınız veya içerikleri
- Dosyalarınızdaki kişisel belgeler veya veriler
- Herhangi bir dosya meta verisi

Tüm PDF işlemleri doğrudan tarayıcınızda gerçekleşir. Dosyalarınız asla cihazınızdan çıkmaz veya sunucularımıza yüklenmez.`,
      },
      {
        icon: Server,
        title: "Dosyalarınızı Nasıl İşliyoruz",
        content: `**%100 Tarayıcı Tabanlı İşleme**

Diğer PDF araçlarının aksine, PDFEditMobile tüm dosyaları web tarayıcınızda JavaScript kullanarak yerel olarak işler. Bu şu anlama gelir:

- Dosyalarınız ASLA hiçbir sunucuya yüklenmez
- İşleme tamamen cihazınızda gerçekleşir
- Sekmeyi kapattığınızda dosyalar tarayıcı belleğinden otomatik olarak temizlenir
- Belgelerinizin hiçbir kopyası asla oluşturulmaz veya saklanmaz

Bu mimari, sözleşmeler, finansal tablolar veya kişisel kayıtlar gibi hassas belgeler için tam gizlilik ve güvenlik sağlar.`,
      },
      {
        icon: Cookie,
        title: "Çerezler ve İzleme Teknolojileri",
        content: `Biz ve reklam ortaklarımız, aşağıdakiler için çerezler, web işaretçileri ve benzer teknolojiler kullanırız:

**Zorunlu Çerezler:**
- Oturum yönetimi ve kullanıcı tercihleri
- Kimlik doğrulama durumu (Google ile giriş yaparsanız)

**Analitik Çerezleri:**
- Ziyaretçilerin sitemizi nasıl kullandığını anlamak için Google Analytics
- Bu, kullanıcı deneyimini iyileştirmemize yardımcı olur

**Reklam Çerezleri:**
- Sitemizde reklam göstermek için Google AdSense
- Google dahil üçüncü taraflar, bu web sitesine veya diğer web sitelerine önceki ziyaretlerinize dayanarak reklam sunmak için çerezler kullanır
- Bu çerezler, Google ve ortaklarının sitemizi ve/veya internetteki diğer siteleri ziyaretinize dayalı reklamlar sunmasını sağlar

**Google Verilerinizi Nasıl Kullanır:**
Sitemizi ziyaret ettiğinizde, Google dahil üçüncü taraflar tarayıcınıza çerez yerleştirebilir ve okuyabilir veya bilgi toplamak için web işaretçileri kullanabilir. Google'ın sitemizi kullandığınızda verileri nasıl kullandığı hakkında daha fazla bilgi için: https://policies.google.com/technologies/partner-sites

**Çerez Tercihlerini Yönetme:**
Tarayıcı ayarlarınızdan çerez tercihlerini kontrol edebilirsiniz. Ayrıca Google'ın Reklam Ayarları'nı (https://adssettings.google.com) ziyaret ederek veya üçüncü taraf reklam çerezlerinden çıkmak için https://www.aboutads.info adresini ziyaret ederek kişiselleştirilmiş reklamlardan çıkabilirsiniz. Çerezleri devre dışı bırakmak bazı işlevleri etkileyebilir.`,
      },
      {
        icon: Shield,
        title: "Üçüncü Taraf Hizmetleri ve Reklamcılık",
        content: `Aşağıdaki üçüncü taraf hizmetleriyle entegrasyon sağlıyoruz:

**Google AdSense (Reklamcılık):**
- Reklam göstermek için Google AdSense kullanıyoruz
- Google ve ortakları, bu veya diğer web sitelerine önceki ziyaretlerinize dayanarak reklam sunmak için çerezler kullanır
- Google'ın Reklam Ayarları'nı ziyaret ederek kişiselleştirilmiş reklamlardan çıkabilirsiniz
- Google'ın verileri nasıl topladığı ve kullandığı hakkında daha fazla bilgi için: https://policies.google.com/technologies/partner-sites

**Google Analytics:**
- Web sitesi analitiği ve kullanıcı davranışını anlamak için kullanılır
- Analytics aracılığıyla toplanan verilere Google'ın gizlilik politikası uygulanır
- Analitiği reklam amaçlı değil, hizmetimizi iyileştirmek için kullanıyoruz

**Google Girişi:**
- İsteğe bağlı kimlik doğrulama hizmeti
- Giriş yapmayı seçtiğinizde yalnızca adınızı, e-postanızı ve profil resminizi alırız
- Kişisel bilgilerinizi satmıyor, takas etmiyor veya transfer etmiyoruz

**İlgi Alanına Dayalı Reklamcılık:**
Google AdSense kullanarak ilgi alanına dayalı reklamcılığa katılıyoruz. Bu, reklamların tarama geçmişinize göre uyarlanabileceği anlamına gelir. Bu tür reklamcılık ve seçenekleriniz hakkında daha fazla bilgiyi şu adreslerde bulabilirsiniz:
- Digital Advertising Alliance: https://www.aboutads.info
- Network Advertising Initiative: https://www.networkadvertising.org`,
      },
      {
        icon: Users,
        title: "Çocukların Gizliliği (COPPA Uyumluluğu)",
        content: `**Yaş Sınırlaması:**
PDFEditMobile, 13 yaşın altındaki çocuklara yönelik değildir. 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamıyoruz.

**COPPA Uyumluluğu:**
Çocukların Çevrimiçi Gizliliğini Koruma Yasası'na (COPPA) uygun olarak:
- 13 yaşın altındaki kullanıcıları hedeflemiyor veya onlardan veri toplamıyoruz
- 13 yaşın altındaki çocukları hedeflemek için ilgi alanına dayalı reklamcılık kullanmıyoruz
- 13 yaşın altındaki bir çocuktan yanlışlıkla kişisel bilgi topladığımızı fark edersek, bu bilgileri silmek için adımlar atacağız

**Ebeveyn Hakları:**
Ebeveyn veya vasi iseniz ve çocuğunuzun bize kişisel bilgilerini verdiğine inanıyorsanız, bilgileri silebilmemiz için lütfen info@pdfeditmobile.com adresinden bizimle iletişime geçin.

**Ebeveynler İçin Not:**
Ebeveynlerin çocuklarının çevrimiçi aktivitelerini denetlemelerini ve çevrimiçi hizmetlerden ve yazılım üreticilerinden temin edilebilen ebeveyn kontrol araçlarını kullanmayı düşünmelerini öneririz.`,
      },
      {
        icon: Lock,
        title: "Veri Güvenliği",
        content: `Bilgilerinizi korumak için güvenlik önlemleri uyguluyoruz:

- Tüm veri iletimi için HTTPS şifrelemesi
- Kullanıcı dosyalarının sunucu tarafında depolanmaması
- Kod tabanımızın düzenli güvenlik denetimleri
- Google OAuth aracılığıyla güvenli kimlik doğrulama

Dosyalar tarayıcınızda yerel olarak işlendiğinden, birincil güvenlik hususu kendi cihazınızın güvenliğidir.`,
      },
      {
        icon: Mail,
        title: "Haklarınız ve Seçenekleriniz",
        content: `Aşağıdaki haklara sahipsiniz:

**Erişim:** Hakkınızda tuttuğumuz veriler hakkında bilgi talep etme
**Silme:** Hesabınızın ve ilişkili verilerin silinmesini talep etme
**Çıkış:** Tarayıcı ayarlarından çerezleri ve izlemeyi devre dışı bırakma
**Taşınabilirlik:** Geçmiş verilerinizi dışa aktarma (giriş yaptıysanız)
**Reklam Çıkışı:** Google'ın Reklam Ayarları aracılığıyla kişiselleştirilmiş reklamlardan çıkma

**AB/AEA Kullanıcıları İçin (GDPR):**
İşlemeye itiraz etme hakkı, düzeltme hakkı ve bir denetim makamına şikayette bulunma hakkı dahil ek haklara sahipsiniz.

**California Kullanıcıları İçin (CCPA):**
Hangi kişisel bilgilerin toplandığını bilme, silme talep etme ve kişisel bilgilerin satışından çıkma hakkına sahipsiniz (kişisel bilgi satmıyoruz).

Bu haklardan herhangi birini kullanmak için şu adresten bizimle iletişime geçin: info@pdfeditmobile.com`,
      },
      {
        icon: AlertTriangle,
        title: "Politika Güncellemeleri",
        content: `Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikleri, yeni Gizlilik Politikasını bu sayfada yayınlayarak ve "Son güncelleme" tarihini güncelleyerek size bildireceğiz.

Değişiklikler için bu Gizlilik Politikasını periyodik olarak gözden geçirmeniz önerilir. Bu Gizlilik Politikasındaki değişiklikler, bu sayfada yayınlandıkları anda yürürlüğe girer.

**Bize Ulaşın:**
Bu Gizlilik Politikası hakkında sorularınız varsa, lütfen bizimle iletişime geçin:
- E-posta: info@pdfeditmobile.com
- Web sitesi: https://pdfeditmobile.com/contact`,
      },
    ],
    termsSections: [
      {
        icon: FileText,
        title: "1. Şartların Kabulü",
        content: `PDFEditMobile'ı ("Hizmet") kullanarak, bu Kullanım Şartlarını kabul etmiş ve bunlara bağlı kalmayı taahhüt etmiş olursunuz. Bu şartları kabul etmiyorsanız, lütfen Hizmetimizi kullanmayın.

Bu şartlar, Hizmete erişen veya Hizmeti kullanan tüm ziyaretçiler, kullanıcılar ve diğer kişiler için geçerlidir. Bu şartları herhangi bir zamanda değiştirme hakkını saklı tutarız. Herhangi bir değişiklikten sonra Hizmeti kullanmaya devam etmek, yeni şartların kabulü anlamına gelir.`,
      },
      {
        icon: Globe,
        title: "2. Hizmetin Tanımı",
        content: `PDFEditMobile, aşağıdakiler dahil ancak bunlarla sınırlı olmamak üzere PDF düzenleme için ücretsiz çevrimiçi araçlar sağlar:

• Birden fazla PDF dosyasını tek bir belgede birleştirme
• PDF belgelerini ayrı dosyalara bölme
• PDF dosyalarını boyutunu azaltmak için sıkıştırma
• PDF ve diğer formatlar (JPG, Word, Excel) arasında dönüştürme
• PDF sayfalarını döndürme, düzenleme ve düzenleme
• PDF'lere filigran ve imza ekleme
• PDF'leri şifreyle koruma ve kilit açma
• Taranmış belgelerden metin çıkarma (OCR)

**Önemli:** Tüm dosya işlemleri web tarayıcınızda yerel olarak gerçekleşir. Dosyalar sunucularımıza yüklenmez.`,
      },
      {
        icon: Users,
        title: "3. Kullanıcı Sorumlulukları",
        content: `PDFEditMobile'ı kullanırken aşağıdakileri kabul edersiniz:

**Yasal Kullanım:**
• Hizmeti yalnızca yasal amaçlar için kullanma
• Başkalarının fikri mülkiyet haklarını ihlal eden belgeleri işlememe
• Hizmeti yasadışı içerik oluşturmak, dağıtmak veya işlemek için kullanmama

**Uygun Davranış:**
• Hizmete müdahale etmeye veya Hizmeti kesintiye uğratmaya çalışmama
• Erişim yetkiniz olmayan sistemlere veya verilere erişmeye çalışmama
• Hizmetten veri çıkarmak için otomatik sistemler veya yazılımlar kullanmama

**Dosyalarınız:**
• İşlediğiniz dosyalardan yalnızca siz sorumlusunuz
• Yüklediğiniz belgeleri değiştirmek için yasal hakka sahip olmalısınız
• Dosyalarınızın içeriğinden sorumlu değiliz`,
      },
      {
        icon: Scale,
        title: "4. Fikri Mülkiyet",
        content: `**İçeriğimiz:**
PDFEditMobile adı, logosu ve ilişkili tüm grafikler, kod ve içerik fikri mülkiyet yasalarıyla korunmaktadır. Özel içeriğimizi yazılı izin olmadan kopyalayamaz, değiştiremez veya dağıtamazsınız.

**İçeriğiniz:**
PDF dosyalarınız ve belgeleriniz üzerindeki tüm haklarınızı saklı tutarsınız. Hizmetimizi kullanarak, içeriğiniz üzerinde bize herhangi bir hak vermiş olmazsınız. Tüm işlemler tarayıcınızda gerçekleştiğinden, dosyalarınıza asla erişimimiz olmaz.

**Açık Kaynak:**
PDFEditMobile çeşitli açık kaynak kütüphaneler kullanır. Bu kütüphaneler kendi lisanslarını ve atıflarını korur.`,
      },
      {
        icon: AlertTriangle,
        title: "5. Garanti Reddi",
        content: `**OLDUĞU GİBİ Hizmet:**
PDFEditMobile, aşağıdakiler dahil ancak bunlarla sınırlı olmamak üzere, açık veya zımni hiçbir garanti olmaksızın "OLDUĞU GİBİ" ve "MEVCUT OLDUĞU ŞEKİLDE" sunulur:

• Zımni ticari elverişlilik garantileri
• Belirli bir amaca uygunluk
• İhlal etmeme
• Sonuçların doğruluğu veya eksiksizliği

**Garanti Yok:**
Aşağıdakileri garanti etmiyoruz:
• Hizmetin kesintisiz veya hatasız olacağını
• Sonuçların özel gereksinimlerinizi karşılayacağını
• Hataların düzeltileceğini
• Hizmetin tüm sistemlerle uyumlu olacağını

**Yedekleme Sorumluluğu:**
Orijinal dosyalarınızın yedek kopyalarını her zaman saklayın. Veri kaybından sorumlu değiliz.`,
      },
      {
        icon: Gavel,
        title: "6. Sorumluluk Sınırlaması",
        content: `**Azami Sorumluluk:**
Yasaların izin verdiği azami ölçüde, PDFEditMobile ve oluşturucuları, aşağıdakiler dahil ancak bunlarla sınırlı olmamak üzere dolaylı, arızi, özel, sonuç olarak ortaya çıkan veya cezai tazminatlardan sorumlu olmayacaktır:

• Kar veya gelir kaybı
• Veri veya belge kaybı
• İş kesintisi
• Diğer maddi olmayan kayıplar

Bu, bu tür zararların olasılığı konusunda bilgilendirilmiş olsak bile geçerlidir.

**Tek Çözümünüz:**
Hizmetten memnun kalmamanız durumunda tek çözümünüz Hizmeti kullanmayı bırakmaktır.`,
      },
      {
        icon: FileText,
        title: "7. Hizmette Değişiklikler",
        content: `Aşağıdaki hakları saklı tutarız:

• Hizmetin herhangi bir bölümünü herhangi bir zamanda değiştirme veya sonlandırma
• Özellikleri, araçları veya işlevselliği bildirimde bulunmaksızın güncelleme
• Bu Kullanım Şartlarını bu sayfada yayınlanan bildirimle değiştirme

Hizmetin herhangi bir değişikliği, askıya alınması veya sonlandırılmasından size veya herhangi bir üçüncü tarafa karşı sorumlu değiliz.`,
      },
      {
        icon: Globe,
        title: "8. Yürürlükteki Hukuk",
        content: `Bu Kullanım Şartları, kanunlar ihtilafı hükümlerine bakılmaksızın Türkiye Cumhuriyeti yasalarına göre yönetilecek ve yorumlanacaktır.

Bu şartlardan veya Hizmeti kullanımınızdan kaynaklanan herhangi bir uyuşmazlık, Türkiye mahkemelerinde çözülecektir.

Bu şartların herhangi bir hükmünün uygulanamaz olduğu tespit edilirse, kalan hükümler tam olarak yürürlükte kalacaktır.`,
      },
    ],
    cookieSections: [
      {
        icon: Eye,
        title: "Çerezler nedir?",
        content:
          "Çerezler, bir web sitesini ziyaret ettiğinizde cihazınızda saklanan küçük metin dosyalarıdır. Web sitesinin tercihlerinizi hatırlamasına ve tarama deneyiminizi iyileştirmesine yardımcı olurlar.",
      },
      {
        icon: Shield,
        title: "Çerezleri nasıl kullanıyoruz",
        content:
          "Temel web sitesi işlevselliği sağlamak, site trafiğini analiz etmek ve Google AdSense aracılığıyla kişiselleştirilmiş reklamlar sunmak için çerezler kullanıyoruz. Bazı çerezler sitenin çalışması için gereklidir, diğerleri ise deneyiminizi iyileştirmemize yardımcı olur.",
      },
      {
        icon: Settings,
        title: "Çerezleri yönetme",
        content:
          "Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz. Çoğu tarayıcı çerezleri engellemenize veya silmenize izin verir, ancak bunu yapmak web sitesinin belirli özelliklerini etkileyebilir.",
      },
    ],
    disclaimerSections: [
      {
        icon: Info,
        title: "Genel Bilgilendirme",
        content: `PDFEditMobile ("biz," "bize," veya "bizim") tarafından web sitemizde sağlanan bilgiler yalnızca genel bilgilendirme amaçlıdır. Sitedeki tüm bilgiler iyi niyetle sağlanmaktadır, ancak sitedeki herhangi bir bilginin doğruluğu, yeterliliği, geçerliliği, güvenilirliği, kullanılabilirliği veya eksiksizliği konusunda açık veya zımni hiçbir beyan veya garanti vermiyoruz.`,
      },
      {
        icon: Shield,
        title: "Sorumluluk Yok",
        content: `Hiçbir durumda, sitenin kullanımı veya sitede sağlanan herhangi bir bilgiye güvenilmesi sonucunda ortaya çıkan herhangi bir kayıp veya zarardan size karşı sorumlu olmayacağız. Siteyi kullanımınız ve sitedeki herhangi bir bilgiye güvenmeniz tamamen kendi riskiniz altındadır.`,
      },
      {
        icon: Scale,
        title: "Yerel İşleme",
        content: `PDFEditMobile tüm dosyaları tarayıcınızda yerel olarak işler. Bu, gelişmiş gizlilik sağlarken, cihazınızda veya tarayıcınızın yapılandırması sonucunda oluşabilecek veri kaybı, dosya bozulması veya güvenlik ihlallerinden sorumlu değiliz.`,
      },
    ],
  },
};

export function getLegalData(lang: "en" | "tr"): LegalData {
  return legalData[lang] || legalData.en;
}

// Backwards-compatible exports (default to English)
export const privacySections = legalData.en.privacySections;
export const termsSections = legalData.en.termsSections;
export const cookieSections = legalData.en.cookieSections;
export const disclaimerSections = legalData.en.disclaimerSections;
