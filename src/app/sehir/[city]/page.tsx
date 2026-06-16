import { Metadata } from "next";
import Link from "next/link";

const cities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
  "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur",
  "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan",
  "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul",
  "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir",
  "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş",
  "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
  "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat",
  "Zonguldak"
];

export async function generateStaticParams() {
  return cities.map(city => ({ city: city.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const cityName = decodeURIComponent(city).replace(/-/g, " ");
  const capitalized = cityName.replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `${capitalized} PDF Düzenleme | ${capitalized} Ücretsiz PDF Araçları`,
    description: `${capitalized} için ücretsiz online PDF araçları. PDF birleştirme, sıkıştırma, dönüştürme ve daha fazlası. ${capitalized}'da PDF düzenleme.`,
    openGraph: {
      title: `${capitalized} Ücretsiz PDF Düzenleme Araçları`,
      description: `${capitalized} için en iyi ücretsiz PDF araçları. Birleştir, sıkıştır, dönüştür.`,
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityName = decodeURIComponent(city).replace(/-/g, " ");
  const capitalized = cityName.replace(/\b\w/g, c => c.toUpperCase());

  const tools = [
    { name: "PDF Birleştir", href: "/merge-pdf", desc: "Birden fazla PDF'i tek dosyada birleştirin" },
    { name: "PDF Sıkıştır", href: "/compress-pdf", desc: "Dosya boyutunu kalite kaybı olmadan küçültün" },
    { name: "PDF'ten Word'e", href: "/pdf-to-word", desc: "PDF'i düzenlenebilir Word belgesine dönüştürün" },
    { name: "Word'den PDF'e", href: "/word-to-pdf", desc: "Word belgelerinizi PDF formatına dönüştürün" },
    { name: "PDF Böl", href: "/split-pdf", desc: "PDF sayfalarını ayrı dosyalara ayırın" },
    { name: "PDF Koru", href: "/protect-pdf", desc: "PDF'lerinize şifre ekleyin" },
    { name: "PDF Kilidini Aç", href: "/unlock-pdf", desc: "Şifre korumasını kaldırın" },
    { name: "JPG'den PDF'e", href: "/jpg-to-pdf", desc: "Resimlerinizi PDF'e dönüştürün" },
    { name: "PDF İmzala", href: "/sign-pdf", desc: "PDF belgelerinizi dijital olarak imzalayın" },
    { name: "PDF Düzenle", href: "/edit-pdf", desc: "PDF içeriğini değiştirin" },
    { name: "PDF Kırp", href: "/crop-pdf", desc: "İstenmeyen alanları kesin" },
    { name: "PDF'ten JPG'ye", href: "/pdf-to-jpg", desc: "PDF sayfalarını resim olarak kaydedin" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {capitalized} PDF Düzenleme Araçları
          </h1>
          <p className="text-lg text-gray-500">
            {capitalized} için ücretsiz online PDF araçları. Dosyalarınız tarayıcınızda işlenir, sunuculara yüklenmez.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-black"
            >
              <h3 className="mb-1 font-semibold text-gray-900">{tool.name}</h3>
              <p className="text-sm text-gray-500">{tool.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-white p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            {capitalized} için PDF Düzenleme Rehberi
          </h2>
          <p className="mb-4 text-gray-600">
            PDFEditMobile ile {capitalized} konumundan PDF dosyalarınızı ücretsiz olarak düzenleyebilirsiniz. Tüm işlemler tarayıcınızda gerçekleşir, dosyalarınız hiçbir sunucuya yüklenmez. {capitalized}'da internet bağlantısı olan herhangi bir cihazdan PDF işlemlerinizi yapabilirsiniz.
          </p>
          <p className="text-gray-600">
            {capitalized} ve çevresindeki kullanıcılar için en popüler PDF araçlarımızı yukarıda bulabilirsiniz. Herhangi bir kayıt gerektirmeden, tamamen ücretsiz olarak kullanabilirsiniz.
          </p>
        </div>

        {/* Links to other cities */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-sm text-gray-400">Diğer şehirler için PDF araçları:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {cities.slice(0, 20).map(c => (
              <Link
                key={c}
                href={`/sehir/${c.toLowerCase()}`}
                className="rounded-full bg-white px-3 py-1 text-xs text-gray-500 shadow-sm hover:text-black hover:shadow"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}