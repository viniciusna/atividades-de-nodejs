const express = require('express')
const app = express()
const bodyParser = require("body-parser");

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const clients = [
  {"id": 1,
  "name": "Vinicius Almeida",
  "email" : "vinicius@email.com"},

  {"id": 2,
  "name": "Davi Almeida",
  "email" : "davi@email.com"},

  {"id": 3,
  "name": "Vinicius de Moraes",
  "email" : "vini123@ggemail.com"},

  {"id": 4,
  "name": "Luana Souza",
  "email" : "luce@ggemail.com"},

  {"id": 5,
  "name": "Victor Campos",
  "email" : "vi123@email.com"},
    
  {"id": 6,
  "name": "Luiz Gustavo",
  "email" : "luiz@ggemail.com"},
    
  {"id": 7,
  "name": "Felipe de Souza",
  "email" : "souzafelipe@email.com"},
    
  {"id": 8,
  "name": "Fernando Fernandes",
  "email" : "fefe10@ggemail.com"},
    
  {"id": 9,
  "name": "Rodrigo Itália",
  "email" : "rodrigo@ggemail.com"},
  
  {"id": 10,
  "name": "Pedro João",
  "email" : "pedro123@email.com"},
]

app.use(express.static('page'))

app.get('/clients', function (req, res) {

  let searchClients = clients.slice()
  const paramSearch = req.query.find

  switch (paramSearch) {
    case "name" : searchClients = searchClients.filter( element =>
      element.name.toLowerCase().includes( req.query.name.toLowerCase() ) );
    break;

    case "email" : searchClients = searchClients.filter( element =>
      element.email.toLowerCase().includes( req.query.email.toLowerCase() ) );
    break;

    case "id" : searchClients = searchClients.filter( element =>
      element.id == req.query.id );
    break;
  }
  
  if ( searchClients.length === 0 ) {
    const alert = ["Cliente não encontrado", true]  
    res.send(alert)
  }

  else {
    searchClients.push(false)
    res.send(searchClients)
  }

})

app.post('/register', function(req, res) {
  res.sendStatus(201);
  req.body.id = clients.at(-1).id + 1
  clients.push(req.body)
  console.log(clients)
})

app.delete('/delete', function(req, res) {
  let id = req.body.idToDelete
  let idExists = false

  clients.forEach( (client, index) => {
    if ( client.id == id) {
      idExists = true
      clients.splice(index, 1)
    }
  })

  idExists ? res.sendStatus(202) : res.sendStatus(409);
  console.log(clients)
})

app.listen(3000, () => {
  console.log('server started');
});