        const botaoTema = document.getElementById('botao-tema');
        const body = document.body;

        if (localStorage.getItem('tema') === 'escuro') {
            body.classList.add('dark-mode');
            botaoTema.textContent = '☀️';
        }

        botaoTema.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                botaoTema.textContent = '☀️';
                localStorage.setItem('tema', 'escuro');
            } else {
                botaoTema.textContent = '🌙';
                localStorage.setItem('tema', 'claro');
            }
        });