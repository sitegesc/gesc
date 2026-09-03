"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/#linhas-pesquisa", label: "Linhas de Pesquisa" },
  { href: "/publicacoes", label: "Publicações" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
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
          className="inline-flex items-center justify-center p-2 text-white md:hidden"
        >
          <svg
            className="h-6 w-6"
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
          className={`absolute right-0 top-full w-full max-w-[320px] overflow-hidden rounded-bl-lg bg-brand-blue shadow-[0_12px_20px_rgba(0,0,0,0.2)] transition-[max-height] duration-300 ease-in-out md:static md:max-h-none md:w-auto md:max-w-none md:overflow-visible md:rounded-none md:bg-transparent md:shadow-none ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col px-6 pb-4 pt-2 md:flex-row md:items-center md:gap-[30px] md:p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="relative block py-3 text-[0.95rem] font-medium tracking-tight text-white/80 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-red after:transition-[width] after:duration-300 after:content-[''] hover:text-white hover:after:w-full md:py-2 md:text-[0.9rem]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
