import Link from "next/link";

import { PUBLICACOES, formatarData } from "@/data/publicacoes";

// Mostra os itens mais recentes de /publicacoes (posts dos bolsistas e
// publicações). Sem conteúdo fixo — segue os dados.

const ordChave = (p: (typeof PUBLICACOES)[number]) => p.data ?? String(p.ano);

const recentes = [...PUBLICACOES]
  .sort((a, b) => ordChave(b).localeCompare(ordChave(a)))
  .slice(0, 4);

const [destaque, ...lista] = recentes;

const btnLink =
  "mt-auto self-start border-b-2 border-brand-blue pb-[5px] text-[0.85rem] font-bold text-brand-blue transition-colors duration-300 hover:border-brand-red hover:text-brand-red";

function ImagePlaceholder({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-gradient-to-br from-[#cdd8ec] to-[#a9bcdd] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-10 w-10 fill-white/60">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    </div>
  );
}

function selo(p: (typeof PUBLICACOES)[number]) {
  return `${p.categoria} · ${p.data ? formatarData(p.data) : p.ano}`;
}

export function Noticias() {
  if (!destaque) return null;

  return (
    <section
      id="noticias"
      className="bg-white py-20 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]"
    >
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-[30px] flex flex-wrap items-end justify-between gap-4">
          <h2 className="relative inline-block pb-[15px] text-[2.2rem] font-bold text-brand-blue after:mt-2.5 after:block after:h-1 after:w-[60px] after:rounded-sm after:bg-brand-red after:content-['']">
            Novidades e Artigos
          </h2>
          <Link
            href="/publicacoes"
            className="pb-1 text-[0.85rem] font-bold text-brand-blue transition-colors hover:text-brand-red"
          >
            Ver todas as publicações →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-[30px] min-[992px]:grid-cols-3">
          <article className="flex flex-col min-[992px]:col-span-3 min-[992px]:flex-row min-[992px]:items-stretch">
            <ImagePlaceholder className="min-h-[400px] w-full min-[992px]:w-[60%]" />
            <div className="flex w-full flex-col justify-center bg-[#eef2f9] px-10 py-[50px] min-[992px]:w-[40%]">
              <small className="mb-[15px] text-[0.8rem] font-bold uppercase tracking-[1px] text-[#444]">
                {selo(destaque)}
              </small>
              <h3 className="mb-5 text-[1.8rem] font-bold leading-[1.2] text-[#111]">
                {destaque.titulo}
              </h3>
              <p className="mb-[30px] leading-[1.6] text-[#555]">
                {destaque.resumo}
              </p>
              <Link href={`/publicacoes/${destaque.slug}`} className={btnLink}>
                Ler mais →
              </Link>
            </div>
          </article>

          {lista.map((item) => (
            <article key={item.slug} className="flex flex-col">
              <ImagePlaceholder className="h-[220px] w-full" />
              <div className="flex flex-grow flex-col bg-[#eef2f9] px-5 py-[25px]">
                <small className="mb-3 text-[0.72rem] font-bold uppercase tracking-[1px] text-[#666]">
                  {selo(item)}
                </small>
                <h4 className="mb-[25px] text-[1.1rem] font-bold leading-[1.4] text-[#222]">
                  {item.titulo}
                </h4>
                <Link href={`/publicacoes/${item.slug}`} className={btnLink}>
                  Ler mais →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
