function calcularIMC() {
  let nome = document.getElementById("nome")?.value || "Usuário";
  let peso = document.getElementById("peso").value;
  let altura = document.getElementById("altura").value;
  let resultado = document.getElementById("resultado");

  console.log("Peso:", peso);
  console.log("Altura:", altura);

  if (!peso || !altura) {
    resultado.innerText = "Preencha todos os campos!";
    resultado.style.color = "white";
    return;
  }

  if (peso <= 0 || altura <= 0) {
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
    mensagem = "Você está obeso. Procure um médico para orientação.";
    resultado.style.color = "red";
  }

  imc = imc.toFixed(2);

  resultado.innerText = `${nome}, seu IMC é ${imc}. ${mensagem}`;
}

function limpar() {
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("resultado").innerText = "";
}
