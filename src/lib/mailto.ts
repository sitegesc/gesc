// Enquanto não há back-end, os formulários entregam os dados por e-mail:
// montam um mailto: já preenchido e abrem o programa de e-mail do usuário.

export type MailtoLinha = string | [rotulo: string, valor: string];

export function mailtoHref(
  para: string,
  assunto: string,
  linhas: MailtoLinha[],
): string {
  const corpo = linhas
    .map((l) => (Array.isArray(l) ? `${l[0]}: ${l[1]}` : l))
    .join("\n");

  return `mailto:${para}?subject=${encodeURIComponent(
    assunto,
  )}&body=${encodeURIComponent(corpo)}`;
}
