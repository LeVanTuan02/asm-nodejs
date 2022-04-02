import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    image: String
}, { timestamps: true });

categorySchema.index({'$**': 'text'});

export default model("Category", categorySchema);