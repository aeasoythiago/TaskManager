const { z } = require('zod');

const tarefasSchema = z.object({
    titulo : z.string().min(1, 'O título é obrigatório'),
    descricao : z.string().optional(),
    status : z.enum(['Pendente', 'Andamento', 'Concluido'], {
        errorMap: () => ({ message: 'Status deve ser Pendente, Andamento ou Concluido' })
    }),
    prioridade : z.enum(['Baixa', 'Media', 'Alta'], {
        errorMap: () => ({ message: 'Prioridade deve ser Baixa, Media ou Alta' })
    }),
    data : z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof String) {
            return new Date(arg);
        }
        return arg;
    }, z.date().optional().default(() => new Date()))
});

module.exports = { tarefasSchema }; 