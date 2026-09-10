// Conteúdo institucional do GESC usado nas páginas /sobre e /contato
// (e no menu lateral da home). Texto real do projeto — não é mock.

export const MISSAO = {
  destaque:
    "Desenvolver pesquisa interdisciplinar voltada à compreensão, modelagem e solução de problemas caracterizados por múltiplos agentes, interações, não linearidades e incerteza.",
  paragrafos: [
    "Sediado na Faculdade de Tecnologia (FT) da UNICAMP, em Limeira, o GESC reúne pesquisadores e estudantes de graduação e pós-graduação em torno de problemas que não podem ser compreendidos de forma isolada — transportes, energia, materiais, economia, políticas públicas e dinâmicas sociais.",
    "Aproximamos fundamentos da matemática, física, engenharia e ciência de dados de problemas reais da sociedade, com o compromisso de formar pessoas, construir redes de colaboração e transformar conhecimento científico em impacto acadêmico, tecnológico e social.",
  ],
};

// Objetivos do grupo (também exibidos no modal "Objetivos" da home).
export const OBJETIVOS: string[] = [
  "desenvolver e aplicar métodos de Teoria dos Jogos, Sistemas Dinâmicos, Física Estatística, Redes Complexas, Cadeias de Markov, simulação, otimização e ciência de dados;",
  "investigar sistemas complexos em áreas como transportes, mobilidade, energia, materiais, infraestrutura, economia, segurança e políticas públicas;",
  "desenvolver modelos capazes de apoiar processos de decisão sob incerteza;",
  "aproximar fundamentos matemáticos e computacionais de problemas reais de engenharia e da sociedade;",
  "promover a formação de estudantes de graduação, pós-graduação e pesquisadores em estágio de pós-doutorado em pesquisa interdisciplinar;",
  "estimular projetos de iniciação científica, mestrado, doutorado, pós-doutorado e extensão;",
  "ampliar a cooperação entre pesquisadores de diferentes áreas, universidades e países;",
  "produzir conhecimento científico com potencial de impacto acadêmico, tecnológico, econômico e social;",
  "fortalecer a divulgação científica e a aproximação entre universidade e sociedade.",
];

export const VALORES: { title: string; description: string }[] = [
  {
    title: "Rigor científico",
    description:
      "Metodologia sólida e validação empírica em todas as etapas da pesquisa.",
  },
  {
    title: "Interdisciplinaridade",
    description:
      "Diferentes campos do conhecimento convergindo sobre o mesmo problema.",
  },
  {
    title: "Colaboração",
    description:
      "Parcerias entre áreas, universidades e países como forma de trabalho.",
  },
  {
    title: "Impacto",
    description:
      "Conhecimento que gera resultado acadêmico, tecnológico e social.",
  },
];

// --- Contato ---

export const CONTATO = {
  nomeCompleto: "Grupo de Engenharia de Sistemas Complexos (GESC)",
  unidade:
    "Faculdade de Tecnologia (FT) — Universidade Estadual de Campinas (UNICAMP)",
  email: "gesc@unicamp.br",
  endereco: {
    logradouro: "Rua Paschoal Marmo, 1888",
    bairro: "Jardim Nova Itália",
    cidade: "Limeira – SP",
    cep: "13484-332",
  },
  local: "Bloco Explora (sala SA10) — Faculdade de Tecnologia da UNICAMP",
  expediente: "Segunda a sexta, das 8h às 18h",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Faculdade+de+Tecnologia+da+UNICAMP+Limeira",
  // Embed do Google Maps sem chave de API. Trocar pelo Maps Embed API
  // quando houver chave.
  mapaEmbed:
    "https://www.google.com/maps?q=Faculdade+de+Tecnologia+da+UNICAMP,+Limeira+-+SP&z=16&output=embed",
  redes: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/gesc-grupo-de-engenharia-de-sistemas-complexos-unicamp/posts/?feedView=all",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/gescunicamp/",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    },
  ],
};

// Encaminhamento por assunto. Enquanto não há endereços específicos por
// área, todos usam o e-mail geral com um assunto sugerido no título.
export const CONTATOS_ASSUNTO: { assunto: string; titulo: string }[] = [
  { assunto: "Assuntos gerais", titulo: "—" },
  { assunto: "Ingresso, mestrado e doutorado", titulo: "Pós-graduação" },
  { assunto: "Parcerias e projetos de pesquisa", titulo: "Parcerias" },
  { assunto: "Imprensa e divulgação", titulo: "Imprensa" },
];

export const AREAS_INTERESSE = [
  "Parceria em pesquisa",
  "Ingressar no grupo (mestrado/doutorado)",
  "Iniciação científica / extensão",
  "Imprensa / entrevista",
  "Outros",
];

export const FAQ: { pergunta: string; resposta: string }[] = [
  {
    pergunta: "Como faço para participar do GESC?",
    resposta:
      "É possível participar como aluno de graduação (iniciação científica e extensão) ou de pós-graduação da FT-UNICAMP. Acompanhe os editais divulgados a cada ano e use o formulário acima para demonstrar interesse.",
  },
  {
    pergunta: "O GESC tem parcerias com empresas e outras instituições?",
    resposta:
      'Sim. O grupo mantém colaborações com universidades e instituições no Brasil e no exterior. Para propor uma parceria, envie uma mensagem selecionando "Parceria em pesquisa".',
  },
  {
    pergunta: "Onde encontro as publicações do grupo?",
    resposta:
      "Na página de Publicações do site, com links para os periódicos sempre que disponíveis.",
  },
  {
    pergunta: "Qual é o prazo de resposta para as mensagens?",
    resposta:
      "Procuramos responder todas as mensagens em alguns dias úteis.",
  },
];
