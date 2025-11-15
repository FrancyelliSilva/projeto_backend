const express = require("express") //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da porta
const { v4: uuidv4 } = require('uuid')

const app = express () //aqui estou iniciando o app
app.use(express.json())
const porta = 3333 //aqui estou criando a porta

//aqui estou criando lista inicial de mulheres
const mulheres = [
    {
        id: '1',
        nome: 'Francyelli Silva',
        minibio:'Desenvolvedora FullStack'
    },
    {
        id: '2',
        nome: 'Maria Madalena da Silva',
        minibio: 'Professora'
    },
    {
        id: '3',
        nome: 'Eva Maria',
        minibio: 'Enfermeira'
    }
]

//GET
function mostraMulheres(request, response) {
    response.json(mulheres)
}
//POST
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher)

    response.json(mulheres)
}

//PATCH
function atualizaMulher(request, response) {
    function encontraMulher(mulher) {
        if (mulher.id === request.params.id) {
            return mulher
        }
    }

    const mulherEncontrada = mulheres.find(encontraMulher)

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome
    }

    if (request.body.minibio){
        mulherEncontrada.minibio = request.body.minibio
    }

    response.json(mulheres)
}

//DELETE
function deletaMulher (request, response) {
    function retornarMulheres(mulher) {
        if (mulher.id !== request.params.id) {
            return mulher
        }
    }

    const mulheresatualizadas = mulheres.filter(retornarMulheres)

    response.json(mulheresatualizadas)
}

//PORTA
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres)) //configrei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) // configurei rota POST /mulheres
app.use(router.patch('/mulheres/:id' , atualizaMulher)) //configurei rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) // configurei rota DELETE /mulheres/:id
app.listen(porta, mostraPorta)// servicodr ouvindo a porta