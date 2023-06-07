const { readFileSync } = require('fs');

//função extraída 4.2
function formatarMoeda(valor){
  return new Intl.NumberFormat("pt-BR",
      { style: "currency", currency: "BRL",
        minimumFractionDigits: 2 }).format(valor/100);
}

function getPeca(pecas, apre){
  return pecas[apre.id];
}

//funcao extraída #4.1
function calcularCredito(pecas, apre){
  let creditos = 0;
  creditos += Math.max(apre.audiencia - 30, 0);
  if (getPeca(pecas, apre).tipo === "comedia") 
    creditos += Math.floor(apre.audiencia / 5);
  return creditos;
}

//funcao extraída #5
function calcularTotalCreditos(pecas, apresentacoes){
  let totalCred = 0;
  for (let apre of apresentacoes) {
    totalCred += calcularCredito(pecas, apre);
  }
  return totalCred;
}

//Função extraída #2
function calcularTotalApresentacao(pecas, apre){
  let total = 0;

  switch (getPeca(pecas, apre).tipo) {
    case "tragedia":
      total = 40000;
      if (apre.audiencia > 30) {
        total += 1000 * (apre.audiencia - 30);
      }
      break;
    case "comedia":
      total = 30000;
      if (apre.audiencia > 20) {
        total += 10000 + 500 * (apre.audiencia - 20);
      }
      total += 300 * apre.audiencia;
      break;
    default:
      throw new Error(`Peça desconhecia: ${getPeca(pecas, apre).tipo}`);
  }
  return total;
}

//funcao extraída #5
function calcularTotalFatura(pecas, apresentacoes){
  let totalFatura = 0;
  for (let apre of apresentacoes) {
    totalFatura += calcularTotalApresentacao(pecas, apre);
  }
  return totalFatura;
}

//funcao query #3
function gerarFaturaStr(fatura, pecas) {
  // corpo principal (após funções aninhadas)
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${getPeca(pecas, apre).nome}: ${formatarMoeda(calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura(pecas, fatura.apresentacoes))}\n`;
  faturaStr += `Créditos acumulados: ${calcularTotalCreditos(pecas, fatura.apresentacoes)} \n`;
  return faturaStr;
}

function gerarFaturaHTML(fatura, pecas) {
  // corpo principal (após funções aninhadas)
  let faturaStr = `<html>\n<p> Fatura ${fatura.cliente} </p>\n<ul>\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `<li>  ${getPeca(pecas, apre).nome}: ${formatarMoeda(calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos) </li>\n`;
  }
  faturaStr += `</ul>\n<p> Valor total: ${formatarMoeda(calcularTotalFatura(pecas, fatura.apresentacoes))} </p>\n`;
  faturaStr += `<p> Créditos acumulados: ${calcularTotalCreditos(pecas, fatura.apresentacoes)} </p>\n</html>\n`;
  return faturaStr;
}

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
console.log(faturaStr);
console.log(gerarFaturaHTML(faturas, pecas));
