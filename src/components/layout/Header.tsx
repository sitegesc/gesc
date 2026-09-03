"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/#linhas-pesquisa", label: "Linhas de Pesquisa" },
  { href: "/publicacoes", label: "Publicações" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Enquanto o menu está aberto: trava o scroll da página e fecha no Esc.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

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
            onClick={() => setOpen((value) => !value)}
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
              {navLinks.map((link) => {
                const isHash = link.href.includes("#");
                const active =
                  !isHash &&
                  (link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href));

                return (
                  <li
                    key={link.href}
                    className="border-b border-white/10 last:border-b-0 md:border-0"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="relative flex items-center border-l-4 border-transparent px-5 py-4 text-[1.05rem] font-medium tracking-tight text-white/80 transition-colors duration-300 hover:bg-white/5 hover:text-white aria-[current=page]:border-brand-red aria-[current=page]:bg-white/5 aria-[current=page]:text-white md:border-l-0 md:px-0 md:py-2 md:text-[0.9rem] md:hover:bg-transparent md:after:absolute md:after:bottom-0 md:after:left-0 md:after:h-0.5 md:after:w-0 md:after:bg-brand-red md:after:transition-[width] md:after:duration-300 md:after:content-[''] md:hover:after:w-full md:aria-[current=page]:after:w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      <button
        type="button"
        aria-label="Fechar menu"
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
    </>
  );
}
