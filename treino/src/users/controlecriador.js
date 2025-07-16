const usuarioService = require('./servicecriador');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');


const buscarUsuario = async (req, res) => {
    const users = await usuarioService.buscarTodosUsuarios();
    res.status(200).json(users);
};

const lidarNovoUsuario = async (req, res) => {
    const user = await usuarioService.criarUsuario(req.body);
    res.status(200).json({ message: `Novo usuário ${user.primeironome} criado.` });
};

const alterarUsuarioId = async (req, res) => {
    const usuarioAtualizado = await usuarioService.atualizarUsuario(req.params.id, req.body);
    res.status(200).json({
        message: "Usuário atualizado com sucesso",
        usuario: usuarioAtualizado
    });
};

const deletarUsuarioId = async (req, res) => {
    await usuarioService.deletarUsuario(req.params.id);
    res.status(200).json({ message: "Usuário deletado com sucesso" });
};

const buscarPorId = async (req, res) => {
    const user = await usuarioService.buscarUsuarioPorId(req.params.id);
    res.status(200).json(user);
};

const verificarlogin = async (req, res) => {
    const { token, usuario } = await usuarioService.fazerLogin(req.body);
    res.json({
        message: 'Usuário logado com sucesso',
        token,
        usuario
    });
};

module.exports = {
    buscarUsuario,
    lidarNovoUsuario,
    deletarUsuarioId,
    buscarPorId,
    verificarlogin,
    alterarUsuarioId
};


