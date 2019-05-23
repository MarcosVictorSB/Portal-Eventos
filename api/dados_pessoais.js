$(function() {
    listarCadastroPessoa();
    preencherDadosPessoais();
});



function listarCadastroPessoa() {
    axios.get("https://servicos.conveniar.com.br/servicos/api/eventos/cadastro/usuario/pessoa")
        .then(function (resp) {
            preencherDadosPessoais(resp.data);
            preencherNomeAluno(resp.data.Nome);
        })
        .catch(function (error) {
            console.log("Mensagem de error Castro de pessoa: " + error.message)
        })
}

function preencherNomeAluno(Nome) {
    $("#nomeDoAluno").text(Nome);
}


function preencherDadosPessoais(DadosPessoais) {
    console.log(DadosPessoais);
    $("#inputNome").val(DadosPessoais.Nome);
    $("#inputEmail4").val(DadosPessoais.Email);

    $("#inputContato").val(verificarQualTelefoneEstaPreenchido(DadosPessoais));

    $("#inputLogradouro").val(DadosPessoais.Endereco);
    $("#inputBairro").val(DadosPessoais.Bairro);
    $("#inputCidade").val(DadosPessoais.Cidade);
    $('#inputState option[value="default"]').text(DadosPessoais.Estado);
}

function verificarQualTelefoneEstaPreenchido(DadosPessoais) {
    if (DadosPessoais.TelefoneCelular !== "") {
        return DadosPessoais.TelefoneCelular;
    }
    if (DadosPessoais.TelefoneCasa !== "") {
        return DadosPessoais.TelefoneCasa;
    }
    if (DadosPessoais.TelefoneEmpresa === "") {
        return "Vazio";
    }else{
        return DadosPessoais.TelefoneEmpresa;
    }
}
