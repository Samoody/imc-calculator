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

  console.log("Peso:", peso);
  console.log("Altura:", altura);

  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    resultado.innerText = "Valores inválidos!";
    resultado.style.color = "white";
    return;
  }

  let imc = peso / (altura * altura);
  let mensagem = "";

  if (imc < 18.5) {
    mensagem = "Você está abaixo do peso. Procure um médico para orientação.";
    resultado.style.color = "orange";
  } else if (imc < 25) {
    mensagem = "Você está com peso normal. Parabéns, continue assim!";
    resultado.style.color = "green";
  } else if (imc < 30) {
    mensagem = "Você está acima do peso. Procure um médico para orientação.";
    resultado.style.color = "yellow";
  } else {
    mensagem = "Você está obeso. É recomendado procurar um médico para orientação.";
    resultado.style.color = "red";
  }

  imc = imc.toFixed(2);

  resultado.innerText = `${nome}, seu IMC é ${imc}. ${mensagem}`;
}

function limpar() {
  document.getElementById("nome").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("resultado").innerText = "";
}
