const tabela = document.getElementById("tabelaIngredientes");

async function listarIngredientes() {

    try {

        const resposta = await fetch(
            "http://localhost:8080/ingredientes/listar"
        );

        if (!resposta.ok) {

            throw new Error("Erro ao listar ingredientes");

        }

        const ingredientes = await resposta.json();

        tabela.innerHTML = "";

        ingredientes.forEach(ingredientes => {

            tabela.innerHTML += `

                <tr>

                    <td>${ingredientes.nome}</td>

                    <td>R$ ${ingredientes.valor.toFixed(2)}</td>

                    <td>

                        ${ingredientes.disponibilidade
                            ? "Disponível"
                            : "Indisponível"}

                    </td>

                    <td>

                        ${ingredientes.fornecedor.nome}

                    </td>

                    <td>

                        <button onclick="editar('${ingredientes.nome}')">

                            Editar

                        </button>

                        <button onclick="excluirIngrediente('${ingredientes.nome}')">

                            Excluir

                        </button>

                    </td>

                </tr>

            `;

        });

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar ingredientes.");

    }

}

function editar(nome){

    window.location.href =
        "ingredientesEditar.html?nome=" +
        encodeURIComponent(nome);

}

function excluirIngrediente(nome){

    window.location.href =
        "ingredientesExcluir.html?nome=" +
        encodeURIComponent(nome);

}

listarIngredientes();