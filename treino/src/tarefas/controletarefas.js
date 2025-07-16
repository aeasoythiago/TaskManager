const tarefasService = require('./servicetarefas');

const criarTarefa = async (req, res) => {


    const novaTarefa = await tarefasService.criarTarefa({
        ...req.body,
        criadapor: req.usuario.id
    });
    res.status(200).json({ message: 'Nova tarefa criada com sucesso', tarefa: novaTarefa });
};

const listarTarefas = async (req, res) => {
    const tarefas = await tarefasService.buscarTarefasPorUsuario(req.usuario.id);
    res.status(200).json(tarefas);
};

const deletarTarefa = async (req, res) => {
    await tarefasService.deletarTarefa(req.params.id, req.usuario.id);
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
};

const alterarTarefa = async (req, res) => {
    const tarefaAtualizada = await tarefasService.atualizarTarefa(
        req.params.id,
        req.body,
        req.usuario.id
    );
    res.status(200).json({
        message: 'Tarefa atualizada com sucesso',
        tarefa: tarefaAtualizada
    });
};

module.exports = { criarTarefa, listarTarefas,deletarTarefa, alterarTarefa };