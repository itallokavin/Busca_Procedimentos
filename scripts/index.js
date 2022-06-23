const fs = require('fs');

const getJson = fs.readFileSync('./procedimentos.json','utf-8');
let dados = JSON.parse(getJson);
console.log(dados[0].Codigo);

