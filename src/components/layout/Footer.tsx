import Image from "next/image";
import Link from "next/link";

const footerNav = [
  { href: "/sobre", label: "Sobre" },
  { href: "/#linhas-pesquisa", label: "Pesquisa" },
  { href: "/parceiros", label: "Parceiros" },
];

const social = [
  {
    label: "LinkedIn do GESC",
    href: "https://www.linkedin.com/company/gesc-grupo-de-engenharia-de-sistemas-complexos-unicamp/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram do GESC",
    href: "https://www.instagram.com/gescunicamp/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

const columnHeading =
  "mb-5 border-l-[3px] border-brand-red pl-2.5 text-[1.1rem] font-semibold leading-[1.2] text-white max-md:mb-3 max-md:border-l-0 max-md:pl-0";

export function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-brand-red bg-[#111] pt-[60px] pb-5 text-[#aaa]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start justify-between gap-[30px] px-5 max-md:flex-col max-md:items-center max-md:gap-[26px] max-md:text-center">
        <div className="min-w-[250px] flex-[1.5] max-md:min-w-0">
          <span className="relative block h-20 w-[300px] max-md:mx-auto max-md:h-16 max-md:w-[200px]">
            <Image
              src="/logo_branco.webp"
              alt="GESC"
              fill
              className="object-contain object-left max-md:object-center"
            />
          </span>
        </div>

        <div className="min-w-[150px] flex-1 max-md:w-full max-md:min-w-0">
          <h2 className={columnHeading}>Contato</h2>
          <address className="not-italic leading-7">
            Rua Paschoal Marmo, 1888
            <br />
            Jd. Nova Itália, Limeira - SP
            <br />
            <a
              href="mailto:gesc@unicamp.br"
              className="transition-colors duration-300 hover:text-white"
            >
              gesc@unicamp.br
            </a>
          </address>
        </div>

        <div className="min-w-[150px] flex-1 max-md:w-full max-md:min-w-0">
          <h2 className={columnHeading}>Navegação</h2>
          <ul className="space-y-2.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-[150px] flex-1 max-md:w-full max-md:min-w-0">
          <h2 className={columnHeading}>Social</h2>
          <div className="flex gap-[15px] max-md:justify-center">
            {social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-white transition duration-300 hover:scale-110 hover:text-brand-red"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[50px] w-full border-t border-[#222] pt-5 text-center text-[0.85rem] max-md:mt-6 max-md:pt-3.5">
        © {new Date().getFullYear()} GESC — Todos os direitos reservados.
      </div>
    </footer>
  );
}
