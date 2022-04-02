import { Schema, model } from "mongoose";

const toppingSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

toppingSchema.index({'$**': 'text'});

export default model("Topping", toppingSchema);