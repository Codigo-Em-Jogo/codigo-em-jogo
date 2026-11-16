const botaoTema = document.getElementById('botao-tema');
const html = document.documentElement;

if (localStorage.getItem('tema') === 'escuro') {
    botaoTema.textContent = '☀️';
}

botaoTema.addEventListener('click', () => {
    html.classList.toggle('dark-mode');

    if (html.classList.contains('dark-mode')) {
        botaoTema.textContent = '☀️';
        localStorage.setItem('tema', 'escuro');
    } else {
        botaoTema.textContent = '🌙';
        localStorage.setItem('tema', 'claro');
    }
});
        