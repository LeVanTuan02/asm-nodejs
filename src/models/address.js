import { Schema, model, ObjectId } from "mongoose";

const addressSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    provinceCode: {
        type: Number,
        required: true
    },
    districtCode: {
        type: Number,
        required: true
    },
    wardsCode: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });

addressSchema.index({'$**': 'text'});

export default model("Address", addressSchema);