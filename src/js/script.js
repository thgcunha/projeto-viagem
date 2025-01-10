window.addEventListener('scroll', function() {
    const video = document.querySelector('video');
    const scrollY = window.scrollY;
    video.style.transform = `translateY(${scrollY * 0.5}px)`;
});


const buttons = document.querySelectorAll('.btn-planejar');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        showNotification("Você foi redirecionado para planejar a viagem!");
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'fixed top-4 right-4 p-4 bg-green-500 text-white rounded-lg';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

document.querySelector("form").addEventListener("submit", function (event) {
    // Previne o envio padrão do formulário
    event.preventDefault();

    // Pega os valores do formulário
    const dataInicio = new Date(document.getElementById("data_inicio").value);
    const dataRetorno = new Date(document.getElementById("data_retorno").value);
    const pessoas = document.getElementById("numero_pessoas").value;

    // Validação: Verifica se as datas foram preenchidas
    if (!dataInicio || !dataRetorno) {
        showNotification("Por favor, preencha todas as datas.", "error");
        return;
    }

    // Validação: Verifica se a data de retorno é posterior à data de início
    if (dataInicio >= dataRetorno) {
        showNotification("A data de retorno deve ser posterior à data de início.", "error");
        return;
    }

    // Solicita o nome do usuário
    const nome = prompt("Digite seu nome:");
    if (!nome) {
        showNotification("Por favor, insira seu nome para confirmar a reserva.", "error");
        return;
    }

    // Exibe a confirmação
    showNotification(
        `Obrigado, ${nome}! Sua reserva para ${pessoas} pessoa(s) foi confirmada! De: ${dataInicio.toLocaleDateString()} até ${dataRetorno.toLocaleDateString()}`,
        "success"
    );

    // Reseta o formulário após confirmação
    event.target.reset();
});

// Função para exibir notificações
function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    document.body.appendChild(notification);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Navegação suave ao clicar no link "Saiba Mais"
document.querySelector('a[href="#"]').addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#destino").scrollIntoView({ behavior: "smooth" });
});

// Inicializa o mapa
function initMap() {
    const veneza = { lat: 45.4408, lng: 12.3155 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: veneza,
    });
    new google.maps.Marker({ position: veneza, map: map });
}




