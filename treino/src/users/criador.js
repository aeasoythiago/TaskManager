const mongoose = require('mongoose');

const novoUsuario = new mongoose.Schema({
    primeironome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
        minlength: 8,
    }
})

const Usuariomodelo = mongoose.model('usuario', novoUsuario);

module.exports = Usuariomodelo;