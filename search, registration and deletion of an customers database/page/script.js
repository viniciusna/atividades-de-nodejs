const input = document.getElementById('search-input');
const select = document.querySelector('select');
const response = document.getElementById('response');
const registerName = document.getElementById('register-input-name');
const registerEmail = document.getElementById('register-input-email');
const idDelete = document.getElementById('id-delete')

input.addEventListener('input', updateValue);
select.addEventListener('change', updateInput);

let receipt = 0
let inputValueDigited = ''

function callFetch() {

  document.getElementById("response").innerHTML = ''
  document.getElementById("list-search").innerHTML = ''

  if ( select.value !== "id" && input.value.length < 3 ) {
    return document.getElementById("response").innerHTML = "Digite pelo menos 3 letras"
  }

  else if ( select.value === "id" && input.value.length === 0 ) {
    return
  }

  fetch( "clients?find=" + select.value + "&" + select.value + "=" + inputValueDigited)
  .then( function(response) {
    return response.json()
    })
    .then( function(data) {

      if ( data.at(-1) ) {
        return document.getElementById("response").innerHTML = data[0]
      }

      else {
        data.pop()
      }

    document.getElementById("list-search").innerHTML = "<tr> <td> ID </td> <td> Nome </td> <td> Email </td> <tr/>"

    data.forEach(element => {
      document.getElementById("list-search").innerHTML += `<tr> <td> ${element.id}  </td> <td> ${element.name} </td> <td> ${element.email} </td> <tr/>`
    })
  })
  .catch( err => console.log(err))
}

function register() {
  let name = document.getElementById("register-input-name").value
  const email = document.getElementById("register-input-email").value

  if ( name === "" || email === "" ) {
    document.getElementById("list-search").innerHTML = ''
    return response.innerHTML = 'Preencha Nome e Email para fazer um novo cadastro'
  }

  let nameArray = name.split(" ")

  nameArray = nameArray.map( word => {
    const lower = word.toLowerCase();
    const firstLetter = lower.slice(0,1);
    word = lower.replace(firstLetter,firstLetter.toUpperCase());
    return word
  })

  name = nameArray.join(" ")

  const options = {
    method: 'POST',
    body: JSON.stringify({ name, email}),
    headers: { 'Content-Type': 'application/json' }
  }

  fetch('/register', options)
  .then( response => response.text())
  .then( data => {
    console.log(data);
    response.innerHTML = 'Novo funcionário cadastrado'
    registerName.value = ''
    registerEmail.value = ''
    document.getElementById("list-search").innerHTML = ''
  })
  .catch( err => console.log(err))
}

function deleteClient() {
  let idToDelete = idDelete.value
  const options = {
    method: 'DELETE',
    body: JSON.stringify({idToDelete}),
    headers: { 'Content-Type': 'application/json' }
  }

  fetch('/delete', options)
  .then( response => response.text())
  .then( data => {
    console.log(data)
    data === "Accepted" ? response.innerHTML = 'Cadastro deletado' : response.innerHTML = 'ID não existe'
    document.getElementById("list-search").innerHTML = ''
  })
  .catch( err => console.log(err))
}

function updateValue(inputValue) {
  if (inputValue.target.value.length > 2 ) {
    inputValueDigited = inputValue.target.value
    clearTimeout(receipt)
    receipt = setTimeout(() => {callFetch()}, 2000)
  }

  else if ( select.value === "id" ) {
    inputValueDigited = inputValue.target.value
    clearTimeout(receipt)
    receipt = setTimeout(() => {callFetch()}, 2000)
  }
}

function updateInput(optionSelect) {
  input.value = ''

  if ( optionSelect.target.value === "id") {
    input.type = "number"
  }
    
  else {
    input.type = "text"
  }
}