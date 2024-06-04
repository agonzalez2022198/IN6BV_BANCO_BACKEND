import crypto from 'crypto'


export const generateAccountNumber = function(next) {
    if (!this.isNew) {
        return next();
    }

    const randomNumber = crypto.randomBytes(3).readUIntBE(0, 3);
    this.accountNumber = randomNumber.toString().padStart(9, '0');
    next();
};