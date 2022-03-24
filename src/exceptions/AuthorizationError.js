const ClienError = require('./ClientError');

class AuthorizationError extends ClienError {
    constructor(message) {
        super(message, 403);
        this.name = 'AuthorizationError';
    }
}

module.exports = AuthorizationError;