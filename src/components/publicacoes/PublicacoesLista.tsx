"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";

import {
  CATEGORIAS_POST,
  CATEGORIAS_PUBLICACAO,
  PUBLICACOES,
  formatarData,
  type ItemPublicacao,
} from "@/data/publicacoes";
import { FilterIcon } from "@/components/ui/icons";

// Lista da página /publicacoes: posts dos bolsistas + publicações
// acadêmicas, com filtros na barra lateral esquerda (estrutura da versão
// antiga do site — grupos, seleção única, contagem por opção — no visual
// sóbrio das páginas novas). Filtros: Categoria / Ano / Autor.

const ORDEM_CATEGORIAS = [...CATEGORIAS_POST, ...CATEGORIAS_PUBLICACAO];

const ordChave = (p: ItemPublicacao) => p.data ?? String(p.ano);

function FilterGroupShell({
  title,
  scroll,
  children,
}: {
  title: string;
  scroll?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="mb-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#888]">
        {title}
      </h3>
      <ul className={scroll ? "max-h-60 overflow-y-auto pr-1" : undefined}>
        {children}
      </ul>
    </div>
  );
}

function FilterItem({
  label,
  count,
  active,
  accent,
  onClick,
}: {
  label: ReactNode;
  count: number;
  active: boolean;
  accent: "red" | "blue";
  onClick: () => void;
}) {
  const activeCls =
    accent === "blue"
      ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
      : "border-brand-red bg-brand-red/5 text-[#111]";

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`flex w-full items-center justify-between gap-2 border-l-2 py-1.5 pl-2.5 pr-2 text-left text-[0.85rem] transition-colors ${
          active
            ? `${activeCls} font-semibold`
            : "border-transparent text-[#555] hover:bg-[#f4f4f4]"
        }`}
      >
        <span>{label}</span>
        <span
          className={`shrink-0 text-[0.72rem] ${
            active ? "opacity-70" : "text-[#aaa]"
          }`}
        >
          {count}
        </span>
      </button>
    </li>
  );
}

export function PublicacoesLista() {
  const [categoria, setCategoria] = useState<string>("todas");
  const [ano, setAno] = useState<number | "todos">("todos");
  const [autor, setAutor] = useState<string>("todos");

  const categorias = useMemo(() => {
    const presentes = new Set(PUBLICACOES.map((p) => p.categoria));
    return ORDEM_CATEGORIAS.filter((c) => presentes.has(c));
  }, []);

  const anos = useMemo(
    () => [...new Set(PUBLICACOES.map((p) => p.ano))].sort((a, b) => b - a),
    [],
  );

  const autores = useMemo(
    () =>
      [...new Set(PUBLICACOES.flatMap((p) => p.autores))].sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [],
  );

  const contagem = useMemo(() => {
    const porCategoria: Record<string, number> = {};
    const porAno: Record<number, number> = {};
    const porAutor: Record<string, number> = {};
    for (const p of PUBLICACOES) {
      porCategoria[p.categoria] = (porCategoria[p.categoria] ?? 0) + 1;
      porAno[p.ano] = (porAno[p.ano] ?? 0) + 1;
      for (const a of p.autores) porAutor[a] = (porAutor[a] ?? 0) + 1;
    }
    return { porCategoria, porAno, porAutor };
  }, []);

  const lista = useMemo(
    () =>
      PUBLICACOES.filter((p) => {
        if (categoria !== "todas" && p.categoria !== categoria) return false;
        if (ano !== "todos" && p.ano !== ano) return false;
        if (autor !== "todos" && !p.autores.includes(autor)) return false;
        return true;
      }).sort(
        (a, b) =>
          ordChave(b).localeCompare(ordChave(a)) ||
          a.titulo.localeCompare(b.titulo),
      ),
    [categoria, ano, autor],
  );

  const temFiltro =
    categoria !== "todas" || ano !== "todos" || autor !== "todos";

  function limpar() {
    setCategoria("todas");
    setAno("todos");
    setAutor("todos");
  }

  return (
    <div className="grid gap-8 min-[900px]:grid-cols-[220px_1fr] min-[900px]:gap-10">
      {/* Barra lateral de filtros */}
      <aside className="h-fit min-[900px]:sticky min-[900px]:top-20">
        <div className="mb-4 flex items-center gap-2 border-b border-[#e6e6e6] pb-2 text-[0.95rem] font-bold text-brand-blue">
          <FilterIcon className="h-4 w-4" />
          Filtros
          {temFiltro && (
            <button
              type="button"
              onClick={limpar}
              className="ml-auto text-[0.75rem] font-semibold text-brand-red hover:underline"
            >
              Limpar
            </button>
          )}
        </div>

        <FilterGroupShell title="Categoria">
          <FilterItem
            label="Todas"
            count={PUBLICACOES.length}
            active={categoria === "todas"}
            accent="red"
            onClick={() => setCategoria("todas")}
          />
          {categorias.map((c) => (
            <FilterItem
              key={c}
              label={c}
              count={contagem.porCategoria[c] ?? 0}
              active={categoria === c}
              accent="red"
              onClick={() => setCategoria(c)}
            />
          ))}
        </FilterGroupShell>

        <FilterGroupShell title="Ano">
          <FilterItem
            label="Todos os anos"
            count={PUBLICACOES.length}
            active={ano === "todos"}
            accent="blue"
            onClick={() => setAno("todos")}
          />
          {anos.map((a) => (
            <FilterItem
              key={a}
              label={a}
              count={contagem.porAno[a] ?? 0}
              active={ano === a}
              accent="blue"
              onClick={() => setAno(a)}
            />
          ))}
        </FilterGroupShell>

        <FilterGroupShell title="Autor" scroll>
          <FilterItem
            label="Todos os autores"
            count={PUBLICACOES.length}
            active={autor === "todos"}
            accent="red"
            onClick={() => setAutor("todos")}
          />
          {autores.map((a) => (
            <FilterItem
              key={a}
              label={a}
              count={contagem.porAutor[a] ?? 0}
              active={autor === a}
              accent="red"
              onClick={() => setAutor(a)}
            />
          ))}
        </FilterGroupShell>
      </aside>

      {/* Lista */}
      <div className="min-w-0">
        <p className="mb-4 text-[0.85rem] text-[#888]">
          {lista.length} {lista.length === 1 ? "item" : "itens"}
        </p>

        {lista.length === 0 ? (
          <p className="py-12 text-center text-[0.9rem] text-[#888]">
            Nenhum item corresponde aos filtros.
          </p>
        ) : (
          <ol className="border-t border-[#eee]">
            {lista.map((p) => (
              <li key={p.slug} className="border-b border-[#eee] py-6">
                <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide ${
                      p.tipo === "post"
                        ? "bg-brand-red/10 text-brand-red"
                        : "bg-brand-blue/10 text-brand-blue"
                    }`}
                  >
                    {p.tipo === "post" ? "Blog" : "Publicação"}
                  </span>
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-[#999]">
                    {p.categoria} ·{" "}
                    {p.data ? formatarData(p.data) : p.ano}
                  </span>
                </div>

                <h2 className="text-[1.05rem] font-bold leading-snug text-brand-blue">
                  <Link
                    href={`/publicacoes/${p.slug}`}
                    className="transition-colors hover:text-brand-red"
                  >
                    {p.titulo}
                  </Link>
                </h2>

                {p.tipo === "post" ? (
                  <p className="mt-1.5 text-[0.9rem] text-[#333]">
                    Por {p.autores.join(", ")}
                    {p.autorInfo && (
                      <span className="text-[#888]"> · {p.autorInfo}</span>
                    )}
                  </p>
                ) : (
                  <>
                    <p className="mt-1.5 text-[0.9rem] text-[#333]">
                      {p.autores.join("; ")}
                    </p>
                    <p className="mt-0.5 text-[0.88rem] italic text-[#555]">
                      {p.veiculo}
                      {p.local ? ` — ${p.local}` : ""}, {p.ano}.
                    </p>
                  </>
                )}

                <p className="mt-3 text-[0.9rem] leading-[1.7] text-[#555]">
                  {p.resumo}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  {p.areas.map((a) => (
                    <span
                      key={a}
                      className="rounded border border-[#e2e5ea] bg-[#f7f9fc] px-2 py-0.5 text-[0.72rem] text-[#3f4652]"
                    >
                      {a}
                    </span>
                  ))}
                  {p.doi && (
                    <span className="text-[0.78rem] text-[#888]">
                      DOI: {p.doi}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
