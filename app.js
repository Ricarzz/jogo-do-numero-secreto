let listaDeNumerosSecretos = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;
exibirMensagemInicial();

function textoNaTela (tag, texto){
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    textoNaTela ('h1', 'Jogo do número secreto!');
    textoNaTela ('p', 'Escolha um número entre 1 e 10:');
}

function verificarChute() {
    let chute = document.querySelector ('input') . value;
    tentativas ++;
    if (chute == numeroSecreto) {
        textoNaTela ('h1', 'Você acertou!!');
        let palavraTentativa = tentativas > 1 ? ' tentativas! ' : ' tentativa! '; 
        let mensagemTentativas = 'Muito bem, você acertou com ' + tentativas + palavraTentativa;
        textoNaTela ('p', mensagemTentativas);
        document.getElementById ('reiniciar').removeAttribute ('disabled');
    } else {
        let resultado = chute > numeroSecreto ? 'O número secreto é menor que ' + chute : 'O número secreto é maior que ' + chute;
        textoNaTela ('p', resultado);
        limparCampo(); 
    }
}

function limparCampo() { 
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSecretos.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSecretos = [];
    }
    if (listaDeNumerosSecretos.includes (numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSecretos.push (numeroEscolhido);
        console.log (listaDeNumerosSecretos);
        return numeroEscolhido;
    }
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirMensagemInicial();
    document.getElementById ('reiniciar').setAttribute ('disabled', true );
} 