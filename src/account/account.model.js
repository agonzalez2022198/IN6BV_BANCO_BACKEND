import mongoose from "mongoose";
//import { generateAccountNumber } from "../middlewares/numberAccount.js";

const AccountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    },
    typeAccount: {
        type: String,
        required: true
        //required: true
    },
    favoriteAccount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    }],

    money: {
        type:Number
    }
});

//AccountSchema.pre('save', generateAccountNumber);

AccountSchema.methods.toJSON = function() {
    const { __v, _id, ...account } = this.toObject();
    account.uid = _id;
    return account;
};

export default mongoose.model('Account', AccountSchema);