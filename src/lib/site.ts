// Identidade do site para metadados / SEO.
//
// SITE_URL: usado em metadataBase, sitemap e robots. Ajuste para o
// domínio real de produção (ou defina NEXT_PUBLIC_SITE_URL no ambiente).

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://gesc.ft.unicamp.br";

export const SITE_NAME = "GESC";

export const SITE_DESCRIPTION =
  "Grupo de Engenharia de Sistemas Complexos (GESC) — pesquisa interdisciplinar da Faculdade de Tecnologia da UNICAMP, em Limeira.";
