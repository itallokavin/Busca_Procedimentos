alert('Oi');

import { readFile } from 'fs';
let getJson = readFile('./procedimentos.json','utf-8');

getJson = JSON.parse(getJson);

let cod = document.getElementById('codigo');
let cat = document.getElementById('categoria');
let des = document.getElementById('descricao');

let key = 0;

while(key <= getJson.length){
  cod.append(`${getJson[key].Codigo}`);
  cat.append(`${getJson[key].Categoria}`);
  des.append(`${getJson[key].Descricao}`);
  id++
}