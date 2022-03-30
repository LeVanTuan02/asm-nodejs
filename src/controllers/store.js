import Store from "../models/store";

export const create = async (req, res) => {
    try {
        const store = await new Store(req.body).save();
        res.json(store);
    } catch (error) {
        res.status(400).json({
            message: "Thêm chi nhánh không thành công",
            error
        });
    }
};

export const read = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const store = await Store.findOne(filter).select("-__v").exec();
        res.json(store);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy chi nhánh",
            error
        });
    }
};

export const list = async (req, res) => {
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
    const neArr = [];
    const { _expand, _sort, _order, ...query } = req.query;
    const queryArr = Object.keys(query);
    for (let item of queryArr) {
        if (item.includes("like")) {
            filter[item.slice(0, item.indexOf("_"))] = new RegExp(req.query[item], "i");
        } else if (item.includes("_ne")) {
            neArr.push(item.slice(0, item.indexOf("_ne")), query[item]);
        } else {
            filter[item] = req.query[item];
        }
    }

    try {
        const stores = await Store
            .find(filter)
            .select("-__v")
            .where(neArr[0] || " ").ne(neArr[1] || "")
            .skip(start)
            .limit(limit)
            .sort(sortOpt)
            .exec();
        res.json(stores);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy chi nhánh",
            error
        });
    }
};

export const update = async (req, res) => {
    const filter = { _id: req.params.id };
    const update = req.body;
    const options = { new: true };

    try {
        const store = await Store.findOneAndUpdate(filter, update, options).exec();
        res.json(store);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật chi nhánh thất bại",
            error
        });
    }
};

export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const store = await Store.findOneAndDelete(filter).exec();
        res.json(store);
    } catch (error) {
        res.status(400).json({
            message: "Xóa chi nhánh không thành công",
            error
        });
    }
};