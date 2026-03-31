let fazAcademia = "";

/* =========================
   TOAST (mensagem flutuante)
========================= */
function mostrarToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("mostrar");

  setTimeout(() => {
    toast.classList.remove("mostrar");
  }, 2000);
}

/* =========================
   BOTÃO ACADEMIA
========================= */
function setAcademia(valor) {
  fazAcademia = valor;

  const botoes = document.querySelectorAll(".btn-academia");
  botoes.forEach(btn => btn.classList.remove("ativo"));

  document.getElementById(valor === "sim" ? "btn-sim" : "btn-nao")
    .classList.add("ativo");
}

/* =========================
   ERRO
========================= */
function mostrarErro(msg) {
  const resultado = document.getElementById("resultado");

  resultado.innerText = msg;
  resultado.style.color = "white";

  resultado.classList.remove("mostrar");
  setTimeout(() => resultado.classList.add("mostrar"), 50);
}

/* =========================
   HISTÓRICO
========================= */
function salvarHistorico(dados) {
  let historico = JSON.parse(localStorage.getItem("historicoIMC")) || [];

  historico.push(dados);

  if (historico.length > 10) historico.shift();

  localStorage.setItem("historicoIMC", JSON.stringify(historico));
}

function mostrarHistorico() {
  const resultado = document.getElementById("resultado");
  const historico = JSON.parse(localStorage.getItem("historicoIMC")) || [];

  if (historico.length === 0) {
    resultado.innerHTML = "Nenhum histórico ainda.";
    return;
  }

  let texto = "<h3>📜 Histórico</h3>";

  historico.slice().reverse().forEach(item => {
    texto += `
      <div style="margin-bottom:10px;">
        <strong>${item.nome}</strong> (${item.idade} anos)<br>
        IMC: ${item.imc}
      </div>
    `;
  });

  resultado.innerHTML = texto;
  resultado.style.color = "white";

  resultado.classList.remove("mostrar");
  setTimeout(() => resultado.classList.add("mostrar"), 50);
}

function limparHistorico() {
  if (!confirm("Tem certeza que deseja apagar o histórico?")) return;

  localStorage.removeItem("historicoIMC");
  mostrarToast("🗑️ Histórico apagado!");
}

/* =========================
   LIMPAR TUDO
========================= */
function limparTudo() {
  limpar();
  limparHistorico();
  mostrarToast("🧹 Tudo limpo!");
}

/* =========================
   CÁLCULO IMC COMPLETO
========================= */
function calcularIMC() {
  const resultado = document.getElementById("resultado");

  let nome = document.getElementById("nome").value.trim();
  const idade = parseInt(document.getElementById("idade").value);
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);

  if (!nome) return mostrarErro("Digite seu nome!");
  if (!idade || idade <= 0) return mostrarErro("Digite uma idade válida!");
  if (!peso || peso <= 0) return mostrarErro("Digite um peso válido!");
  if (!altura || altura <= 0) return mostrarErro("Digite uma altura válida!");
  if (fazAcademia === "") return mostrarErro("Escolha se faz academia!");

  nome = nome.charAt(0).toUpperCase() + nome.slice(1);

  const imc = peso / (altura * altura);
  const pesoIdeal = 22 * (altura * altura);

  let mensagem = "";
  let recomendacao = "";

  if (imc < 18.5) {
    mensagem = "Você está abaixo do peso.";
    recomendacao = "⚠️ Considere procurar um nutricionista.";
    resultado.style.color = "orange";

  } else if (imc < 25) {
    mensagem = "Você está com peso normal. Parabéns!";
    recomendacao = "✅ Continue mantendo hábitos saudáveis!";
    resultado.style.color = "green";

  } else if (imc < 30) {
    mensagem = "Você está acima do peso.";
    recomendacao = "⚠️ Procure um médico ou nutricionista.";
    resultado.style.color = "yellow";

  } else {
    mensagem = "Você está obeso.";
    recomendacao = "🚨 Procure um médico.";
    resultado.style.color = "red";
  }

  const academiaMsg = fazAcademia === "sim"
    ? "💪 Continue assim! Isso faz muita diferença."
    : "🏃‍♂️ Começar academia pode melhorar sua saúde.";

  let idadeMsg = "";
  if (idade < 18) {
    idadeMsg = "👶 Acompanhamento com responsável é importante.";
  } else if (idade < 40) {
    idadeMsg = "🧑 Boa fase para cuidar da saúde.";
  } else {
    idadeMsg = "🧓 Faça check-ups regularmente.";
  }

  const diff = peso - pesoIdeal;
  let pesoMsg = "";

  if (Math.abs(diff) < 1) {
    pesoMsg = "🎯 Você já está no peso ideal!";
  } else if (diff > 0) {
    pesoMsg = `📉 Você precisa perder ${diff.toFixed(1)} kg.`;
  } else {
    pesoMsg = `📈 Você precisa ganhar ${Math.abs(diff).toFixed(1)} kg.`;
  }

  resultado.innerHTML = `
    <strong>${nome}</strong>, seu IMC é ${imc.toFixed(2)}.<br><br>

    ${mensagem}<br>
    ${recomendacao}<br><br>

    📊 Peso ideal: <strong>${pesoIdeal.toFixed(1)} kg</strong><br>
    ${pesoMsg}<br><br>

    ${academiaMsg}<br>
    ${idadeMsg}
  `;

  salvarHistorico({
    nome,
    idade,
    peso,
    altura,
    imc: imc.toFixed(2)
  });

  resultado.classList.remove("mostrar");
  setTimeout(() => resultado.classList.add("mostrar"), 50);

  mostrarToast("✅ Calculado com sucesso!");
}

/* =========================
   LIMPAR CAMPOS
========================= */
function limpar() {
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
  resultado.classList.remove("mostrar");

  fazAcademia = "";

  document.querySelectorAll(".btn-academia")
    .forEach(btn => btn.classList.remove("ativo"));

  mostrarToast("🧹 Campos limpos!");
}
