//seleciona as tags do html
const frm = document.querySelector("form");
const resp = document.querySelector("pre");

//declarar vetor global

const carros = [];  //declara um vetor(array) limpo, para inclusão dos dados com .PUSH

frm.addEventListener("submit", (e) => {  
    e.preventDefault(); //previne o recarregamento da página ao enviar os dados

    const modelo = frm.inModelo.value;  //seleciona o input html
    const preco = Number(frm.inPreco.value); //seleciona o input html convertendo-o em números

    carros.push({modelo, preco});  //pega os valods digitados e inclue no vetor carros=[]
    frm.inModelo.value = ""; //após clicar em adicionar, limpa o valor digitado
    frm.inPreco.value = ""; //após clicar em adicionar, limpa o valor digitado

    inModelo.focus(); //retorna o cursos para o input

    //dispara um evento de click em btListar (equivale a um click no botão na página)
    frm.btListar.dispatchEvent(new Event("click")) //clica automaticamente com dispatchEvent no botão listar todos

})

//criando lista com reduce () e concatenando o acumulador com o conteúdo do vetor(array)
frm.btListar.addEventListener("click", () => {  
    if(carros.length == 0 ){  //le o vetor carros, se não tiver nem um objeto ou valor incluido ele retorna um alert
        alert ("Não foi encontrado nem um carro na lista")
        return
    }

    const lista = carros.reduce((acumulador, carro) => acumulador + carro.modelo + " - R$: " + carro.preco.toFixed(2) +"\n", "") //concatenação com reduce e accumulador

    resp.innerText = `Lista de carros cadastrados\n${"-".repeat(40)}\n${lista}` 
})

//usar filter() para encontrar os carros com o preço menor ou igual ao desejado pelo cliente
frm.btFiltrar.addEventListener("click", () => {
    const maximo = Number(prompt("Qual valor máximo que o cliente deseja pagar?"));

    if(maximo == 0 || isNaN(maximo)) {
        return
    };

    const carrosFilter = carros.filter(carro => carro.preco <= maximo);  //filtra o objetos com a declaração preco onde o valor se for menor ou igual ao máximo declarado, ele envia
    //o valor filtrado para um novo array o carrosFilter =[]

    const lista = carrosFilter.reduce((acumulador, carro) => acumulador + carro.modelo + " - R$: " 
    + carro.preco.toFixed(2) +"\n")

    if(carrosFilter.length == 0 ) {
        alert("Não foi encontrado nem um carro com este valor")
        return
    };

    resp.innerText = `Carros até: ${maximo.toFixed(2)}\n${"-".repeat(40)}\n${lista}`

})

//utilizando map() para dar o desconto de uma promoção

frm.btSimular.addEventListener("click", () => {
    const desconto = Number(prompt("Qual valor do desconto em %?"))

    if(desconto == 0 || isNaN(desconto)) {
        alert("Valor de desconto inválido");
        return;
    };

    const carroDesc = carros.map(aux => ({modelo: aux.modelo, preco: aux.preco - (aux.preco * desconto / 100)})); //utiliza o map() para ler todo o array, pega os valores de cada objeto dentro 
    //do array carros e gera um novo array carroDesc=[], declara uma variavel chamada aux, ou seja; auxiliar, dentro do array carroDesc declara um objeto com modelo: aux.modelo, ou seja, o modelo dentro do
    //array carroDesc tem o valor do objeto modelo do array carros. a variavel aux serve apenas para interligar os array's citados ou envolvidos na linha.

    let lista = "";  //declara variavel lista para acumular valores

    for(const carro of carroDesc) {  //ao enves de utilizarmos um reduce() para concatenar as informações e lançar em uma variável lista, utilizamos o for
        //para fazer isto.
        lista += `${carro.modelo} - R$: ${carro.preco.toFixed(2)}\n` 
    }

    resp.innerText = `Carros com desconto: ${desconto}%\n${"-".repeat(40)}\n${lista}`
})