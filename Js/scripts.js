// Garante que o script rode apenas após o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', () => {

    // 1. FUNCIONALIDADE: DARK MODE (TEMA ESCURO) 
    const btnTema = document.getElementById('btn-tema');
    const body = document.body;

    // Se o botão não existir nesta página, não faz nada
    if (btnTema) {
        // Verifica a preferência anterior salva no LocalStorage
        const temaSalvo = localStorage.getItem('tema');

        // Se houver preferência e for 'escuro', aplica o tema
        if (temaSalvo === 'escuro') {
            body.classList.add('dark-theme');
            btnTema.textContent = '☀️'; // Ícone do sol para voltar ao claro
        } else {
            // Caso contrário, garante que o ícone inicial seja a lua
            btnTema.textContent = '🌙'; 
        }

        // Adiciona o evento de clique no botão
        btnTema.addEventListener('click', () => {
            // Alterna a classe 'dark-theme' no body
            body.classList.toggle('dark-theme');
            
            // Verifica a nova situação e salva a preferência
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('tema', 'escuro');
                btnTema.textContent = '☀️';
            } else {
                localStorage.setItem('tema', 'claro');
                btnTema.textContent = '🌙';
            }
        });
    }


   // 2. FUNCIONALIDADE: ANIMAÇÃO DE SCROLL (FADE IN)
    // Essa funcionalidade roda apenas em páginas que contêm '.curso-card'.

    // Seleciona todos os cards de curso
    const cards = document.querySelectorAll('.curso-card');

    if (cards.length > 0) {
        // Configuração do IntersectionObserver
        const observerConfig = {
            root: null, // Monitora a viewport (janela do navegador)
            rootMargin: '0px', // Nenhuma margem extra
            threshold: 0.2 // Dispara quando 20% do card está visível
        };

        // Função que é executada quando o card entra na tela
        const cardCallback = (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Adiciona a classe 'show' que contém a animação CSS
                    entry.target.classList.add('show');
                    // Para de observar o card após ele aparecer
                    obs.unobserve(entry.target);
                }
            });
        };

        // Cria o observador
        const scrollObserver = new IntersectionObserver(cardCallback, observerConfig);

        // Pede ao observador para monitorar cada card encontrado
        cards.forEach((card) => {
            scrollObserver.observe(card);
        });
    }

});


// 3. FUNCIONALIDADE: FORMULÁRIO DE CONTATO 
    const formContato = document.getElementById('formContato');
    const btn = document.getElementById('btnEnviar');
    const feedback = document.getElementById('formFeedback');

    // Verifica se o formulário existe na página atual antes de rodar o código
    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede a página de recarregar ao enviar

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const celular = document.getElementById('celular').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (!nome || !email || !celular || !mensagem) {
                feedback.textContent = 'Preencha todos os campos.';
                feedback.style.color = 'red';
                return;
            }

            const assunto = encodeURIComponent(`Contato pelo Portfólio - ${nome}`);
            const corpo = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\nCelular: ${celular}\n\nMensagem:\n${mensagem}`);
            
            // URL oficial do Gmail para compor nova mensagem
            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=Contato.matthnuns@gmail.com&su=${assunto}&body=${corpo}`;

            btn.disabled = true;
            
            // Abre o Gmail em uma nova aba para não sair do seu portfólio
            window.open(gmailLink, '_blank');

            setTimeout(() => {
                feedback.textContent = 'O Gmail foi aberto em uma nova aba. Obrigado!';
                feedback.style.color = '#2563eb';
                btn.disabled = false;
                formContato.reset();
            }, 800);
        });
    }