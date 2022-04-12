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
        default: "https://res.cloudinary.com/levantuan/image/upload/v1644302455/assignment-js/thumbnail-image-vector-graphic-vector-id1147544807_ochvyr.jpg"
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
    authenticate(password) {
        return this.password === this.encryptPassword(password);
    },
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

userSchema.index({'$**': 'text'});

export default model("User", userSchema);

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: API đăng ký, đăng nhập
*/

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API dành cho Users
*/

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        username:
 *          type: string
 *        fullName:
 *          type: string
 *        phone:
 *          type: string
 *        wardsCode:
 *          type: number
 *          default: 0
 *        districtCode:
 *          type: number
 *          default: 0
 *        provinceCode:
 *          type: number
 *          default: 0
 *        address:
 *          type: string
 *          default: ""
 *        avatar:
 *          type: string
 *          default: "https://res.cloudinary.com/levantuan/image/upload/v1644302455/assignment-js/thumbnail-image-vector-graphic-vector-id1147544807_ochvyr.jpg"
 *        role:
 *          type: number
 *          default: 0
 *        active:
 *          type: number
 *          default: 0
 *      required:
 *        - email
 *        - password
 *        - username
 *        - fullName
 *        - phone
 *        - wardsCode
 *        - districtCode
 *        - provinceCode
 *      example:
 *        email: user@gmail.com
 *        password: 685e14e451617cbe9fab7bc79f80c1a4b153cc511691412855ea806972d86214
 *        username: admin
 *        fullName: Lê Tuân Fpoly
 *        phone: "0347852852"
 *        wardsCode: 7411
 *        districtCode: 217
 *        provinceCode: 24
 *        address: Tân Mỹ
 *        avatar: https://res.cloudinary.com/levantuan/image/upload/v1648982230/asm-react-ts/hpku1ffy9dqieodlik2w.png
 *        role: 1
 *        active: 1
*/