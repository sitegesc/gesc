"use client";

import { useState } from "react";

type AxisId = 1 | 2 | 3 | 4 | 5 | 6;

const axesData: Record<AxisId, { title: string; items: string[] }> = {
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

const AXIS_IDS: AxisId[] = [1, 2, 3, 4, 5, 6];

const LINES: [number, number, number, number][] = [
  [400, 100, 573, 200],
  [573, 200, 573, 400],
  [573, 400, 400, 500],
  [400, 500, 227, 400],
  [227, 400, 227, 200],
  [227, 200, 400, 100],
  [400, 100, 400, 500],
  [227, 200, 573, 400],
  [227, 400, 573, 200],
];

const NODES: {
  id: AxisId;
  cx: number;
  cy: number;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
  label: string;
}[] = [
  { id: 1, cx: 400, cy: 100, lx: 400, ly: 45, anchor: "middle", label: "Fundamentos Mat. e Físicos" },
  { id: 2, cx: 573, cy: 200, lx: 625, ly: 200, anchor: "start", label: "Modelagem e Simulação" },
  { id: 3, cx: 573, cy: 400, lx: 625, ly: 400, anchor: "start", label: "Interação Estratégica" },
  { id: 4, cx: 400, cy: 500, lx: 400, ly: 565, anchor: "middle", label: "Estrutura e Redes" },
  { id: 5, cx: 227, cy: 400, lx: 175, ly: 400, anchor: "end", label: "Engenharia e Aplicações" },
  { id: 6, cx: 227, cy: 200, lx: 175, ly: 200, anchor: "end", label: "Dados e Informação" },
];

export function AreasAtuacao() {
  const [active, setActive] = useState<AxisId>(1);

  return (
    <section
      id="linhas-pesquisa"
      className="border-y border-[#eee] bg-[#f8f9fa] py-20 font-[family-name:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]"
    >
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="mb-10 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.1em] text-[#e3000f]">
            Pesquisa Interdisciplinar
          </span>
          <h2 className="mt-2 mb-4 text-[2.25rem] font-bold">
            GESC — Áreas de Atuação
          </h2>
          <p className="mx-auto max-w-3xl text-[#4b5563]">
            O Grupo de Engenharia de Sistemas Complexos (GESC) atua de forma
            interdisciplinar, integrando fundamentos da física, matemática
            aplicada, engenharia e ciências sociais para modelar, analisar e
            otimizar sistemas complexos em diferentes domínios.
          </p>
        </div>

        <div className="mt-[50px] flex flex-wrap items-center justify-center gap-[100px] max-[900px]:flex-col max-[900px]:gap-[30px]">
          <div className="w-full min-w-0 flex-[1.5] md:min-w-[500px] md:max-w-[1000px]">
            <svg
              viewBox="-150 0 1100 600"
              role="img"
              aria-label="Diagrama dos seis eixos de pesquisa do GESC"
              className="h-auto w-full overflow-visible md:w-[120%]"
            >
              <g stroke="#e0e6ed" strokeWidth={3}>
                {LINES.map(([x1, y1, x2, y2], index) => (
                  <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />
                ))}
              </g>

              {NODES.map((node) => {
                const isActive = active === node.id;
                return (
                  <g
                    key={node.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={`Eixo ${node.id}: ${node.label}`}
                    onClick={() => setActive(node.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActive(node.id);
                      }
                    }}
                    className="group cursor-pointer outline-none"
                  >
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={35}
                      className={
                        isActive
                          ? "fill-[#e3000f] stroke-[#e3000f] [stroke-width:4] [filter:drop-shadow(0_0_12px_rgba(227,0,15,0.4))] transition-all duration-300"
                          : "fill-white stroke-[#002060] [stroke-width:4] transition-all duration-300 group-hover:fill-[#f0f4f8] group-hover:[stroke-width:5] group-focus-visible:fill-[#f0f4f8]"
                      }
                    />
                    <text
                      x={node.cx}
                      y={node.cy + 6}
                      textAnchor="middle"
                      className={`[font-family:Arial,sans-serif] text-[26px] font-bold transition-all duration-300 ${
                        isActive ? "fill-white" : "fill-[#002060]"
                      }`}
                    >
                      {node.id}
                    </text>
                    <text
                      x={node.lx}
                      y={node.ly}
                      textAnchor={node.anchor}
                      alignmentBaseline={
                        node.anchor === "middle" ? undefined : "middle"
                      }
                      className={`[font-family:Arial,sans-serif] transition-all duration-300 ${
                        isActive
                          ? "fill-[#e3000f] text-[22px] font-bold"
                          : "fill-[#555] text-[20px]"
                      }`}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="w-full min-w-0 flex-1 border-l border-[#eee] px-10 py-5 max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:px-0 max-[900px]:pt-[30px] max-[900px]:pb-0 md:min-w-[350px] md:max-w-[450px]">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="block h-0.5 w-10 bg-[#e3000f]" />
              <span className="text-xs font-bold tracking-[2px] text-[#e3000f]">
                EIXO {active} SELECIONADO
              </span>
            </div>

            <p className="mb-2.5 text-sm font-bold tracking-[2px] text-[#e3000f]">
              EIXO {active} / 6
            </p>

            {/* Todos os eixos ficam empilhados na mesma célula do grid: a
                altura trava no maior deles e não pula ao alternar. */}
            <div className="grid">
              {AXIS_IDS.map((id) => {
                const axis = axesData[id];
                const isActive = id === active;
                return (
                  <div
                    key={id}
                    aria-hidden={!isActive}
                    className={`col-start-1 row-start-1 ${
                      isActive ? "visible" : "invisible"
                    }`}
                  >
                    <h3 className="mb-[30px] text-[28px] font-bold text-[#002060]">
                      {axis.title}
                    </h3>
                    <ul>
                      {axis.items.map((item) => (
                        <li
                          key={item}
                          className="relative mb-[15px] pl-5 text-base text-[#333] before:absolute before:left-0 before:text-[20px] before:leading-none before:text-[#e3000f] before:content-['•']"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex gap-2">
              {AXIS_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  aria-label={`Ver eixo ${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                    active === id
                      ? "w-[25px] rounded-[5px] bg-[#e3000f]"
                      : "w-2.5 bg-[#ccc]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
