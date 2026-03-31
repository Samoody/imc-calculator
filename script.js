let fazAcademia = "";

/* TOAST */
function mostrarToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("mostrar");

  setTimeout(() => {
    toast.classList.remove("mostrar");
  }, 2000);
}

/* academia */
function setAcademia(valor) {
  fazAcademia = valor;

  document.querySelectorAll(".btn-academia")
    .forEach(btn => btn.classList.remove("ativo"));

  document.getElementById(valor === "sim" ? "btn-sim" : "btn-nao")
    .classList.add("ativo");
}

/* erro */
function mostrarErro(msg) {
  const resultado = document.getElementById("resultado");
  resultado.innerText = msg;
  resultado.style.color = "white";
  resultado.classList.add("mostrar");
}

/* histórico */
function salvarHistorico(dados) {
  let h = JSON.parse(localStorage.getItem("historicoIMC")) || [];
  h.push(dados);
  if (h.length > 10) h.shift();
  localStorage.setItem("historicoIMC", JSON.stringify(h));
}

function mostrarHistorico() {
  const resultado = document.getElementById("resultado");
  const h = JSON.parse(localStorage.getItem("historicoIMC")) || [];

  if (h.length === 0) {
    resultado.innerHTML = "Nenhum histórico.";
    return;
  }

  let html = "<h3>📜 Histórico</h3>";

  h.slice().reverse().forEach(item => {
    html += `<div><b>${item.nome}</b> - IMC: ${item.imc}</div>`;
  });

  resultado.innerHTML = html;
  resultado.classList.add("mostrar");
}

/* limpar histórico */
function limparHistorico() {
  localStorage.removeItem("historicoIMC");
  mostrarToast("🗑️ Histórico apagado!");
}

/* limpar tudo */
function limparTudo() {
  limpar();
  limparHistorico();
  mostrarToast("🧹 Tudo limpo!");
}

/* calcular */
function calcularIMC() {
  const nome = document.getElementById("nome").value.trim();
  const idade = parseInt(document.getElementById("idade").value);
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const resultado = document.getElementById("resultado");

  if (!nome || !idade || !peso || !altura || !fazAcademia) {
    return mostrarErro("Preencha tudo!");
  }

  const imc = peso / (altura * altura);
  const pesoIdeal = 22 * (altura * altura);

  resultado.innerHTML = `
    <b>${nome}</b>, IMC: ${imc.toFixed(2)}<br>
    Peso ideal: ${pesoIdeal.toFixed(1)} kg
  `;

  resultado.style.color = "white";
  resultado.classList.add("mostrar");

  salvarHistorico({ nome, imc: imc.toFixed(2) });
  mostrarToast("✅ Calculado com sucesso!");
}

/* limpar campos */
function limpar() {
  ["nome","idade","peso","altura"].forEach(id => {
    document.getElementById(id).value = "";
  });

  document.getElementById("resultado").innerHTML = "";
  document.getElementById("resultado").classList.remove("mostrar");

  fazAcademia = "";
  document.querySelectorAll(".btn-academia")
    .forEach(btn => btn.classList.remove("ativo"));

  mostrarToast("🧹 Campos limpos!");
}
