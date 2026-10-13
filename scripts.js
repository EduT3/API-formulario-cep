const cep = document.getElementById("cep");
const mensagemErro = document.getElementById("erro");
const camposEndereco = ["cidade", "endereco", "estado", "bairro"];
let consultaAtual;
let versao = 0;
function limparEndereco() { camposEndereco.forEach(id => { document.getElementById(id).value = ""; }); }
async function buscaEndereco(valor) {
  const minhaVersao = ++versao;
  consultaAtual?.abort();
  const numero = valor.replace(/\D/g, "");
  limparEndereco();
  if (!/^\d{8}$/.test(numero)) {
    mensagemErro.textContent = "Informe um CEP com 8 dígitos.";
    return;
  }
  consultaAtual = new AbortController();
  mensagemErro.textContent = "Consultando CEP…";
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${numero}/json/`, { signal: consultaAtual.signal });
    if (!resposta.ok) throw new Error("Serviço indisponível");
    const endereco = await resposta.json();
    if (minhaVersao !== versao) return;
    if (endereco.erro) { mensagemErro.textContent = "CEP não encontrado. Confira os números."; return; }
    document.getElementById("cidade").value = endereco.localidade || "";
    document.getElementById("endereco").value = endereco.logradouro || "";
    document.getElementById("estado").value = endereco.uf || "";
    document.getElementById("bairro").value = endereco.bairro || "";
    mensagemErro.textContent = "Endereço encontrado. Confira e complete os campos que faltam.";
  } catch (erro) {
    if (erro.name !== "AbortError" && minhaVersao === versao) mensagemErro.textContent = "Não foi possível consultar o CEP. Tente novamente ou preencha o endereço manualmente.";
  }
}
cep.addEventListener("input", () => {
  versao++; consultaAtual?.abort(); limparEndereco(); mensagemErro.textContent = "";
});
cep.addEventListener("blur", () => buscaEndereco(cep.value));
document.getElementById("formulario").addEventListener("submit", evento => {
  evento.preventDefault();
  window.location.assign("./cadastro-finalizado.html");
});
