const totalDados = JSON.parse(fazGet('http://localhost:3000/procedimentos')).length /*retorna total de dados json, 314 registros*/
const limitPage = 13 /* Limite de registros por página */
let page = 1;
let registros = 13

function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("Get", url , false)
    request.send()
    return request.responseText 
}

function criaLinha(procedimentos){
    document.querySelector(".num").innerHTML = `${page}`
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

function filterSearch(){
    html.get('#search').addEventListener('keyup',()=>{
        const dataSearchKey = document.querySelector('#search').value
        
        if (dataSearchKey.length >= 1 ){
            document.getElementById("but").style.display = 'none';
            let data = JSON.parse(fazGet(`http://localhost:3000/procedimentos/?Descricao_like=${dataSearchKey}`))
            tabela.innerHTML = ""
            main(`http://localhost:3000/procedimentos/?_page=1&_limit=${limitPage}&Descricao_like=${dataSearchKey}`)
            registros = 13
            if(registros > data.length){
                registros = data.length
                document.querySelector("#totalRegistro").innerHTML = `Exibindo ${registros} de ${data.length} registros`
            }
            else{
                document.querySelector("#totalRegistro").innerHTML = `Exibindo ${registros} de ${data.length} registros`
            }
        }
        else{
            document.getElementById("but").style.display = 'flex';
            let data = JSON.parse(fazGet(`http://localhost:3000/procedimentos/?Descricao_like=${dataSearchKey}`))
            tabela.innerHTML = ""
            main(`http://localhost:3000/procedimentos/?_page=1&_limit=${limitPage}&Descricao_like=${dataSearchKey}`)
            registros = 13
            if(registros > data.length){
                registros = data.length
                document.querySelector("#totalRegistro").innerHTML = `Exibindo ${registros} de ${data.length} registros`
            }
            else{
                document.querySelector("#totalRegistro").innerHTML = `Exibindo ${registros} de ${data.length} registros`
            }
        }
    })
    
}

function exibir(r,d,p){
    r = 13 * p
    if(r > d.length){
        r = d.length
        document.querySelector("#totalRegistro").innerHTML = `Exibindo ${r} de ${d.length} registros`
    }
    else{
        document.querySelector("#totalRegistro").innerHTML = `Exibindo ${r} de ${d.length} registros`
        
    } 
}

function makeRequest(queryParam){
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = ''
    if(queryParam){
        page = 1
        let i = 1
        let totalDadosCategoria = JSON.parse(fazGet(`http://localhost:3000/procedimentos?Categoria=`+queryParam))
        let totalPageCategoria = Math.ceil(totalDadosCategoria.length / limitPage);
        
        main(`http://localhost:3000/procedimentos?Categoria=`+queryParam+`&_page=${i}&_limit=13`)
        exibir(registros,totalDadosCategoria,page)
        
        next.onclick = function(){
            i++
            page++
            if( i > totalPageCategoria && page > totalPageCategoria){
                i--
                page--
                tabela.innerHTML = '';
                main(`http://localhost:3000/procedimentos?Categoria=`+queryParam+`&_page=${i}&_limit=13`)
                exibir(registros,totalDadosCategoria,page)
                
            }
            else{
                tabela.innerHTML = '';
                main(`http://localhost:3000/procedimentos?Categoria=`+queryParam+`&_page=${i}&_limit=13`)
                exibir(registros,totalDadosCategoria,page)
            }

        }
        prev.onclick = function(){
            i--
            page--
            if( i < 1 && page < 1 ){
                i++
                page++
                tabela.innerHTML = '';
                main(`http://localhost:3000/procedimentos?Categoria=`+queryParam+`&_page=${i}&_limit=13`)
                exibir(registros,totalDadosCategoria,page)
                
            }
            else{
                tabela.innerHTML = '';
                main(`http://localhost:3000/procedimentos?Categoria=`+queryParam+`&_page=${i}&_limit=13`)
                exibir(registros,totalDadosCategoria,page)
            }

        }
        last.onclick = function(){
            i = totalPageCategoria
            page = totalPageCategoria
            tabela.innerHTML = '';
            main(`http://localhost:3000/procedimentos?Categoria=`+queryParam+`&_page=${i}&_limit=13`)
            exibir(registros,totalDadosCategoria,page)
        }
        first.onclick = function(){
            i = 1
            page = 1
            tabela.innerHTML = '';
            main(`http://localhost:3000/procedimentos?Categoria=`+queryParam+`&_page=${i}&_limit=13`)
            exibir(registros,totalDadosCategoria,page)
        }
    }else{
        
        let totalDados = JSON.parse(fazGet(`http://localhost:3000/procedimentos`))
        let totalPage = Math.ceil(totalDados.length / limitPage); 
        let i = 1
        registros = totalDados.length
        
        main(`http://localhost:3000/procedimentos/?_page=${i}&_limit=13`)
        exibir(registros,totalDados,page)
        
        
        next.onclick = function(){
            i++
            page++
            registros = 13 * page
            if( i > totalPage && page > totalPage){
                i--
                page--
                tabela.innerHTML = '';
                main(`http://localhost:3000/procedimentos/?_page=${i}&_limit=13`)
                exibir(registros,totalDados,page)
                
            }
            else{
                tabela.innerHTML = '';
                main(`http://localhost:3000/procedimentos/?_page=${i}&_limit=13`)
                exibir(registros,totalDados,page)
            }

        }
        
        prev.onclick = function(){
            i--
            page--
            if( i < 1 && page < 1 ){
                i++
                page++
                tabela.innerHTML = '';
                main(`http://localhost:3000/procedimentos/?_page=${i}&_limit=13`)
                exibir(registros,totalDados,page)
                
            }
            else{
                tabela.innerHTML = '';
                main(`http://localhost:3000/procedimentos/?_page=${i}&_limit=13`)
                exibir(registros,totalDados,page)
            }

        }
        last.onclick = function(){
            i = totalPage
            page = totalPage
            tabela.innerHTML = '';
            main(`http://localhost:3000/procedimentos/?_page=${i}&_limit=13`)
            exibir(registros,totalDados,page)
        }
        first.onclick = function(){
            i = 1
            page = 1
            tabela.innerHTML = '';
            main(`http://localhost:3000/procedimentos/?_page=${i}&_limit=13`)
            exibir(registros,totalDados,page)
        }
        
    }
}

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const last = document.querySelector('.last');
const first = document.querySelector('.first');

filterSearch();
pressBtnCategory();

window.onload = makeRequest();



 
