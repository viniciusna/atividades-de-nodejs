const input = document.querySelector('input');
const select = document.querySelector('select');
const response = document.getElementById('response');

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

  fetch( "clients?find=" + select.value + "&" + select.value + "=" + inputValueDigited).then( function(response) {
    return response.json()
    })
    .then( function(data) {

      if ( data.at(-1) ) {
        return document.getElementById("response").innerHTML = data[0]
      }

      else {
        data.pop()
      }
        
    document.getElementById("list-search").innerHTML = "<tr> <td> ID </td> <td>   Nome </td> <td> Email </td> <tr/>"

    data.forEach(element => {
      document.getElementById("list-search").innerHTML += `<tr> <td> ${element.id}  </td> <td> ${element.name} </td> <td> ${element.email} </td> <tr/>`
    })
  })
}

function updateValue(e) {
  if (e.target.value.length > 2 ) {
    inputValueDigited = e.target.value
    clearTimeout(receipt)
    receipt = setTimeout(() => {callFetch()}, 2000)
  }

  else if ( select.value === "id" ) {
    inputValueDigited = e.target.value
    clearTimeout(receipt)
    receipt = setTimeout(() => {callFetch()}, 2000)
  }
}

function updateInput(e) {
	input.value = ''

	if ( e.target.value === "id") {
    input.type = "number"
  }
    
  else {
    input.type = "text"
  }
}