const parametros = new URLSearchParams(window.location.search);
const nomeOriginal = parametros.get("nome");

// 1. Função para carregar a lista de fornecedores salvos no <select>
async function carregarFornecedores() {
    try {
        const resposta = await fetch("http://localhost:8080/fornecedor");
        if (!resposta.ok) {
            console.error("Erro ao carregar lista de fornecedores");
            return;
        }

        const fornecedores = await resposta.json();
        const selectFornecedor = document.getElementById("fornecedor");

        selectFornecedor.innerHTML = `<option value="">Selecione um fornecedor...</option>`;

        fornecedores.forEach(fornecedor => {
            const option = document.createElement("option");
            option.value = fornecedor.id; // Garanta que 'id' é o nome do atributo no seu backend
            option.textContent = fornecedor.nome; // Garanta que 'nome' é o atributo com o nome do fornecedor
            selectFornecedor.appendChild(option);
        });
    } catch (erro) {
        console.error("Erro de conexão ao buscar fornecedores:", erro);
    }
}

// 2. Função para carregar os dados do ingrediente atual
async function carregarIngrediente() {
    try {
        // Primeiro aguarda os fornecedores serem carregados no <select>
        await carregarFornecedores();

        const resposta = await fetch(
            "http://localhost:8080/ingredientes?nome=" + encodeURIComponent(nomeOriginal)
        );

        if (!resposta.ok) {
            alert("Erro ao buscar dados do ingrediente.");
            return;
        }

        const ingrediente = await resposta.json();

        // Preenche os campos do formulário com os dados carregados
        document.getElementById("nome").value = ingrediente.nome || "";

        if (document.getElementById("valor") && ingrediente.valor !== undefined) {
            document.getElementById("valor").value = ingrediente.valor;
        }

        const selectDisponibilidade = document.getElementById("disponibilidade");
        if (selectDisponibilidade) {
            selectDisponibilidade.value = String(ingrediente.disponibilidade);
        }

        // Seleciona o fornecedor correto no <select> recém-preenchido
        if (ingrediente.fornecedor && ingrediente.fornecedor.id) {
            document.getElementById("fornecedor").value = ingrediente.fornecedor.id;
        }
    } catch (erro) {
        console.error("Erro ao carregar ingrediente:", erro);
    }
}

// Inicializa o carregamento da tela
carregarIngrediente();

// 3. Envio das alterações
const form = document.getElementById("formIngrediente");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const idFornecedor = document.getElementById("fornecedor").value;

        if (!idFornecedor) {
            alert("Por favor, selecione um fornecedor válido.");
            return;
        }

        const ingrediente = {
            nome: document.getElementById("nome").value,
            valor: Number(document.getElementById("valor").value),
            disponibilidade: document.getElementById("disponibilidade").value === "true",
            fornecedor: {
                id: Number(idFornecedor)
            }
        };

        try {
            const resposta = await fetch(
                "http://localhost:8080/ingredientes?nome=" + encodeURIComponent(nomeOriginal),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(ingrediente)
                }
            );

            if (resposta.ok) {
                alert("Ingrediente atualizado com sucesso!");
                window.location.href = "ingredientesListar.html";
            } else {
                alert(`Erro ao atualizar ingrediente! (Status: ${resposta.status})`);
            }
        } catch (erro) {
            console.error("Erro na requisição PUT:", erro);
            alert("Não foi possível conectar ao servidor.");
        }
    });
}