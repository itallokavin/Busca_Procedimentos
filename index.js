
function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("Get", url , false)
    request.send()
    
    return request.responseText
}

function criaLinha(procedimentos){
    document.querySelector('.num').innerHTML = pageAtual
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

function pressBtnCategory(){
    let btn = document.getElementsByClassName("btn")

    for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) { 
        current[0].className = current[0].className.replace(" active", "");
        
    }
    this.className += " active";
        
    });
    }

}

const html = {
    get(element){
        return document.querySelector(element)
    }
}

function makeRequest(queryParam){
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = ''
    if(queryParam){
        main(`http://localhost:3000/procedimentos?Categoria=` + queryParam + `&_page=1&_limit=${limitPage}`)
        
    }else{
        main(`http://localhost:3000/procedimentos/?_page=${pageAtual}&_limit=13`)
    
    }
}

function filterSearch(){
    html.get('#search').addEventListener('keydown',()=>{
        const dataSearchKey = document.querySelector('#search').value
        tabela.innerHTML = ""
        main(`http://localhost:3000/procedimentos/?_page=1&_limit=${limitPage}&Descricao_like=${dataSearchKey}`)       
        
    })
}

const totalDados = JSON.parse(fazGet('http://localhost:3000/procedimentos')).length /*retorna total de dados json, 314 registros*/
const limitPage = 13 /* Limite de registros por página */
const totalPage = Math.ceil(totalDados / limitPage) /* retorna total de páginas com limite de registros pro página. */
const pageIni = 1 /* Define a página INICIAL*/
let pageAtual = 1 /* Inicia a o contador da página inicial */

function registro(paginaAtual){
    let exibirRegistro = paginaAtual * limitPage
    if (exibirRegistro > totalDados ){
        exibirRegistro = totalDados
    }
    if(exibirRegistro < limitPage){
        exibirRegistro = limitPage
    }
    document.getElementById("totalRegistro").innerHTML = `Exibindo ${exibirRegistro} de ${totalDados} registros.`
    
}

const pagination = {
    next(){
        tabela.innerHTML = "";
        pageAtual++
        if(pageAtual > totalPage){
            pageAtual--
            main(`http://localhost:3000/procedimentos/?_page=${pageAtual}&_limit=13`)
        }else{
            main(`http://localhost:3000/procedimentos/?_page=${pageAtual}&_limit=13`)
            registro(pageAtual)
        }
    },
    prev(){
        tabela.innerHTML = "";
        pageAtual--
        if(pageAtual < pageIni){
            pageAtual++
            main(`http://localhost:3000/procedimentos/?_page=${pageAtual}&_limit=13`)
        }else{
            main(`http://localhost:3000/procedimentos/?_page=${pageAtual}&_limit=13`)
            registro(pageAtual)
        }
    },
    last(){
        tabela.innerHTML = "";
        pageAtual = totalPage
        if(pageAtual > totalPage){
            pageAtual--
            main(`http://localhost:3000/procedimentos/?_page=${pageAtual}&_limit=13`)
        }else{
            main(`http://localhost:3000/procedimentos/?_page=${pageAtual}&_limit=13`)
            registro(pageAtual)
        }
    },
    first(){
        tabela.innerHTML = "";
        pageAtual = pageIni
        if(pageAtual < pageIni){
            pageAtual++
            main(`http://localhost:3000/procedimentos/?_page=${pageAtual}&_limit=13`)
        }else{
            main(`http://localhost:3000/procedimentos/?_page=${pageAtual}&_limit=13`)
            registro(pageAtual)
        }
    },
    createListeners(){
        html.get('.next').addEventListener('click',() =>{
            pagination.next()
        });
        html.get('.prev').addEventListener('click',() =>{
            pagination.prev()
        })
        html.get('.last').addEventListener('click',() =>{
            pagination.last()
        })
        html.get('.first').addEventListener('click',() =>{
            pagination.first()
        })
    }
}

pagination.createListeners();
filterSearch();
pressBtnCategory();

window.onload = main(`http://localhost:3000/procedimentos/?_page=1&_limit=13`)
registro(pageAtual)


