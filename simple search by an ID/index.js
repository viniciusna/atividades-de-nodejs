var express = require('express')
var app = express()

const produto = [
{
"id": 1,
"nome": "Produto A"
},
{
"id": 3,
"nome": "Produto B"
},
{
"id": 6,
"nome": "Produto C"
},
{
"id": 3,
"nome": "Produto D"
}]

app.get('/', function (req, res) {

  res.send(`<!DOCTYPE html>

  <html>

  <head>
      <title>Consulta por ID</title>
  </head>

  <body>
      <input type="number" id="id">
      <button onclick="search()">Consultar</button>
      <div id="response"></div>
  </body>
  <script>
    function search() {
      const idSearch = document.getElementById("id").value
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        console.log(this.responseText)
        document.getElementById("response").innerHTML = this.responseText;
        }
      xhttp.open("GET", idSearch, true);
      xhttp.send();
    }
  </script>
  </html>`)
})

app.get('/:id', function (req, res) {

      if ( !Number.isInteger( parseFloat(req.params.id) ) ) {
        res.send("A ID deve ser um número inteiro")
      }

      else {
        let list = produto.filter( element =>
          element.id == req.params.id )

        if ( list.length == 0 ) {
          res.send("Produto não encontrado, não existe produto com essa ID")
        }

        else {
          let searchResult = ''

          list.forEach(element => {
            searchResult += ( element.nome + "<br>" )
          });
  
          res.send(searchResult)
        }
      }
})

app.listen(8080)
