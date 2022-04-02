import { Schema, model, ObjectId } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: ObjectId,
        ref: "CateNews"
    },
    status: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

categorySchema.index({'$**': 'text'});

export default model("News", categorySchema);