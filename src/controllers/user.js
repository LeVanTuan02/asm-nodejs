import User from "../models/user";

/**
 * @swagger
 * paths:
 *  /api/users/{userId}:
 *    post:
 *      tags: [Users]
 *      summary: Tạo tài khoản người dùng
 *      description: Bắt buộc đăng nhập
 *      parameters:
 *        - in: path
 *          name: userId
 *          description: Id tài khoản đã đăng nhập
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Users"
 *      responses:
 *        200:
 *          description: Tạo tài khoản thành công
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                $ref: "#/components/schemas/Users"
 *        400:
 *          description: Tạo tài khoản không thành công
*/
export const create = async (req, res) => {
    try {
        const exitsUser = await User.findOne({ email: req.body.email }).exec();
        
        if (exitsUser) {
            res.status(400).json({
                message: "Email đã tồn tại"
            });
        }

        const user = await new User(req.body).save();
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Thêm user không thành công",
            error
        });
    }
};

/**
 * @swagger
 * paths:
 *  /api/users/{id}:
 *    get:
 *      tags: [Users]
 *      summary: Trả về thông tin một tài khoản
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Id tài khoản
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Trả về thông tin tài khoản dựa trên Id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Users"
 *        400:
 *          description: Không tìm thấy tài khoản
*/
export const read = async (req, res) => {
    const filter = { _id: req.params.id };
    const populate = req.query["_expand"];

    try {
        const user = await User.findOne(filter).select("-__v").populate(populate).exec();
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy user",
            error
        });
    }
};

/**
 * @swagger
 * paths:
 *  /api/users:
 *    get:
 *      tags: [Users]
 *      summary: Lấy danh sách tài khoản
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Users"
 *        400:
 *          description: Không tìm thấy tài khoản
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
        const users = await User
            .find(filter)
            .select("-__v")
            .populate(populate)
            .skip(start)
            .limit(limit)
            .sort(sortOpt)
            .exec();
        res.json(users);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy user",
            error
        });
    }
};

/**
 * @swagger
 * paths:
 *  /api/users/{id}/{userId}:
 *    put:
 *      tags: [Users]
 *      summary: Cập nhật tài khoản
 *      description: Bắt buộc đăng nhập
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Id tài khoản cần cập nhật
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: userId
 *          description: Id tài khoản đã đăng nhập
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Users"
 *      responses:
 *        200:
 *          description: Trả về thông tin tài khoản vừa cập nhật
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Users"
 *        400:
 *          description: Cập nhật sản phẩm không thành công
*/
export const update = async (req, res) => {
    const filter = { _id: req.params.id || req.params.myId };
    const update = req.body;

    const options = { new: true };

    try {
        const user = await User.findOneAndUpdate(filter, update, options).exec();
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật user không thành công",
            error
        });
    }
};


/**
 * @swagger
 * paths:
 *  /api/users/{id}/{userId}:
 *    delete:
 *      tags: [Users]
 *      summary: Xóa tài khoản
 *      description: Bắt buộc đăng nhập
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Id tài khoản cần xóa
 *          required: true
 *          schema:
 *            type: string
 *        - in: path
 *          name: userId
 *          description: Id tài khoản đã đăng nhập
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Trả về thông tin tài khoản vừa xóa
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Users"
 *        400:
 *          description: Xóa tài khoản không thành công
*/
export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const user = await User.findOneAndDelete(filter).exec();
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Xóa user không thành công",
            error
        });
    }
};

export const userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec();

        if (!user) {
            res.status(400).json({
                message: "Không tìm thấy User"
            });
        } else {
            req.profile = user;
            next();
        }
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy User",
            error
        });
    }
}