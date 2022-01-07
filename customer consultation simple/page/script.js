function search() {
    document.getElementById("list-search").innerHTML = ""
    document.getElementById("response").innerHTML = ""

    let idSearch = document.getElementById("id").value
    let nameSearch = document.getElementById("name").value
    let emailSearch = document.getElementById("email").value

    if ( idSearch == '' && nameSearch == '' && emailSearch == '' ) {
        return document.getElementById("response").innerHTML = "Preencha algum(s) dos campos para fazer a consulta"
    }

    if ( idSearch == '' ) {
        idSearch = 'a'
    }

    if ( nameSearch == '' ) {
        nameSearch = 0
    }

    if ( emailSearch == '' ) {
        emailSearch = 0
    }

    fetch(idSearch + "/" + nameSearch + "/" + emailSearch).then( function(response) {
      return response.json()
    }).then( function(data) {
      console.log(data)

      if ( data.at(-1).searchError ) {
        document.getElementById("response").innerHTML = data[0].msg
      }

      else {
        data.pop()
        document.getElementById("list-search").innerHTML = "<tr> <td> ID </td> <td> Nome </td> <td> Email </td> <tr/>"

        data.forEach(element => {
        document.getElementById("list-search").innerHTML += `<tr> <td> ${element.id} </td> <td> ${element.name} </td> <td> ${element.email} </td> <tr/>`
      });
      }

    })
  }