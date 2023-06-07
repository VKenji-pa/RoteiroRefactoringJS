//arquivo util.js
const {readFileSync} = require('fs');

//função extraída 4.2
module.exports = function formatarMoeda(valor){
    return new Intl.NumberFormat("pt-BR",
        { style: "currency", currency: "BRL",
          minimumFractionDigits: 2 }).format(valor/100);
  }