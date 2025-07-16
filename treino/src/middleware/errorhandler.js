const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Se for um erro personalizado, usa o status code dele
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            erro: err.message
        });
    }

    // Erro padrão
    res.status(500).json({
        message: err.message || 'Erro interno do servidor'
    });
};

module.exports = errorHandler;