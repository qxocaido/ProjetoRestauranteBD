async function listarFornecedores(){

    const resposta = await fetch(
        "http://localhost:8080/fornecedor"
    );

    const fornecedores = await resposta.json();

    const tabela =
        document.getElementById("tabelaFornecedores");

    tabela.innerHTML = "";

    fornecedores.forEach(fornecedor => {

        tabela.innerHTML += `

            <tr>

                <td>${fornecedor.nome}</td>

                <td>${fornecedor.cnpj}</td>

                <td>${fornecedor.telefone}</td>

                <td>${fornecedor.email}</td>

                <td>

                    <button onclick="editar(${fornecedor.cnpj})">
                        Editar
                    </button>

                    <button onclick="excluirFornecedor(${fornecedor.cnpj})">
                        Excluir
                    </button>

                </td>

            </tr>

        `;

    });

}

function editar(cnpj){

    window.location.href =
        "fornecedor-editar.html?cnpj=" + cnpj;

}

function excluirFornecedor(cnpj){

    window.location.href =
        "fornecedor-excluir.html?cnpj=" + cnpj;

}

listarFornecedores();