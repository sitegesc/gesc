import type { Metadata } from "next";
import Image from "next/image";

import { PageHeader } from "@/components/ui/PageHeader";
import { AvatarPlaceholder } from "@/components/ui/AvatarPlaceholder";
import { BOLSISTAS, COLABORADORES, COORDENADORES } from "@/data/equipe";

export const metadata: Metadata = {
  title: "Equipe",
  description:
    "Coordenação, bolsistas e colaboradores do Grupo de Engenharia de Sistemas Complexos (GESC) da FT-UNICAMP.",
};

const h2Class =
  "mb-6 border-b border-[#e6e6e6] pb-2 text-[1.15rem] font-bold text-brand-blue";

export default function EquipePage() {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[920px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Equipe" title="">
          As pessoas por trás da pesquisa, das oficinas e do conteúdo do site.
        </PageHeader>

        {/* Coordenação */}
        <section>
          <h2 className={h2Class}>Coordenação</h2>
          <div className="space-y-10">
            {COORDENADORES.map((coord) => (
              <article
                key={coord.nome}
                className="flex flex-col gap-5 sm:flex-row sm:gap-7"
              >
                <Image
                  src={coord.foto}
                  alt={coord.nome}
                  placeholder="blur"
                  sizes="180px"
                  className="h-[220px] w-full rounded-xl object-cover sm:h-[200px] sm:w-[180px] sm:shrink-0"
                />
                <div>
                  <h3 className="text-[1.05rem] font-bold text-brand-blue">
                    {coord.nome}
                  </h3>
                  <p className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#888]">
                    {coord.papel}
                  </p>
                  {coord.bio.map((paragrafo) => (
                    <p
                      key={paragrafo.slice(0, 32)}
                      className="mb-3 text-[0.9rem] leading-[1.7] text-[#555] last:mb-0"
                    >
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Bolsistas */}
        <section className="mt-16">
          <h2 className={h2Class}>Bolsistas</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BOLSISTAS.map((b) => (
              <div
                key={b.nome}
                className="flex gap-3 rounded-xl border border-[#eee] bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <AvatarPlaceholder className="h-11 w-11 shrink-0 rounded-full" />
                <div className="min-w-0">
                  <h3 className="text-[0.92rem] font-bold text-brand-blue">
                    {b.nome}
                  </h3>
                  <p className="text-[0.8rem] italic leading-snug text-[#666]">
                    {b.papel}
                  </p>
                  <p className="mt-0.5 text-[0.75rem] text-[#999]">{b.linha}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Colaboradores */}
        <section className="mt-16">
          <h2 className={h2Class}>Colaboradores</h2>
          <ul className="divide-y divide-[#eee] border-y border-[#eee]">
            {COLABORADORES.map((c) => (
              <li
                key={c.nome}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3"
              >
                <span className="text-[0.92rem] font-semibold text-[#333]">
                  {c.nome}
                </span>
                <span className="text-[0.85rem] text-[#777]">
                  {c.instituicao} · {c.area}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 rounded-md border border-[#e6e6e6] bg-[#fafafa] px-4 py-3 text-[0.82rem] leading-relaxed text-[#777]">
          Os nomes de bolsistas e colaboradores são ilustrativos. A lista
          definitiva, com fotos e perfis, será enviada pela coordenação.
        </p>
      </div>
    </main>
  );
}
