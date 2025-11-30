const express = require("express")
const app = express()

// CORREÇÃO 1: Permite que o Render escolha a porta. 
// Se não houver porta definida (no seu PC), usa a 3333.
const porta = process.env.PORT || 3333

// CORREÇÃO 2: Cria uma rota raiz para não dar erro "Cannot GET"
app.get('/', (req, res) => {
    res.send('Olá! O servidor está rodando corretamente no Render! 🚀')
})

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.listen(porta, mostraPorta)