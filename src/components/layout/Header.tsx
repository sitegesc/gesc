"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

const navLinks: NavItem[] = [
  { href: "/", label: "Início" },
  {
    label: "Projeto ideia",
    children: [
      {
        label: "Oficinas",
        // Clicar direto em "Oficinas" abre o calendário.
        href: "/oficinas/calendario",
        children: [
          { href: "/oficinas/calendario", label: "Calendário" },
          { href: "/oficinas/inscricao-pais", label: "Inscrição Pais" },
          {
            href: "/oficinas/inscricao-professores",
            label: "Inscrição Professores/Alunos",
          },
        ],
      },
      { label: "Sobre", href: "/projeto-ideia" },
    ],
  },
  { href: "/publicacoes", label: "Publicações" },
  {
    label: "Sobre Nós",
    children: [
      { href: "/sobre", label: "Sobre" },
      { href: "/equipe", label: "Equipe" },
      { href: "/pesquisa", label: "Linhas de pesquisa" },
      { href: "/historico", label: "Histórico" },
      { href: "/parceiros", label: "Parceiros" },
    ],
  },
  { href: "/contato", label: "Contato" },
];

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

function linkClass(depth: number) {
  if (depth === 1) {
    return "relative flex items-center justify-between gap-2 px-5 py-4 text-[1.05rem] font-medium tracking-tight text-white/90 transition-colors duration-300 hover:text-white aria-[current=page]:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-red after:transition-[width] after:duration-300 after:content-[''] hover:after:w-full aria-[current=page]:after:w-full md:justify-start md:px-0 md:py-2 md:text-[0.9rem]";
  }

  const mobilePad = depth === 2 ? "px-8" : "px-12";
  return `flex w-full items-center justify-between gap-2 ${mobilePad} py-3 text-[1rem] font-medium text-white/90 transition-colors duration-300 hover:text-white md:px-4 md:py-2.5 md:text-[0.9rem]`;
}

function submenuClass(parentDepth: number, isOpen: boolean) {
  const base = `${
    isOpen ? "block" : "hidden"
  } bg-white/5 md:invisible md:absolute md:z-50 md:block md:min-w-[240px] md:rounded-b md:bg-brand-blue md:opacity-0 md:shadow-[0_16px_24px_rgba(0,0,0,0.25)] md:transition-opacity md:duration-200`;

  if (parentDepth === 1) {
    return `${base} md:left-0 md:top-full md:border-t-2 md:border-brand-red md:group-hover/l1:visible md:group-hover/l1:opacity-100`;
  }

  return `${base} md:left-full md:top-0 md:group-hover/l2:visible md:group-hover/l2:opacity-100`;
}

type NavNodeProps = {
  item: NavItem;
  depth: number;
  parentKey: string;
  expanded: Set<string>;
  onToggle: (key: string) => void;
  onNavigate: () => void;
  pathname: string;
};

function NavNode({
  item,
  depth,
  parentKey,
  expanded,
  onToggle,
  onNavigate,
  pathname,
}: NavNodeProps) {
  const key = parentKey ? `${parentKey}/${item.label}` : item.label;
  const hasChildren = Boolean(item.children?.length);

  if (!hasChildren) {
    const href = item.href ?? "#";
    const isHash = href.includes("#");
    const active =
      !isHash && (href === "/" ? pathname === "/" : pathname.startsWith(href));

    return (
      <li className="border-b border-white/10 last:border-b-0 md:border-0">
        <Link
          href={href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={`${linkClass(depth)}${depth >= 2 ? " hover:bg-white/10" : ""}`}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  const isOpen = expanded.has(key);
  const groupClass = depth === 1 ? "group/l1" : "group/l2";
  const chevronDesktop = depth === 1 ? "md:rotate-0" : "md:-rotate-90";
  const chevron = (
    <Chevron
      className={`shrink-0 transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      } ${chevronDesktop}`}
    />
  );

  return (
    <li
      className={`border-b border-white/10 last:border-b-0 md:relative md:border-0 ${groupClass}`}
    >
      {item.href ? (
        <div className="flex items-stretch transition-colors hover:bg-white/10">
          <Link
            href={item.href}
            onClick={onNavigate}
            className={`${linkClass(depth)} flex-1`}
          >
            <span>{item.label}</span>
          </Link>
          <button
            type="button"
            onClick={() => onToggle(key)}
            aria-expanded={isOpen}
            aria-label={`${isOpen ? "Recolher" : "Expandir"} ${item.label}`}
            className="flex shrink-0 items-center border-l border-white/10 px-6 text-white/90 md:px-3"
          >
            {chevron}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onToggle(key)}
          aria-expanded={isOpen}
          className={`${linkClass(depth)}${
            depth >= 2 ? " hover:bg-white/10" : ""
          } w-full ${depth === 1 ? "md:w-auto" : ""}`}
        >
          <span>{item.label}</span>
          {chevron}
        </button>
      )}

      <ul className={submenuClass(depth, isOpen)}>
        {item.children!.map((child) => (
          <NavNode
            key={child.href ?? child.label}
            item={child}
            depth={depth + 1}
            parentKey={key}
            expanded={expanded}
            onToggle={onToggle}
            onNavigate={onNavigate}
            pathname={pathname}
          />
        ))}
      </ul>
    </li>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  // Fecha o menu e recolhe todos os submenus abertos.
  const closeMenu = () => {
    setOpen(false);
    setExpanded(new Set());
  };

  // Enquanto o menu está aberto: trava o scroll da página e fecha no Esc.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggleExpanded = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleNavigate = closeMenu;

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-blue shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        <div className="relative mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3">
          <Link
            href="/"
            aria-label="GESC — página inicial"
            className="relative z-10 block h-12 w-[120px] shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/logo_header.webp"
              alt="GESC — Grupo de Engenharia de Sistemas Complexos"
              fill
              priority
              className="object-contain object-left drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
            />
          </Link>

          <button
            type="button"
            onClick={() => (open ? closeMenu() : setOpen(true))}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="main-nav"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded text-white transition-colors hover:bg-white/10 md:hidden"
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>

          <nav
            id="main-nav"
            aria-label="Navegação principal"
            className={`absolute inset-x-0 top-full z-40 overflow-y-auto overscroll-contain bg-brand-blue shadow-[0_16px_24px_rgba(0,0,0,0.25)] transition-[max-height] duration-300 ease-in-out md:static md:z-auto md:max-h-none md:w-auto md:overflow-visible md:bg-transparent md:shadow-none ${
              open ? "max-h-[80vh]" : "max-h-0"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:items-center md:gap-[30px]">
              {navLinks.map((item) => (
                <NavNode
                  key={item.href ?? item.label}
                  item={item}
                  depth={1}
                  parentKey=""
                  expanded={expanded}
                  onToggle={toggleExpanded}
                  onNavigate={handleNavigate}
                  pathname={pathname}
                />
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <button
        type="button"
        aria-label="Fechar menu"
        tabIndex={-1}
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
    </>
  );
}
