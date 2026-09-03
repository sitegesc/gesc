import Image, { type StaticImageData } from "next/image";

import yuri from "@/imgs/pessoas/coordenadores/yuri.webp";
import rafael from "@/imgs/pessoas/coordenadores/rafael.webp";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { socialIcons } from "@/lib/socialIcons";

type Coordenador = {
  name: string;
  role: string;
  photo: StaticImageData;
  bio: string[];
  reverse?: boolean;
};

const coordenadores: Coordenador[] = [
  {
    name: "Yuri Alexandre Meyer",
    role: "FUNDADOR",
    photo: yuri,
    bio: [
      "Professor Doutor da Faculdade de Tecnologia da UNICAMP, com formação em Física e em Ciências dos Materiais, desenvolve pesquisas interdisciplinares na interface entre Engenharia, Física e Ciências Sociais. É co-líder do Grupo de Engenharia de Sistemas Complexos (GESC), com atuação em Teoria dos Jogos, Física Estatística, Sociofísica, Dinâmica Não Linear, Cadeias de Markov e simulações de Monte Carlo aplicadas a sistemas complexos. Seus trabalhos abrangem ciência dos materiais, engenharia de transportes, risco, corrosão, sustentabilidade e planejamento sob incerteza, em diálogo com parceiros nacionais e internacionais. Também atua na pós-graduação da FT/UNICAMP, colabora com o ITA e coordena iniciativas de extensão e divulgação científica voltadas à formação de jovens talentos.",
    ],
  },
  {
    name: "Rafael Henrique de Oliveira",
    role: "FUNDADOR",
    photo: rafael,
    reverse: true,
    bio: [
      "Professor Doutor da Faculdade de Tecnologia da UNICAMP, atua no curso de Engenharia de Transportes com dedicação às áreas de monitoramento da infraestrutura de transporte, mobilidade ativa, cartografia digital e sistemas de posicionamento por satélite. Graduado em Engenharia Civil pela Escola Politécnica da USP, realizou intercâmbio acadêmico na École Polytechnique Fédérale de Lausanne (EPFL), na Suíça, além de desenvolver parte de seu doutorado na Università di Roma – La Sapienza, na Itália.",
      "É mestre e doutor em Engenharia de Transportes com ênfase em Informações Espaciais pela USP, e desenvolve pesquisas voltadas à integração entre tecnologia, mobilidade e análise espacial aplicada a sistemas de transporte. Seus trabalhos envolvem cartografia digital, monitoramento inteligente de infraestrutura, geotecnologias e inovação em engenharia de transportes, contribuindo para projetos acadêmicos e científicos em colaboração com instituições nacionais e internacionais.",
    ],
  },
];

export function Coordenadores() {
  return (
    <section
      id="coordenacao"
      className="bg-[#f8f9fa] py-20 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]"
    >
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>Coordenadores</SectionTitle>

        <div className="mx-auto max-w-[900px] rounded-[20px] bg-white p-[60px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] max-md:px-5 max-md:py-[30px]">
          {coordenadores.map((coord) => (
            <div
              key={coord.name}
              className={`mb-[60px] flex flex-col items-center gap-[30px] text-center last:mb-0 md:flex-row md:gap-[50px] md:text-left ${
                coord.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full max-w-[280px] md:w-auto md:max-w-none md:flex-[0_0_300px]">
                <Image
                  src={coord.photo}
                  alt={coord.name}
                  placeholder="blur"
                  sizes="(max-width: 768px) 280px, 300px"
                  className="h-[320px] w-full rounded-2xl object-cover shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
                />
              </div>

              <div className="flex-1">
                <h3 className="mb-[5px] text-[1.1rem] font-extrabold tracking-[1px] text-[#34495e]">
                  {coord.role}
                </h3>
                <h4 className="mb-5 text-[0.95rem] font-bold text-[#111]">
                  {coord.name}
                </h4>
                {coord.bio.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="mb-[25px] text-[0.9rem] leading-[1.7] text-[#444] text-center md:text-justify"
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="flex gap-[15px] max-md:justify-center">
                  {socialIcons.map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      aria-label={`${social.label} de ${coord.name}`}
                      className="text-[1.1rem] text-[#111] transition-colors duration-300 hover:text-brand-red"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-[1em] w-[1em] fill-current"
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
