// Eixos / linhas de pesquisa do GESC. Consumido pelo diagrama interativo
// da home (AreasAtuacao) e pela página /pesquisa.

export type AxisId = 1 | 2 | 3 | 4 | 5 | 6;

export const AXIS_IDS: AxisId[] = [1, 2, 3, 4, 5, 6];

export const axesData: Record<AxisId, { title: string; items: string[] }> = {
  1: {
    title: "Fundamentos Matemáticos e Físicos",
    items: [
      "Equações Diferenciais Ordinárias (EDOs)",
      "Sistemas Dinâmicos e Não Lineares (bifurcações, estabilidade e caos)",
      "Física Estatística",
      "Física Matemática",
      "Dinâmica Estocástica (processos de difusão, Langevin, Fokker-Planck)",
    ],
  },
  2: {
    title: "Modelagem e Simulação de Sistemas Complexos",
    items: [
      "Simulação de Monte Carlo e Métodos Estocásticos",
      "Simulação Baseada em Agentes e Dinâmica de Sistemas",
      "Autômatos Celulares e Interação Local",
      "Sistemas de Equações Diferenciais Acopladas",
      "Análise de Sensibilidade e Incerteza em Modelos",
    ],
  },
  3: {
    title: "Interação Estratégica e Sistemas Socioeconômicos",
    items: [
      "Teoria dos Jogos Clássica e Evolutiva",
      "Dinâmica de Opinião e Sociofísica",
      "Modelagem de Equilíbrio e Mecanismos de Coordenação",
      "Comportamento Coletivo e Emergência Social",
      "Análise de Redes Socioeconômicas",
    ],
  },
  4: {
    title: "Estrutura, Redes e Conectividade",
    items: [
      "Teoria de Grafos e Topologia de Redes",
      "Redes Complexas (Scale-Free, Small-World)",
      "Percolação e Transições de Fase em Redes",
      "Robustez e Vulnerabilidade de Infraestruturas",
      "Propagação em Redes (Epidemiológica e de Informação)",
    ],
  },
  5: {
    title: "Engenharia e Aplicações Tecnológicas",
    items: [
      "Pesquisa Operacional e Otimização Combinatória",
      "Logística, Roteamento e Cadeia de Suprimentos",
      "Corrosão e Engenharia de Materiais",
      "Confiabilidade de Sistemas e Análise de Riscos",
      "Sistemas de Controle e Automação",
    ],
  },
  6: {
    title: "Dados, Informação e Complexidade",
    items: [
      "Teoria da Informação e Entropia",
      "Machine Learning e Mineração de Dados",
      "Análise de Séries Temporais Complexas",
      "Medidas de Complexidade (Entropia Amostral, Lempel-Ziv)",
      "Visualização e Análise de Dados de Alta Dimensão",
    ],
  },
};
