import mongoose from 'mongoose';

const BusquedaSchema = new mongoose.Schema({
    nameSearch: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('Busqueda', BusquedaSchema);