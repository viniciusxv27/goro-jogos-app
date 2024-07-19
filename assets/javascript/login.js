var telaLogin = document.getElementById('loginForm')
var telaCadastro = document.getElementById('registerForm');
var telaRecuperacao = document.getElementById('recoveryForm');

function voltar(){
    telaCadastro.style.display = 'none';
    telaRecuperacao.style.display = 'none';
    telaLogin.style.display = '';
}

function botaoRecuperar(){
    telaLogin.style.display = 'none';
    telaCadastro.style.display = 'none';
    telaRecuperacao.style.display = '';
}

function botaoCadastro(){
    telaLogin.style.display = 'none';
    telaRecuperacao.style.display = 'none';
    telaCadastro.style.display = '';
}

function cadastrar(){
    const userData = {
        nome: document.getElementById('registerNome').value,
        email: document.getElementById('registerEmail').value,
        usuario: document.getElementById('registerUser').value,
        senha: document.getElementById('registerPassword').value
    };
      
    const options = {
        method: 'POST',
        body: JSON.stringify(userData)
    };

    const url = 'https://www.gorojogos.com.br/painel/API/cadastrarUsuario.php';

    if(document.getElementById('registerPassword').value == document.getElementById('confirmarNovaSenha').value){
        fetch(url, options)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Erro ao enviar requisição');
        })
        .then(data => {
          localStorage.setItem('pacote', data['pacote']);
          localStorage.setItem('email', data['email']);
          localStorage.setItem('usuario', data['usuario']);
          localStorage.setItem('acesso', data['acesso']);
          localStorage.setItem('logado', 'true');
          window.location.href = 'index.html';
        })
        .catch(error => {
          console.error('Erro:', error.message)
        });
    } else{
        alert('Senhas não coincidem!');
    }
}

function logar(){
    const userData = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };
      
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };

    const url = 'https://www.gorojogos.com.br/painel/API/login.php';

    if(document.getElementById('registerPassword').value == document.getElementById('confirmarNovaSenha').value){
        fetch(url, options)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Erro ao enviar requisição');
        })
        .then(data => {
          if(data === false){
            alert("Credenciais Incorretas!")
          } else{
            localStorage.setItem('pacote', data['pacote']);
            localStorage.setItem('email', data['email']);
            localStorage.setItem('usuario', data['usuario']);
            localStorage.setItem('acesso', data['acesso']);
            localStorage.setItem('logado', 'true');
            window.location.href = 'index.html';
          }
        })
        .catch(error => {
          console.error('Erro:', error.message)
        });
    } else{
        alert('Senhas não coincidem!');
    }
}

function recuperar(){
    const userData = {
        email: document.getElementById('recuperarEmail').value,
    };
      
    const options = {
        method: 'POST',
        body: JSON.stringify(userData)
    };

    const url = 'https://www.gorojogos.com.br/painel/API/recuperarSenha.php';

    if(document.getElementById('registerPassword').value == document.getElementById('confirmarNovaSenha').value){
        fetch(url, options)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Erro ao enviar requisição');
        })
        .then(data => {
          document.getElementById('recoveryText').style.display = 'flex';
        })
        .catch(error => {
          console.error('Erro:', error.message)
        });
    } else{
        alert('Senhas não coincidem!');
    }
}

window.addEventListener('DOMContentLoaded', voltar())