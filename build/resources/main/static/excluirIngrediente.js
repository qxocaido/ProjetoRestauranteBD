const parametros = new URLSearchParams(window.location.search);
const nome = parametros.get("nome");

// Preenche o nome nos elementos HTML
const elMensagem = document.getElementById("mensagem");
if (elMensagem) {
    elMensagem.innerHTML = `Deseja realmente excluir o ingrediente: <b>${nome}</b>?`;
}

const elNome = document.getElementById("nome");
if (elNome) {
    elNome.textContent = nome;
}

// Configura o clique do botão "Excluir Ingrediente"
const btnConfirmar = document.getElementById("confirmar");

if (btnConfirmar) {
    btnConfirmar.addEventListener("click", async () => {
        try {
            const resposta = await fetch(
                "http://localhost:8080/ingredientes?nome=" + encodeURIComponent(nome),
                {
                    method: "DELETE"
                }
            );

            if (resposta.ok) {
                alert("Ingrediente excluído com sucesso!");
                window.location.href = "ingredientesListar.html";
            } else {
                alert(`Erro ao excluir ingrediente! (Status: ${resposta.status})`);
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
            alert("Não foi possível conectar ao servidor backend.");
        }
    });
}