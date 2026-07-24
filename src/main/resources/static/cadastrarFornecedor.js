const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fornecedor = {

        nome: document.getElementById("nome").value,

        telefone: Number(document.getElementById("telefone").value),

        cnpj: Number(document.getElementById("cnpj").value)

    };

    try{

        const resposta = await fetch("http://localhost:8080/fornecedor",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(fornecedor)

        });

        if(resposta.ok){

            alert("Fornecedor cadastrado!");

            window.location.href="fornecedores-listar.html";

        }else{

            alert("Erro: " + resposta.status);

        }

    }catch(erro){

        console.error(erro);

    }

});

console.log(fornecdor);