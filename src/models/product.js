import { Schema, model, ObjectId } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    status: {
        type: Number,
        default: 0,
    },
    view: {
        type: Number,
        default: 0,
    },
    favorites: {
        type: Number,
        default: 0,
    },
    categoryId: {
        type: ObjectId,
        ref: "Category",
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }
}, { timestamps: true });

productSchema.index({'$**': 'text'});

export default model("Product", productSchema);