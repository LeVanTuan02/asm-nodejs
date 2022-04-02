import slugify from "slugify";
import News from "../models/news";

export const create = async (req, res) => {
    req.body.slug = slugify(req.body.title);

    try {
        const news = await new News(req.body).save();
        res.json(news);
    } catch (error) {
        res.status(400).json({
            message: "Thêm bài viết không thành công",
            error
        });
    }
};

export const read = async (req, res) => {
    const filter = { slug: req.params.slug };

    const populate = req.query["_expand"];

    try {
        const news = await News.findOne(filter).select("-__v").populate(populate).exec();
        res.json(news);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy bài viết",
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
        const news = await News
            .find(filter)
            .select("-__v")
            .populate(populate)
            .skip(start)
            .limit(limit)
            .sort(sortOpt)
            .exec();
        res.json(news);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy bài viết",
            error
        });
    }
};

export const update = async (req, res) => {
    const filter = { _id: req.params.id };
    const update = {
        ...req.body,
        slug: slugify(req.body.title)
    };
    const options = { new: true };

    try {
        const news = await News.findOneAndUpdate(filter, update, options).exec();
        res.json(news);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật bài viết không thành công",
            error
        });
    }
};

export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const news = await News.findOneAndDelete(filter).exec();
        res.json(news);
    } catch (error) {
        res.status(400).json({
            message: "Xóa bài viết không thành công",
            error
        });
    }
};