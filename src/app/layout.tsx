import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  // apple-icon.png), geradas a partir de public/icon.webp.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "pt_BR",
    url: SITE_URL,
    title: "GESC — Grupo de Engenharia de Sistemas Complexos",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "GESC — Grupo de Engenharia de Sistemas Complexos",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
