import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/ui/PageHeader";

import ft from "@/imgs/logos/ft.webp";
import usp from "@/imgs/logos/usp.webp";
import ita from "@/imgs/logos/ita.webp";
import imes from "@/imgs/logos/imes.webp";
import sciences from "@/imgs/logos/sciences.webp";

export const metadata: Metadata = {
  title: "Parceiros | GESC",
  description:
    "Instituições e colaborações de pesquisa do Grupo de Engenharia de Sistemas Complexos (GESC) da FT-UNICAMP.",
};

// Conteúdo provisório — a coordenação vai confirmar parceiros e descrições.

const instituicoes: { logo: StaticImageData; nome: string; nota: string }[] = [
  {
    logo: ft,
    nome: "FT — UNICAMP",
    nota: "Unidade sede do grupo, na Faculdade de Tecnologia da UNICAMP, em Limeira.",
  },
  {
    logo: usp,
    nome: "Escola Politécnica — USP",
    nota: "Cooperação em engenharia de transportes e informações espaciais.",
  },
  {
    logo: ita,
    nome: "ITA",
    nota: "Projetos conjuntos em otimização de rotas e sistemas autônomos (ITA DroneCamp).",
  },
  {
    logo: sciences,
    nome: "Sciences Po Paris",
    nota: "Colaboração em sociofísica e dinâmica de opinião (Dr. Serge Galam).",
  },
  {
    logo: imes,
    nome: "IMES",
    nota: "Cooperação acadêmica.",
  },
];

const colaboracoes = [
  "Dr. Serge Galam (Sciences Po Paris) — sociofísica e dinâmica de opinião.",
  "Instituições de pesquisa na Polônia — física estatística aplicada.",
  "ITA DroneCamp — sistemas autônomos e análise geoespacial.",
];

const h2Class =
  "mb-5 border-b border-[#e6e6e6] pb-2 text-[1.15rem] font-bold text-brand-blue";

export default function ParceirosPage() {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[960px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Parceiros" title="">
          As colaborações do GESC com instituições acadêmicas e centros de
          pesquisa sustentam boa parte dos projetos e da formação de estudantes.
        </PageHeader>

        {/* Instituições */}
        <section>
          <h2 className={h2Class}>Instituições</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {instituicoes.map((inst) => (
              <div
                key={inst.nome}
                className="flex gap-4 rounded-xl border border-[#eee] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-14 w-20 shrink-0 items-center justify-center">
                  <Image
                    src={inst.logo}
                    alt={inst.nome}
                    sizes="80px"
                    className="max-h-14 w-auto object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[0.98rem] font-bold text-brand-blue">
                    {inst.nome}
                  </h3>
                  <p className="mt-1 text-[0.85rem] leading-[1.6] text-[#555]">
                    {inst.nota}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Colaborações de pesquisa */}
        <section className="mt-14">
          <h2 className={h2Class}>Colaborações de pesquisa</h2>
          <ul className="list-disc space-y-2 pl-5 marker:text-brand-red">
            {colaboracoes.map((c) => (
              <li key={c} className="text-[0.92rem] leading-[1.7] text-[#555]">
                {c}
              </li>
            ))}
          </ul>
        </section>

        {/* Apoio */}
        <section className="mt-14">
          <h2 className={h2Class}>Apoio</h2>
          <p className="text-[0.92rem] leading-[1.7] text-[#555]">
            O grupo conta com apoio de agências de fomento à pesquisa, como{" "}
            <strong className="font-semibold text-[#333]">FAPESP</strong> e{" "}
            <strong className="font-semibold text-[#333]">CNPq</strong>.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-6 sm:p-7">
          <h2 className="text-[1.05rem] font-bold text-brand-blue">
            Interessado em uma parceria?
          </h2>
          <p className="mt-2 text-[0.92rem] leading-[1.7] text-[#555]">
            Para propor uma colaboração, use a página de{" "}
            <Link
              href="/contato"
              className="font-semibold text-brand-blue transition-colors hover:text-brand-red"
            >
              Contato
            </Link>{" "}
            selecionando &ldquo;Parcerias e projetos de pesquisa&rdquo;.
          </p>
        </section>

        <p className="mt-12 rounded-md border border-[#e6e6e6] bg-[#fafafa] px-4 py-3 text-[0.82rem] leading-relaxed text-[#777]">
          Conteúdo provisório. A lista de parceiros e as descrições serão
          confirmadas pela coordenação do GESC.
        </p>
      </div>
    </main>
  );
}
