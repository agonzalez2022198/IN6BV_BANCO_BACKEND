import mongoose from "mongoose";

const TypeAccountSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

TypeAccountSchema.methods.toJSON = function(){
    const {__v, _id, ...typeAccount} = this.toObject();
    typeAccount.uid = _id;
    return typeAccount;
}

export default mongoose.model('TypeAccount', TypeAccountSchema)