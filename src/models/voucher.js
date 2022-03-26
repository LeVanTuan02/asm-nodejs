import { Schema, model } from "mongoose";

const voucherSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    condition: {
        type: Number,
        required: true,
    },
    conditionNumber: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    timeStart: {
        type: Date,
        required: true,
    },
    timeEnd: {
        type: Date,
        required: true,
    },
    user_ids: {
        type: Array
    }
}, { timestamps: true });

export default model("Voucher", voucherSchema);