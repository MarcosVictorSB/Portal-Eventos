const username = '155';
const password = 'goto';
var Auth_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNTUiLCJqdGkiOiJlZTRmYzQ5MC1kOGQ2LTRjNTgtYjE5Yi05MWNkMzc0NDE1NjAiLCJuYW1lSWQiOiIxNTUiLCJ0eXBlVXNlciI6IlJlc291cmNlQXBpIiwicm9sZSI6IkV2ZW50b3MiLCJ1c3VhcmlvIjoiMTU1IiwiZXhwIjoxNTU4MDMyMDA4LCJpc3MiOiJodHRwOi8vc2Vydmljb3MuY29udmVuaWFyLmNvbS5icjo1MDcxNyIsImF1ZCI6IlJlc291cmNlQXBpIn0.9SwTTNn-3jvMH2SQL3tBsbEd_w9Sy6eflWeWBH7Humk";
axios.defaults.baseURL = 'https://servicos.conveniar.com.br/';
axios.defaults.headers.common['Authorization'] = Auth_Token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var navCurso = $("#nav-cursos");

$(function() {
    autentificar();
    listarCategoriasEventos();
    listarCadastroPessoa();
});

function autentificar() {
    axios.get("https://servicos.conveniar.com.br/autenticacao/api/eventos/oauth/token", {
        auth: {
            username: username,
            password: password
        }
    }).then(function (resp) {
        localStorage.setItem('token', resp.data.AccessToken);
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
        }).catch(function (resp) {
        console.log(resp);
    })
}

function listarEventoPorCategoria(card, CodEventoCategoria) {
    axios.get("https://servicos.conveniar.com.br/servicos/api/eventos/"+CodEventoCategoria)
        .then(function (resp) {
            resp.data.forEach(e => {
                if(e.StatusEvento === "Em oferta"){
                    novoCardBodyNomeEvento(card, e.NomeEvento, e.StatusEvento, e.CodEvento);

                }
            })
        }).catch(function (error) {
        console.log("Erro em Listar Evento por Categoria: " + error.message)
    })
}

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

function novoCardBodyNomeEvento(card, NomeEvento, StatusEvento, CodEvento) {
    var cardTableBody = $('tbody', card);
    cardTableBody.append(`<tr>
                                <th scope="row"><a href="dados-do-curso.html${CodEvento}"><i class="fas fa-edit"></i></a></th>
                                <td scope="row">${NomeEvento}</td>
                                <td scope="row">${StatusEvento}</td>
                           </tr>`);
}

function preencherDadosPessoais(DadosPessoais) {
    $("#inputNome").val(DadosPessoais.Nome);
    $("#inputEmail4").val(DadosPessoais.Email);
    //$("#inputNome").val(DadosPessoais.NumRegistro);
    //$("#inputNome").val(DadosPessoais.Cracha);

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

function preencherNomeAluno(Nome) {
    $("#nomeDoAluno").text(Nome);
}