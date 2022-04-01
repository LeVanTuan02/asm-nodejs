import { Schema, model, ObjectId } from "mongoose";

const orderSchema = new Schema({
    orderId: {
        type: ObjectId,
        ref: "Order"
    },
    productId: {
        type: ObjectId,
        ref: "Product"
    },
    productPrice: {
        type: Number,
        required: true,
    },
    sizeId: {
        type: ObjectId,
        ref: "Size"
    },
    sizePrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    ice: {
        type: Number,
        required: true,
    },
    sugar: {
        type: Number,
        required: true,
    },
    toppingId: {
        type: ObjectId,
        ref: "Topping",
        default: ""
    },
    toppingPrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export default model("OrderDetail", orderSchema);