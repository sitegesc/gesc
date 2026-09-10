import type { Metadata } from "next";

import { PublicacoesLista } from "@/components/publicacoes/PublicacoesLista";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Publicações | GESC",
  description:
    "Artigos e postagens dos bolsistas do projeto e a produção acadêmica do Grupo de Engenharia de Sistemas Complexos (GESC) — FT-UNICAMP.",
};

export default function PublicacoesPage() {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[1040px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Publicações" title="">
          Artigos e postagens escritos pelos bolsistas do projeto, ao lado da
          produção acadêmica do GESC.
        </PageHeader>

        <p className="mb-8 rounded-md border border-[#e6e6e6] bg-[#fafafa] px-4 py-3 text-[0.82rem] leading-relaxed text-[#777]">
          Conteúdo ilustrativo. Quando o portal tiver back-end, cada post ou
          publicação passará a ser um documento próprio (arquivo{" "}
          <code className="rounded bg-[#ececec] px-1 py-0.5 font-mono text-[0.85em] text-[#555]">
            .mdx
          </code>
          ), com o texto completo.
        </p>

        <PublicacoesLista />
      </div>
    </main>
  );
}
