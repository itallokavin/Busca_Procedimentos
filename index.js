function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("Get", url , false)
    request.send()
    
    return request.responseText
}

function criaLinha(procedimentos){
    
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

function makeRequest(queryParam){
    let tabela = document.getElementById("tabela");
    tabela.innerHTML = ''
    if(queryParam){
        main('http://localhost:3000/procedimentos?Categoria=' + queryParam)
    }else{
        main('http://localhost:3000/procedimentos')
    }
        
    

    
}
window.onload = main('http://localhost:3000/procedimentos')