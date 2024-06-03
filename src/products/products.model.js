import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    exclusivo: {
        type: Boolean,
        required: [true, "Exclusivo is required"]
    },
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Product', ProductSchema);
