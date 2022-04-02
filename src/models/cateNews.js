import { Schema, model } from "mongoose";

const cateNewsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
}, { timestamps: true });

cateNewsSchema.index({'$**': 'text'});

export default model("CateNews", cateNewsSchema);