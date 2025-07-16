const express = require('express');
const rota = express.Router();
const validador = require('../utils/validador');
const novoUsuario = require('./controlecriador');
const { verificarToken } = require('../middleware/auth');
const { usuarioSchema } = require('./validarusuario');


// Rotas públicas (não precisam de autenticação)
rota.post('/criarusuario', validador(usuarioSchema), novoUsuario.lidarNovoUsuario);
rota.post('/login', novoUsuario.verificarlogin);

// Rotas protegidas (precisam de autenticação)
// Rotas protegidas(Usuário)
rota.get('/listarusuario', verificarToken,novoUsuario.buscarUsuario);
rota.get('/listarporid/:id', verificarToken, novoUsuario.buscarPorId);
rota.put('/atualizar/:id', verificarToken, novoUsuario.alterarUsuarioId);
rota.delete('/deletar/:id', verificarToken, novoUsuario.deletarUsuarioId);


module.exports = rota;