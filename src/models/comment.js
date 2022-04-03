import { Schema, model, ObjectId } from "mongoose";

const commentSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    },
    productId: {
        type: ObjectId,
        ref: "Product"
    }
}, { timestamps: true });

commentSchema.index({'$**': 'text'});

export default model("Comment", commentSchema);