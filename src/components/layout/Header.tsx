"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#linhas-pesquisa", label: "Linhas de Pesquisa" },
  { href: "/publicacoes", label: "Publicações" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-zinc-800 bg-zinc-900 text-zinc-100">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="relative block h-10 w-[150px] shrink-0"
          aria-label="GESC — página inicial"
        >
          <Image
            src="/logo_branco.webp"
            alt="GESC — Grupo de Engenharia de Sistemas Complexos"
            fill
            priority
            className="object-contain object-left"
          />
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded p-2 text-zinc-200 md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((value) => !value)}
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
          className={`${
            open ? "block" : "hidden"
          } absolute inset-x-0 top-full z-20 border-b border-zinc-800 bg-zinc-900 px-4 pb-4 md:static md:z-auto md:block md:border-0 md:p-0`}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
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
