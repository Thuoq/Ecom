const HTTP_STATUS = require('./http-status');
class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = HTTP_STATUS.CONFLICT.reason, statusCode = HTTP_STATUS.CONFLICT.status) {
        super(message, statusCode);
    }
}
class BadRequestError extends ErrorResponse {
    constructor(
        message = HTTP_STATUS.BAD_REQUEST.reason,
        statusCode = HTTP_STATUS.BAD_REQUEST.status
    ) {
        super(message, statusCode);
    }
}
module.exports = {
    ConflictRequestError,
    BadRequestError
};