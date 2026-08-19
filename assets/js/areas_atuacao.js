// Dados dos eixos de pesquisa (você pode editar os textos aqui depois)
const axesData = {
    1: {
        title: "Fundamentos Matemáticos e Físicos",
        items: [
            "Equações Diferenciais Ordinárias (EDOs)",
            "Sistemas Dinâmicos e Não Lineares(bifurcações, estabilidade e caos)",
            "Física Estatística",
            "Física Matemática",
            "Dinâmica Estocástica (processos de difusão, Langevin, Fokker-Planck)"
        ]
    },
    2: {
        title: "Modelagem e Simulação de Sistemas Complexos",
        items: [
            "Simulação de Monte Carlo e Métodos Estocásticos",
            "Simulação Baseada eDinâmica de Sistemas",
            "Autômatos Celulares e Interação Local",
            "Sistemas de Equações Diferenciais Acopladas",
            "Análise de Sensibilidade e Incerteza em Modelos"
        ]
    },
    3: {
        title: "Interação Estratégica e Sistemas Socioeconômicos",
        items: [
            "Teoria dos Jogos Clássica e Evolutiva",
            "Dinâmica de Opinião e Sociofísica",
            "Modelagem de Equilíbrio e Mecanismos de Coordenação",
            "Comportamento Coletivo e Emergência Social",
            "Análise de Redes Socioeconômicas"
        ]
    },
    4: {
        title: "Estrutura, Redes e Conectividade",
        items: [
            "Teoria de Grafos e Topologia de Redes",
            "Redes Complexas (Scale-Free, Small-World)",
            "Percolação e Transições de Fase em Redes",
            "Robustez e Vulnerabilidade de Infraestruturas",
            "Propagação de Redes (Epidemológica e de Informação)"
        ]
    },
    5: {
        title: "Engenharia e Aplicações Tecnológicas",
        items: [
            "Pesquisa Operacional e Otimização Combinatória",
            "Logística, Roteamento e Cadeia de Suprimentos",
            "Corrosão e Engenharia de Materiais",
            "Confiabilidade de Sistemas e Análise de Riscos",
            "Sistemas de Controle e Automação"
        ]
    },
    6: {
        title: "Dados, Informação e Complexidade",
        items: [
            "Teoria da Informação e Entropia",
            "Machine Learning e Mineração de Dados",
            "Análise de Séries Temporais Complexas",
            "Medidas de Complexidade (Entropia Amostral, Lempel-Ziv)",
            "Visualização e Análise de Dados de Alta Dimensão"
        ]
    }
};

function changeAxis(id) {
    // 1. Atualizar as classes ativas no SVG (Grafo)
    document.querySelectorAll('.node-group').forEach(node => {
        node.classList.remove('active');
    });
    document.querySelector(`.node-group[data-axis="${id}"]`).classList.add('active');

    // 2. Atualizar as bolinhas de paginação embaixo
    const dots = document.querySelectorAll('#axis-dots span');
    dots.forEach((dot, index) => {
        if(index === id - 1) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // 3. Atualizar os textos do painel da direita
    document.getElementById('axis-subtitle').textContent = `EIXO ${id} SELECIONADO`;
    document.getElementById('axis-counter').textContent = `EIXO ${id} / 6`;
    document.getElementById('axis-title').textContent = axesData[id].title;

    // 4. Atualizar a lista de tópicos
    const listElement = document.getElementById('axis-list');
    listElement.innerHTML = ''; // Limpa a lista atual
    
    axesData[id].items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listElement.appendChild(li);
    });
}