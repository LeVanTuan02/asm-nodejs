import { Schema, model, ObjectId } from "mongoose";

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
        type: ObjectId,
        ref: "Category",
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }
}, { timestamps: true });

productSchema.index({'$**': 'text'});

export default model("Product", productSchema);

/**
 * @swagger
 * components:
 *  schemas:
 *   Products:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      name:
 *        type: string
 *      image:
 *        type: string
 *      price:
 *        type: number
 *      description:
 *        type: string
 *      status:
 *        type: number
 *        default: 0
 *      view:
 *        type: number
 *        default: 0
 *      favorites:
 *        type: number
 *        default: 0
 *      categoryId:
 *        type: string
 *      slug:
 *        type: string
 *    required:
 *      - name
 *      - image
 *      - price
 *      - categoryId
 *    example:
 *      name: Trà sữa ô long bạch kim
 *      image: https://res.cloudinary.com/levantuan/image/upload/v1645172924/assignment-js/ntnmsjdifbepbbbelzvq.png
 *      price: 20000
 *      description: Mô tả sản phẩm
 *      status: 0
 *      view: 10
 *      favorites: 20
 *      categoryId: _fdakfakhxss
 *      slug: tra-sua-o-long-bach-kim
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: API dành cho Product
 */