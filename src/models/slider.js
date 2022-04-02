import { Schema, model } from "mongoose";

const slideSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

slideSchema.index({'$**': 'text'});

export default model("Slide", slideSchema);