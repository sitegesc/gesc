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
  title: "Termos de Uso | GESC",
  description:
    "Termos de uso do site do Grupo de Engenharia de Sistemas Complexos (GESC) da FT-UNICAMP.",
};

export default function TermosPage() {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[820px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Termos de" title="Uso">
          Condições para o uso deste site e do seu conteúdo.
        </PageHeader>

        <DraftNotice>
          <strong>Minuta.</strong> Este texto ainda será revisado pela
          coordenação do GESC e validado juridicamente antes de entrar em vigor.
          Trechos marcados como <em>[a definir]</em> dependem dessa revisão.
        </DraftNotice>

        <LastUpdated>
          <em>[a definir]</em>
        </LastUpdated>

        <LegalSection n={1} titulo="Aceitação">
          <p className={legalP}>
            Ao acessar e usar este site, você concorda com estes Termos de Uso e
            com a{" "}
            <Link
              href="/privacidade"
              className="font-medium text-brand-blue hover:text-brand-red"
            >
              Política de Privacidade
            </Link>
            . Se não concordar, não utilize o site.
          </p>
        </LegalSection>

        <LegalSection n={2} titulo="Do que se trata este site">
          <p className={legalP}>
            Este é o site institucional do{" "}
            <strong>Grupo de Engenharia de Sistemas Complexos (GESC)</strong>,
            vinculado à Faculdade de Tecnologia (FT) da UNICAMP. Tem finalidade
            informativa e de apoio às atividades de pesquisa e extensão do grupo,
            incluindo a divulgação de oficinas e a produção acadêmica.
          </p>
        </LegalSection>

        <LegalSection n={3} titulo="Uso permitido">
          <p className={legalP}>Ao usar o site, você se compromete a:</p>
          <ul className={legalUl}>
            <li>fornecer informações verdadeiras nos formulários;</li>
            <li>
              não enviar dados de terceiros sem autorização, exceto no caso da
              inscrição de dependente feita pelo responsável legal;
            </li>
            <li>
              não tentar sobrecarregar, invadir, interromper ou contornar
              mecanismos de segurança do site;
            </li>
            <li>
              não usar o conteúdo para fins ilícitos ou que violem direitos de
              terceiros.
            </li>
          </ul>
        </LegalSection>

        <LegalSection n={4} titulo="Conteúdo e propriedade intelectual">
          <ul className={legalUl}>
            <li>
              textos, imagens e materiais produzidos pelo GESC podem ser citados
              e reutilizados para fins educacionais e não comerciais, com
              atribuição ao grupo;
            </li>
            <li>
              marcas e logotipos de outras instituições pertencem aos
              respectivos titulares e aparecem apenas para identificar
              colaborações;
            </li>
            <li>
              a base do mapa do campus é da Prefeitura Universitária da UNICAMP
              (Campus Limeira) e é usada para fins educacionais;
            </li>
            <li>
              publicações acadêmicas seguem os direitos dos respectivos
              periódicos e editoras.
            </li>
          </ul>
        </LegalSection>

        <LegalSection n={5} titulo="Informações enviadas pelos formulários">
          <p className={legalP}>
            As informações enviadas nos formulários de contato e de inscrição são
            tratadas conforme a{" "}
            <Link
              href="/privacidade"
              className="font-medium text-brand-blue hover:text-brand-red"
            >
              Política de Privacidade
            </Link>
            . O envio de um formulário não garante, por si só, vaga em oficina
            nem resposta em prazo determinado.
          </p>
        </LegalSection>

        <LegalSection n={6} titulo="Links para sites externos">
          <p className={legalP}>
            O site pode conter links para páginas de terceiros (periódicos,
            instituições parceiras, mapas). Não temos controle sobre esse
            conteúdo e não nos responsabilizamos por ele.
          </p>
        </LegalSection>

        <LegalSection n={7} titulo="Disponibilidade e isenção de responsabilidade">
          <p className={legalP}>
            O site é oferecido &ldquo;no estado em que se encontra&rdquo;. Pode
            haver períodos de indisponibilidade, manutenção ou conteúdo
            provisório e sujeito a correção. Empenhamo-nos pela exatidão das
            informações, mas não garantimos que estejam sempre completas ou
            atualizadas.
          </p>
        </LegalSection>

        <LegalSection n={8} titulo="Alterações destes termos">
          <p className={legalP}>
            Estes termos podem ser atualizados a qualquer momento. A data da
            última atualização é indicada no topo da página.
          </p>
        </LegalSection>

        <LegalSection n={9} titulo="Legislação aplicável">
          <p className={legalP}>
            Aplica-se a legislação brasileira. O foro competente é{" "}
            <em>[a definir]</em>.
          </p>
        </LegalSection>

        <LegalSection n={10} titulo="Contato">
          <p className={legalP}>
            Dúvidas sobre estes termos:{" "}
            <a
              href={`mailto:${CONTATO.email}`}
              className="font-medium text-brand-blue hover:text-brand-red"
            >
              {CONTATO.email}
            </a>{" "}
            — {CONTATO.unidade}.
          </p>
        </LegalSection>
      </div>
    </main>
  );
}
