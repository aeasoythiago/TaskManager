const usuario = require('./criador');


const buscarTodos = async () => {
    return await usuario.find({});
};

const buscar = async (filtro) => {
    return await usuario.findOne(filtro);
};

const criar = async (dados) => {
    return await usuario.create(dados);
};

const buscarPorId = async (id) => {
    return await usuario.findById(id);
};

const atualizar = async (id, dados) => {
    return await usuario.findByIdAndUpdate(
        id,
        dados,
        { new: true }
    );
};

const deletar = async (id) => {
    return await usuario.deleteOne({ _id: id });
};

module.exports = {
    buscarTodos,
    buscar,
    criar,
    buscarPorId,
    atualizar,
    deletar
};
