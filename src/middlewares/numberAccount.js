import crypto from 'crypto'

export const generateAccountNumber = function(next) {
    if (!this.isNew) {
        return next();
    }

    this.accountNumber = crypto.randomBytes(6).toString('hex');
    next();
};