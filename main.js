// Captura o formulário
let formulario = document.getElementById('formulario');

// Captura os campos do formulário
let nomeFormulario = document.getElementById('nome');
let sobrenomeFormulario = document.getElementById('sobrenome');
let emailFormulario = document.getElementById('email');
let loginFormulario = document.getElementById('login');
let senhaFormulario = document.getElementById('senha');
let cepFormulario = document.getElementById('cep');
let erroCep = document.getElementById('cep-erro');
let enderecoFormulario = document.getElementById('endereco');
let complementoFormulario = document.getElementById('complemento');
let bairroFormulario = document.getElementById('bairro');
let cidadeFormulario = document.getElementById('cidade');
let estadoFormulario = document.getElementById('estado');
let githubFormulario = document.getElementById('github');
let academiaFormulario = document.getElementById('academia');
let professorFormulario = document.getElementById('professor');
let termosFormulario = document.getElementById('termos');
let infoFormulario = document.getElementById('info');
let tabelaDados = document.getElementById('tabela-dados');
let camposTabela = tabelaDados.getElementsByTagName('td');

// Função para preencher login automaticamente
function atualizarLogin() {
  let nome = nomeFormulario.value.toLowerCase().trim();
  let sobrenome = sobrenomeFormulario.value.toLowerCase().trim();
  let login = `${nome}.${sobrenome}`;

  // Remover espaços em branco
  loginFormulario.value = login.split(' ').join('');
}

// Captura as informações adicionadas através do ID e chama a função atualizarLogin
nomeFormulario.addEventListener('input', atualizarLogin);
sobrenomeFormulario.addEventListener('input', atualizarLogin);

// CEP

// Monitora o evento de quando for clicado fora do elemento após a interação
cepFormulario.addEventListener('blur', consultarCEP);

function consultarCEP() {
  if (cepFormulario.value.length !== 8) {
    alert("Formato inválido!\nInforme um CEP válido com 8 dígitos, sem pontos ou traços");
    return;
  }

  let url = `https://viacep.com.br/ws/${cepFormulario.value}/json/`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function inserirDados(data) {
      if (data.erro) {
        erroCep.classList.remove('d-none');
        limparCamposCep();
      } else {
        enderecoFormulario.value = data.logradouro;
        bairroFormulario.value = data.bairro;
        cidadeFormulario.value = data.localidade;
        estadoFormulario.value = data.uf;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Limpa campos preenchidos pela API através do CEP
function limparCamposCep() {
  cepFormulario.value = "";
  enderecoFormulario.value = "";
  bairroFormulario.value = "";
  cidadeFormulario.value = "";
  estadoFormulario.value = "";
}

// Ativa o checkbox dos termos somente depois que o scroll chega ao final
function checarScroll() {
  var textarea = document.querySelector("textarea");
  var checkbox = document.querySelector(".form-check");

  if (textarea.scrollTop + textarea.clientHeight === textarea.scrollHeight) {
    checkbox.classList.remove("d-none");
  }
}

var textarea = document.querySelector("textarea");
textarea.addEventListener("scroll", checarScroll);


//"escuta" o evento submit e captura os dados informados no formulário
formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = nomeFormulario.value;
  const sobrenome = sobrenomeFormulario.value;
  const email = emailFormulario.value;
  const login = loginFormulario.value;
  const senha = senhaFormulario.value;
  const cep = cepFormulario.value;
  const endereco = enderecoFormulario.value;
  const complemento = complementoFormulario.value;
  const bairro = bairroFormulario.value;
  const cidade = cidadeFormulario.value;
  const estado = estadoFormulario.value;
  const github = githubFormulario.value;
  const academia = academiaFormulario.value;
  const professor = professorFormulario.value;
  const termos = termosFormulario.checked ? 'Aceito' : 'Não aceito';
  const info = document.querySelector('input[name="info"]:checked').value === 'info-sim' ? 'Sim' : 'Não';

  const dados = {
    nome: nome,
    sobrenome: sobrenome,
    email: email,
    login: login,
    senha: senha,
    cep: cep,
    endereco: endereco,
    complemento: complemento,
    bairro: bairro,
    cidade: cidade,
    estado: estado,
    github: github,
    academia: academia,
    professor: professor,
    termos: termos,
    info: info
  };

  exibirDados(dados);
  formulario.reset();
});
//atribui os valores dos campos do formulário aos respectivos ids da tabela
function exibirDados(dados) {
  formulario.classList.add('d-none');
  tabelaDados.classList.remove('d-none');
  document.getElementById('t-nome').textContent = dados.nome;
  document.getElementById('t-sobrenome').textContent = dados.sobrenome;
  document.getElementById('t-email').textContent = dados.email;
  document.getElementById('t-login').textContent = dados.login;
  document.getElementById('t-senha').textContent = dados.senha;
  document.getElementById('t-cep').textContent = dados.cep;
  document.getElementById('t-endereco').textContent = dados.endereco;
  document.getElementById('t-complemento').textContent = dados.complemento;
  document.getElementById('t-bairro').textContent = dados.bairro;
  document.getElementById('t-cidade').textContent = dados.cidade;
  document.getElementById('t-estado').textContent = dados.estado;
  document.getElementById('t-github').textContent = dados.github;
  document.getElementById('t-academia').textContent = dados.academia;
  document.getElementById('t-professor').textContent = dados.professor;
  document.getElementById('t-termos').textContent = dados.termos;
  document.getElementById('t-info').textContent = dados.info;
}
;
