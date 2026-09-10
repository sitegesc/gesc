import type { Metadata } from "next";

import { ContatoForm } from "@/components/contato/ContatoForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChevronDownIcon } from "@/components/ui/icons";
import { CONTATO, CONTATOS_ASSUNTO, FAQ } from "@/data/gesc";

export const metadata: Metadata = {
  title: "Contato | GESC",
  description:
    "Contato do Grupo de Engenharia de Sistemas Complexos (GESC) — Faculdade de Tecnologia da UNICAMP, Limeira/SP.",
};

const h2Class =
  "mb-5 border-b border-[#e6e6e6] pb-2 text-[1.15rem] font-bold text-brand-blue";
const dtClass =
  "text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#888] sm:pt-0.5";

export default function ContatoPage() {
  const { endereco } = CONTATO;

  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[920px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Contato" title="">
          {CONTATO.nomeCompleto} — {CONTATO.unidade}.
        </PageHeader>

        {/* Dados de contato */}
        <section>
          <h2 className={h2Class}>Dados de contato</h2>

          <dl className="border-t border-[#eee]">
            <div className="grid gap-x-8 gap-y-1 border-b border-[#eee] py-4 sm:grid-cols-[10rem_1fr]">
              <dt className={dtClass}>E-mail</dt>
              <dd className="text-[0.95rem] text-[#333]">
                <a
                  href={`mailto:${CONTATO.email}`}
                  className="font-medium text-brand-blue transition-colors hover:text-brand-red"
                >
                  {CONTATO.email}
                </a>
              </dd>
            </div>

            <div className="grid gap-x-8 gap-y-1 border-b border-[#eee] py-4 sm:grid-cols-[10rem_1fr]">
              <dt className={dtClass}>Endereço</dt>
              <dd className="text-[0.95rem] leading-[1.7] text-[#333]">
                {endereco.logradouro}
                <br />
                {endereco.bairro} — {endereco.cidade}
                <br />
                CEP {endereco.cep}
                <br />
                <span className="text-[#666]">{CONTATO.local}</span>
              </dd>
            </div>

            <div className="grid gap-x-8 gap-y-1 border-b border-[#eee] py-4 sm:grid-cols-[10rem_1fr]">
              <dt className={dtClass}>Expediente</dt>
              <dd className="text-[0.95rem] text-[#333]">{CONTATO.expediente}</dd>
            </div>

            <div className="grid gap-x-8 gap-y-1 border-b border-[#eee] py-4 sm:grid-cols-[10rem_1fr]">
              <dt className={dtClass}>Redes sociais</dt>
              <dd className="text-[0.95rem] text-[#333]">
                {CONTATO.redes.map((rede, index) => (
                  <span key={rede.label}>
                    {index > 0 && <span className="mx-2 text-[#ccc]">·</span>}
                    <a
                      href={rede.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-blue transition-colors hover:text-brand-red"
                    >
                      {rede.label}
                    </a>
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        {/* Encaminhamento por assunto */}
        <section className="mt-14">
          <h2 className={h2Class}>Encaminhamento por assunto</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.9rem]">
              <thead>
                <tr className="border-b border-[#ddd] text-left text-[0.68rem] uppercase tracking-[0.08em] text-[#888]">
                  <th className="py-2 pr-4 font-semibold">Assunto</th>
                  <th className="py-2 font-semibold">Como escrever</th>
                </tr>
              </thead>
              <tbody>
                {CONTATOS_ASSUNTO.map((row) => (
                  <tr
                    key={row.assunto}
                    className="border-b border-[#eee] align-top"
                  >
                    <td className="py-3 pr-4 text-[#333]">{row.assunto}</td>
                    <td className="py-3 text-[#555]">
                      <a
                        href={`mailto:${CONTATO.email}`}
                        className="text-brand-blue transition-colors hover:text-brand-red"
                      >
                        {CONTATO.email}
                      </a>
                      {row.titulo !== "—" && (
                        <> · assunto: &ldquo;{row.titulo}&rdquo;</>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[0.8rem] leading-relaxed text-[#888]">
            Ainda não há endereços específicos por área; use o e-mail geral
            indicando o assunto no título da mensagem.
          </p>
        </section>

        {/* Localização */}
        <section className="mt-14">
          <h2 className={h2Class}>Localização</h2>

          <p className="mb-4 text-[0.95rem] leading-[1.7] text-[#444]">
            O GESC está sediado na Faculdade de Tecnologia da UNICAMP, em Limeira
            ({endereco.logradouro} — {endereco.bairro}, {endereco.cidade}, CEP{" "}
            {endereco.cep}).
          </p>

          <div className="overflow-hidden rounded-lg border border-[#e5e5e5]">
            <iframe
              src={CONTATO.mapaEmbed}
              title="Mapa — Faculdade de Tecnologia da UNICAMP, Limeira/SP"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[380px] w-full border-0"
            />
          </div>

          <a
            href={CONTATO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-[0.9rem] font-semibold text-brand-blue transition-colors hover:text-brand-red"
          >
            Abrir no Google Maps →
          </a>
        </section>

        {/* Formulário */}
        <section className="mt-14">
          <h2 className={h2Class}>Envie uma mensagem</h2>

          <p className="mb-5 text-[0.95rem] leading-[1.7] text-[#444]">
            Preencha os campos abaixo. O retorno é feito pelo e-mail informado,
            normalmente em alguns dias úteis.
          </p>

          <div className="rounded-lg border border-[#e5e5e5] p-5 sm:p-7">
            <ContatoForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className={h2Class}>Perguntas frequentes</h2>

          <div className="border-t border-[#e6e6e6]">
            {FAQ.map((item) => (
              <details
                key={item.pergunta}
                className="group border-b border-[#e6e6e6]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.95rem] font-semibold text-[#222] [&::-webkit-details-marker]:hidden">
                  {item.pergunta}
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-[#aaa] transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-4 text-[0.92rem] leading-[1.7] text-[#555]">
                  {item.resposta}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
