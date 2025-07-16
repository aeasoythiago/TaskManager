const tarefa = require('./tarefas');

const buscarTodos = async (dado) => {
    return await tarefa.find(dado);
};

const buscar = async (dado) => {
    return await tarefa.findOne(dado);
};

const buscarPorId = async (id) => {
    return await tarefa.findById(id);
};

const deletar = async (id) => {
    return await tarefa.deleteOne({ _id: id });
};

const atualizarTarefa = async (id, dados) => {
    return await tarefa.findByIdAndUpdate(id, dados, { new: true });
};

const criarTarefa = async (dados) => {
    return await tarefa.create(dados);
};

module.exports = {
    buscar,
    buscarTodos,
    buscarPorId,
    atualizarTarefa,
    deletar,
    criarTarefa
};