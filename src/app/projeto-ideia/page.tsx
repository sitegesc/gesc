import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Projeto IDEIA | GESC",
  description:
    "O Projeto IDEIA é uma iniciativa de extensão da Faculdade de Tecnologia da UNICAMP voltada a estudantes com altas habilidades, com oficinas gratuitas de ciência e tecnologia.",
};

const objetivos = [
  "Estimular o potencial de crianças e jovens com altas habilidades por meio de atividades práticas de ciência e tecnologia.",
  "Apoiar a identificação e o acompanhamento de estudantes com indicadores de altas habilidades, em diálogo com as escolas e as famílias.",
  "Aproximar a universidade da comunidade, abrindo o campus da FT-UNICAMP para atividades de extensão.",
  "Formar bolsistas de graduação e pós-graduação na concepção e na aplicação de oficinas.",
];

const paraQuem = [
  {
    titulo: "Crianças e jovens",
    texto:
      "Estudantes com altas habilidades ou grande interesse por ciência, tecnologia e resolução de problemas.",
  },
  {
    titulo: "Famílias e escolas",
    texto:
      "Responsáveis e educadores que buscam atividades de enriquecimento fora da grade escolar regular.",
  },
  {
    titulo: "Professores e universitários",
    texto:
      "Quem quer propor e aplicar uma oficina, com apoio da coordenação do projeto.",
  },
];

const participe = [
  {
    href: "/oficinas/calendario",
    titulo: "Calendário das oficinas",
    texto: "Todos os encontros, semana a semana.",
  },
  {
    href: "/oficinas/inscricao-pais",
    titulo: "Inscrição — famílias",
    texto: "Inscreva a criança em uma ou mais oficinas.",
  },
  {
    href: "/oficinas/inscricao-professores",
    titulo: "Inscrição — aplicadores",
    texto: "Proponha uma oficina como professor(a) ou aluno(a).",
  },
];

const kickerClass =
  "mb-4 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand-red";

export default function ProjetoIdeiaPage() {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[920px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Projeto" title="IDEIA">
          Uma iniciativa de extensão da Faculdade de Tecnologia da UNICAMP, em
          Limeira, coordenada pelo GESC.
        </PageHeader>

        {/* O que é */}
        <section className="mb-14">
          <h2 className={kickerClass}>O que é</h2>
          <p className="border-l-4 border-brand-red pl-5 text-[1.15rem] font-semibold leading-snug text-brand-blue">
            O Projeto IDEIA oferece oficinas gratuitas de ciência e tecnologia
            para estudantes com altas habilidades, usando o campus e os
            laboratórios da FT-UNICAMP como espaço de aprendizado.
          </p>
          <div className="mt-6 space-y-4">
            <p className="leading-[1.7] text-[#444]">
              As oficinas são conduzidas por bolsistas e pesquisadores do grupo e
              trabalham raciocínio lógico, criatividade, investigação e trabalho
              em equipe — de programação e jogos a transportes, ciência de dados
              e inteligência artificial.
            </p>
            <p className="leading-[1.7] text-[#444]">
              A participação é aberta mediante inscrição, e o calendário de
              encontros fica disponível publicamente nesta seção do site.
            </p>
          </div>
        </section>

        {/* Para quem é */}
        <section className="mb-14">
          <h2 className={kickerClass}>Para quem é</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {paraQuem.map((item) => (
              <div
                key={item.titulo}
                className="rounded-xl border border-[#eee] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <span className="mb-3 block h-1 w-10 rounded-sm bg-brand-red" />
                <h3 className="mb-2 text-[1rem] font-bold text-brand-blue">
                  {item.titulo}
                </h3>
                <p className="text-[0.88rem] leading-[1.6] text-[#555]">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Objetivos */}
        <section className="mb-14">
          <h2 className={kickerClass}>Objetivos</h2>
          <ul className="grid list-disc gap-x-10 gap-y-2 pl-5 marker:text-brand-red sm:grid-cols-2">
            {objetivos.map((objetivo) => (
              <li key={objetivo} className="leading-[1.6] text-[#444]">
                {objetivo}
              </li>
            ))}
          </ul>
        </section>

        {/* Participe */}
        <section>
          <h2 className={kickerClass}>Participe</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {participe.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-xl border border-[#e5e5e5] p-5 transition-colors hover:border-brand-blue"
              >
                <span className="mb-1 text-[0.95rem] font-bold text-brand-blue">
                  {item.titulo}
                </span>
                <span className="mb-4 text-[0.85rem] leading-[1.5] text-[#555]">
                  {item.texto}
                </span>
                <span className="mt-auto text-[0.85rem] font-semibold text-brand-blue transition-colors group-hover:text-brand-red">
                  Acessar →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
