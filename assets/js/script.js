// Função Sênior para carregar componentes dinamicamente
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ao carregar ${filePath}`);
            return response.text();
        })
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => console.error(error));
}

// Quando a página carregar, executamos as chamadas
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-placeholder", "components/header.html");
    loadComponent("footer-placeholder", "components/footer.html");
});

// Menu Mobile
function toggleMenu() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('active');
}