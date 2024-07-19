const detalheGame = document.getElementById('detalheGame');
const divDetalhe = document.getElementById('divDetalhe');
const fecharDetalhe = document.getElementById('x-close');
const jogarDetalhe = document.getElementById('gameButton');
let listaJogos = [];

divDetalhe.style.display = 'none'

function verificarLogin(){
  if(localStorage.getItem('logado') == 'true'){
    puxarJogos();
    puxarBanners();
    meusJogos();
  } else{
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.removeItem('acesso');
  localStorage.removeItem('email');
  localStorage.removeItem('logado');
  localStorage.removeItem('pacote');
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
}

function allGames(){
  window.location.href = "https://www.goroojogo.com.br/planos";
}

function meusJogos(){
  const userData = {
    usuario: localStorage.getItem('email'),
  };
  
  const options = {
    method: 'POST',
    body: JSON.stringify(userData)
  };

  const url = 'https://gorojogos.com.br/painel/API/meusjogos.php';

  fetch(url, options)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Erro ao enviar requisição');
  })
  .then(data => {
    data.forEach(jogo => {
      listaJogos.push(jogo.link);
    });
  })
  .catch(error => {
    console.error('Erro:', error.message)
  });
}

function puxarJogos(){
  fetch('https://gorojogos.com.br/painel/API/carregarJogos.php', {
    method: "GET",
  }).then(response => response.json())
  .then(data => {

    const divGames = document.getElementById('__games');
    
    data.forEach(jogo => {

      const gameDiv = document.createElement('div');
      const p = document.createElement('p');
      const i = document.createElement('i');

      i.className = 'bi';
      i.className = 'bi-lock';
      gameDiv.className = 'gameDiv';
      gameDiv.style.backgroundImage = 'url("https://gorojogos.com.br/painel/dashboard/dist/' + jogo.banner + '")';

      if(jogo.preco == '0.00'){
      
        p.textContent = 'Grátis | ' + jogo.desafios + ' Desafios';

        gameDiv.addEventListener('click', function(){
          divDetalhe.style.display = '';
          detalheGame.src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.detalhes;
          jogarDetalhe.textContent = 'JOGAR';

          fecharDetalhe.addEventListener('click', function(){
            divDetalhe.style.display = 'none';
          });
          
          jogarDetalhe.addEventListener('click', function(){
            window.location.href = 'jogo.html?id=' + jogo.id;
          });
        })
      
      } else if(listaJogos.length > 0){

          if (listaJogos.includes(jogo.link)){
            p.textContent = 'Liberado | ' + jogo.desafios + ' Desafios';

            gameDiv.addEventListener('click', function(){
              divDetalhe.style.display = '';
              detalheGame.src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.detalhes;
              jogarDetalhe.textContent = 'JOGAR';

              fecharDetalhe.addEventListener('click', function(){
                divDetalhe.style.display = 'none';
              });
              
              jogarDetalhe.addEventListener('click', function(){
                window.location.href = 'jogo.html?id=' + jogo.id;
              });
            })
          } else{

            p.textContent = 'R$' + (jogo.preco).replace('.',',') + ' | ' + jogo.desafios + ' Desafios';
            p.appendChild(i);

            gameDiv.addEventListener('click', function(){
              divDetalhe.style.display = '';
              detalheGame.src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.detalhes;
              jogarDetalhe.textContent = 'DESBLOQUEAR';

              fecharDetalhe.addEventListener('click', function(){
                divDetalhe.style.display = 'none';
              });
              
              jogarDetalhe.addEventListener('click', function(){
                window.location.href = jogo.link;
              });
            })
          }

      } else if(localStorage.getItem('pacote') == "2"){

        p.textContent = 'Liberado | ' + jogo.desafios + ' Desafios';

        gameDiv.addEventListener('click', function(){
          divDetalhe.style.display = '';
          detalheGame.src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.detalhes;
          jogarDetalhe.textContent = 'JOGAR';

          fecharDetalhe.addEventListener('click', function(){
            divDetalhe.style.display = 'none';
          });
          
          jogarDetalhe.addEventListener('click', function(){
            window.location.href = 'jogo.html?id=' + jogo.id;
          });
        })

      } else if(localStorage.getItem('pacote') == "1"){

        if (jogo.preco == '19.90'){

          p.textContent = 'Liberado | ' + jogo.desafios + ' Desafios';
  
          gameDiv.addEventListener('click', function(){
            divDetalhe.style.display = '';
            detalheGame.src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.detalhes;
            jogarDetalhe.textContent = 'JOGAR';
  
            fecharDetalhe.addEventListener('click', function(){
              divDetalhe.style.display = 'none';
            });
            
            jogarDetalhe.addEventListener('click', function(){
              window.location.href = 'jogo.html?id=' + jogo.id;
            });
          })
        } else{
          p.textContent = 'R$' + (jogo.preco).replace('.',',') + ' | ' + jogo.desafios + ' Desafios';
          p.appendChild(i);
  
          gameDiv.addEventListener('click', function(){
            divDetalhe.style.display = '';
            detalheGame.src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.detalhes;
            jogarDetalhe.textContent = 'DESBLOQUEAR';
  
            fecharDetalhe.addEventListener('click', function(){
              divDetalhe.style.display = 'none';
            });
            
            jogarDetalhe.addEventListener('click', function(){
              window.location.href = jogo.link;
            });
          })
        }

      } else{

        p.textContent = 'R$' + (jogo.preco).replace('.',',') + ' | ' + jogo.desafios + ' Desafios';
        p.appendChild(i);

        gameDiv.addEventListener('click', function(){
          divDetalhe.style.display = '';
          detalheGame.src = 'https://gorojogos.com.br/painel/dashboard/dist/' + jogo.detalhes;
          jogarDetalhe.textContent = 'DESBLOQUEAR';

          fecharDetalhe.addEventListener('click', function(){
            divDetalhe.style.display = 'none';
          });
          
          jogarDetalhe.addEventListener('click', function(){
            window.location.href = jogo.link;
          });
        })

      }

      gameDiv.appendChild(p);
      divGames.appendChild(gameDiv);
      
    });
  })
  .catch(error => {
    console.error('Erro ao recuperar os dados:', error);
  });
}

function puxarBanners(){
  fetch('https://gorojogos.com.br/painel/API/carregarBanner.php', {
    method: "GET",
  }).then(response => response.json())
  .then(data => {
    
    const divGames = document.getElementById('__games');

    data.forEach(banner => {
      
      const gameDiv = document.createElement('div');
      gameDiv.style.width = '170px';
      gameDiv.style.height = '117px';
      gameDiv.style.margin = '10px';

      gameDiv.style.backgroundImage = 'url("https://gorojogos.com.br/painel/dashboard/dist/' + banner.banner + '")';
      gameDiv.style.backgroundSize = 'cover';

      gameDiv.addEventListener('click', function(){
        window.location.href = banner.link;
      })

      divGames.appendChild(gameDiv);
      
    });
  })
  .catch(error => {
    console.error('Erro ao recuperar os dados:', error);
  });
}

window.addEventListener('DOMContentLoaded', verificarLogin());