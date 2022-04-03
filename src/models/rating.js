import { Schema, model, ObjectId } from "mongoose";

const ratingSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    ratingNumber: {
        type: Number,
        required: true
    },
    productId: {
        type: ObjectId,
        ref: "Product"
    }
}, { timestamps: true });

ratingSchema.index({'$**': 'text'});

export default model("Rating", ratingSchema);