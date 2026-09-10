import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PUBLICACOES, formatarData, getPublicacao } from "@/data/publicacoes";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PUBLICACOES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPublicacao(slug);
  if (!item) return { title: "Publicação não encontrada" };
  return { title: item.titulo, description: item.resumo };
}

export default async function PublicacaoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = getPublicacao(slug);
  if (!item) notFound();

  const relacionados = PUBLICACOES.filter(
    (p) => p.slug !== item.slug && p.areas.some((a) => item.areas.includes(a)),
  ).slice(0, 3);

  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <article className="mx-auto max-w-[760px] px-5 py-12 sm:py-16">
        <Link
          href="/publicacoes"
          className="text-[0.85rem] font-semibold text-brand-blue transition-colors hover:text-brand-red"
        >
          ← Publicações
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span
            className={`rounded px-1.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide ${
              item.tipo === "post"
                ? "bg-brand-red/10 text-brand-red"
                : "bg-brand-blue/10 text-brand-blue"
            }`}
          >
            {item.tipo === "post" ? "Blog" : "Publicação"}
          </span>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-[#999]">
            {item.categoria} · {item.data ? formatarData(item.data) : item.ano}
          </span>
        </div>

        <h1 className="mt-2 text-[1.7rem] font-bold leading-tight text-brand-blue sm:text-[2rem]">
          {item.titulo}
        </h1>

        {item.tipo === "post" ? (
          <p className="mt-3 text-[0.95rem] text-[#333]">
            Por {item.autores.join(", ")}
            {item.autorInfo && (
              <span className="text-[#888]"> · {item.autorInfo}</span>
            )}
          </p>
        ) : (
          <>
            <p className="mt-3 text-[0.95rem] text-[#333]">
              {item.autores.join("; ")}
            </p>
            <p className="mt-0.5 text-[0.9rem] italic text-[#555]">
              {item.veiculo}
              {item.local ? ` — ${item.local}` : ""}, {item.ano}.
            </p>
          </>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          {item.areas.map((a) => (
            <span
              key={a}
              className="rounded border border-[#e2e5ea] bg-[#f7f9fc] px-2 py-0.5 text-[0.72rem] text-[#3f4652]"
            >
              {a}
            </span>
          ))}
          {item.doi && (
            <span className="text-[0.78rem] text-[#888]">DOI: {item.doi}</span>
          )}
        </div>

        <hr className="my-8 border-[#eee]" />

        <p className="text-[1rem] leading-[1.8] text-[#333]">{item.resumo}</p>

        <p className="mt-8 rounded-md border border-[#e6e6e6] bg-[#fafafa] px-4 py-3 text-[0.82rem] leading-relaxed text-[#777]">
          {item.tipo === "post"
            ? "O texto completo deste post será publicado quando o portal tiver back-end (arquivo .mdx)."
            : "O texto integral está na publicação original. O identificador DOI acima é ilustrativo enquanto os dados não vêm de um back-end."}
        </p>

        {relacionados.length > 0 && (
          <section className="mt-12 border-t border-[#eee] pt-8">
            <h2 className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-brand-red">
              Relacionados
            </h2>
            <ul className="space-y-3">
              {relacionados.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/publicacoes/${r.slug}`}
                    className="text-[0.92rem] font-semibold text-brand-blue transition-colors hover:text-brand-red"
                  >
                    {r.titulo}
                  </Link>
                  <span className="ml-2 text-[0.78rem] text-[#999]">
                    {r.data ? formatarData(r.data) : r.ano}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
