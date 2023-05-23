class customAPIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (massage, statusCode) => {
    return new customAPIError(massage, statusCode) 
}

module.exports = {createCustomError, customAPIError}