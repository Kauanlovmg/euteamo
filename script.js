document.addEventListener("DOMContentLoaded", function () {
    const modalInicial = document.getElementById("modal-inicial");
    const modalPreparacao = document.getElementById("modal-preparacao");
    const btnSim = document.getElementById("sim");
    const btnNao = document.getElementById("nao");
    const conteudo = document.getElementById("conteudo");
    const heartContainerCadeado = document.querySelector(".heart-container"); // Seleciona pela classe
    const fecharSenha = document.getElementById("fechar-senha");
    const coracaoCadeado = document.getElementById("coracao-cadeado");
    const modalSenha = document.getElementById("modal-senha");
    const senhaInput = document.getElementById("senha");
    const verificarSenha = document.getElementById("verificar-senha");
    const mensagemSenha = document.getElementById("mensagem-senha");
    const musicCover = document.getElementById("musicCover");
    const musicName = document.getElementById("musicName");
    const player = document.getElementById("player");
    const prevButton = document.getElementById("prevButton");
    const playPauseButton = document.getElementById("playPauseButton");
    const nextButton = document.getElementById("nextButton");
    const modalMensagemFinal = document.getElementById("modal-mensagem-final");
    const mensagemFinal = document.getElementById("mensagem-final");
    const imagemFinal = document.getElementById("imagem-final");
    const fecharMensagemFinal = document.getElementById("fechar-mensagem-final");
    const progressBar = document.getElementById("progressBar");
    const progress = document.getElementById("progress");
    const currentTimeDisplay = document.getElementById("currentTime");
    const durationDisplay = document.getElementById("duration");
    const modalSurpresa = document.getElementById("modal-surpresa");
    const textoSurpresa = document.getElementById("texto-surpresa");
    const fotoSurpresa = document.getElementById("foto-surpresa");
    const musicaSurpresa = document.getElementById("musica-surpresa");
    const fecharSurpresa = document.getElementById("fechar-surpresa");
    const fundoModal = document.getElementById("fundo-modal");

    let tentativasNao = 0;
    let musicaAtual = 0;
    
    modalInicial.classList.remove("hidden");
    fundoModal.classList.remove("hidden");
            
    btnSim.addEventListener("click", function () {
        modalInicial.classList.add("hidden");
        modalPreparacao.classList.remove("hidden");
        
        conteudo.classList.remove("hidden");
        document.body.style.overflow = "hidden"; // impede scroll durante a transição
    
        setTimeout(() => {
            modalPreparacao.classList.add("hidden");
            conteudo.classList.remove("hidden");
            fundoModal.classList.add("hidden");
            document.body.style.overflow = "auto"; // libera scroll
            iniciarChuvaDeCoracoes();
        }, 2000);
    });
    

    btnNao.addEventListener("mouseover", function () {
        tentativasNao++;
        if (tentativasNao < 3) {
            moverBotaoAleatorio(btnNao);
        } else {
            btnNao.style.display = "none";
        }
    });

    fecharSenha.addEventListener("click", function () {
        modalSenha.classList.add("hidden");
        mensagemSenha.classList.add("hidden");
        senhaInput.value = "";
    });

    // Event listener para o coração trancado
    coracaoCadeado.addEventListener("click", function () {
        modalSenha.classList.remove("hidden");
    });

    verificarSenha.addEventListener("click", function () {
        if (senhaInput.value === "euteamo") {
            modalSenha.classList.add("hidden");
            mensagemSenha.classList.add("hidden");
            senhaInput.value = "";

            textoSurpresa.textContent = "Meu amor, essa música é pra você!";
            fotoSurpresa.src = "./assets/loves.png"; // Substitua pelo caminho da sua foto
            musicaSurpresa.src = "./assets/audios/namorada.mp3"; // Substitua pelo caminho da sua música especial
            musicaSurpresa.play();
            modalSurpresa.classList.remove("hidden");
        } else {
            mensagemSenha.textContent = "Senha incorreta.";
            mensagemSenha.classList.remove("hidden");
            mensagemSenha.style.color = "red";
        }
    });

    fecharSurpresa.addEventListener("click", function () {
        modalSurpresa.classList.add("hidden");
        musicaSurpresa.pause();
        musicaSurpresa.currentTime = 0;
    });

    player.addEventListener("ended", function () {
        proximaMusica();
    });

    carregarMusica(musicaAtual);

    playPauseButton.addEventListener("click", function () {
        if (player.paused) {
            tocarMusica();
        } else {
            pausarMusica();
        }
    });

    nextButton.addEventListener("click", proximaMusica);
    prevButton.addEventListener("click", musicaAnterior);

    function moverBotaoAleatorio(botao) {
        const x = Math.random() * (window.innerWidth - botao.clientWidth);
        const y = Math.random() * (window.innerHeight - botao.clientHeight);
        botao.style.position = "absolute";
        botao.style.left = `${x}px`;
        botao.style.top = `${y}px`;
    }

    function iniciarChuvaDeCoracoes() {
        const chuvaContainerElement = document.getElementById("chuva-de-coracoes-container");
        if (chuvaContainerElement) {
            setInterval(() => {
                const heart = document.createElement("div");
                heart.innerHTML = "❤️";
                heart.classList.add("heart");
                heart.style.left = Math.random() * window.innerWidth + "px"; // Posição aleatória na largura da janela
                heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
                chuvaContainerElement.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }, 300);

            setTimeout(() => {
                chuvaContainerElement.innerHTML = "";
            }, 8000);
        } else {
            console.error("Elemento chuva-de-coracoes-container não encontrado!");
        }
    }

    function carregarMusica(index) {
        player.src = musicas[index].src;
        musicCover.src = musicas[index].cover;
        musicName.textContent = musicas[index].nome;
    }

    function tocarMusica() {
        player.play();
    playPauseButton.innerHTML = `<i class='bx bx-pause'></i>`;
    }

    function pausarMusica() {
        player.pause();
        playPauseButton.innerHTML = `<i class='bx bx-caret-right'></i>`;
    }

    function proximaMusica() {
        musicaAtual = (musicaAtual + 1) % musicas.length;
        carregarMusica(musicaAtual);
        tocarMusica();
    }

    function musicaAnterior() {
        musicaAtual = (musicaAtual - 1 + musicas.length) % musicas.length;
        carregarMusica(musicaAtual);
        tocarMusica();
    }

    function atualizarProgresso(evento) {
        const { duration, currentTime } = evento.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeDisplay.textContent = formatTime(currentTime);
        durationDisplay.textContent = formatTime(duration);
    }

    function setProgresso(evento) {
        const width = this.clientWidth;
        const clickX = evento.offsetX;
        const duration = player.duration;
        player.currentTime = (clickX / width) * duration;
    }

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    }

    player.addEventListener("timeupdate", atualizarProgresso);
    progressBar.addEventListener("click", setProgresso);
});