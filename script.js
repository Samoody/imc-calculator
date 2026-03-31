let fazAcademia = "";

// botão sim/não
function setAcademia(valor) {
  fazAcademia = valor;

  const botoes = document.querySelectorAll(".btn-academia");
  botoes.forEach(btn => btn.classList.remove("ativo"));

  if (valor === "sim") {
    document.getElementById("btn-sim").classList.add("ativo");
  } else {
    document.getElementById("btn-nao").classList.add("ativo");
  }
}

// erro padrão
function mostrarErro(msg) {
  const resultado = document.getElementById("resultado");
  resultado.innerText = msg;
  resultado.style.color = "white";
}

// salvar histórico
function salvarHistorico(dados) {
  let historico = JSON.parse(localStorage.getItem("historicoIMC")) || [];
  historico.push(dados);
  localStorage.setItem("historicoIMC", JSON.stringify(historico));
}

// mostrar histórico
function mostrarHistorico() {
  const historico = JSON.parse(localStorage.getItem("historicoIMC")) || [];

  if (historico.length === 0) {
    document.getElementById("resultado").innerHTML = "Nenhum histórico ainda.";
    return;
  }

  let texto = "<h3>📜 Histórico</h3>";

  historico.reverse().forEach(item => {
    texto += `
      <div style="margin-bottom:10px;">
        <strong>${item.nome}</strong> (${item.idade} anos)<br>
        IMC: ${item.imc}
      </div>
    `;
  });

  document.getElementById("resultado").innerHTML = texto;
}

// calcular IMC
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
    recomendacao = "⚠️ Procure um nutricionista.";
    resultado.style.color = "orange";
  } else if (imc < 25) {
    mensagem = "Peso normal. Parabéns!";
    recomendacao = "✅ Continue assim!";
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

  // academia
  let academiaMsg = fazAcademia === "sim"
    ? "💪 Continue assim!"
    : "🏃‍♂️ Começar academia pode ajudar muito!";

  // idade
  let idadeMsg = idade < 18
    ? "👶 Acompanhamento recomendado."
    : idade < 40
    ? "🧑 Boa fase para cuidar da saúde."
    : "🧓 Faça check-ups regularmente.";

  // diferença peso
  let diff = peso - pesoIdeal;
  let pesoMsg = "";

  if (Math.abs(diff) < 1) {
    pesoMsg = "🎯 Você está no peso ideal!";
  } else if (diff > 0) {
    pesoMsg = `📉 Precisa perder ${diff.toFixed(1)} kg.`;
  } else {
    pesoMsg = `📈 Precisa ganhar ${Math.abs(diff).toFixed(1)} kg.`;
  }

  resultado.innerHTML = `
    <strong>${nome}</strong>, seu IMC é ${imc.toFixed(2)}.<br><br>
    ${mensagem}<br>
    ${recomendacao}<br><br>
    📊 Peso ideal: ${pesoIdeal.toFixed(1)} kg<br>
    ${pesoMsg}<br><br>
    ${academiaMsg}<br>
    ${idadeMsg}
  `;

  salvarHistorico({
    nome,
    idade,
    imc: imc.toFixed(2)
  });

  resultado.classList.remove("mostrar");
  setTimeout(() => {
    resultado.classList.add("mostrar");
  }, 50);
}

// limpar
function limpar() {
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("resultado").innerHTML = "";

  fazAcademia = "";

  const botoes = document.querySelectorAll(".btn-academia");
  botoes.forEach(btn => btn.classList.remove("ativo"));
}
