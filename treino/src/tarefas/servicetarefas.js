const { NotFoundError, BadRequestError, ConflictError, UnauthorizedError } = require('../utils/errors');
const tarefasRepo = require('./repositoriotarefas');

const criarTarefa = async (dados) => {
    const { titulo, descricao, status, prioridade, data, criadapor} = dados;
    const novaTarefa = await tarefasRepo.criarTarefa({
        titulo,
        descricao,
        status,
        prioridade,
        data,
        criadapor
    });
    return novaTarefa;
};

const buscarTarefasPorUsuario = async (usuarioId) => {
    const tarefas = await tarefasRepo.buscarTodos({ criadapor: usuarioId });
    if(tarefas.length === 0) {
        throw new NotFoundError('Nenhuma tarefa encontrada para este usuário');
    }
    return tarefas;
};

const deletarTarefa = async (id, usuarioId) => {
    const tarefa = await tarefasRepo.buscar({ _id: id, criadapor: usuarioId });
    if(!tarefa || tarefa.length === 0) {
        throw new NotFoundError('Tarefa não encontrada ou você não tem permissão');
    }
    const resultado = await tarefasRepo.deletar(id);
    if(resultado.deletedCount === 0){
        throw new BadRequestError('Erro ao deletar tarefa');
    }
    return true;
};

const atualizarTarefa = async (id, dados, usuarioId) => {
    const tarefaEncontrada = await tarefasRepo.buscar({ _id: id, criadapor: usuarioId });
    if(!tarefaEncontrada || tarefaEncontrada.length === 0) {
        throw new NotFoundError('Tarefa não encontrada ou você não tem permissão');
    }
    
    const { titulo, descricao, status, prioridade, data } = dados;
    const tarefaAtualizada = await tarefasRepo.atualizarTarefa(id, {
        titulo: titulo || tarefaEncontrada[0].titulo,
        descricao: descricao || tarefaEncontrada[0].descricao,
        status: status || tarefaEncontrada[0].status,
        prioridade: prioridade || tarefaEncontrada[0].prioridade,
        data: data || tarefaEncontrada[0].data
    });
    
    return tarefaAtualizada;
};

module.exports = {
    criarTarefa,
    buscarTarefasPorUsuario,
    deletarTarefa,
    atualizarTarefa
};