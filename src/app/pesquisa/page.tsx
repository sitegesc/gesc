import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/ui/PageHeader";
import { AXIS_IDS, axesData } from "@/data/pesquisa";

export const metadata: Metadata = {
  title: "Linhas de Pesquisa",
  description:
    "Os seis eixos de pesquisa do Grupo de Engenharia de Sistemas Complexos (GESC) da FT-UNICAMP.",
};

export default function PesquisaPage() {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[920px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Linhas de" title="pesquisa">
          O GESC atua de forma interdisciplinar, integrando fundamentos da
          física, matemática aplicada, engenharia e ciências sociais para
          modelar, analisar e otimizar sistemas complexos em diferentes domínios.
        </PageHeader>

        <p className="mb-12 text-[0.9rem] text-[#888]">
          A pesquisa do grupo se organiza em seis eixos. Veja também o{" "}
          <Link
            href="/#linhas-pesquisa"
            className="font-medium text-brand-blue hover:text-brand-red"
          >
            diagrama das áreas
          </Link>{" "}
          na página inicial.
        </p>

        <div className="space-y-12">
          {AXIS_IDS.map((id) => {
            const eixo = axesData[id];
            return (
              <section key={id}>
                <div className="mb-4 flex items-baseline gap-3 border-b border-[#e6e6e6] pb-2">
                  <span className="text-[0.85rem] font-bold text-brand-red">
                    Eixo {id}
                  </span>
                  <h2 className="text-[1.1rem] font-bold text-brand-blue">
                    {eixo.title}
                  </h2>
                </div>
                <ul className="grid list-disc gap-x-10 gap-y-1.5 pl-5 marker:text-brand-red sm:grid-cols-2">
                  {eixo.items.map((item) => (
                    <li
                      key={item}
                      className="text-[0.9rem] leading-[1.6] text-[#444]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <p className="mt-14 border-t border-[#eee] pt-8 text-[0.9rem] text-[#555]">
          Trabalhos publicados em cada linha estão na página de{" "}
          <Link
            href="/publicacoes"
            className="font-medium text-brand-blue hover:text-brand-red"
          >
            Publicações
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
