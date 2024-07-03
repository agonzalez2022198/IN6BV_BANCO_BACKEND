import mongoose, {STATES, Schema} from 'mongoose';

const  UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    nickName: {
        type: String,
        require: true
    },

    userName: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    code: {
        type: String,
        require: true
    },

    role: {
        type: String,
        enum: ["ADMIN_ROLE", "USER_ROLE"],
        default: "USER_ROLE"
    },

    DPI: {
        type: String,
        require: true
    },

    location: {
        type: String,
        require: true
    },

    celular: {
        type: String,
        require: true
    },

    correo: {
        type: String,
        require: true
    },

    state: {
        type: Boolean,
        default: true
    },

    monthlyIncome: {
        type: Number,
        require: true
    },

    credit: {
        type: Number
        //require: true
    },

    searches: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'searches'
    }


});


UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}



export default mongoose.model('User', UserSchema);