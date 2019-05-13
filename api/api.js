var url = 'https://servicos.conveniar.com.br/autenticacao/api/eventos/oauth/token';
const username = '155';
const password = 'goto';
var Auth_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNTUiLCJqdGkiOiIyYmYzZjE1MC1kNmI3LTQyZTctOTg2MC1kYzg2MTBiZTkyYzMiLCJuYW1lSWQiOiIxNTUiLCJ0eXBlVXNlciI6IlJlc291cmNlQXBpIiwicm9sZSI6IkV2ZW50b3MiLCJ1c3VhcmlvIjoiMTU1IiwiZXhwIjoxNTU3Nzg1MTMzLCJpc3MiOiJodHRwOi8vc2Vydmljb3MuY29udmVuaWFyLmNvbS5icjo1MDcxNyIsImF1ZCI6IlJlc291cmNlQXBpIn0.MkQmvWw7OucBsNfMcygQkk_dVEM_k7ACcaGp1gCT3pg";

axios.defaults.baseURL = 'https://servicos.conveniar.com.br/';
axios.defaults.headers.common['Authorization'] = Auth_Token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var navCurso = $("#nav-cursos");

var inicioCard = $(".card.mt-3");
//var cardHeader = $(".card-header");
//var cardBody = $(".card-body");
var tabelaHeader = $("<table class=\"table table-sm\">" +"<thead>\n" + "<tr>\n" + "<th scope=\"col\"></th>\n" +
    "<th scope=\"col\">Nomes dos Cursos em Ofertas</th>\n" + "<th scope=\"col\" class=\"\">Data fim inscrição</th>\n" +
    "</tr>\n" + "</thead>");

var tabelaBody = $("<tbody>\n" + "<tr>\n" +"<th scope=\"row\"><a href=\"dados-do-curso.html\"><i class=\"fas fa-edit\"></i></a></th>\n" +
    "<td scope=\"row\" id=\"nomeEvento\"></td>\n" +"<td scope=\"row\" id=\"dataLimiteInscricao\"></td>\n" +
    "</tr>\n" +
    "</tbody>");

var linhaNomeEvento = $("#nomeEvento");


$(function() {
    autentificar();
    listarCategoriasEventos();
});

function autentificar() {
    axios.get(url, {
        auth: {
            username: username,
        password: password
    }
    }).then(function (resp) {
        if (resp.status === 401){
            //console.log("Error");
        }else {
           // console.log("Acessando");
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
                    novoCardBodyNomeEvento(card, e.NomeEvento, e.NumeroVagas);

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
                                        <th scope="col">Numero de Vagas</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    
                                    </tbody>
                                </table>
                            </div>`);

    navCurso.append(card);
    return card;
}

function novoCardBodyNomeEvento(card, NomeEvento, NumeroVagas) {
    var cardTableBody = $(`.card-body`, card);
    cardTableBody.append(` <tr>
                                <th scope="row"><i class="fas fa-edit"></i></th>
                                <td scope="row">${NomeEvento}</td>
                                <td scope="row"></td>
                           </tr>`);
}