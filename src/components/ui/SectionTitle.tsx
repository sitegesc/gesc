import type { ReactNode } from "react";

/** Título de seção com o traço vermelho embaixo (porte de .section-title do site atual). */
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-[50px] text-center">
      <h2 className="relative inline-block pb-[15px] text-[2.2rem] font-bold text-brand-blue after:mx-auto after:mt-2.5 after:block after:h-1 after:w-[60px] after:rounded-sm after:bg-brand-red after:content-['']">
        {children}
      </h2>
    </div>
  );
}
