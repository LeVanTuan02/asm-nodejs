import { Schema, model, ObjectId } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    store: {
        type: ObjectId,
        ref: "Store",
        required: true,
    },
    status: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export default model("Contact", contactSchema);