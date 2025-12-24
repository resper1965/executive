import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://site-sabrina-nessbr-projects.vercel.app"),
  title: {
    default: "Sabrina Barros | Saúde & Gestão",
    template: "%s | Sabrina Barros",
  },
  description: "Estrategista de Saúde Suplementar, Dentista e Executiva. Insights sobre gestão, regulação e inovação na saúde.",
  openGraph: {
    title: "Sabrina Barros | Saúde & Gestão",
    description: "Insights sobre gestão, regulação e inovação na saúde suplementar.",
    url: "/",
    siteName: "Sabrina Barros",
    images: [
      {
        url: "/hero-cover.png",
        width: 1200,
        height: 630,
        alt: "Sabrina Barros - Saúde & Gestão",
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabrina Barros | Saúde & Gestão",
    description: "Insights sobre gestão, regulação e inovação na saúde suplementar.",
    images: ["/hero-cover.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <GoogleAnalytics gaId="G-3W69W953QN" />
      </body>
    </html>
  );
}
