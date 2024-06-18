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
        required: true
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idUserReceive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Deposito', DepositoSchema);
