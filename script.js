let fazAcademia = "";

/* =========================
   TOAST
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
   ACADEMIA
========================= */
function setAcademia(valor) {
  fazAcademia = valor;

  document.querySelectorAll(".btn-academia")
    .forEach(btn => btn.classList.remove("ativo"));

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
    html += `
      <div style="margin-bottom:10px;">
        <strong>${item.nome}</strong> (${item.idade} anos)<br>
        IMC: ${item.imc}
      </div>
    `;
  });

  resultado.innerHTML = html;
  resultado.style.color = "white";

  resultado.classList.remove("mostrar");
  setTimeout(() => resultado.classList.add("mostrar"), 50);
}

/* =========================
   LIMPAR HISTÓRICO
========================= */
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
  localStorage.removeItem("historicoIMC");
  mostrarToast("🧹 Tudo limpo!");
}

/* =========================
   CALCULAR IMC COMPLETO
========================= */
function calcularIMC() {
  const musica = document.getElementById("musica");
  musica.play().catch(() => {});

  const resultado = document.getElementById("resultado");

  let nome = document.getElementById("nome").value.trim();
  const idade = parseInt(document.getElementById("idade").value);
  const peso = parseFloat(document.getElementById("peso").value);

  // ✅ VALIDAÇÃO CORRETA DA ALTURA
  const alturaInput = document.getElementById("altura").value.trim();

  if (!alturaInput) {
    mostrarErro("⚠️ Digite sua altura!");
    return;
  }

  if (!alturaInput.includes(".")) {
    mostrarErro("⚠️ Por favor, coloque ponto na altura! Ex: 1.78");
    return;
  }

  const altura = parseFloat(alturaInput);

  if (isNaN(altura)) {
    mostrarErro("⚠️ Altura inválida!");
    return;
  }

  if (altura <= 0 || altura > 3) {
    mostrarErro("⚠️ Altura inválida! Use algo como 1.78");
    return;
  }

  if (!nome) return mostrarErro("Digite seu nome!");
  if (!idade || idade <= 0) return mostrarErro("Digite uma idade válida!");
  if (!peso || peso <= 0) return mostrarErro("Digite um peso válido!");
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

  let academiaMsg = fazAcademia === "sim"
    ? "💪 Continue assim!"
    : "🏃‍♂️ Começar academia pode ajudar muito!";

  let idadeMsg = idade < 18
    ? "👶 Acompanhamento recomendado."
    : idade < 40
    ? "🧑 Boa fase para cuidar da saúde."
    : "🧓 Faça check-ups regularmente.";

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

  resultado.classList.remove("mostrar");
  setTimeout(() => resultado.classList.add("mostrar"), 50);

  salvarHistorico({
    nome,
    idade,
    peso,
    altura,
    imc: imc.toFixed(2)
  });

  mostrarToast("✅ Calculado com sucesso!");
}

/* =========================
   LIMPAR CAMPOS
========================= */
function limpar() {
  ["nome","idade","peso","altura"].forEach(id => {
    document.getElementById(id).value = "";
  });

  const resultado = document.getElementById("resultado");

  resultado.innerHTML = "";
  resultado.style.color = "white";
  resultado.classList.remove("mostrar");

  fazAcademia = "";

  document.querySelectorAll(".btn-academia")
    .forEach(btn => btn.classList.remove("ativo"));

  mostrarToast("🧹 Campos limpos!");
}

/* =========================
   PLAYER DE MÚSICA
========================= */
function toggleMusica() {
  const musica = document.getElementById("musica");
  const btnMusica = document.getElementById("btn-musica");
  const volumeControl = document.getElementById("volume");

  if (!musica || !btnMusica || !volumeControl) return;

  musica.volume = volumeControl.value || 0.5;

  if (musica.paused) {
    musica.muted = false;

    musica.play().then(() => {
      btnMusica.innerText = "⏸️ Pausar música";
      mostrarToast("🎵 Música ativada!");
    }).catch(() => {
      mostrarToast("🔊 Clique novamente pra liberar o som");
    });

  } else {
    musica.pause();
    btnMusica.innerText = "▶️ Tocar música";
    mostrarToast("⏸️ Música pausada!");
  }
}
