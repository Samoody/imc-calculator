function calcularIMC() {
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
  imc = imc.toFixed(2);

  console.log("IMC:", imc);

  let classificacao = "";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
    resultado.style.color = "orange";
  } else if (imc < 25) {
    classificacao = "Peso normal";
    resultado.style.color = "green";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";
    resultado.style.color = "yellow";
  } else {
    classificacao = "Obesidade";
    resultado.style.color = "red";
  }

  console.log("Classificação:", classificacao);

  resultado.innerText = `Seu IMC é ${imc} (${classificacao})`;
}

function limpar() {
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("resultado").innerText = "";
}
