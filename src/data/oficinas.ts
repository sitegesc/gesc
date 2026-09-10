// Catálogo de oficinas do Projeto IDEIA — dados mockados.
//
// Portado do site antigo (assets/js/inscricao-nas-oficinas.js e
// assets/js/calendario-aulas.js). No futuro virá de um backend/banco;
// por ora fica centralizado aqui porque é consumido tanto pelo
// calendário quanto pelo formulário de inscrição dos pais.

export type Oficina = {
  id: string;
  /** Nome completo, usado em títulos e no calendário. */
  title: string;
  /** Nome curto, usado nas "pílulas" do calendário e na agenda semanal. */
  short: string;
  /** Dias possíveis (0 = domingo … 6 = sábado, padrão de Date.getDay()). */
  weekdays: number[];
  /** Horário proposto, no formato "HH:MM". */
  time: string;
  /** Duração de cada encontro, em minutos. */
  durationMin: number;
  /** Quantidade proposta de encontros. */
  sessions: number;
  /** Descrição em parágrafos. */
  description: string[];
  /** Cor fixa da oficina (escura o bastante para texto branco). */
  color: string;
  /**
   * Oficinas com turmas diferentes conforme a idade do aluno:
   * até 9 anos → Turma 1, 10 anos ou mais → Turma 2.
   */
  ageBased?: {
    /** Valor base enviado na inscrição (recebe " - Turma 1/2"). */
    baseValue: string;
    /** Descrição por faixa etária, quando o conteúdo muda entre turmas. */
    descriptionByAge?: { upTo9: string[]; from10: string[] };
  };
};

export const OFICINAS: Oficina[] = [
  {
    id: "criando-jogos",
    title: "Criando Jogos com MIT App Inventor",
    short: "Criando Jogos",
    weekdays: [1],
    time: "14:00",
    durationMin: 120,
    sessions: 6,
    color: "#1b5fb0",
    description: [
      "As crianças aprendem programação em blocos criando jogos no MIT App Inventor.",
      "A atividade trabalha variáveis, condições, raciocínio lógico, criatividade e autonomia na resolução de problemas.",
    ],
  },
  {
    id: "detetives-ciencia",
    title: "Detetives da Ciência: Investigação Forense e Dados",
    short: "Detetives da Ciência",
    weekdays: [4],
    time: "16:00",
    durationMin: 120,
    sessions: 4,
    color: "#bd1e20",
    description: [
      "Os participantes investigam casos fictícios usando conceitos de ciência forense, química, biologia, física e lógica matemática.",
      "A oficina combina explicação teórica e aplicação prática em desafios investigativos.",
    ],
  },
  {
    id: "mapa-cidade",
    title: "Do Mapa à Cidade: Como projetar um bairro?",
    short: "Do Mapa à Cidade",
    weekdays: [1],
    time: "14:00",
    durationMin: 120,
    sessions: 1,
    color: "#1e7e34",
    description: [
      "A partir de uma planta topográfica simplificada, as crianças planejam um pequeno bairro, definindo ruas, lotes, áreas verdes e soluções para o escoamento da água da chuva.",
      "A atividade trabalha interpretação do relevo, raciocínio espacial, criatividade e tomada de decisões.",
    ],
  },
  {
    id: "missao-ingles",
    title: "Missão Inglês: Uma jornada de diversão",
    short: "Missão Inglês",
    weekdays: [4, 5],
    time: "16:00",
    durationMin: 120,
    sessions: 4,
    color: "#c77700",
    description: [
      "Atividades como caça-palavras, dublagens, jogos e curiosidades aproximam as crianças da língua inglesa de forma leve e divertida.",
      "A oficina ajuda a desenvolver vocabulário, compreensão e confiança para se expressar.",
    ],
  },
  {
    id: "ferrovias",
    title: "Workshop de Trens e Ferrovias",
    short: "Trens e Ferrovias",
    weekdays: [1, 2, 3, 4, 5, 6],
    time: "17:00",
    durationMin: 120,
    sessions: 2,
    color: "#6f42c1",
    description: [
      "As crianças assumem o papel de engenheiros para conhecer trens, infraestrutura e os princípios de um projeto ferroviário.",
      "Experimentos e desafios exploram força, atrito, velocidade, frenagem, inclinação, curvas, rampas, pontes e operação ferroviária. Ao final, os participantes constroem e testam uma solução.",
    ],
  },
  {
    id: "logica-programacao",
    title: "Introdução a Lógica de Programação e Algoritmos",
    short: "Lógica de Programação",
    weekdays: [1, 2],
    time: "08:00",
    durationMin: 120,
    sessions: 2,
    color: "#0c8599",
    description: [
      "Uma introdução objetiva aos conceitos fundamentais de lógica de programação e algoritmos.",
      "As atividades são voltadas a desenvolver e consolidar o raciocínio lógico das crianças.",
    ],
  },
  {
    id: "explorar-habilidades",
    title: "Explorar Habilidades a partir de Card Games Modernos",
    short: "Card Games Modernos",
    weekdays: [3],
    time: "14:00",
    durationMin: 60,
    sessions: 6,
    color: "#d63384",
    description: [
      "Nas oficinas usaremos jogos de cartas modernos para explorar habilidades lógicas, sociais e cognitivas.",
    ],
  },
  {
    id: "ia",
    title: "Introdução a IA / Letramento em IA",
    short: "Introdução a IA",
    weekdays: [1, 2, 3, 4, 5, 6],
    time: "08:00",
    durationMin: 90,
    sessions: 8,
    color: "#e8590c",
    description: [
      "Uma introdução lúdica aos conceitos e à história da inteligência artificial, explicando como ela funciona e como escrever bons comandos.",
      "As crianças exploram diferentes ferramentas de IA e criam uma árvore de decisão no Scratch. O conteúdo é ajustado conforme a idade da turma.",
    ],
    ageBased: {
      baseValue: "Introdução a IA",
      descriptionByAge: {
        upTo9: [
          "Uma introdução lúdica aos conceitos e à história da inteligência artificial, explicando como ela funciona e como escrever bons comandos.",
          "As crianças também criam uma árvore de decisão no Scratch e experimentam diferentes ferramentas de IA.",
        ],
        from10: [
          "A oficina apresenta conceitos e a história da inteligência artificial com atividades de análise de gráficos e dados.",
          "Os participantes treinam um modelo simples de aprendizado de máquina e buscam maneiras de melhorar seus resultados.",
        ],
      },
    },
  },
  {
    id: "historias",
    title: "Criando Histórias de uma forma lógica",
    short: "Criando Histórias",
    weekdays: [2],
    time: "17:00",
    durationMin: 120,
    sessions: 5,
    color: "#3d4f66",
    description: [
      "As crianças usam o Scratch para aprender lógica e criar histórias por meio de programação em blocos, sem precisar escrever código.",
    ],
    ageBased: { baseValue: "Criando Histórias de uma forma lógica" },
  },
  {
    id: "calculo",
    title: "Cálculo",
    short: "Cálculo",
    weekdays: [3],
    time: "14:00",
    durationMin: 90,
    sessions: 10,
    color: "#7d5a29",
    description: ["Uma oficina de introdução aos conceitos de cálculo."],
    ageBased: { baseValue: "Cálculo" },
  },
];

// Sala usada por todas as oficinas (mock).
export const SALA_OFICINAS = "SA10 - Explora";

// Data de início assumida para montar o calendário: as oficinas só têm
// dia da semana, não data. Se alguma passar a ter data própria, é só
// adicionar `startDate: "2026-09-16"` no item dela.
export const DATA_INICIO_OFICINAS = "2026-09-21";

export const WEEKDAY_LABELS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
] as const;

export const WEEKDAY_PLURAL = [
  "Domingos",
  "Segundas",
  "Terças",
  "Quartas",
  "Quintas",
  "Sextas",
  "Sábados",
] as const;

export const WEEKDAY_SHORT = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
] as const;

/** Dias possíveis da oficina como rótulos completos ("Segunda-feira"). */
export function diasPossiveis(oficina: Oficina): string[] {
  return [...oficina.weekdays]
    .sort((a, b) => a - b)
    .map((day) => WEEKDAY_LABELS[day]);
}

/** "2 horas", "1h30", "1 hora" — a partir da duração em minutos. */
export function duracaoLabel(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (rest === 0) {
    return hours === 1 ? "1 hora" : `${hours} horas`;
  }

  return `${hours}h${String(rest).padStart(2, "0")}`;
}

/** "6 encontros" / "1 encontro". */
export function encontrosLabel(sessions: number): string {
  return sessions === 1 ? "1 encontro" : `${sessions} encontros`;
}
