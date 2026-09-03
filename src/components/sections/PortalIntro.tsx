import Image from "next/image";

import portal from "@/imgs/portal.webp";

import { SectionTitle } from "@/components/ui/SectionTitle";

import { SidebarMenu } from "./SidebarMenu";

const paragraphClass = "mb-[18px] text-justify leading-[1.7] text-[#444]";

export function PortalIntro() {
  return (
    <section className="py-16 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>Bem-vindos ao Portal do GESC</SectionTitle>
      </div>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-5 md:grid-cols-[280px_1fr] md:gap-[50px]">
        <SidebarMenu />

        <article>
          <Image
            src={portal}
            alt="Portal GESC"
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, 870px"
            className="mb-[30px] h-64 w-full rounded-lg object-cover shadow-[0_5px_15px_rgba(0,0,0,0.1)] md:h-[400px]"
          />

          <div>
            <p className={paragraphClass}>
              Sejam bem-vindos ao portal oficial do{" "}
              <strong>GESC – Grupo de Engenharia de Sistemas Complexos</strong>,
              sediado na Faculdade de Tecnologia (FT) da UNICAMP, em Limeira.
            </p>
            <p className={paragraphClass}>
              Nosso grupo consolidou-se como um centro{" "}
              <strong>multidisciplinar</strong> de excelência, onde pesquisadores
              e alunos de graduação e pós-graduação colaboram no desenvolvimento
              de soluções tecnológicas e modelos matemáticos avançados. Atuamos
              na intersecção estratégica entre as Engenharias (Telecomunicações,
              Transportes, Ambiental e Produção), a Administração e os Sistemas de
              Informação, utilizando ferramentas de Econofísica e Teoria dos
              Jogos para compreender fenômenos dinâmicos em mercados e redes.
            </p>
            <p className={paragraphClass}>
              Com o apoio fundamental de agências de fomento como{" "}
              <strong>FAPESP</strong> e <strong>CNPq</strong>, o GESC transforma
              dados em inteligência estratégica. Seja através da otimização de
              tarifas em telecomunicações ou do estudo de fluxos logísticos e
              sustentabilidade, nosso compromisso é com a inovação científica e a
              formação de mestres e engenheiros capacitados para liderar as
              transformações da sociedade moderna.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
