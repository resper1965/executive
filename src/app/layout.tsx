import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/chat";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://executive.vercel.app"),
  title: {
    default: "Executive | Portais Estratégicos",
    template: "%s | Executive",
  },
  description: "Plataforma de portais profissionais para consultores e executivos. Desenvolvido por Bekaa.",
  openGraph: {
    title: "Executive | Portais Estratégicos",
    description: "Plataforma de portais profissionais para consultores e executivos.",
    url: "/",
    siteName: "Executive",
    images: [
      {
        url: "/sabrinabarros-perfil.png",
        width: 400,
        height: 400,
        alt: "Executive - Portais Estratégicos",
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive | Portais Estratégicos",
    description: "Plataforma de portais profissionais para consultores e executivos.",
    images: ["/sabrinabarros-perfil.png"],
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
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ChatBot tenantName="Sabrina Barros" />
        <GoogleAnalytics gaId="G-3W69W953QN" />
      </body>
    </html>
  );
}
