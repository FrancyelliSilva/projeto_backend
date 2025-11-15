const express = require("express")
const router = express.Router()

const app = express ()
const porta = 3333

function mostraMulher(resquest, response) {
    response.json({
        nome: 'Francyelli Silva',
        imagem: 'https://avatars.githubusercontent.com/u/127361802?v=4',
        minibio: 'Desenvolvedora FullStack'
    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)