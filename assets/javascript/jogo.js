const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const baralho = {};
let contadorJogo = 0;
let maxContador = 0;
let numerosGerados = [];
let numero = 0;

function verificarLogin(){
    if(!localStorage.getItem('logado') == 'true'){
        window.location.href = 'login.html';
    }
}

function voltar(){
    window.location.href = 'index.html';
}

function verificarButton() {
    fetch('https://gorojogos.com.br/painel/API/carregarJogos.php', {
        method: "GET",
    }).then(response => response.json())
    .then(data => {
        data.forEach(jogo => {
            if(jogo.id == id) {
                let pacote = jogo.pacote;

                document.getElementById('gameLogo').src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.logo

            }    
        });
    })
    .catch(error => {
        console.error('Erro ao recuperar os dados:', error);
    });

    fetch('https://gorojogos.com.br/painel/API/carregarBtns.php?jogo=' + id, {
        method: "GET",
    }).then(response => response.json())
    .then(jogo => {
        let buttonUnico = jogo.btnUnico;
    
        if(buttonUnico == 1) {
            document.getElementById('divButtons').style.display = 'none';
            document.getElementById('divButton').style.display = '';
            document.getElementById('btnUnico').src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.btn1;
        } else {
            document.getElementById('divButton').style.display = 'none';
            document.getElementById('btn1').src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.btn1;
            document.getElementById('btn2').src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.btn2;
            document.getElementById('divButtons').style.display = '';
        }  
    })
    .catch(error => {
        console.error('Erro ao recuperar os dados:', error);
    });    
}

document.getElementById('btn1').addEventListener('click', function(){
    
    if(contadorJogo >= maxContador){
        document.getElementById('cartaJogo').src = baralho['verso'];
        contadorJogo = 0;
        numero = 0;
        numerosGerados = [];
    } else{
        if(document.getElementById('cartaJogo').src == baralho[numero]){
            document.getElementById('cartaJogo').src = baralho['verso']
        } else{
            contadorJogo++;
            numero = gerarNumeroAleatorio(maxContador);
            document.getElementById('cartaJogo').src = baralho[numero];
        }
    }

});


document.getElementById('btn2').addEventListener('click', function(){

    if(contadorJogo >= maxContador){
        document.getElementById('cartaJogo').src = baralho['verso'];
        contadorJogo = 0;
        numero = 0;
        numerosGerados = [];
    } else{
        if(document.getElementById('cartaJogo').src == baralho[numero]){
            document.getElementById('cartaJogo').src = baralho['verso']
        } else{
            contadorJogo++;
            numero = gerarNumeroAleatorio(maxContador);
            document.getElementById('cartaJogo').src = baralho[numero];
        }
    }

});

document.getElementById('btnUnico').addEventListener('click', function(){

    if(contadorJogo >= maxContador){
        document.getElementById('cartaJogo').src = baralho['verso'];
        contadorJogo = 0;
        numero = 0;
        numerosGerados = [];
    } else{
        if(document.getElementById('cartaJogo').src == baralho[numero]){
            document.getElementById('cartaJogo').src = baralho['verso']
        } else{
            contadorJogo++;
            numero = gerarNumeroAleatorio(maxContador);
            document.getElementById('cartaJogo').src = baralho[numero];
        }
    }
    
});

document.getElementById('cartaJogo').addEventListener('click', function(){

    if(contadorJogo >= maxContador){
        document.getElementById('cartaJogo').src = baralho['verso'];
        contadorJogo = 0;
        numero = 0;
        numerosGerados = [];
    } else{
        if(document.getElementById('cartaJogo').src == baralho[numero]){
            document.getElementById('cartaJogo').src = baralho['verso']
        } else{
            contadorJogo++;
            numero = gerarNumeroAleatorio(maxContador);
            document.getElementById('cartaJogo').src = baralho[numero];
        }
    }
    
});


function carregarJogo(){
    
    let contador = 0;

    fetch('https://gorojogos.com.br/painel/API/pegarBaralho.php?jogo=' + id, {
        method: "GET",
    }).then(response => response.json())
    .then(data => {
        baralho['verso'] = 'https://gorojogos.com.br/painel/dashboard/dist/' + data[0].verso;
        document.getElementById('versoEsquerda').src = baralho['verso'];
        document.getElementById('versoDireita').src = baralho['verso'];

        data.forEach(element => {
            contador++;
            baralho[contador] = 'https://gorojogos.com.br/painel/dashboard/dist/' + element.frente;
        });

        document.getElementById('cartaJogo').src = baralho['verso'];

        maxContador = Object.keys(baralho).length - 1;

    })
    .catch(error => {
        console.error('Erro ao recuperar os dados:', error);
    });
}

function gerarNumeroAleatorio(maximo) {
    let numeroAleatorio;

    do {
        numeroAleatorio = Math.floor(Math.random() * (maximo));
    } while (numerosGerados.includes(numeroAleatorio));

    numerosGerados.push(numeroAleatorio); // Adiciona o número gerado ao array

    return numeroAleatorio;
}

window.addEventListener('DOMContentLoaded', verificarLogin())
window.addEventListener("DOMContentLoaded", carregarJogo());
window.addEventListener("DOMContentLoaded", verificarButton());