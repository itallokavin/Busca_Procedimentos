function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("Get", url , false)
    request.send()
    
    return request.responseText
}

function criaLinha(procedimentos){
    document.querySelector('.num').innerHTML = pageNum
    linha = document.createElement("tr");
    tdCategoria = document.createElement ("td");
    tdDescricao = document.createElement ("td");
    tdDescricao.classList.add('desc');
    tdCodigo = document.createElement ("td");
    tdId = document.createElement ("td");
    tdCategoria.innerHTML = procedimentos.Categoria
    tdDescricao.innerHTML = procedimentos.Descricao
    tdCodigo.innerHTML = procedimentos.Codigo
    
    linha.appendChild(tdCodigo);
    linha.appendChild(tdCategoria);
    linha.appendChild(tdDescricao);
    
    return linha;
}

function main(url){
    let data = fazGet(url)
    let procedimentos = JSON.parse(data);
    let tabela = document.getElementById("tabela");
    procedimentos.forEach(element => {  
    let linha = criaLinha(element);

    tabela.appendChild(linha);

    });

}

const html = {
    get(element){
        return document.querySelector(element)
    }
}

let totalDados = JSON.parse(fazGet('http://localhost:3000/procedimentos')).length
let totalPage = Math.ceil(totalDados / 15)
let pageNum = 1

const controls = {
    next(){
        tabela.innerHTML = "";
        pageNum++
        if(pageNum > totalPage){
            pageNum--
            main(`http://localhost:3000/procedimentos/?_page=${pageNum}&_limit=15`)
        }else{
            main(`http://localhost:3000/procedimentos/?_page=${pageNum}&_limit=15`)
        }
        console.log(pageNum)
    },
    prev(){
        tabela.innerHTML = "";
        pageNum--
        if(pageNum < 1){
            pageNum++
            main(`http://localhost:3000/procedimentos/?_page=${pageNum}&_limit=15`)
        }
        else{
            main(`http://localhost:3000/procedimentos/?_page=${pageNum}&_limit=15`)
        }
        console.log(pageNum)
    },
    last(){
        tabela.innerHTML = "";
        pageNum = totalPage
        main(`http://localhost:3000/procedimentos/?_page=${pageNum}&_limit=15`)
        console.log(pageNum)
    },
    first(){
        tabela.innerHTML = "";
        pageNum = 1
        main(`http://localhost:3000/procedimentos/?_page=${pageNum}&_limit=15`)
        console.log(pageNum)
    },
    createListeners(){
        html.get('.next').addEventListener('click',() =>{
            controls.next()
            
        });
        html.get('.prev').addEventListener('click',() =>{
            controls.prev()
            
        });
        html.get('.last').addEventListener('click',() =>{
            controls.last()
            
        });
        html.get('.first').addEventListener('click',() =>{
            controls.first()
            
        });
    }
}

controls.createListeners();

function makeRequest(queryParam){
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = ''
    if(queryParam){
        main(`http://localhost:3000/procedimentos?Categoria=` + queryParam + `&_page=1&_limit=15`)
    }else{
        main(`http://localhost:3000/procedimentos/?_page=${pageNum}&_limit=15`)
    }
}
window.onload = main(`http://localhost:3000/procedimentos/?_page=${pageNum}&_limit=15`)

