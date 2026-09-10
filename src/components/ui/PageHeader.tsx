import type { ReactNode } from "react";

type PageHeaderProps = {
  /** Trecho em destaque, sublinhado de vermelho (ex.: a primeira palavra). */
  highlight?: string;
  title: string;
  children?: ReactNode;
};

// Cabeçalho de página interna: título centralizado com o traço vermelho
// do GESC e um subtítulo opcional.
export function PageHeader({ highlight, title, children }: PageHeaderProps) {
  return (
    <header className="mb-10 text-center sm:mb-12">
      <h1 className="text-[2rem] font-bold leading-tight text-brand-blue sm:text-[2.5rem]">
        {highlight && (
          <span className="border-b-4 border-brand-red pb-1">{highlight}</span>
        )}
        {title && (highlight ? ` ${title}` : title)}
      </h1>
      {children && (
        <p className="mx-auto mt-5 max-w-[680px] text-[0.95rem] leading-relaxed text-[#444]">
          {children}
        </p>
      )}
    </header>
  );
}
