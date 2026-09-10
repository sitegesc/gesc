import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GESC — Grupo de Engenharia de Sistemas Complexos",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "GESC",
    "sistemas complexos",
    "UNICAMP",
    "FT-UNICAMP",
    "Faculdade de Tecnologia",
    "pesquisa interdisciplinar",
    "teoria dos jogos",
    "sociofísica",
    "engenharia de transportes",
  ],
  authors: [{ name: SITE_NAME }],
  // Ícones vêm das convenções de arquivo em src/app/ (favicon.ico, icon.png,
  // apple-icon.png).
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "pt_BR",
    url: SITE_URL,
    // title/description omitidos de propósito: cada página herda os seus.
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
