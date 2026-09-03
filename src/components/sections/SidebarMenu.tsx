import Link from "next/link";

type Item = { label: string; href: string; active?: boolean };

const items: Item[] = [
  { label: "Coordenadores", href: "#coordenacao", active: true },
  { label: "Publicações", href: "/publicacoes" },
  { label: "Histórico", href: "/historico" },
  { label: "Palavra do Coordenador", href: "#palavra" },
  { label: "Objetivos", href: "#objetivos" },
  { label: "Parceiros", href: "/parceiros" },
  { label: "Significado do Logo", href: "#logo" },
  { label: "Mapa do Campus", href: "#mapa" },
];

const linkClass =
  "block py-3 text-[0.95rem] text-white transition duration-200 hover:translate-x-[5px] hover:font-bold hover:text-[#ffdbe0] aria-[current=page]:translate-x-[5px] aria-[current=page]:font-bold aria-[current=page]:text-[#ffdbe0]";

export function SidebarMenu() {
  return (
    <aside className="h-fit rounded-md bg-brand-red p-[30px] text-white shadow-[0_4px_15px_rgba(138,28,38,0.2)]">
      <h3 className="mb-5 border-b border-white/30 pb-[15px] text-[1.2rem] font-bold">
        GESC
      </h3>
      <nav aria-label="Menu da seção Sobre">
        <ul>
          {items.map((item) => (
            <li key={item.label} className="border-b border-white/10">
              {item.href.startsWith("#") ? (
                <a
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={linkClass}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={linkClass}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
