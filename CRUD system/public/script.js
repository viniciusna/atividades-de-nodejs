const idToSearch = document.getElementById('input-search-or-delete')
const newId = document.getElementById('input-id-register')
const newName = document.getElementById('input-name-register')
const divResponse = document.getElementById('response')
const tableResult = document.getElementById('result-list')

function search() {
    divResponse.innerHTML = ''
    if ( idToSearch.value === '' ) {
        fetch('/produto/all')
        .then( response => response.json() )
        .then( data => {tableResult.innerHTML = ''
            tableResult.innerHTML = "<tr> <td> ID </td> <td> Nome do produto </td> <tr/>"

            data.forEach( iten => {
            tableResult.innerHTML += `<tr> <td> ${iten.id} </td>
            <td> ${iten.nome} </td> <tr/>`
            })
        })
    }

    else {
        fetch('/produto/' + idToSearch.value)
        .then( response => response.json() )
        .then( data => writeTable(data) )
    }
}

function del() {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }

    fetch('/produto/' + idToSearch.value, options)
    .then( response => response.json() )
    .then( data => {
        tableResult.innerHTML = ''
        data.idNotExists ? divResponse.innerHTML = "ID não existe" : writeTable(data);
    })
}

function register() {
    const id = parseInt(newId.value)
    const nome = newName.value
    const options = {
        method: 'POST',
        body: JSON.stringify({ id, nome}),
        headers: { 'Content-Type': 'application/json' }
    }

    fetch('/produto', options)
    .then( response => response.json())
    .then( (data) => {
        divResponse.innerHTML = 'Novo produto cadastrado'

        tableResult.innerHTML = ''
        tableResult.innerHTML = "<tr> <td> ID </td> <td> Nome do produto </td> <tr/>"

        data.forEach( iten => {
            tableResult.innerHTML += `<tr> <td> ${iten.id} </td>
            <td> ${iten.nome} </td> <tr/>`
        })
    })
    .catch( err => console.log(err))
}

function update() {
    const name = newName.value

    const options = {
        method: 'PUT',
        body: JSON.stringify({name}),
        headers: { 'Content-Type': 'application/json' }
    }

    fetch('/produto/' + newId.value, options)
    .then( response => response.json())
    .then( data => {
        tableResult.innerHTML = ''
        data.idNotExists ? divResponse.innerHTML = "ID não existe" : writeTable(data);
    })
    .catch( err => console.log(err))
}

function writeTable(data) {
    tableResult.innerHTML = ''

    if (data.length === 0) {
        divResponse.innerHTML = 'ID não existe'
    }

    else {
        tableResult.innerHTML = "<tr> <td> ID </td> <td> Nome do produto </td> <tr/>"

        data.forEach( iten => {
        tableResult.innerHTML += `<tr> <td> ${iten.id} </td>
        <td> ${iten.nome} </td> <tr/>`
        })
    }
}