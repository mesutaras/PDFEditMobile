import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PDFEditMobile",
    short_name: "PDFEditMobile",
    description:
      "PDF'leri birleştirmek, bölmek, sıkıştırmak ve dönüştürmek için en kolay PDF aracı.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
