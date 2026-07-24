const parametros = new URLSearchParams(window.location.search);

const cnpj = parametros.get("cnpj");

async function carregarFornecedor(){

    const resposta = await fetch(

        "http://localhost:8080/fornecedor?cnpj=" + cnpj

    );

    const fornecedor = await resposta.json();

    document.getElementById("nome").value =
        fornecedor.nome;

    document.getElementById("cnpj").value =
        fornecedor.cnpj;

    document.getElementById("telefone").value =
        fornecedor.telefone;

    document.getElementById("email").value =
        fornecedor.email;

}

carregarFornecedor();

const form = document.querySelector("form");

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const fornecedor = {

        nome: document.getElementById("nome").value,

        cnpj: Number(document.getElementById("cnpj").value),

        telefone: document.getElementById("telefone").value,


    };

    const resposta = await fetch(

        "http://localhost:8080/fornecedor?cnpj=" + cnpj,

        {

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(fornecedor)

        }

    );

    if(resposta.ok){

        alert("Fornecedor atualizado!");

        window.location.href =
            "fornecedores-listar.html";

    }

});