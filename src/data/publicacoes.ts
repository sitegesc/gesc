// Conteúdo da página /publicacoes — DADOS ILUSTRATIVOS (mock).
//
// A lista mistura dois tipos de item:
//   - "post": artigos e postagens no estilo blog, escritos pelos
//     bolsistas do projeto;
//   - "publicacao": produção acadêmica formal (periódico, conferência…).
//
// No futuro cada item será um arquivo .mdx próprio (o `slug` já é o nome
// desse arquivo) servido por um back-end. O formato abaixo espelha o
// frontmatter que esse .mdx teria.

export type TipoItem = "post" | "publicacao";

export type ItemPublicacao = {
  /** Nome do futuro arquivo .mdx e slug da URL de detalhe. */
  slug: string;
  tipo: TipoItem;
  titulo: string;
  /** Bolsista(s) nos posts; pesquisadores nas publicações. */
  autores: string[];
  ano: number;
  /** Data ISO (YYYY-MM-DD). Presente nos posts; nas publicações usa-se o ano. */
  data?: string;
  categoria: string;
  areas: string[];
  resumo: string;
  /** Nota sobre o autor (só posts): curso / tipo de bolsa. */
  autorInfo?: string;
  /** Só publicações: */
  veiculo?: string;
  local?: string;
  doi?: string;
};

export const CATEGORIAS_POST = [
  "Divulgação científica",
  "Tutorial",
  "Bastidores da pesquisa",
  "Evento",
  "Opinião",
] as const;

export const CATEGORIAS_PUBLICACAO = [
  "Artigo em periódico",
  "Trabalho em conferência",
  "Capítulo de livro",
  "Preprint",
] as const;

export const PUBLICACOES: ItemPublicacao[] = [
  // ---------------- Posts dos bolsistas ----------------
  {
    slug: "teoria-dos-jogos-com-pedra-papel-tesoura",
    tipo: "post",
    titulo: "Teoria dos jogos explicada com pedra, papel e tesoura",
    autores: ["Ana Beatriz Correia"],
    autorInfo: "Bolsista de Iniciação Científica — Sistemas de Informação",
    ano: 2026,
    data: "2026-05-14",
    categoria: "Divulgação científica",
    areas: ["Teoria dos Jogos e Sociofísica"],
    resumo:
      "Um jogo de criança serve para introduzir estratégias mistas, equilíbrio e por que nem sempre existe uma jogada 'certa'. No fim, mostro como o mesmo raciocínio aparece em leilões e em disputas de preço.",
  },
  {
    slug: "primeira-simulacao-monte-carlo-em-python",
    tipo: "post",
    titulo: "Como rodar sua primeira simulação de Monte Carlo em Python",
    autores: ["Rafael Nunes de Souza"],
    autorInfo: "Bolsista de Iniciação Científica — Engenharia de Transportes",
    ano: 2026,
    data: "2026-03-28",
    categoria: "Tutorial",
    areas: ["Modelagem e Simulação", "Ciência de Dados"],
    resumo:
      "Passo a passo para estimar π jogando pontos num quadrado, com o código comentado, e uma discussão sobre quantas amostras são suficientes para uma resposta confiável.",
  },
  {
    slug: "bastidores-coleta-de-dados-de-trafego-no-campus",
    tipo: "post",
    titulo: "Bastidores: coletando dados de tráfego no campus da FT",
    autores: ["Marina Lopes Teixeira"],
    autorInfo: "Bolsista de Extensão — Engenharia Ambiental",
    ano: 2026,
    data: "2026-04-09",
    categoria: "Bastidores da pesquisa",
    areas: ["Engenharia de Transportes"],
    resumo:
      "O que deu certo e o que deu errado numa semana contando pedestres e bicicletas nas entradas do campus: planilhas, chuva, e a diferença entre o que a gente planeja e o que o campo entrega.",
  },
  {
    slug: "relato-congresso-anpet-2025",
    tipo: "post",
    titulo: "Relato: nossa ida ao congresso da ANPET",
    autores: ["Rafael Nunes de Souza", "Marina Lopes Teixeira"],
    autorInfo: "Bolsistas do GESC",
    ano: 2025,
    data: "2025-11-20",
    categoria: "Evento",
    areas: ["Engenharia de Transportes", "Redes Complexas"],
    resumo:
      "Apresentar um pôster pela primeira vez, as perguntas que não sabíamos responder e as conversas de corredor que renderam duas ideias novas de projeto.",
  },
  {
    slug: "por-que-sistemas-complexos-importam-para-sua-cidade",
    tipo: "post",
    titulo: "Por que sistemas complexos importam para a cidade onde você mora",
    autores: ["Ana Beatriz Correia"],
    autorInfo: "Bolsista de Iniciação Científica — Sistemas de Informação",
    ano: 2025,
    data: "2025-09-02",
    categoria: "Opinião",
    areas: ["Redes Complexas", "Modelagem e Simulação"],
    resumo:
      "Congestionamento, filas em posto de saúde e boato em grupo de mensagens têm algo em comum: são efeitos que emergem da interação de muita gente. Um argumento sobre por que isso deveria entrar no debate público local.",
  },

  // ---------------- Publicações acadêmicas ----------------
  {
    slug: "consenso-redes-adaptativas-2026",
    tipo: "publicacao",
    titulo:
      "Formação de consenso em redes adaptativas sob influência de agentes contrários",
    autores: ["Meyer, Y. A.", "Galam, S.", "Prado, L. F."],
    ano: 2026,
    categoria: "Artigo em periódico",
    veiculo: "Physica A: Statistical Mechanics and its Applications",
    areas: ["Teoria dos Jogos e Sociofísica", "Redes Complexas"],
    doi: "10.0000/gesc.physa.2026.014",
    resumo:
      "Estende um modelo de dinâmica de opinião para redes cuja topologia evolui junto com os estados dos agentes. Mostramos que uma pequena fração de agentes contrários desloca o ponto de transição entre consenso e polarização.",
  },
  {
    slug: "monte-carlo-corrosao-dutos-2026",
    tipo: "publicacao",
    titulo:
      "Simulação de Monte Carlo da progressão de corrosão localizada em dutos enterrados",
    autores: ["Meyer, Y. A.", "Santos, M. R.", "Okabe, T."],
    ano: 2026,
    categoria: "Artigo em periódico",
    veiculo: "Corrosion Science",
    areas: ["Materiais e Corrosão", "Confiabilidade e Risco"],
    doi: "10.0000/gesc.corsci.2026.087",
    resumo:
      "Acopla um modelo estocástico de nucleação e crescimento de pites a dados de inspeção para estimar a distribuição do tempo até a falha, com intervalos de manutenção menos conservadores do que os critérios determinísticos usuais.",
  },
  {
    slug: "pedestres-campus-ft-2026",
    tipo: "publicacao",
    titulo:
      "Um modelo baseado em agentes para fluxos de pedestres no campus da FT-UNICAMP",
    autores: ["Oliveira, R. H.", "Lima, D. R. V.", "Meyer, Y. A."],
    ano: 2026,
    categoria: "Trabalho em conferência",
    veiculo: "Congresso de Pesquisa e Ensino em Transportes (ANPET)",
    local: "Fortaleza, Brasil",
    areas: ["Engenharia de Transportes", "Modelagem e Simulação"],
    doi: "10.0000/gesc.anpet.2026.203",
    resumo:
      "Calibra um modelo de força social com contagens de campo e cartografia digital do campus para avaliar intervenções de mobilidade ativa, como novas rotas acessíveis e a realocação de bicicletários.",
  },
  {
    slug: "jogos-evolutivos-tarifas-5g-2025",
    tipo: "publicacao",
    titulo: "Jogos evolutivos na precificação dinâmica de acesso em redes 5G",
    autores: ["Meyer, Y. A.", "Ferreira, C. A.", "Nowak, P."],
    ano: 2025,
    categoria: "Artigo em periódico",
    veiculo: "IEEE Transactions on Network Science and Engineering",
    areas: [
      "Teoria dos Jogos e Sociofísica",
      "Pesquisa Operacional e Otimização",
    ],
    doi: "10.0000/gesc.tnse.2025.041",
    resumo:
      "Formula a escolha de plano por usuários como um jogo populacional e obtém condições para a estabilidade de esquemas de tarifação dinâmica, com simulações sob demanda heterogênea.",
  },
  {
    slug: "roteamento-drones-inspecao-2025",
    tipo: "publicacao",
    titulo:
      "Roteamento de drones para inspeção de infraestrutura linear com janelas de recarga",
    autores: ["Oliveira, R. H.", "Almeida, T. F.", "Costa, R. M."],
    ano: 2025,
    categoria: "Trabalho em conferência",
    veiculo: "Simpósio Brasileiro de Pesquisa Operacional (SBPO)",
    local: "Blumenau, Brasil",
    areas: [
      "Pesquisa Operacional e Otimização",
      "Engenharia de Transportes",
    ],
    doi: "10.0000/gesc.sbpo.2025.156",
    resumo:
      "Propõe uma heurística de inserção com busca local para planejar voos de inspeção ao longo de rodovias e ferrovias, respeitando autonomia da bateria e pontos fixos de recarga.",
  },
  {
    slug: "percolacao-robustez-malha-viaria-2025",
    tipo: "publicacao",
    titulo: "Percolação e robustez estrutural da malha viária de cidades médias",
    autores: ["Oliveira, R. H.", "Meyer, Y. A.", "Prado, L. F."],
    ano: 2025,
    categoria: "Artigo em periódico",
    veiculo: "Journal of Transport Geography",
    areas: ["Redes Complexas", "Engenharia de Transportes"],
    doi: "10.0000/gesc.jtg.2025.099",
    resumo:
      "Analisa como a remoção sucessiva de vias afeta a conectividade em um conjunto de cidades do interior paulista, identificando corredores cuja falha fragmenta a rede desproporcionalmente.",
  },
  {
    slug: "entropia-series-mobilidade-2025",
    tipo: "publicacao",
    titulo:
      "Medidas de entropia para caracterizar regimes em séries temporais de mobilidade urbana",
    autores: ["Lima, D. R. V.", "Oliveira, R. H."],
    ano: 2025,
    categoria: "Preprint",
    veiculo: "arXiv",
    areas: ["Ciência de Dados", "Sistemas Dinâmicos"],
    doi: "10.0000/gesc.arxiv.2025.00711",
    resumo:
      "Compara entropia amostral e complexidade de Lempel-Ziv na detecção de mudanças de regime em contagens de tráfego, com aplicação a dados abertos de radares.",
  },
  {
    slug: "sistemas-complexos-engenharia-cap-2025",
    tipo: "publicacao",
    titulo: "Engenharia de Sistemas Complexos: fundamentos e aplicações",
    autores: ["Meyer, Y. A.", "Oliveira, R. H."],
    ano: 2025,
    categoria: "Capítulo de livro",
    veiculo: "Tópicos em Modelagem Interdisciplinar (Editora UNICAMP)",
    areas: ["Modelagem e Simulação", "Física Estatística"],
    doi: "10.0000/gesc.book.2025.003",
    resumo:
      "Capítulo introdutório que organiza os métodos usados pelo grupo — teoria dos jogos, física estatística, redes e otimização — em torno da noção de emergência.",
  },
];

// "12 de março de 2026" a partir de uma data ISO (YYYY-MM-DD).
export function formatarData(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getPublicacao(slug: string): ItemPublicacao | undefined {
  return PUBLICACOES.find((p) => p.slug === slug);
}
