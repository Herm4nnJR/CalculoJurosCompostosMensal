/*
Inputs:
    Informar o valor do capital a ser investido
    Informar o prazo do investimento
    Informar a taxa de juros da aplicação

Output:
    Valor final do capital investido após o período informado
    Resultado mês a mês ($ + juros)
    Mostrar quanto representa a taxa de juros no valor final 
*/

async function calcular(){
    let capInvest = document.getElementById("capInvest")
    let prazo = document.getElementById("prazo")
    let taxa = document.getElementById("taxa")
    meses = new Array()
    montanteFinal = resultMensal(capInvest.value, prazo.value, taxa.value, meses)
    var resposta = document.getElementById("resposta")
    resposta.innerHTML = "R$ " + montanteFinal.toFixed(2)
    if (!document.getElementById("tabelaMensal")){
        var pulaLinha = document.createElement("br")
        resposta.insertAdjacentElement("afterend", pulaLinha)
        var botaoTabela = document.createElement("input")
        botaoTabela.setAttribute("type", "button")
        botaoTabela.setAttribute("id", "tabelaMensal")
        botaoTabela.setAttribute("value", "Mostrar mes a mes")
        botaoTabela.setAttribute("onclick", "mostrarTabela(meses)")
        pulaLinha.insertAdjacentElement("afterend",botaoTabela)
        var botaoTaxa = document.createElement("input")
        botaoTaxa.setAttribute("type", "button")
        botaoTaxa.setAttribute("id", "taxaBotao")
        botaoTaxa.setAttribute("value", "Quanto representa a taxa no valor final")
        botaoTaxa.setAttribute("onclick", "valorTaxa(capInvest, montanteFinal)")
        botaoTabela.insertAdjacentElement("afterend", botaoTaxa)
    }
}
/*
    Recebe um array(meses) e mostra o mesmo em tabela
*/
function mostrarTabela(array){
    let tabela = document.createElement("table")
    document.body.insertAdjacentElement("beforeend", tabela)
    let thead = document.createElement("thead")
    tabela.appendChild(thead)
    let tr = document.createElement("tr")
    thead.appendChild(tr)
    td = document.createElement("td")
    td2 = document.createElement("td")
    td.innerHTML = "Valor no Mês"
    td2.innerHTML = "Mês"
    tr.appendChild(td)
    tr.appendChild(td2)
    let tbody = document.createElement("tbody")
    tabela.appendChild(tbody)
    for(let i = 0; i < array.length; i++){
        tr = document.createElement("tr")
        tbody.appendChild(tr)
        td = document.createElement("td")
        td2 = document.createElement("td")
        var number = parseFloat(array[i])
        td.innerHTML = "R$ " + number.toFixed(2)
        tbody.appendChild(td)
        td2.innerHTML = i
        tbody.appendChild(td2)
    }
}

/*
    Calcula o resultado que o capital aplicado terá a cada mês
*/
function resultMensal(capitalAplicado, prazo, taxa, meses){
    let montante = capitalAplicado
    meses.push(montante)
    for (i = 0; i < prazo; i++){
        montante = montante * (1+ taxa/100)
        meses.push(montante)
    }
    return montante
}

/*
    Calcula quanto representa a taxa de juros no valor final 
*/
function valorTaxa(capitalAplicado, valorFinal){
    resultadoTaxa = parseFloat(valorFinal) - parseFloat(capitalAplicado.value)
    porcentagemTaxa = resultadoTaxa/parseFloat(capitalAplicado.value)
    let apresentaTaxa = document.createElement("div")
    apresentaTaxa.setAttribute("id", "taxaValor")
    document.body.insertAdjacentElement("beforeend", apresentaTaxa)
    console.log(resultadoTaxa)
    console.log(porcentagemTaxa)
    apresentaTaxa.innerHTML = "Do total investido R$ " + parseFloat(resultadoTaxa).toFixed(2) + " é o ganho com as taxas, ou seja, seu capital valorizou " + parseFloat(porcentagemTaxa*100).toFixed(2) + "%."
}