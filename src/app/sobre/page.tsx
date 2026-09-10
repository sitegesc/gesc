import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";
import { MISSAO, OBJETIVOS, VALORES } from "@/data/gesc";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Missão, objetivos e valores do Grupo de Engenharia de Sistemas Complexos (GESC) da FT-UNICAMP.",
};

export default function SobrePage() {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[1000px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Sobre" title="Nós">
          O GESC é um grupo de pesquisa interdisciplinar da Faculdade de
          Tecnologia da UNICAMP dedicado ao estudo de sistemas complexos.
        </PageHeader>

        {/* Missão */}
        <section className="mb-14">
          <h2 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand-red">
            Nossa missão
          </h2>
          <p className="border-l-4 border-brand-red pl-5 text-[1.15rem] font-semibold leading-snug text-brand-blue">
            {MISSAO.destaque}
          </p>
          <div className="mt-6 space-y-4">
            {MISSAO.paragrafos.map((paragrafo) => (
              <p
                key={paragrafo.slice(0, 32)}
                className="leading-[1.7] text-[#444]"
              >
                {paragrafo}
              </p>
            ))}
          </div>
        </section>

        {/* Objetivos */}
        <section className="mb-14">
          <h2 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand-red">
            Objetivos
          </h2>
          <p className="mb-5 leading-[1.7] text-[#444]">
            O GESC funciona como um espaço de convergência entre diferentes áreas
            do conhecimento. Entre seus principais objetivos estão:
          </p>
          <ul className="grid list-disc gap-x-10 gap-y-2 pl-5 marker:text-brand-red sm:grid-cols-2">
            {OBJETIVOS.map((objetivo) => (
              <li key={objetivo} className="leading-[1.6] text-[#444]">
                {objetivo}
              </li>
            ))}
          </ul>
        </section>

        {/* Valores */}
        <section>
          <h2 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand-red">
            Nossos valores
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((valor) => (
              <div
                key={valor.title}
                className="rounded-xl border border-[#eee] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <span className="mb-3 block h-1 w-10 rounded-sm bg-brand-red" />
                <h3 className="mb-2 text-[1.05rem] font-bold text-brand-blue">
                  {valor.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.6] text-[#555]">
                  {valor.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
