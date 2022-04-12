import slugify from "slugify";
import Product from "../models/product";

/**
 * @swagger
 * /api/products/{userId}:
 *  post:
 *   tags: [Products]
 *   summary: Tạo sản phẩm mới
 *   description: Bắt buộc đăng nhập
 *   parameters:
 *     - in: path
 *       name: userId
 *       description: Id user đã đăng nhập
 *       required: true
 *       schema:
 *         type: string
 *         example: 623fec6776be914e8a89297d
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema: 
 *       $ref: '#/components/schemas/Products'
 *   responses:
 *    200:
 *     description: Tạo sản phẩm thành công
 *     content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/Products'
 *    400:
 *     description: Tạo sản phẩm không thành công
 */
export const create = async (req, res) => {
    req.body.slug = slugify(req.body.name);

    try {
        const product = await new Product(req.body).save();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Thêm sản phẩm thất bại",
            error
        });
    }
};

/**
 * @swagger
 * paths:
 *  /api/products/{slug}:
 *   get:
 *    tags: [Products]
 *    summary: Trả về thông tin một sản phẩm
 *    parameters:
 *     - in: path
 *       name: slug
 *       description: Slug sản phẩm
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     200:
 *      description: Trả về thông tin sản phẩm dựa trên slug
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Products"
 *     404:
 *      description: Không tìm thấy sản phẩm
 */
export const read = async (req, res) => {
    const filter = { slug: req.params.slug };
    const populate = req.query["_expand"];

    try {
        const product = await Product.findOne(filter).select("-__v").populate(populate).exec();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy sản phẩm",
            error
        });
    }
};

/**
 * @swagger
 * /api/products:
 *  get:
 *   tags: [Products]
 *   summary: Trả về danh sách tất cả sản phẩm
 *   responses:
 *    200:
 *     description: List danh sách sản phẩm
 *     content: 
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Products'
 */
export const list = async (req, res) => {
    const populate = req.query["_expand"];

    let sortOpt = {};
    if (req.query["_sort"]) {
        const sortArr = req.query["_sort"].split(",");
        const orderArr = (req.query["_order"] || "").split(",");
        
        sortArr.forEach((sort, index) => {
            sortOpt[sort] = orderArr[index] === "desc" ? -1 : 1;
        });
    }

    const start = req.query["_start"];
    const limit = req.query["_limit"];

    const filter = {};

    const { _expand, _sort, _order, ...query } = req.query;
    const queryArr = Object.keys(query);
    queryArr.forEach(item => {
        if (item.includes("like")) {
            const objectKey = item.slice(0, item.indexOf("_"));

            if (Object.hasOwn(filter, objectKey)) {
                filter[objectKey]["$in"].push(new RegExp(req.query[item], "i"));
            } else {
                filter[objectKey] = {$in: [new RegExp(req.query[item], "i")]};
            }
        } else if (item.includes("_ne")) {
            filter[item.slice(0, item.indexOf("_ne"))] = { $nin: query[item] };
        } else if (item.includes("_gte")) {
            const objectKey = item.slice(0, item.indexOf("_gte"));

            if (Object.hasOwn(filter, objectKey)) {
                filter[objectKey]["$gte"] = query[item];
            } else {
                filter[objectKey] = { $gte: query[item] };
            }
        } else if (item.includes("_lte")) {
            const objectKey = item.slice(0, item.indexOf("_lte"));

            if (Object.hasOwn(filter, objectKey)) {
                filter[objectKey]["$lte"] = query[item];
            } else {
                filter[objectKey] = { $lte: query[item] };
            }
        } else if (item === "q" && query["q"]) {
            filter["$text"] = {"$search": `"${query["q"]}"`};
        } else {
            if (Object.hasOwn(filter, item)) {
                filter[item]["$in"].push(query[item]);
            } else {
                filter[item] = {$in: [query[item]]};
            }
        }
    });

    try {
        const products = await Product
            .find(filter)
            .select("-__v")
            .populate(populate)
            .skip(start)
            .limit(limit)
            .sort(sortOpt)
            .exec();
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy sản phẩm",
            error
        });
    }
};

/**
 * @swagger
 * paths:
 *  /api/products/{id}/{userId}:
 *   put:
 *    tags: [Products]
 *    summary: Cập nhật thông tin sản phẩm
 *    description: Bắt buộc đăng nhập
 *    parameters:
 *     - in: path
 *       name: id
 *       description: Id sản phẩm cần cập nhật
 *       schema: 
 *        type: string
 *       required: true
 *     - in: path
 *       name: userId
 *       description: Id tài khoản đã đăng nhập
 *       required: true
 *       schema:
 *         type: string
 *         example: 623fec6776be914e8a89297d
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Products"
 *    responses:
 *     200:
 *      description: Trả về thông tin sản phẩm đã được cập nhật
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Products"
 *     404:
 *      description: Cập nhật sản phẩm không thành công
 */
export const update = async (req, res) => {
    const filter = { _id: req.params.id };
    const update = {
        ...req.body,
        slug: slugify(req.body.name)
    };
    const options = { new: true };

    try {
        const product = await Product.findOneAndUpdate(filter, update, options).exec();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật sản phẩm thất bại",
            error
        });
    }
};

/**
 * @swagger
 * paths:
 *  /api/products/userUpdate/{id}:
 *    patch:
 *      tags: [Products]
 *      summary: Cập nhật lượt xem, lượt yêu thích sản phẩm
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Id sản phẩm cần cập nhật
 *          schema:
 *            type: string
 *            example: "62496b4ddc6d278b7a1b5c81"
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                view:
 *                  type: number
 *                favorites:
 *                  type: number
 *              example:
 *                view: 100
 *                favorites: 200
 *      responses:
 *        200:
 *          description: Trả về thông tin sản phẩm vừa cập nhật
 *        400:
 *          description: Cập nhật sản phẩm thất bại
*/
export const clientUpdate = async (req, res) => {
    const filter = { _id: req.params.id };
    const { view, favorites } = req.body;
    const options = { new: true };

    try {
        const product = await Product.findOneAndUpdate(filter, { view, favorites }, options).exec();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật sản phẩm thất bại",
            error
        });
    }
};

/**
 * @swagger
 * paths:
 *  /api/products/{id}/{userId}:
 *   delete:
 *    tags: [Products]
 *    summary: Xóa sản phẩm
 *    description: Bắt buộc đăng nhập
 *    parameters:
 *     - in: path
 *       name: id
 *       description: Id sản phẩm cần xóa
 *       schema: 
 *        type: string
 *       required: true
 *     - in: path
 *       name: userId
 *       description: Id tài khoản đã đăng nhập
 *       required: true
 *       schema:
 *         type: string
 *         example: 623fec6776be914e8a89297d
 *    responses:
 *     200:
 *      description: Trả về thông tin sản phẩm vừa xóa
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Products"
 *     404:
 *      description: Xóa sản phẩm không thành công
 */
export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const product = await Product.findOneAndDelete(filter).exec();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Xóa sản phẩm không thành công",
            error
        });
    }
};