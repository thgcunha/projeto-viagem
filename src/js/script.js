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
    const overlay = document.createElement("div");
    overlay.className = "notification-overlay";

    const container = document.createElement("div");
    container.className = `notification ${tipo}`;

    const texto = document.createElement("p");
    texto.textContent = mensagem;

    container.appendChild(texto);

    if (tipo === "success") {
        const botao = document.createElement("button");
        botao.className = "notification-button";
        botao.textContent = "Estou pronto!";

        // Adiciona o listener de clique no botão
        botao.addEventListener("click", () => {
            document.body.removeChild(container);  // Remove a notificação
            document.body.removeChild(overlay);   // Remove o overlay
            window.location.href = "linha.html";  // Redireciona para a página
        });

        container.appendChild(botao);
    }

    // Adiciona a notificação ao body
    document.body.appendChild(overlay);
    document.body.appendChild(container);

    // Força o "fade in"
    setTimeout(() => {
        container.classList.add("show");
    }, 10);

    // Remove automaticamente após 15 segundos, caso o usuário não clique
    setTimeout(() => {
        if (document.body.contains(container)) {
            document.body.removeChild(container);
            document.body.removeChild(overlay);
        }
    }, 3000);
}

// Validação de formulário e confirmação da viagem
document.querySelector("form")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    const dataInicio = new Date(document.getElementById("data_inicio")?.value);
    const dataRetorno = new Date(document.getElementById("data_retorno")?.value);
    const pessoas = document.getElementById("numero_pessoas")?.value;

    // Verifique os campos do formulário
    console.log("Data Início:", dataInicio);
    console.log("Data Retorno:", dataRetorno);
    console.log("Número de Pessoas:", pessoas);

    // Verificação de dados de entrada
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

    // Exibe a notificação de sucesso
    showNotification(
        `Obrigado, ${nome}! Sua reserva para ${pessoas} pessoa(s) foi confirmada! De: ${dataInicio.toLocaleDateString()} até ${dataRetorno.toLocaleDateString()}.
        Quando estiver pronto para seguir, clique no botão abaixo.`,
        "success"
    );

    event.target.reset(); // Limpa o formulário
});



// FAQ Modal
let faqIcon = document.getElementById('faq-icon');
let faqModal = document.getElementById('faq-modal');
let closeFaq = document.getElementById('close-faq');

if (faqIcon && faqModal && closeFaq) {
    faqIcon.addEventListener('click', () => {
        faqModal.classList.remove('hidden'); // Exibe o modal
        faqModal.classList.add('flex'); // Garante que o modal fique flexível
    });
    
    closeFaq.addEventListener('click', () => {
        faqModal.classList.add('hidden'); // Esconde o modal
        faqModal.classList.remove('flex'); // Remove o comportamento de flex
    });

    faqModal.addEventListener('click', (event) => {
        if (event.target === faqModal) {
            faqModal.classList.add('hidden'); // Esconde o modal
            faqModal.classList.remove('flex'); // Remove o comportamento de flex
        }
    });
}




const linhaSelect = document.getElementById("linha_aerea");
const classeSelect = document.getElementById("classe_viagem");
const bagagemCheckbox = document.getElementById("bagagem_extra");
const confirmarBtn = document.getElementById("confirmar");

// Criação do resumo dinâmico
const resumoDiv = document.createElement("div");
resumoDiv.className = "mt-6 p-4 bg-gray-700 rounded-lg text-sm space-y-2 text-blue-100";
document.querySelector(".detalhes-viagem").appendChild(resumoDiv);

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


// Modal de Seleção de Assento
const assentos = document.getElementById("assentos");
const erroAssento = document.getElementById("erro_assento");
const btnConfirmar = document.getElementById("btn-confirmar");
const ocupados = [3, 6, 12, 18];
let assentoSelecionado = null;

for (let i = 1; i <= 28; i++) {
    const coluna = (i - 1) % 6;
    if (coluna === 3) {
        const corredor = document.createElement("div");
        corredor.className = "w-3 sm:w-4";
        assentos.appendChild(corredor);
    }

    const btn = document.createElement("button");
    btn.textContent = `A${i}`;
    btn.className = `assento relative group bg-blue-300 text-sm font-medium p-2 sm:p-2.5 rounded transition ${ocupados.includes(i) ? "opacity-40 cursor-not-allowed" : "hover:bg-blue-500"}`;
    btn.disabled = ocupados.includes(i);

    const tooltip = document.createElement("span");
    tooltip.className =
        "absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10";
    tooltip.textContent = "Clique para selecionar";
    btn.appendChild(tooltip);

    btn.addEventListener("click", () => {
        if (ocupados.includes(i)) return;

        document.querySelectorAll(".assento").forEach(a =>
            a.classList.remove("bg-green-500", "ring-2", "ring-green-400")
        );
        btn.classList.add("bg-green-500", "ring-2", "ring-green-400");
        assentoSelecionado = i;
        erroAssento.classList.add("hidden");
    });

    assentos.appendChild(btn);
}

function toggleModal() {
    const modal = document.getElementById("assento-modal");
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
    erroAssento.classList.add("hidden");
    assentoSelecionado = null;
    document.querySelectorAll(".assento").forEach(a =>
        a.classList.remove("bg-green-500", "ring-2", "ring-green-400")
    );
    btnConfirmar.innerHTML = "Confirmar";
    btnConfirmar.classList.remove("bg-green-600", "hover:bg-green-700");
    btnConfirmar.classList.add("bg-blue-600", "hover:bg-blue-700");
}

function confirmarReserva() {
    if (!assentoSelecionado) {
        erroAssento.classList.remove("hidden");
        return;
    }

    btnConfirmar.innerHTML = '<i class="fas fa-check-circle animate-bounce mr-2"></i> Reserva Confirmada!';
    btnConfirmar.classList.remove("bg-blue-600", "hover:bg-blue-700");
    btnConfirmar.classList.add("bg-green-600", "hover:bg-green-700");
}

document.getElementById('assento').addEventListener('click', toggleModal);



    











