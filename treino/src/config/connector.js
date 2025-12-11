const mongoose = require('mongoose');
require('dotenv').config();

const ligar = async () => {
    try {
        let dbURI = process.env.MONGO_URI;
        if (!dbURI) {
            dbURI = `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@ttserver.gkubuda.mongodb.net/?retryWrites=true&w=majority&appName=TTSERVER`;
        }
        await mongoose.connect(dbURI);
        console.log("Servidor conectado com sucesso (URI: " + (process.env.MONGO_URI ? "Docker/Local" : "Atlas/Nuvem") + ").\n");
    } catch (error) {
        console.log("Erro ao conectar com o banco de dados:", error.message);
    }
}

module.exports = { ligar };