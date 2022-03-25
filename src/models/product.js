import { Schema, model } from "mongoose";

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
        
    }
});