import mongoose from "mongoose";
import { generateAccountNumber } from "../middlewares/numberAccount.js";

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeAccount',
        //required: true
    },
    favoriteAccount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    }]
});

AccountSchema.pre('save', generateAccountNumber);

AccountSchema.methods.toJSON = function() {
    const { __v, _id, ...account } = this.toObject();
    account.uid = _id;
    return account;
};

export default mongoose.model('Account', AccountSchema);