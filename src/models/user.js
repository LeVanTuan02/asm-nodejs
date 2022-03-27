import { createHmac } from 'crypto';
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    wardsCode: {
        type: Number,
        required: true,
        default: 0,
    },
    districtCode: {
        type: Number,
        required: true,
        default: 0,
    },
    provinceCode: {
        type: Number,
        required: true,
        default: 0,
    },
    address: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
    },
    role: {
        type: Number,
        default: 0,
    },
    active: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

userSchema.methods = {
    encryptPassword(password) {
        if (!password) return;
        try {
            return createHmac("SHA256", "TuanFpoly").update(password).digest("hex");
        } catch (error) {
            console.log(error);
        }
    }
}

userSchema.pre("save", function (next) {
    this.password = this.encryptPassword(this.password);
    next();
});

userSchema.pre("findOneAndUpdate", function (next) {
    if (this._update.password) {
        this._update.password = createHmac("SHA256", "TuanFpoly").update(this._update.password).digest("hex")
    }
    next();
});

export default model("User", userSchema);