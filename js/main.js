
atualizarBarra();

let questoes = document.querySelectorAll(".questao");
let nomeDaAula = document.body.dataset.aula;

for (let i = 0; i < questoes.length; i++){
    let questaoAtual = questoes[i];
    let numeroQuestao = i + 1;
    let chavePostIt = nomeDaAula + "_q" + numeroQuestao;

    let botao = questaoAtual.querySelector(".botao-verificar");
    let resultado = questaoAtual.querySelector(".texto-resultado");

    let detalhes = questaoAtual.querySelector("details");
    let tituloDetalhes = detalhes.querySelector("summary");

    if (localStorage.getItem(chavePostIt) == "feita"){
        let respostasCertas = questaoAtual.querySelectorAll('input[data-certa="sim"]');
        
        for (let j = 0; j < respostasCertas.length; j++){
            respostasCertas[j].checked = true;
        }

        resultado.textContent = "Acertou!";

        detalhes.hidden = false;
        detalhes.open = true;
        tituloDetalhes.textContent = "Explicação da resposta";
    }

botao.addEventListener("click", function () {
    let marcadas = questaoAtual.querySelectorAll("input:checked");
    let totalCertas = questaoAtual.querySelectorAll('input[data-certa="sim"]').length;

    if (marcadas.length == 0) {
        resultado.textContent = "Escolha pelo menos uma alternativa!";
        return;
    }

    let acertos = 0;
    let erros = 0;

    for (let j = 0; j < marcadas.length; j++) {
        if (marcadas[j].dataset.certa == "sim") {
            acertos++;
        } else {
            erros++;
        }
    }

        if (acertos == totalCertas && erros == 0) {
            resultado.textContent = "Acertou!";
            localStorage.setItem(chavePostIt, "feita");
            atualizarBarra();

            detalhes.hidden = false;
            detalhes.open = true;
            tituloDetalhes.textContent = "Explicação da resposta";
        } else {
            resultado.textContent = "Errou! Confira todas as opções corretas e tente novamente.";

            detalhes.hidden = false;
            detalhes.open = false;
            tituloDetalhes.textContent = "Conferir resposta correta";
        }
    });
}

function atualizarBarra(){
    let totalAcertos = 0;
    let totalQuestoesCurso = 28;

    for (let a = 1; a <= 7; a++){
        for (let q = 1; q <= 4; q++){
            if (localStorage.getItem("aula" + a + "_q" + q) == "feita"){
                totalAcertos++;
            }
        }
    }

    let barra =  document.querySelector("#progresso-trilha");
    let textoProgresso = document.querySelector(".barra-progresso p")

    barra.max =  totalQuestoesCurso;
    barra.value = totalAcertos;

    let porcentagem = Math.round((totalAcertos/totalQuestoesCurso) * 100);
    textoProgresso.textContent =  totalAcertos + " de " + totalQuestoesCurso + " exercicios (" + porcentagem + "%)";
}


// Ocultar/mostrar barra lateral

let paginaAula = document.querySelector("#pagina-aula");
let botaoRecolher = document.querySelector("#botao-recolher");
let botaoAbrir = document.querySelector("#botao-abrir-barra");

if (paginaAula && botaoRecolher && botaoAbrir) {
    if (localStorage.getItem("barraRecolhida") == "sim") {
        paginaAula.classList.add("barra-recolhida");
        botaoAbrir.hidden = false;
    }

    botaoRecolher.addEventListener("click", function () {
        paginaAula.classList.add("barra-recolhida");
        botaoAbrir.hidden = false;
        localStorage.setItem("barraRecolhida", "sim");
    });

    botaoAbrir.addEventListener("click", function () {
        paginaAula.classList.remove("barra-recolhida");
        botaoAbrir.hidden = true;
        localStorage.setItem("barraRecolhida", "nao");
    });
}