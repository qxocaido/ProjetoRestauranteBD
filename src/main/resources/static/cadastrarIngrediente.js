const form = document.getElementById("formIngrediente");
const selectFornecedor = document.getElementById("fornecedor");

// Carrega os fornecedores no select
async function carregarFornecedores() {

    try {

        const resposta = await fetch("http://localhost:8080/fornecedor/listar");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar fornecedores");
        }

        const fornecedores = await resposta.json();

        selectFornecedor.innerHTML = "";

        fornecedores.forEach(fornecedor => {

            const option = document.createElement("option");

            option.value = fornecedor.id;
            option.textContent = fornecedor.nome;

            selectFornecedor.appendChild(option);

        });

    } catch (erro) {

        console.error(erro);
        alert("Não foi possível carregar os fornecedores.");

    }

}

carregarFornecedores();

// Cadastro
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const ingrediente = {

        nome: document.getElementById("nome").value,

        valor: Number(document.getElementById("valor").value),

        disponibilidade:
            document.getElementById("disponibilidade").value === "true",

        fornecedor: {
            id: Number(selectFornecedor.value)
        }

    };

    try {

        const resposta = await fetch(
            "http://localhost:8080/ingredientes",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(ingrediente)

            }
        );

        if (resposta.ok) {

            alert("Ingrediente cadastrado!");

            window.location.href = "ingredientesListar.html";

        } else {

            alert("Erro ao cadastrar ingrediente.");

        }

    } catch (erro) {

        console.error(erro);
        alert("Erro ao conectar com o servidor.");

    }

});