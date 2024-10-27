class CustomError extends Error {
    constructor(message, statusCode, originError) {
        super(message)
        this.statusCode = statusCode
        this.name = this.constructor.name
        this.originError = originError
        Error.captureStackTrace(this, this.constructor)
    }
}

class NotFoundError extends CustomError {
    constructor(message = 'Not Found', originError){
        super(message, 404, originError)
    }
}

class InternalServerError extends CustomError {
    constructor(message = 'Internal Server Error', originError){
        super(message, 500, originError)
    }
}

export {
    CustomError,
    NotFoundError,
    InternalServerError
}