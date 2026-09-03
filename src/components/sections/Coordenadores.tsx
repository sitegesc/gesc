import Image, { type StaticImageData } from "next/image";

import yuri from "@/imgs/pessoas/coordenadores/yuri.webp";
import rafael from "@/imgs/pessoas/coordenadores/rafael.webp";

import { SectionTitle } from "@/components/ui/SectionTitle";

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

const socials = [
  {
    label: "Facebook",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.628-5.373-12-12-12s-12 5.372-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    label: "WhatsApp",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51a12.84 12.84 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z",
  },
  {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
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
                  {socials.map((social) => (
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
