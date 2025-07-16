const { z } = require('zod');

const usuarioSchema = z.object({
    primeironome :z.string().min(1, 'O nome é obrigatório'),
    email : z.string().email('Email inválido'),
    senha : z.string().min(8, 'A senha deve conter pelo menos 8 caracteres')
});

module.exports = { usuarioSchema };