// Função para trocar o vídeo com base no tamanho da tela
function updateVideoSource() {
    const videoElement = document.getElementById('background-video');
    const sourceElement = document.getElementById('video-source');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Troca para GIF ou vídeo leve em telas pequenas
        sourceElement.setAttribute('src', 'src/movie/blue sky clouds GIF by hateplow.gif');
        videoElement.load(); // Recarrega o vídeo
    } else {
        // Volta ao vídeo original em telas maiores
        sourceElement.setAttribute('src', 'https://cdn.coverr.co/videos/coverr-airplane-flying-through-the-clouds-1025/720p.mp4');
        videoElement.load(); // Recarrega o vídeo
    }
}

// Atualiza o vídeo quando a página carrega
window.addEventListener('load', updateVideoSource);

// Atualiza o vídeo quando a janela é redimensionada
window.addEventListener('resize', updateVideoSource);



window.addEventListener('scroll', function () {
    const video = document.querySelector('video');
    if (video) {
        const scrollY = window.scrollY;
        video.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// Botões "Planejar Viagem"
document.querySelectorAll('.btn-planejar').forEach(button => {
    button.addEventListener('click', () => {
        showNotification("Você foi redirecionado para planejar a viagem!");
    });
});

// Validação de formulário
document.querySelector("form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const dataInicio = new Date(document.getElementById("data_inicio")?.value);
    const dataRetorno = new Date(document.getElementById("data_retorno")?.value);
    const pessoas = document.getElementById("numero_pessoas")?.value;

    if (!dataInicio || !dataRetorno) {
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
        `Obrigado, ${nome}! Sua reserva para ${pessoas} pessoa(s) foi confirmada! De: ${dataInicio.toLocaleDateString()} até ${dataRetorno.toLocaleDateString()}`,
        "success"
    );

    event.target.reset();
});

// Notificações
function showNotification(message, type) {
    // Remover notificações antigas
    document.querySelector(".notification")?.remove();
    document.querySelector(".notification-overlay")?.remove();

    // Criar overlay escuro
    const overlay = document.createElement("div");
    overlay.className = "notification-overlay";
    document.body.appendChild(overlay);
    overlay.style.display = "block";

    // Criar a notificação
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Exibir a notificação
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);

    // Fechar ao clicar no overlay ou na notificação
    function closeNotification() {
        notification.classList.remove("show");
        setTimeout(() => {
            notification.remove();
            overlay.style.display = "none";
            overlay.remove();
        }, 300);
    }

    overlay.addEventListener("click", closeNotification);
    notification.addEventListener("click", closeNotification);

    // Remover automaticamente após alguns segundos
    setTimeout(closeNotification, 3000);
}


// FAQ Modal
const faqIcon = document.getElementById('faq-icon');
const faqModal = document.getElementById('faq-modal');
const closeFaq = document.getElementById('close-faq');

if (faqIcon && faqModal && closeFaq) {
    faqIcon.addEventListener('click', () => faqModal.classList.remove('hidden'));
    closeFaq.addEventListener('click', () => faqModal.classList.add('hidden'));
    faqModal.addEventListener('click', (event) => {
        if (event.target === faqModal) faqModal.classList.add('hidden');
    });
}




