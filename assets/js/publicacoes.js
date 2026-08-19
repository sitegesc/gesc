// Função para carregar e renderizar as publicações
async function carregarPublicacoes() {
    try {
        // Busca o arquivo JSON
        const resposta = await fetch('assets/data/publicacoes.json');
        const publicacoes = await resposta.json();

        // Pega o elemento principal onde os cartões vão entrar (precisaremos criar esse ID no HTML)
        const container = document.getElementById('lista-publicacoes');
        
        // Se não estiver na página de publicações, ignora
        if (!container) return; 

        // Limpa o "Carregando..."
        container.innerHTML = '';

        // Para cada publicação no JSON, cria um cartão HTML
        publicacoes.forEach(pub => {
            const cardHTML = `
                <div class="pub-card">
                    <h2>${pub.titulo}</h2>
                    <div class="pub-meta">
                        <p><i class="fas fa-users"></i> ${pub.autores}</p>
                        <p><i class="fas ${pub.iconeLocal}"></i> ${pub.local}</p>
                    </div>
                    <div class="pub-footer">
                        <div class="footer-tags">
                            <span class="mini-tag blue">${pub.ano}</span>
                            <span class="mini-tag grey">${pub.area}</span>
                        </div>
                        <a href="${pub.link}" target="_blank" class="btn-read">Ver Publicação <i class="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
            `;
            // Adiciona o cartão na tela
            container.innerHTML += cardHTML;
        });

    } catch (erro) {
        console.error("Erro ao carregar as publicações:", erro);
    }
}

// Executa a função quando a página carregar
document.addEventListener('DOMContentLoaded', carregarPublicacoes);

// 1. Variável global para guardar todas as publicações na memória
let todasPublicacoes = [];

// 2. Função principal que roda quando a página carrega
async function carregarPublicacoes() {
    const container = document.getElementById('lista-publicacoes');
    if (!container) return; // Se não estiver na página de publicações, para aqui.

    try {
        // Busca o JSON
        const resposta = await fetch('assets/data/publicacoes.json');
        todasPublicacoes = await resposta.json();

        // Renderiza tudo na tela pela primeira vez
        renderizarPublicacoes(todasPublicacoes);

        // Ativa a "escuta" de cliques na barra lateral
        configurarFiltros();

    } catch (erro) {
        console.error("Erro ao carregar publicações:", erro);
        container.innerHTML = '<p>Erro ao carregar os dados.</p>';
    }
}

// 3. Função que desenha os cartões na tela (recebe uma lista como parâmetro)
function renderizarPublicacoes(lista) {
    const container = document.getElementById('lista-publicacoes');
    container.innerHTML = ''; // Limpa a tela

    // Se a lista estiver vazia após o filtro
    if (lista.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding: 40px; color: #666;">Nenhuma publicação encontrada para estes filtros.</p>';
        return;
    }

    // Cria o HTML para cada item da lista
    lista.forEach(pub => {
        const cardHTML = `
            <div class="pub-card">
                <h2>${pub.titulo}</h2>
                <div class="pub-meta">
                    <p><i class="fas fa-users"></i> ${pub.autores}</p>
                    <p><i class="fas ${pub.iconeLocal}"></i> ${pub.local}</p>
                </div>
                <div class="pub-footer">
                    <div class="footer-tags">
                        <span class="mini-tag blue">${pub.ano}</span>
                        <span class="mini-tag grey">${pub.area}</span>
                    </div>
                    <a href="${pub.link}" target="_blank" class="btn-read">Ver Publicação <i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

// 4. Função que cuida dos cliques na barra lateral
function configurarFiltros() {
    // Pega todos os itens (<li>) da barra de filtros
    const botoesFiltro = document.querySelectorAll('.filter-group li');

    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            // O botão que foi clicado
            const itemClicado = evento.currentTarget;
            
            // Pega a lista (<ul>) a qual esse botão pertence
            const listaPai = itemClicado.closest('ul');
            
            // Remove a classe 'active' e 'active-blue' de todos os irmãos
            listaPai.querySelectorAll('li').forEach(irmao => {
                irmao.classList.remove('active', 'active-blue');
            });

            // Descobre se é o filtro de Ano (que usa azul) ou os outros (vermelho)
            const tituloGrupo = itemClicado.closest('.filter-group').querySelector('h4').innerText;
            if (tituloGrupo.includes('Ano')) {
                itemClicado.classList.add('active-blue');
            } else {
                itemClicado.classList.add('active');
            }

            // Depois de mudar a cor, manda aplicar os filtros!
            aplicarFiltros();
        });
    });
}

// 5. Função que cruza os dados e filtra a lista
function aplicarFiltros() {
    // Valores padrão (se nada foi filtrado)
    let tipoAtivo = 'Todas';
    let anoAtivo = 'Todos os anos';
    let linhaAtiva = 'Todas as linhas';

    // Varre a barra lateral pra ver quem está com a classe 'active' ou 'active-blue'
    const filtrosAtivos = document.querySelectorAll('.filter-group li.active, .filter-group li.active-blue');
    
    filtrosAtivos.forEach(ativo => {
        const tituloGrupo = ativo.closest('.filter-group').querySelector('h4').innerText;
        const valorFiltro = ativo.querySelector('span').innerText.trim();

        if (tituloGrupo.includes('Tipo')) tipoAtivo = valorFiltro;
        if (tituloGrupo.includes('Ano')) anoAtivo = valorFiltro;
        if (tituloGrupo.includes('Linha')) linhaAtiva = valorFiltro;
    });

    // Pega a nossa "caixa" com todas as publicações e filtra
    const listaFiltrada = todasPublicacoes.filter(pub => {
        
        // Verifica o Tipo
        let passaTipo = (tipoAtivo === 'Todas') || 
                        (tipoAtivo === 'Periódicos' && pub.tipo === 'periodico') ||
                        (tipoAtivo === 'Conferências' && pub.tipo === 'conferencia');

        // Verifica o Ano
        let passaAno = (anoAtivo === 'Todos os anos') || (pub.ano === anoAtivo);

        // Verifica a Linha de Pesquisa
        let passaLinha = (linhaAtiva === 'Todas as linhas') || (pub.area === linhaAtiva);

        // A publicação só aparece se passar nos três filtros
        return passaTipo && passaAno && passaLinha;
    });

    // Manda desenhar a nova lista filtrada na tela!
    renderizarPublicacoes(listaFiltrada);
}

// Inicia o processo quando a página carrega
document.addEventListener('DOMContentLoaded', carregarPublicacoes);