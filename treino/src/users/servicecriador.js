const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioRepo = require('./repositoriocriador');
const { NotFoundError, BadRequestError, ConflictError, UnauthorizedError } = require('../utils/errors');

const buscarTodosUsuarios = async () => {
    const users = await usuarioRepo.buscarTodos();
    if (!users || users.length === 0) {
        throw new NotFoundError("Usuários não encontrados");
    }
    return users;
};

const buscarUsuarioPorId = async (id) => {
    const user = await usuarioRepo.buscarPorId(id);
    if (!user) {
        throw new NotFoundError("Usuário não existe");
    }
    return user;
};

const deletarUsuario = async (id) => {
    const resultado = await usuarioRepo.deletar(id);
    if (resultado.deletedCount === 0) {
        throw new NotFoundError("Usuário não existe");
    }
    return true;
};

const criarUsuario = async (dados) => {
    const { primeironome, email, senha } = dados;
    const duplicado = await usuarioRepo.buscar({ email });
    if (duplicado) {
        throw new ConflictError('Usuário já existente');
    }
    
    const senhacrypt = await bcrypt.hash(senha, 10);
    const user = await usuarioRepo.criar({
        primeironome,
        email,
        senha: senhacrypt
    });
    return user;
};

const atualizarUsuario = async (id, dados) => {
    const { primeironome, email, senha } = dados;
    const user = await usuarioRepo.buscarPorId(id);
    if (!user) {
        throw new NotFoundError("Usuário não existe");
    }

    let senhaAtualizada = user.senha;
    if (senha) {
        senhaAtualizada = await bcrypt.hash(senha, 10);
    }

    const usuarioAtualizado = await usuarioRepo.atualizar(id, {
        primeironome: primeironome || user.primeironome,
        email: email || user.email,
        senha: senhaAtualizada
    });
    return usuarioAtualizado;
};

const fazerLogin = async (dados) => {
    const { email, senha } = dados;
    if (!email || !senha) {
        throw new BadRequestError('Email e senha são necessários');
    }

    const encontrarUser = await usuarioRepo.buscar({ email });
    if (!encontrarUser) {
        throw new NotFoundError('Usuário não existe');
    }

    const senhaCorreta = await bcrypt.compare(senha, encontrarUser.senha);
    if (!senhaCorreta) {
        throw new UnauthorizedError('Senha incorreta');
    }

    const token = jwt.sign(
        {
            id: encontrarUser._id,
            primeironome: encontrarUser.primeironome
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token, usuario: encontrarUser };
};

module.exports = {
    buscarTodosUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    buscarUsuarioPorId,
    fazerLogin
};
