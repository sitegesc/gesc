import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/ui/PageHeader";
import {
  DraftNotice,
  LastUpdated,
  LegalSection,
  legalH3,
  legalP,
  legalUl,
} from "@/components/ui/legal";
import { CONTATO } from "@/data/gesc";

export const metadata: Metadata = {
  title: "Política de Privacidade | GESC",
  description:
    "Como o GESC trata os dados pessoais coletados neste site, conforme a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).",
};

// MINUTA. Este texto precisa ser revisado pela coordenação do GESC e
// validado pelo Encarregado de Proteção de Dados da UNICAMP antes de
// entrar em vigor. Trechos "[a definir]" dependem dessa revisão.

const pClass = legalP;
const ulClass = legalUl;

export default function PrivacidadePage() {
  return (
    <main className="flex-1 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[820px] px-5 py-12 sm:py-16">
        <PageHeader highlight="Política de" title="Privacidade">
          Como o GESC trata os dados pessoais coletados neste site, de acordo com
          a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
        </PageHeader>

        <DraftNotice>
          <strong>Minuta.</strong> Este texto ainda será revisado pela
          coordenação do GESC e validado pelo Encarregado de Proteção de Dados da
          UNICAMP antes de entrar em vigor. Os trechos marcados como{" "}
          <em>[a definir]</em> dependem dessa revisão.
        </DraftNotice>

        <LastUpdated>
          <em>[a definir]</em>
        </LastUpdated>

        <LegalSection n={1} titulo="Quem é responsável pelos seus dados">
          <p className={pClass}>
            O tratamento dos dados pessoais coletados neste site é feito pelo{" "}
            <strong>Grupo de Engenharia de Sistemas Complexos (GESC)</strong>,
            vinculado à Faculdade de Tecnologia (FT) da Universidade Estadual de
            Campinas (UNICAMP), em Limeira/SP.
          </p>
          <p className={pClass}>
            Contato do grupo:{" "}
            <a
              href={`mailto:${CONTATO.email}`}
              className="font-medium text-brand-blue hover:text-brand-red"
            >
              {CONTATO.email}
            </a>
            . O canal do Encarregado de Proteção de Dados (DPO) da UNICAMP é{" "}
            <em>[a definir]</em>.
          </p>
        </LegalSection>

        <LegalSection n={2} titulo="Quais dados coletamos">
          <p className={pClass}>
            Coletamos apenas os dados que você informa nos formulários do site, e
            somente os necessários para cada finalidade.
          </p>

          <h3 className={legalH3}>
            Formulário de contato
          </h3>
          <ul className={ulClass}>
            <li>nome completo;</li>
            <li>e-mail;</li>
            <li>instituição ou empresa (opcional);</li>
            <li>área de interesse;</li>
            <li>conteúdo da mensagem.</li>
          </ul>

          <h3 className={legalH3}>
            Inscrição em oficinas — famílias
          </h3>
          <ul className={ulClass}>
            <li>nome completo e idade do aluno (criança ou adolescente);</li>
            <li>nome do responsável;</li>
            <li>telefone para contato;</li>
            <li>oficinas escolhidas e dias de disponibilidade.</li>
          </ul>

          <h3 className={legalH3}>
            Inscrição para aplicar uma oficina
          </h3>
          <ul className={ulClass}>
            <li>nome completo, e-mail e WhatsApp;</li>
            <li>
              se é aluno(a) da UNICAMP e, em caso afirmativo, o RA (Registro
              Acadêmico);
            </li>
            <li>
              informações sobre a oficina proposta (nome, descrição, dias,
              horário, duração e número de encontros).
            </li>
          </ul>

          <h3 className={legalH3}>
            Dados de navegação
          </h3>
          <p className={pClass}>
            O site não utiliza ferramentas de análise de audiência nem cookies de
            rastreamento próprios. O provedor de hospedagem pode manter registros
            técnicos de acesso (logs) para segurança e funcionamento —{" "}
            <em>[a definir]</em>. A página de contato incorpora um mapa do Google
            Maps; ao carregá-lo, o Google pode coletar dados conforme a política
            de privacidade dele.
          </p>
        </LegalSection>

        <LegalSection n={3} titulo="Para que usamos os dados e com qual base legal">
          <ul className={ulClass}>
            <li>
              responder a mensagens e solicitações enviadas pelo formulário de
              contato;
            </li>
            <li>
              organizar as turmas das oficinas, confirmar vagas e entrar em
              contato com os responsáveis;
            </li>
            <li>
              avaliar propostas de oficinas e organizar a agenda de aplicadores.
            </li>
          </ul>
          <p className={pClass}>
            As bases legais são o <strong>consentimento</strong> do titular (art.
            7º, I, da LGPD) e, quando aplicável, a execução de políticas públicas
            e de atividades de extensão universitária (art. 7º, III e IV). Para
            dados de crianças e adolescentes aplica-se o art. 14 (ver a seção 4).
          </p>
        </LegalSection>

        <LegalSection n={4} titulo="Dados de crianças e adolescentes">
          <p className={pClass}>
            A inscrição em oficinas envolve dados de crianças e adolescentes.
            Esses dados são tratados no melhor interesse do titular e com o{" "}
            <strong>
              consentimento específico e destacado de pelo menos um dos pais ou
              do responsável legal
            </strong>
            , dado no momento da inscrição (art. 14 da LGPD).
          </p>
          <ul className={ulClass}>
            <li>
              coletamos o mínimo necessário para organizar as turmas e manter
              contato com a família;
            </li>
            <li>
              não condicionamos a participação ao fornecimento de dados além dos
              necessários;
            </li>
            <li>
              os dados não são usados para publicidade nem repassados a
              terceiros com essa finalidade.
            </li>
          </ul>
          <p className={pClass}>
            O responsável pode revogar o consentimento e solicitar a exclusão dos
            dados a qualquer momento (ver a seção 8).
          </p>
        </LegalSection>

        <LegalSection n={5} titulo="Com quem compartilhamos">
          <p className={pClass}>
            Os dados são acessados pela equipe do GESC e por setores da UNICAMP
            envolvidos nas atividades. Não vendemos nem cedemos dados pessoais.
          </p>
          <ul className={ulClass}>
            <li>
              provedores de infraestrutura e hospedagem do site, quando houver —{" "}
              <em>[a definir]</em>;
            </li>
            <li>
              Google Maps, ao carregar o mapa incorporado na página de contato;
            </li>
            <li>
              autoridades públicas, quando exigido por lei ou ordem judicial.
            </li>
          </ul>
        </LegalSection>

        <LegalSection n={6} titulo="Por quanto tempo guardamos">
          <p className={pClass}>
            Os dados são mantidos pelo tempo necessário às finalidades acima ou
            até que o titular solicite a exclusão, o que ocorrer primeiro,
            respeitados os prazos legais de guarda aplicáveis à UNICAMP —{" "}
            <em>[a definir]</em>. Depois disso, são eliminados ou anonimizados.
          </p>
        </LegalSection>

        <LegalSection n={7} titulo="Segurança">
          <p className={pClass}>
            Adotamos medidas técnicas e administrativas para proteger os dados
            contra acesso não autorizado, perda ou uso indevido. Nenhum sistema é
            totalmente imune a incidentes; em caso de incidente relevante,
            seguiremos os procedimentos de comunicação previstos na LGPD.
          </p>
        </LegalSection>

        <LegalSection n={8} titulo="Seus direitos">
          <p className={pClass}>
            Nos termos do art. 18 da LGPD, você pode solicitar, a qualquer
            momento:
          </p>
          <ul className={ulClass}>
            <li>confirmação de que tratamos seus dados e acesso a eles;</li>
            <li>
              correção de dados incompletos, inexatos ou desatualizados;
            </li>
            <li>
              anonimização, bloqueio ou eliminação de dados desnecessários ou
              excessivos;
            </li>
            <li>portabilidade dos dados;</li>
            <li>eliminação dos dados tratados com base no consentimento;</li>
            <li>informação sobre com quem seus dados foram compartilhados;</li>
            <li>
              informação sobre a possibilidade de não consentir e as
              consequências disso;
            </li>
            <li>revogação do consentimento.</li>
          </ul>
          <p className={pClass}>
            Para exercer esses direitos, use a página de{" "}
            <Link
              href="/contato"
              className="font-medium text-brand-blue hover:text-brand-red"
            >
              Contato
            </Link>{" "}
            ou escreva para{" "}
            <a
              href={`mailto:${CONTATO.email}`}
              className="font-medium text-brand-blue hover:text-brand-red"
            >
              {CONTATO.email}
            </a>
            . Você também pode acionar o Encarregado da UNICAMP (<em>[a definir]</em>)
            ou a Autoridade Nacional de Proteção de Dados (ANPD).
          </p>
        </LegalSection>

        <LegalSection n={9} titulo="Cookies e tecnologias semelhantes">
          <p className={pClass}>
            Este site não usa cookies para rastreamento ou publicidade. Pode
            usar armazenamento local do navegador apenas para conveniências da
            interface (por exemplo, lembrar um filtro), sem dados pessoais. O
            mapa incorporado do Google pode definir cookies próprios do Google
            quando carregado.
          </p>
        </LegalSection>

        <LegalSection n={10} titulo="Alterações nesta política">
          <p className={pClass}>
            Esta política pode ser atualizada. A data da última atualização é
            indicada no topo da página. Mudanças relevantes serão sinalizadas no
            site.
          </p>
        </LegalSection>

        <LegalSection n={11} titulo="Contato">
          <p className={pClass}>
            Dúvidas sobre esta política ou sobre o tratamento dos seus dados:{" "}
            <a
              href={`mailto:${CONTATO.email}`}
              className="font-medium text-brand-blue hover:text-brand-red"
            >
              {CONTATO.email}
            </a>{" "}
            — {CONTATO.unidade}. Encarregado de Proteção de Dados da UNICAMP:{" "}
            <em>[a definir]</em>.
          </p>
        </LegalSection>
      </div>
    </main>
  );
}
