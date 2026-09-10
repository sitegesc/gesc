import type { ReactNode } from "react";

type EnrollmentLayoutProps = {
  /** Texto da "mini tag" acima do título (ex.: "Inscrições abertas"). */
  tag: ReactNode;
  title: string;
  intro: ReactNode;
  children: ReactNode;
  /** Largura máxima do conteúdo. Calendário usa "1080px". */
  maxWidth?: "900px" | "1080px";
};

// Hero + cartão branco compartilhados pelas telas de oficinas.
// Portado de .enrollment-page / .enrollment-hero / .enrollment-form-container
// (assets/css/inscricao-oficina.css do site antigo).
export function EnrollmentLayout({
  tag,
  title,
  intro,
  children,
  maxWidth = "900px",
}: EnrollmentLayoutProps) {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div
        className="mx-auto px-4 pb-16 pt-10 sm:px-5"
        style={{ maxWidth }}
      >
        <header className="mb-6 text-center sm:mb-7">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#f0f2f5] px-3 py-1 text-xs font-semibold text-[#555]">
            {tag}
          </span>
          <h1 className="mb-2.5 text-[1.4rem] font-bold text-brand-blue sm:text-[1.7rem]">
            {title}
          </h1>
          <p className="mx-auto max-w-[640px] text-[0.95rem] leading-relaxed text-[#444]">
            {intro}
          </p>
        </header>

        <div className="rounded-2xl border border-[#f0f0f0] bg-white p-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-[30px]">
          {children}
        </div>
      </div>
    </main>
  );
}
