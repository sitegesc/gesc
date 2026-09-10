import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Nossa Trajetória | GESC",
  description:
    "Linha do tempo do Grupo de Engenharia de Sistemas Complexos (GESC), da FT-UNICAMP, desde a fundação em 2025.",
};

// Conteúdo provisório — a coordenação ainda vai revisar datas e marcos.

const marcos = [
  {
    periodo: "2025 · Fundação",
    titulo: "Criação do GESC",
    texto:
      "O grupo é criado na Faculdade de Tecnologia (FT) da UNICAMP, em Limeira, com foco em sistemas complexos e pesquisa interdisciplinar entre física, matemática aplicada, engenharia e ciências sociais.",
  },
  {
    periodo: "2025 · Colaborações internacionais",
    titulo: "Sociofísica e redes de pesquisa",
    texto:
      "Início da colaboração com o Dr. Serge Galam, pesquisador em sociofísica, e aproximação com instituições de pesquisa na Polônia na área de física estatística aplicada.",
  },
  {
    periodo: "2025 · Ensino e extensão",
    titulo: "Curso CET-1050",
    texto:
      "Oferta do curso CET-1050, que integra conceitos de econofísica e pesquisa operacional, aproximando física estatística, economia e otimização.",
  },
  {
    periodo: "2025 · Parcerias",
    titulo: "Colaboração com o ITA DroneCamp",
    texto:
      "Projetos conjuntos com o ITA DroneCamp em otimização de rotas, sistemas autônomos e análise geoespacial.",
  },
  {
    periodo: "2026 · Eventos e divulgação",
    titulo: "Participação em conferências",
    texto:
      "Apresentação de trabalhos e participação no SWEDES Arctic Congress 2026, voltado a economia, dados e ciência ambiental.",
  },
];

const numeros = [
  { valor: "2025", rotulo: "Ano de fundação" },
  { valor: "6", rotulo: "Eixos de pesquisa" },
  { valor: "2", rotulo: "Coordenadores" },
];

export default function HistoricoPage() {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[880px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Nossa" title="trajetória">
          O GESC foi fundado em 2025, na Faculdade de Tecnologia da UNICAMP. A
          linha do tempo abaixo reúne os principais marcos desde então.
        </PageHeader>

        <ol className="relative ml-1 border-l border-[#e0e0e0] pl-6">
          {marcos.map((marco) => (
            <li key={marco.titulo} className="relative pb-9 last:pb-0">
              <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-red ring-4 ring-white" />
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-brand-red">
                {marco.periodo}
              </p>
              <h2 className="mt-1 text-[1.05rem] font-bold text-brand-blue">
                {marco.titulo}
              </h2>
              <p className="mt-2 text-[0.92rem] leading-[1.7] text-[#555]">
                {marco.texto}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-4 border-t border-[#eee] pt-8 sm:grid-cols-3">
          {numeros.map((n) => (
            <div key={n.rotulo}>
              <p className="text-[1.8rem] font-bold text-brand-blue">
                {n.valor}
              </p>
              <p className="text-[0.8rem] uppercase tracking-[0.08em] text-[#888]">
                {n.rotulo}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 rounded-md border border-[#e6e6e6] bg-[#fafafa] px-4 py-3 text-[0.82rem] leading-relaxed text-[#777]">
          Conteúdo provisório. Datas e marcos serão confirmados pela coordenação
          do GESC.
        </p>
      </div>
    </main>
  );
}
