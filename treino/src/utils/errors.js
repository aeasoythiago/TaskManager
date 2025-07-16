class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Recurso não encontrado') {
        super(message, 404);
    }
}

class BadRequestError extends AppError {
    constructor(message = 'Requisição inválida') {
        super(message, 400);
    }
}

class ConflictError extends AppError {
    constructor(message = 'Conflito de dados') {
        super(message, 409);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Não autorizado') {
        super(message, 401);
    }
}

module.exports = {
    AppError,
    NotFoundError,
    BadRequestError,
    ConflictError,
    UnauthorizedError
}; 