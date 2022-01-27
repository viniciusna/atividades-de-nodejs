const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let produto = [];

app.use(express.static('public'))

app.get('/produto/all', (req, res) => {
    res.json(produto)
})

app.post('/produto', (req, res) => {
    produto.push(req.body)
    res.json(produto)
})

app.route('/produto/:id')
    .get( (req, res) => {
        let listFiltered = produto.filter(iten => 
                iten.id == req.params.id
            )
        res.json(listFiltered)
    })
    .delete( (req, res) => {
        let idExists = false
        produto = produto.filter(iten => {
                if (iten.id != req.params.id) {
                    return true
                }

                else {
                    idExists = true
                    return false
                }
            })

        idExists ? res.json(produto) : res.json({idNotExists: true})
    })
    .put( (req, res) => {
        let idExists = false

        produto.forEach(iten => {
            if (iten.id == req.params.id) {
                iten.nome = req.body.name
                idExists = true
            }
        })

        idExists ? res.json(produto) : res.json({idNotExists: true})
    })


app.listen(8080, () => {console.log('server started')})