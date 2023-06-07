const { readFileSync } = require('fs');

var Repositorio = require("./repositorio")
var ServicoCalculoFatura = require("./servico.js");
var gerarFaturaStr = require("./apresentacao.js");

const faturas = JSON.parse(readFileSync('./faturas.json'));
const calc = new ServicoCalculoFatura(new Repositorio()); //Tarefa #8
const faturaStr = gerarFaturaStr(faturas, calc);
console.log(faturaStr);
//const faturaHTML = gerarFaturaHTML(faturas, calc);
//console.log(faturaHTML);