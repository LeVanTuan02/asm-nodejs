import { Schema, model, ObjectId } from "mongoose";

const orderLogsSchema = new Schema({
    orderId: {
        type: ObjectId,
        ref: "Order"
    },
    status: {
        type: Number,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User",
        transform: v => v == null ? '' : v
    }
}, { timestamps: true });

orderLogsSchema.index({'$**': 'text'});

export default model("OrderLog", orderLogsSchema);