import User from "../models/user";

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