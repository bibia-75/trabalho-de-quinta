console.log("Nuvem Doce carregado!");

let carrinho = [];

const produtos = [
    ["Bolo de Chocolate de Pote", 15],
    ["Bolo de Cenoura com Cobertura", 15],
    ["Bolo Red Velvet", 15],
    ["Bolo de Baunilha com Morango", 15],
    ["Cupcake Chocolate", 6],
    ["Cupcake Baunilha com Calda", 5.50],
    ["Cupcake Morango", 6.50],
    ["Cupcake Cenoura", 6]
];

document.addEventListener("DOMContentLoaded", function(){
    const itens = document.querySelectorAll(".menu-lista li");

    itens.forEach(function(item, index){
        const botao = document.createElement("button");
        botao.innerText = "+ Adicionar";

        botao.onclick = function(){
            adicionarCarrinho(produtos[index][0], produtos[index][1], botao);
        };

        item.appendChild(botao);
    });
});

function abrirCarrinho(){
    document.getElementById("modalCarrinho").style.display = "block";
    document.getElementById("overlayCarrinho").style.display = "block";
}

function fecharCarrinho(){
    document.getElementById("modalCarrinho").style.display = "none";
    document.getElementById("overlayCarrinho").style.display = "none";
}

function adicionarCarrinho(nome, preco, botao){
    carrinho.push({nome, preco});
    atualizarCarrinho();

    botao.classList.add("animar-botao");
    botao.innerText = "Adicionado!";

    setTimeout(function(){
        botao.classList.remove("animar-botao");
        botao.innerText = "+ Adicionar";
    }, 900);
}

function atualizarCarrinho(){
    const itensCarrinho = document.getElementById("itensCarrinho");
    itensCarrinho.innerHTML = "";

    let subtotal = 0;

    carrinho.forEach(function(item, index){
        subtotal += item.preco;

        itensCarrinho.innerHTML += `
            <div class="item-carrinho">
                <div>
                    <strong>${item.nome}</strong>
                    <p>R$ ${item.preco.toFixed(2).replace(".", ",")}</p>
                </div>

                <button class="btn-remover" onclick="removerItem(${index})">✕</button>
            </div>
        `;
    });

    if(carrinho.length === 0){
        itensCarrinho.innerHTML = `<p class="carrinho-vazio">Nenhum item no carrinho</p>`;
    }

    let entrega = carrinho.length > 0 ? 10 : 0;
    let total = subtotal + entrega;

    document.getElementById("subtotal").innerText = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;
    document.getElementById("entrega").innerText = `R$ ${entrega.toFixed(2).replace(".", ",")}`;
    document.getElementById("totalFinal").innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

function removerItem(index){
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function confirmarPedido(){
    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Pedido confirmado com sucesso!");
    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}
