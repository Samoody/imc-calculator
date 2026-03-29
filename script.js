let fazAcademia = "";

// função dos botões
function setAcademia(valor) {
  fazAcademia = valor;
}

function calcularIMC() {
  let resultado = document.getElementById("resultado");

  let nome = document.getElementById("nome").value.trim();

  if (!nome) {
    resultado.innerText = "Digite seu nome!";
    resultado.style.color = "white";
    return;
  }

  nome = nome.charAt(0).toUpperCase() + nome.slice(1);

  let peso = Number(document.getElementById("peso").value);
  let altura = Number(document.getElementById("altura").value);

  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    resultado.innerText = "Valores inválidos!";
    resultado.style.color = "white";
    return;
  }

  if (fazAcademia === "") {
    resultado.innerText = "Escolha se você faz academia!";
    resultado.style.color = "white";
    return;
  }

  let imc = peso / (altura * altura);
  let pesoIdeal = 22 * (altura * altura);

  let mensagem = "";

  if (imc < 18.5) {
    mensagem = "Você está abaixo do peso.";
    resultado.style.color = "orange";
  } else if (imc < 25) {
    mensagem = "Você está com peso normal. Parabéns!";
    resultado.style.color = "green";
  } else if (imc < 30) {
    mensagem = "Você está acima do peso.";
    resultado.style.color = "yellow";
  } else {
    mensagem = "Você está obeso.";
    resultado.style.color = "red";
  }

  let extra = "";

  if (fazAcademia === "sim") {
    extra = "💪 Continue firme na academia!";
  } else {
    extra = "🏃‍♂️ Que tal começar academia?";
  }

  imc = imc.toFixed(2);
  pesoIdeal = pesoIdeal.toFixed(1);

  resultado.innerHTML = `${nome}, seu IMC é ${imc}.<br>
  ${mensagem}<br>
  Seu peso ideal é aproximadamente ${pesoIdeal} kg.<br>
  ${extra}`;
}

function limpar() {
  document.getElementById("nome").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("resultado").innerText = "";
  fazAcademia = "";
}
