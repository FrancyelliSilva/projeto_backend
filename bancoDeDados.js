const mongoose = require('mongoose')

async function conectaBancoDeDados(){
	try{
	    console.log('Conexão com o banco de dados iniciou')
	
	    await  mongoose.connect('mongodb+srv://francyellipereirasilva_db_user:60rZmMjbIGYtc17a@clustermulheres.o5mbhax.mongodb.net/?appName=ClusterMulheres')

	    console.log('Conexão com o banco de dados feita com sucesso!')
    } catch(erro) {
	console.log(erro)
    }
}

module.exports =  conectaBancoDeDados
		


