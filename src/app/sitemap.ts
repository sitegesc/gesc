import type { MetadataRoute } from "next";

import { PUBLICACOES } from "@/data/publicacoes";
import { SITE_URL } from "@/lib/site";

const ROTAS = [
  "",
  "/sobre",
  "/projeto-ideia",
  "/pesquisa",
  "/equipe",
  "/publicacoes",
  "/parceiros",
  "/historico",
  "/contato",
  "/privacidade",
  "/termos",
  "/acessibilidade",
  "/oficinas/calendario",
  "/oficinas/inscricao-pais",
  "/oficinas/inscricao-professores",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  const estaticas: MetadataRoute.Sitemap = ROTAS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: agora,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const publicacoes: MetadataRoute.Sitemap = PUBLICACOES.map((p) => ({
    url: `${SITE_URL}/publicacoes/${p.slug}`,
    lastModified: p.data ? new Date(p.data) : agora,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...estaticas, ...publicacoes];
}
