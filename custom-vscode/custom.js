document.addEventListener('DOMContentLoaded', function () {
    const checkCommandDialog = setInterval(() => {
        const commandDialog = document.querySelector(".quick-input-widget");
        if (commandDialog) {
            // Aplica o efeito de desfoque imediatamente se o dialogo de comando estiver visível
            if (commandDialog.style.display !== "none") {
                applyBlurEffect();
            }
            // Cria um observador de DOM para 'ouvir' mudanças nos atributos do elemento
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (commandDialog.style.display === 'none') {
                            removeBlurEffect();
                        } else {
                            // Se o elemento .quick-input-widget (paleta de comandos) estiver no DOM
                            // mas sem estilo inline display: none, mostra o desfoque de fundo
                            applyBlurEffect();
                        }
                    }
                });
            });

            observer.observe(commandDialog, { attributes: true });

            // Limpa o intervalo uma vez que o observador está configurado
            clearInterval(checkCommandDialog);
        } else {
            // console.log("Dialogo de comando ainda não encontrado. Tentando novamente...");
        }
    }, 500); // Verifica a cada 500ms

    // Executa quando a paleta de comandos é lançada
    document.addEventListener('keydown', function (event) {
        if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
            event.preventDefault();
            applyBlurEffect();
        } else if (event.key === 'Escape' || event.key === 'Esc') {
            event.preventDefault();
            removeBlurEffect();
        }
    });

    // Garante que o listener de tecla Escape está no nível do documento
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            removeBlurEffect();
        }
    }, true);

    function applyBlurEffect() {
        const targetDiv = document.querySelector(".monaco-workbench");

        // Remove o elemento existente se ele já existir
        const existingElement = document.getElementById("command-blur");
        if (existingElement) {
            existingElement.remove();
        }

        // Cria e configura o novo elemento
        const newElement = document.createElement("div");
        newElement.setAttribute('id', 'command-blur');

        newElement.addEventListener('click', function () {
            newElement.remove();
        });

        // Adiciona o novo elemento como filho do targetDiv
        targetDiv.appendChild(newElement);
    }

    // Remove o desfoque de fundo do DOM quando a tecla Esc é pressionada
    function removeBlurEffect() {
        const element = document.getElementById("command-blur");
        if (element) {
            element.click();
        }
    }
});
