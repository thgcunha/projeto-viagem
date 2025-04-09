// Função para trocar o vídeo com base no tamanho da tela
function updateVideoSource() {
    const videoElement = document.getElementById('background-video');
    const sourceElement = document.getElementById('video-source');
    const isMobile = window.innerWidth <= 768;

    if (videoElement && sourceElement) {
        const novoSrc = isMobile
            ? 'src/movie/blue-sky-clouds.gif'
            : 'https://cdn.coverr.co/videos/coverr-airplane-flying-through-the-clouds-1025/720p.mp4';

        sourceElement.setAttribute('src', novoSrc);
        videoElement.load(); // Recarrega o vídeo
    }
}
window.addEventListener('load', updateVideoSource);
window.addEventListener('resize', updateVideoSource);

// Efeito parallax no vídeo
window.addEventListener('scroll', function () {
    const video = document.querySelector('video');
    if (video) {
        const scrollY = window.scrollY;
        video.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// Notificação com botão de redirecionamento
function showNotification(mensagem, tipo) {
    // Cria o overlay
    const overlay = document.createElement("div");
    overlay.className = "notification-overlay";

    // Cria o container da notificação
    const container = document.createElement("div");
    container.className = `notification ${tipo}`;

    // Mensagem
    const texto = document.createElement("p");
    texto.textContent = mensagem;

    container.appendChild(texto);

    // Só adiciona o botão se for sucesso
    if (tipo === "success") {
        const botao = document.createElement("button");
        botao.className = "notification-button";
        botao.textContent = "Estou pronto!";

        botao.addEventListener("click", () => {
            document.body.removeChild(container);
            document.body.removeChild(overlay);
            window.location.href = "linha.html";
        });

        container.appendChild(botao);
    }

    // Adiciona ao body
    document.body.appendChild(overlay);
    document.body.appendChild(container);

    // Força o "fade in"
    setTimeout(() => {
        container.classList.add("show");
    }, 10);

    // Remove depois de 15s automaticamente
    setTimeout(() => {
        if (document.body.contains(container)) {
            document.body.removeChild(container);
            document.body.removeChild(overlay);
        }
    }, 15000);
}



// Validação de formulário e confirmação da viagem
document.querySelector("form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const dataInicio = new Date(document.getElementById("data_inicio")?.value);
    const dataRetorno = new Date(document.getElementById("data_retorno")?.value);
    const pessoas = document.getElementById("numero_pessoas")?.value;

    if (!dataInicio || !dataRetorno || isNaN(dataInicio.getTime()) || isNaN(dataRetorno.getTime())) {
        showNotification("Por favor, preencha todas as datas.", "error");
        return;
    }

    if (dataInicio >= dataRetorno) {
        showNotification("A data de retorno deve ser posterior à data de início.", "error");
        return;
    }

    const nome = prompt("Digite seu nome:");
    if (!nome) {
        showNotification("Por favor, insira seu nome para confirmar a reserva.", "error");
        return;
    }

    showNotification(
        `Obrigado, ${nome}! Sua reserva para ${pessoas} pessoa(s) foi confirmada! De: ${dataInicio.toLocaleDateString()} até ${dataRetorno.toLocaleDateString()}.
        Quando estiver pronto para seguir, clique no botão abaixo`
        ,
        "success"
    );

    event.target.reset();
});

// FAQ Modal
let faqIcon = document.getElementById('faq-icon');
let faqModal = document.getElementById('faq-modal');
let closeFaq = document.getElementById('close-faq');

if (faqIcon && faqModal && closeFaq) {
    faqIcon.addEventListener('click', () => faqModal.classList.remove('hidden'));
    closeFaq.addEventListener('click', () => faqModal.classList.add('hidden'));
    faqModal.addEventListener('click', (event) => {
        if (event.target === faqModal) faqModal.classList.add('hidden');
    });
}





