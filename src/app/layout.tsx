import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/chat";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TenantProvider } from "@/components/providers/TenantProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { themePresets } from "@/lib/themes";
import type { Tenant } from "@/lib/supabase/types";

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
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.png",
  },
};

// Função helper para obter tenant do header
async function getTenantFromHeader(): Promise<Tenant | null> {
  const { getCurrentTenant } = await import("@/lib/tenant-api");
  return await getCurrentTenant();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tenant = await getTenantFromHeader();
  // Se não houver tema configurado, usa executive como padrão
  const theme = tenant?.theme || themePresets.executive;
  const tenantName = tenant?.name || "Executive";

  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${playfair.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <TenantProvider tenant={tenant}>
          <ThemeProvider theme={theme}>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ChatBot tenantName={tenantName} />
            <GoogleAnalytics gaId={tenant?.settings?.googleAnalyticsId || "G-3W69W953QN"} />
          </ThemeProvider>
        </TenantProvider>
      </body>
    </html>
  );
}
