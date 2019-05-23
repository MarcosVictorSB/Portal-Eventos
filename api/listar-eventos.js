var navCurso = $("#nav-cursos");

$(function() {
    listarCategoriasEventos();
});


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
