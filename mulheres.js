const express = require("express") //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da porta
const cors = require('cors') //importando o cors
const conectaBancoDeDados = require('./bancoDeDados') //importando o arquivo bancoDeDados.js
conectaBancoDeDados() //chamando a função que conecta ao banco de dados

const app = express () //aqui estou iniciando o app
app.use(express.json())
app.use(cors()) //utilizando o cors
const porta = 3333 //aqui estou criando a porta

const Mulher = require('./mulherModel') //importando o arquivo mulherModel.js

//GET
async function mostraMulheres(request, response) {

    try {

        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)

    }catch (erro) {

        console.log(erro)

    }

}


//POST
async function criaMulher(request, response) {
    const novaMulher =  new Mulher({
        nome: request.body.nome,
        minibio: request.body.minibio
    })

    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    }catch(erro){
        console.log(erro)
    }
}

//PATCH
async function atualizaMulher(request, response) {

    try{
        const mulherEncontrada = await Mulher.findById(request.params.id)
         

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }

        if (request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)


    }catch(erro){
        console.log(erro)
    }

}

//DELETE
 async function deletaMulher (request, response) {
    try{
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Mulher deletada com sucesso!'})

    }catch(erro){
        console.log(erro)
    }

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