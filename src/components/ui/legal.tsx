import type { ReactNode } from "react";

// Blocos compartilhados pelos documentos institucionais/legais
// (/privacidade, /termos, /acessibilidade).

export const legalP = "text-[0.92rem] leading-[1.7] text-[#444]";

export const legalUl =
  "mt-2 list-disc space-y-1.5 pl-5 text-[0.92rem] leading-[1.7] text-[#444] marker:text-brand-red";

export const legalH3 = "mt-4 text-[0.92rem] font-bold text-[#333]";

export function LegalSection({
  n,
  titulo,
  children,
}: {
  n: number;
  titulo: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="mb-3 border-b border-[#e6e6e6] pb-2 text-[1.1rem] font-bold text-brand-blue">
        {n}. {titulo}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 rounded-md border border-[#e6d8b0] bg-[#fdf7e6] px-4 py-3 text-[0.85rem] leading-relaxed text-[#7a6a3a]">
      {children}
    </p>
  );
}

export function LastUpdated({ children }: { children: ReactNode }) {
  return (
    <p className="mb-10 text-[0.82rem] text-[#888]">
      Última atualização: {children}
    </p>
  );
}
