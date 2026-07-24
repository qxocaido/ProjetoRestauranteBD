const parametros = new URLSearchParams(window.location.search);

const cnpj = parametros.get("cnpj");

async function carregarFornecedor(){

    const resposta = await fetch(

        "http://localhost:8080/fornecedor?cnpj=" + cnpj

    );

    const fornecedor = await resposta.json();

    document.getElementById("nome").textContent =
        fornecedor.nome;

    document.getElementById("cnpj").textContent =
        fornecedor.cnpj;

    document.getElementById("telefone").textContent =
        fornecedor.telefone;

    document.getElementById("email").textContent =
        fornecedor.email;

}

carregarFornecedor();

async function excluir(){

    const resposta = await fetch(

        "http://localhost:8080/fornecedor?cnpj=" + cnpj,

        {

            method:"DELETE"

        }

    );

    if(resposta.ok){

        alert("Fornecedor excluído!");

        window.location.href =
            "fornecedores-listar.html";

    }else{

        alert("Erro ao excluir.");

    }

}