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



const linhaSelect = document.getElementById("linha_aerea");
const classeSelect = document.getElementById("classe_viagem");
const bagagemCheckbox = document.getElementById("bagagem_extra");
const confirmarBtn = document.getElementById("confirmar");

// Criação do resumo dinâmico
const resumoDiv = document.createElement("div");
resumoDiv.className = "mt-6 p-4 bg-gray-700 rounded-lg text-sm space-y-2 text-blue-100";
document.querySelector(".bg-gray-800").appendChild(resumoDiv);

function atualizarResumo() {
    const linha = linhaSelect.value;
    const classe = classeSelect.value;
    const bagagem = bagagemCheckbox.checked ? "Sim" : "Não";

    resumoDiv.innerHTML = `
    <p><strong>Linha Aérea:</strong> ${linha}</p>
    <p><strong>Classe:</strong> ${classe}</p>
    <p><strong>Bagagem Extra:</strong> ${bagagem}</p>
    `;
}

linhaSelect.addEventListener("change", atualizarResumo);
classeSelect.addEventListener("change", atualizarResumo);
bagagemCheckbox.addEventListener("change", atualizarResumo);

// Interação no botão
confirmarBtn.addEventListener("click", () => {
    const linha = linhaSelect.value;
    const classe = classeSelect.value;
    const bagagem = bagagemCheckbox.checked;

    // Simula ação + redireciona depois de 2s
    confirmarBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processando...`;
    confirmarBtn.disabled = true;

    setTimeout(() => {
        alert(`Reserva confirmada com:\n- ${linha}\n- ${classe}\n- Bagagem extra: ${bagagem ? "Sim" : "Não"}`);
        window.location.href = "/src/pages/linha.html";
    }, 2000);
});

// Inicia com o resumo já preenchido
atualizarResumo();



    











