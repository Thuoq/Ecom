const HTTP_STATUS = {
    FORBIDDEN: {
        status: 403,
        reason: 'Bad request error'
    },
    CONFLICT: {
        status: 409,
        reason: 'Conflict error'
    },
    BAD_REQUEST: {
        status: 400,
        reason: 'Bad Request'
    },
    OK: {
        status: 200,
        reason: 'Success'
    },
    CREATED: {
        status: 201,
        reason: 'Created'
    }
};

module.exports = HTTP_STATUS;