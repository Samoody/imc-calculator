console.log("SCRIPT CARREGOU");
function calcularIMC() {
  let peso = document.getElementById("peso").value;
  let altura = document.getElementById("altura").value;
  let resultado = document.getElementById("resultado");
resultado.style.color = "blue";
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
 resultado.style.color = "#ff4d4d";
resultado.style.fontSize = "18px";
resultado.style.fontWeight = "bold";
  }

  imc = imc.toFixed(2); // 👈 só aqui no final

  console.log("Classificação:", classificacao);

  resultado.innerText = `Seu IMC é ${imc} (${classificacao})`;
}
