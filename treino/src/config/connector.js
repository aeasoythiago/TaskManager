const mongoose = require('mongoose');
require('dotenv').config();
    
const ligar = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@ttserver.gkubuda.mongodb.net/?retryWrites=true&w=majority&appName=TTSERVER`);
        console.log("Servidor conectado com sucesso.\n");
    } catch (error) {
            console.log("Erro ao conectar com o banco de dados.\n");
        }
    }

    module.exports = {ligar};