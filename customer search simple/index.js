var express = require('express')
var app = express()

const clients = [
  {"id": 1,
  "name": "Vinicius",
  "email" : "vinicius@email.com"},

  {"id": 2,
  "name": "Davi",
  "email" : "davi@email.com"},

  {"id": 3,
  "name": "Vinicius",
  "email" : "vini123@ggemail.com"},

  {"id": 4,
  "name": "Luana",
  "email" : "luce@ggemail.com"},
]

app.use(express.static('/home/viniuser/consulta-clientes/page'))

app.get('/:id/:name/:email', function (req, res) {

  let searchClients = clients.slice()

  if ( req.params.id != 'a' ) {
    if ( !Number.isInteger( parseFloat(req.params.id) ) ) {
      res.send([ {msg : "A ID deve ser um número inteiro"}, {searchError : true} ])
    }

    else {
        searchClients = searchClients.filter( element =>
        element.id == req.params.id )

        if ( searchClients.length == 0 ) {
          res.send([ {msg : "Cliente não encontrado, não existe cliente com essa ID"}, {searchError : true} ])
        }

        else {
          searchClients.push({searchError:false})
          return res.send(searchClients)}
    }
  }

  if ( req.params.name != 0 ) {
      searchClients = searchClients.filter( element =>
        (element.name).toLowerCase().indexOf((req.params.name).toLowerCase()) > -1
      )
  }

  if ( req.params.email != 0 ) {
      searchClients = searchClients.filter( element =>
        (element.email).toLowerCase().indexOf((req.params.email).toLowerCase()) > -1
      )
  }

  if ( searchClients.length == 0 ) {
    res.send([ {msg : "Cliente não encontrado"}, {searchError : true} ])
  }

  else {
    searchClients.push({searchError:false})
    res.send(searchClients)
  }

})

app.listen(8080)
