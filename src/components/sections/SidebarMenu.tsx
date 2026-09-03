"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { Modal } from "@/components/ui/Modal";

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
  {
    titulo: "Excelência Acadêmica",
    descricao:
      "Publicar em revistas e congressos de alto impacto como SMEDEG e IEEE, consolidando reconhecimento científico global com rigor metodológico.",
  },
  {
    titulo: "Impacto Social",
    descricao:
      "Transformar conhecimento científico em soluções práticas para logística sustentável, mobilidade urbana e decisões geopolíticas.",
  },
  {
    titulo: "Capital Humano",
    descricao:
      "Formar pesquisadores em Python, R e Machine Learning com programas de mentoria individual e desenvolvimento de competências avançadas.",
  },
  {
    titulo: "Inovação Metodológica",
    descricao:
      "Explorar as fronteiras da Econofísica, algoritmos adaptativos para IoT e 5G e aplicações avançadas da teoria dos jogos.",
  },
];

const MODAIS: Record<ModalKey, { title: string; content: ReactNode }> = {
  palavra: {
    title: "Palavra do Coordenador",
    content: (
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* mock — substituir pelo <Image> com a foto real do coordenador */}
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="mx-auto h-28 w-28 shrink-0 rounded-full sm:mx-0"
        >
          <rect width="100" height="100" fill="#e9edf2" />
          <circle cx="50" cy="38" r="17" fill="#aab4c0" />
          <path d="M18 86c2-18 15-28 32-28s30 10 32 28z" fill="#aab4c0" />
        </svg>
        <div className="space-y-3">
          <p>
            [Texto provisório] É com satisfação que damos as boas-vindas ao
            portal do Grupo de Engenharia de Sistemas Complexos. Nosso
            compromisso é com a pesquisa interdisciplinar de excelência e a
            formação de novos pesquisadores.
          </p>
          <p>
            Este espaço será atualizado com a mensagem oficial da coordenação.
          </p>
          <p className="font-semibold text-[#111]">— Coordenação do GESC</p>
        </div>
      </div>
    ),
  },
  objetivos: {
    title: "Objetivos",
    content: (
      <ul className="space-y-4">
        {objetivos.map((objetivo) => (
          <li key={objetivo.titulo}>
            <p className="font-bold text-brand-blue">{objetivo.titulo}</p>
            <p>{objetivo.descricao}</p>
          </li>
        ))}
      </ul>
    ),
  },
  logo: {
    title: "Significado do Logo",
    content: (
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* mock — usar src/imgs/logo.webp (versão colorida) quando disponível */}
        <div className="shrink-0 rounded-lg bg-brand-blue p-4">
          <Image
            src="/logo_header.webp"
            alt="Logo do GESC"
            width={150}
            height={61}
            className="h-14 w-auto"
          />
        </div>
        <p>
          [Texto provisório] O logotipo do GESC sintetiza a identidade do grupo —
          a conexão entre nós e redes que representa o estudo de sistemas
          complexos. A descrição completa do significado das cores e das formas
          será adicionada aqui.
        </p>
      </div>
    ),
  },
  mapa: {
    title: "Mapa do Campus",
    content: (
      <div className="space-y-4">
        <div className="flex h-56 items-center justify-center rounded-lg bg-[#eef2f9] text-sm text-zinc-500">
          Mapa interativo — em breve
        </div>
        <p>
          O mapa do campus da Faculdade de Tecnologia da UNICAMP, em Limeira,
          será disponibilizado nesta seção em breve.
        </p>
      </div>
    ),
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
      >
        {openModal ? MODAIS[openModal].content : null}
      </Modal>
    </aside>
  );
}
