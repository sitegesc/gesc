"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { Modal } from "@/components/ui/Modal";

import yuri from "@/imgs/pessoas/coordenadores/yuri.webp";

import { CampusMap } from "./CampusMap";

type ModalKey = "palavra" | "objetivos" | "logo" | "mapa";

type Item =
  | { label: string; type: "route"; href: string }
  | { label: string; type: "anchor"; href: string; active?: boolean }
  | { label: string; type: "modal"; modal: ModalKey };

const items: Item[] = [
  { label: "Coordenadores", type: "anchor", href: "#coordenacao", active: true },
  { label: "Publicações", type: "route", href: "/publicacoes" },
  { label: "Histórico", type: "route", href: "/historico" },
  { label: "Palavra do Coordenador", type: "modal", modal: "palavra" },
  { label: "Objetivos", type: "modal", modal: "objetivos" },
  { label: "Parceiros", type: "route", href: "/parceiros" },
  { label: "Significado do Logo", type: "modal", modal: "logo" },
  { label: "Mapa do Campus", type: "modal", modal: "mapa" },
];

const linkClass =
  "block py-3 text-[0.95rem] text-white transition duration-200 hover:translate-x-[5px] hover:font-bold hover:text-[#ffdbe0] aria-[current=page]:translate-x-[5px] aria-[current=page]:font-bold aria-[current=page]:text-[#ffdbe0]";

const buttonClass = `${linkClass} w-full cursor-pointer text-left`;

const objetivos = [
  "desenvolver e aplicar métodos de Teoria dos Jogos, Sistemas Dinâmicos, Física Estatística, Redes Complexas, Cadeias de Markov, simulação, otimização e ciência de dados;",
  "investigar sistemas complexos em áreas como transportes, mobilidade, energia, materiais, infraestrutura, economia, segurança e políticas públicas;",
  "desenvolver modelos capazes de apoiar processos de decisão sob incerteza;",
  "aproximar fundamentos matemáticos e computacionais de problemas reais de engenharia e da sociedade;",
  "promover a formação de estudantes de graduação, pós-graduação e pesquisadores em estágio de pós-doutorado em pesquisa interdisciplinar;",
  "estimular projetos de iniciação científica, mestrado, doutorado, pós-doutorado e extensão;",
  "ampliar a cooperação entre pesquisadores de diferentes áreas, universidades e países;",
  "produzir conhecimento científico com potencial de impacto acadêmico, tecnológico, econômico e social;",
  "fortalecer a divulgação científica e a aproximação entre universidade e sociedade.",
];

const MODAIS: Record<ModalKey, { title: string; content: ReactNode }> = {
  palavra: {
    title: "Palavra do Coordenador",
    content: (
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <Image
          src={yuri}
          alt="Prof. Dr. Yuri Alexandre Meyer"
          placeholder="blur"
          sizes="112px"
          className="mx-auto h-28 w-28 shrink-0 rounded-full object-cover sm:mx-0"
        />
        <div className="space-y-3">
          <p>
            O Grupo de Engenharia de Sistemas Complexos (GESC) nasceu da
            convicção de que muitos dos grandes desafios contemporâneos não podem
            ser compreendidos de forma isolada. Transportes, energia, materiais,
            economia, políticas públicas e dinâmicas sociais são sistemas
            formados por múltiplos agentes, interações e incertezas.
          </p>
          <p>
            Nosso propósito é criar um ambiente verdadeiramente interdisciplinar,
            no qual ferramentas da matemática, física, engenharia, ciência de
            dados e teoria dos jogos possam dialogar para compreender problemas
            complexos e apoiar melhores decisões.
          </p>
          <p>
            Mais do que produzir modelos, buscamos formar pessoas, estabelecer
            redes de colaboração e transformar conhecimento científico em impacto
            acadêmico, tecnológico e social.
          </p>
          <p>Seja bem-vindo ao GESC.</p>
          <div className="pt-2">
            <p className="font-bold text-[#111]">
              — Prof. Dr. Yuri Alexandre Meyer
            </p>
            <p className="text-[#444]">Coordenador do GESC</p>
          </div>
        </div>
      </div>
    ),
  },
  objetivos: {
    title: "Objetivos",
    content: (
      <div className="space-y-2 leading-snug">
        <p>
          O Grupo de Engenharia de Sistemas Complexos (GESC) tem como objetivo
          desenvolver pesquisa interdisciplinar voltada à compreensão, modelagem
          e solução de problemas caracterizados por múltiplos agentes,
          interações, não linearidades e incerteza.
        </p>
        <p>Entre seus principais objetivos estão:</p>
        <ul className="list-disc pl-5 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-1">
          {objetivos.map((objetivo) => (
            <li key={objetivo}>{objetivo}</li>
          ))}
        </ul>
        <p>
          O GESC busca, assim, funcionar como um espaço de convergência entre
          diferentes áreas do conhecimento, utilizando a Engenharia de Sistemas
          Complexos como estrutura para compreender problemas contemporâneos e
          desenvolver soluções fundamentadas cientificamente.
        </p>
      </div>
    ),
  },
  logo: {
    title: "Significado do Logo",
    content: (
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="shrink-0 rounded-lg bg-brand-blue p-4">
          <Image
            src="/logo_header.webp"
            alt="Logo do GESC"
            width={150}
            height={61}
            className="h-14 w-auto"
          />
        </div>
        <div className="space-y-3">
          <p>
            O logo do GESC representa a essência dos sistemas complexos:
            diferentes elementos conectados entre si, cujas interações dão origem
            a comportamentos, estruturas e propriedades que não poderiam ser
            explicados pela análise isolada de cada componente.
          </p>
          <p>
            As conexões simbolizam redes, interação e interdisciplinaridade,
            enquanto a organização do conjunto remete à ideia de emergência — um
            dos conceitos fundamentais da ciência dos sistemas complexos.
          </p>
          <p>
            O símbolo também representa a própria filosofia do GESC: integrar
            diferentes áreas do conhecimento, pesquisadores, estudantes e
            instituições em torno de problemas que exigem múltiplas perspectivas
            para serem compreendidos e solucionados.
          </p>
        </div>
      </div>
    ),
  },
  mapa: {
    title: "Mapa do Campus",
    content: <CampusMap />,
  },
};

export function SidebarMenu() {
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);

  return (
    <aside className="h-fit rounded-md bg-brand-red p-[30px] text-white shadow-[0_4px_15px_rgba(138,28,38,0.2)]">
      <h3 className="mb-5 border-b border-white/30 pb-[15px] text-[1.2rem] font-bold">
        GESC
      </h3>
      <nav aria-label="Menu da seção Sobre">
        <ul>
          {items.map((item) => (
            <li key={item.label} className="border-b border-white/10">
              {item.type === "route" ? (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : item.type === "anchor" ? (
                <a
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={linkClass}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setOpenModal(item.modal)}
                  className={buttonClass}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <Modal
        open={openModal !== null}
        onClose={() => setOpenModal(null)}
        title={openModal ? MODAIS[openModal].title : ""}
        size={openModal === "mapa" || openModal === "objetivos" ? "lg" : "md"}
      >
        {openModal ? MODAIS[openModal].content : null}
      </Modal>
    </aside>
  );
}
