import mongoose from 'mongoose';

const DepositoSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    revertido: {
        type: Boolean,
        default: false
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountRecibe: {
        type: Number,
        ref: 'User',
        required: true
    },

    comment: {
        type: String,
        required: true
    }
});

export default mongoose.model('Deposito', DepositoSchema);