const mongoose = require('mongoose');
const criador = require('../users/criador');

const tarefasSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['Pendente', 'Andamento', 'Concluido'],
        required: true,
    },
    prioridade: {
        type: String,
        enum: ['Baixa', 'Media', 'Alta'],
        required: true,
    },
    data: {
        type: Date,
        default: Date.now,
        required: false,
    },
    criadapor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'criador',
        required: true
    }
});

const tarefaModelo = mongoose.model('tarefas', tarefasSchema);

module.exports = tarefaModelo;