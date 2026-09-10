import type { StaticImageData } from "next/image";

import yuri from "@/imgs/pessoas/coordenadores/yuri.webp";
import rafael from "@/imgs/pessoas/coordenadores/rafael.webp";

// Coordenação — dados reais. Demais nomes (bolsistas, colaboradores) são
// ILUSTRATIVOS até a coordenação enviar a lista definitiva.

export type Coordenador = {
  nome: string;
  papel: string;
  foto: StaticImageData;
  bio: string[];
};

export const COORDENADORES: Coordenador[] = [
  {
    nome: "Yuri Alexandre Meyer",
    papel: "Fundador",
    foto: yuri,
    bio: [
      "Professor Doutor da Faculdade de Tecnologia da UNICAMP, com formação em Física e em Ciências dos Materiais, desenvolve pesquisas interdisciplinares na interface entre Engenharia, Física e Ciências Sociais. É co-líder do Grupo de Engenharia de Sistemas Complexos (GESC), com atuação em Teoria dos Jogos, Física Estatística, Sociofísica, Dinâmica Não Linear, Cadeias de Markov e simulações de Monte Carlo aplicadas a sistemas complexos. Seus trabalhos abrangem ciência dos materiais, engenharia de transportes, risco, corrosão, sustentabilidade e planejamento sob incerteza, em diálogo com parceiros nacionais e internacionais. Também atua na pós-graduação da FT/UNICAMP, colabora com o ITA e coordena iniciativas de extensão e divulgação científica voltadas à formação de jovens talentos.",
    ],
  },
  {
    nome: "Rafael Henrique de Oliveira",
    papel: "Fundador",
    foto: rafael,
    bio: [
      "Professor Doutor da Faculdade de Tecnologia da UNICAMP, atua no curso de Engenharia de Transportes com dedicação às áreas de monitoramento da infraestrutura de transporte, mobilidade ativa, cartografia digital e sistemas de posicionamento por satélite. Graduado em Engenharia Civil pela Escola Politécnica da USP, realizou intercâmbio acadêmico na École Polytechnique Fédérale de Lausanne (EPFL), na Suíça, além de desenvolver parte de seu doutorado na Università di Roma – La Sapienza, na Itália.",
      "É mestre e doutor em Engenharia de Transportes com ênfase em Informações Espaciais pela USP, e desenvolve pesquisas voltadas à integração entre tecnologia, mobilidade e análise espacial aplicada a sistemas de transporte. Seus trabalhos envolvem cartografia digital, monitoramento inteligente de infraestrutura, geotecnologias e inovação em engenharia de transportes, contribuindo para projetos acadêmicos e científicos em colaboração com instituições nacionais e internacionais.",
    ],
  },
];

export type Bolsista = {
  nome: string;
  papel: string;
  linha: string;
};

export const BOLSISTAS: Bolsista[] = [
  {
    nome: "Ana Beatriz Correia",
    papel: "Iniciação Científica — Sistemas de Informação",
    linha: "Teoria dos Jogos e Sociofísica",
  },
  {
    nome: "Rafael Nunes de Souza",
    papel: "Iniciação Científica — Engenharia de Transportes",
    linha: "Modelagem e Simulação",
  },
  {
    nome: "Marina Lopes Teixeira",
    papel: "Extensão — Engenharia Ambiental",
    linha: "Engenharia de Transportes",
  },
  {
    nome: "Lucas Ferraz Pinto",
    papel: "Iniciação Científica — Engenharia de Produção",
    linha: "Pesquisa Operacional e Otimização",
  },
  {
    nome: "Daniel Rodrigo Vicente de Oliveira Lima",
    papel: "Iniciação Científica - Análise e Desenvolvimento de Sistemas",
    linha: "Engenharia de Software"
  }
];

export type Colaborador = {
  nome: string;
  instituicao: string;
  area: string;
};

export const COLABORADORES: Colaborador[] = [
  {
    nome: "Dr. Serge Galam",
    instituicao: "Sciences Po Paris (CEVIPOF)",
    area: "Sociofísica e dinâmica de opinião",
  },
];
