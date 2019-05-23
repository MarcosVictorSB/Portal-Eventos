const username = '155';
const password = 'goto';
var Auth_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNTUiLCJqdGkiOiI0ODZhNDdkYS1mMGIzLTQ3N2YtYTg5NC05ODJkODBhMjE1YjYiLCJuYW1lSWQiOiIxNTUiLCJ0eXBlVXNlciI6IlJlc291cmNlQXBpIiwicm9sZSI6IkV2ZW50b3MiLCJ1c3VhcmlvIjoiMTU1IiwiZXhwIjoxNTU4NjM2MTIyLCJpc3MiOiJodHRwOi8vc2Vydmljb3MuY29udmVuaWFyLmNvbS5icjo1MDcxNyIsImF1ZCI6IlJlc291cmNlQXBpIn0.cWvRrbP6rLvEEQON5J7vs_9ZJ7AQitILmCRv0481-_k";
axios.defaults.baseURL = 'https://servicos.conveniar.com.br/';
axios.defaults.headers.common['Authorization'] = Auth_Token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

$(function() {
    autentificar();
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
