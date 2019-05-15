var url = 'https://servicos.conveniar.com.br/autenticacao/api/eventos/oauth/token';
const username = '155';
const password = 'goto';
var Auth_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNTUiLCJqdGkiOiJjNmFjNDU3Yy1hZjU5LTQ0NzMtOGQxYS1lYTUwZmEzNDQxZmMiLCJuYW1lSWQiOiIxNTUiLCJ0eXBlVXNlciI6IlJlc291cmNlQXBpIiwicm9sZSI6IkV2ZW50b3MiLCJ1c3VhcmlvIjoiMTU1IiwiZXhwIjoxNTU3OTMyNDA1LCJpc3MiOiJodHRwOi8vc2Vydmljb3MuY29udmVuaWFyLmNvbS5icjo1MDcxNyIsImF1ZCI6IlJlc291cmNlQXBpIn0.XjcEq5exGKPjxgfCZdeSk0UTLJaKDwBOAsquhsMG7fs";

axios.defaults.baseURL = 'https://servicos.conveniar.com.br/';
axios.defaults.headers.common['Authorization'] = Auth_Token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var navCurso = $("#nav-cursos");

$(function() {
    autentificar();
    listarCategoriasEventos();
    cadastroPessoa();
});

function autentificar() {
    axios.get(url, {
        auth: {
            username: username,
            password: password
    }
    }).then(function (resp) {
        if (resp.status === 401){

        }else {

        }
    }).catch(function (error) {
        console.log('Mensagem de erro: ' + error.message);
    });
}

function listarCategoriasEventos() {
    axios.get("https://servicos.conveniar.com.br/servicos/api/eventos/categorias")
        .then(function (resp) {
            resp.data.forEach(e => {
                var card = novoCardTitulo(e.NomeEventoCategoria);
                listarEventoPorCategoria(card, e.CodEventoCategoria);
            })
        }).catch(function (error) {
            console.log("Mensagem: " + error.message);
    })
}

function listarEventoPorCategoria(card, CodEventoCategoria) {
    axios.get("https://servicos.conveniar.com.br/servicos/api/eventos/"+CodEventoCategoria)
        .then(function (resp) {
            resp.data.forEach(e => {
                if(e.StatusEvento === "Em oferta"){
                    novoCardBodyNomeEvento(card, e.NomeEvento, e.StatusEvento);

                }
            })
        }).catch(function (error) {
            console.log("Erro em Listar Evento por Categoria: " + error.message)
    })
}

function novoCardTitulo(NomeCategoria) {
    var card = $("<div class=\"card mt-3\"/>");
    //var cardHeader = $(`<div class="card-header" id="categoriaEvento">Area: ${NomeCategoria}</div>`);
    card.html(`<div class="card-header">Área: ${NomeCategoria}</div>
                            <div class="card-body">
                                <table class="table table-sm">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Nomes dos Cursos em Ofertas</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    
                                    </tbody>
                                </table>
                            </div>`);

    navCurso.append(card);
    return card;
}

function novoCardBodyNomeEvento(card, NomeEvento, StatusEvento) {
    var cardTableBody = $('tbody', card);
    cardTableBody.append(`<tr>
                                <th scope="row"><i class="fas fa-edit"></i></th>
                                <td scope="row">${NomeEvento}</td>
                                <td scope="row">${StatusEvento}</td>
                           </tr>`);
}

function cadastroPessoa() {
    axios.get("https://servicos.conveniar.com.br/servicos/api/eventos/cadastro/usuario/pessoa")
        .then(function (resp) {
            preencherDadosPessoais(resp.data);
            preencherNomePessoa(resp.data.Nome);
        })
        .catch(function (error) {
            console.log("Mensagem de error Castro de pessoa: " + error.message)
        })
}

function preencherDadosPessoais(DadosPessoais) {
    $("#inputNome").val(DadosPessoais.Nome);
    $("#inputEmail4").val(DadosPessoais.Email);
    $("#inputNome").val(DadosPessoais.NumRegistro);
    $("#inputNome").val(DadosPessoais.Cracha);

    if (DadosPessoais.TelefoneCelular === "") {
        if (DadosPessoais.TelefoneCasa === "") {
            if (DadosPessoais.TelefoneEmpresa === "") {
                $("#inputContato").val(DadosPessoais.TelefoneEmpresa);
            }
        } else {
            $("#inputContato").val(DadosPessoais.TelefoneCasa)
        }
    } else {
        $("#inputContato").val(DadosPessoais.TelefoneCelular);
    }

    $("#inputLogradouro").val(DadosPessoais.Endereco);
    $("#inputBairro").val(DadosPessoais.Bairro);
    $("#inputCidade").val(DadosPessoais.Cidade);
    $('#inputState option[value="default"]').text(DadosPessoais.Estado);



}

function preencherNomePessoa(Nome) {
    $("#nomeDoAluno").text(Nome);
}