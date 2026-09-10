import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/ui/PageHeader";
import {
  DraftNotice,
  LastUpdated,
  LegalSection,
  legalP,
  legalUl,
} from "@/components/ui/legal";
import { CONTATO } from "@/data/gesc";

export const metadata: Metadata = {
  title: "Acessibilidade | GESC",
  description:
    "Declaração de acessibilidade do site do Grupo de Engenharia de Sistemas Complexos (GESC) da FT-UNICAMP.",
};

export default function AcessibilidadePage() {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[820px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Acessibilidade" title="">
          Nosso compromisso em manter este site utilizável pelo maior número
          possível de pessoas.
        </PageHeader>

        <DraftNotice>
          <strong>Minuta.</strong> Esta declaração ainda será revisada pela
          coordenação do GESC. Trechos marcados como <em>[a definir]</em>{" "}
          dependem dessa revisão.
        </DraftNotice>

        <LastUpdated>
          <em>[a definir]</em>
        </LastUpdated>

        <LegalSection n={1} titulo="Compromisso">
          <p className={legalP}>
            Trabalhamos para que o conteúdo e as funcionalidades deste site
            possam ser usados por pessoas com diferentes deficiências e por quem
            utiliza tecnologias assistivas. A acessibilidade é tratada como um
            trabalho contínuo, revisado a cada nova página ou funcionalidade.
          </p>
        </LegalSection>

        <LegalSection n={2} titulo="Padrões de referência">
          <p className={legalP}>
            Buscamos atender às recomendações das{" "}
            <strong>WCAG 2.1</strong> (Diretrizes de Acessibilidade para
            Conteúdo Web) no nível <strong>AA</strong> e ao{" "}
            <strong>eMAG</strong> (Modelo de Acessibilidade em Governo
            Eletrônico), usado como referência no contexto de instituições
            públicas.
          </p>
        </LegalSection>

        <LegalSection n={3} titulo="O que já está implementado">
          <ul className={legalUl}>
            <li>estrutura de títulos e marcos (landmarks) semânticos;</li>
            <li>
              navegação completa por teclado, com indicador de foco visível;
            </li>
            <li>textos alternativos nas imagens que transmitem informação;</li>
            <li>rótulos associados aos campos de formulário;</li>
            <li>
              contraste de cores adequado entre texto e fundo na maior parte da
              interface;
            </li>
            <li>
              layout responsivo, que se adapta a telas pequenas e a zoom de até
              200%;
            </li>
            <li>
              conteúdo que respeita a preferência de tema do sistema e não
              depende apenas de cor para transmitir significado.
            </li>
          </ul>
        </LegalSection>

        <LegalSection n={4} titulo="Limitações conhecidas">
          <p className={legalP}>
            Alguns pontos ainda precisam de melhorias:
          </p>
          <ul className={legalUl}>
            <li>
              o mapa interativo do campus e o mapa do Google incorporado na
              página de contato têm interação por mouse/arraste e podem não ser
              totalmente operáveis por teclado ou leitor de tela; o endereço
              completo é apresentado em texto como alternativa;
            </li>
            <li>
              documentos e páginas de terceiros ligados a partir do site podem
              não seguir os mesmos padrões;
            </li>
            <li>
              páginas ainda em construção podem conter conteúdo provisório.
            </li>
          </ul>
        </LegalSection>

        <LegalSection n={5} titulo="Como relatar um problema">
          <p className={legalP}>
            Se você encontrar uma barreira de acessibilidade, avise-nos pela
            página de{" "}
            <Link
              href="/contato"
              className="font-medium text-brand-blue hover:text-brand-red"
            >
              Contato
            </Link>{" "}
            ou pelo e-mail{" "}
            <a
              href={`mailto:${CONTATO.email}`}
              className="font-medium text-brand-blue hover:text-brand-red"
            >
              {CONTATO.email}
            </a>
            , descrevendo a página, o que tentou fazer e, se possível, o
            navegador e a tecnologia assistiva utilizados. Retornaremos o mais
            breve possível.
          </p>
        </LegalSection>
      </div>
    </main>
  );
}
