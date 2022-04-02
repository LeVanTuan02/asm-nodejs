import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: String,
    },
    customerName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    priceDecrease: {
        type: Number,
        default: 0
    },
    message: {
        type: String,
        default: ""
    },
    status: {
        type: Number,
        default: 0
    },
    voucher: {
        type: Array,
        default: []
    },
}, { timestamps: true });

orderSchema.index({'$**': 'text'});

export default model("Order", orderSchema);