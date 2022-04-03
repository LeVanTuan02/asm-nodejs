import { Schema, model, ObjectId } from "mongoose";

const schema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    productId: {
        type: ObjectId,
        ref: "Product"
    }
}, { timestamps: true });

schema.index({'$**': 'text'});

export default model("FavoritesProduct", schema);