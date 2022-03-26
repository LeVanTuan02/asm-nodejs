import { Schema, model } from "mongoose";

const sizeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        uppercase: true,
    },
    priceIncrease: {
        type: Number,
        required: true
    },
}, { timestamps: true });

export default model("Size", sizeSchema);