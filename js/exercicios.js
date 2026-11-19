for (const questao of document.querySelectorAll("form.questao")) {
    const resultado = questao.querySelector(".texto-resultado");
    const explicacao = questao.querySelector("details");

    questao.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const resposta = new FormData(questao).get("resposta");
        const acertou = resposta === questao.dataset.resposta;

        resultado.textContent = acertou
            ? "Acertou!"
            : "Tente novamente ou confira a explicação.";

        explicacao.hidden = false;
        explicacao.open = acertou;
    });
}