function calcularIMC() {
  let peso = document.getElementById("peso").value;
  let altura = document.getElementById("altura").value;

  console.log("Peso:", peso);
  console.log("Altura:", altura);

  if (!peso || !altura) {
    document.getElementById("resultado").innerText = "Preencha todos os campos!";
    return;
  }

  let imc = peso / (altura * altura);
  imc = imc.toFixed(2);

  console.log("IMC:", imc);

  let classificacao = "";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  } else if (imc < 25) {
    classificacao = "Peso normal";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";
  } else {
    classificacao = "Obesidade";
  }

  console.log("Classificação:", classificacao);

  document.getElementById("resultado").innerText =
    `Seu IMC é ${imc} (${classificacao})`;
}
