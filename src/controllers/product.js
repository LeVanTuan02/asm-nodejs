import slugify from "slugify";
import Product from "../models/product";

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

export const read = async (req, res) => {
    const filter = { slug: req.params.slug };
    const populate = req.query["_expand"];

    try {
        const product = await Product.findOne(filter).select("-__v").populate(populate).exec();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy danh mục",
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

    const neArr = [];

    const { _expand, _sort, _order, ...query } = req.query;
    const queryArr = Object.keys(query);
    queryArr.forEach(item => {
        if (item.includes("like")) {
            filter[item.slice(0, item.indexOf("_"))] = new RegExp(req.query[item], "i");
        } else if (item.includes("_ne")) {
            neArr.push(item.slice(0, item.indexOf("_ne")), query[item]);
        } else {
            filter[item] = req.query[item];
        }
    });

    try {
        const products = await Product
            .find(filter)
            .select("-__v")
            .populate(populate)
            .where(neArr[0] || " ").ne(neArr[1] || "")
            .skip(start)
            .limit(limit)
            .sort(sortOpt)
            .exec();
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy danh mục",
            error
        });
    }
};

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
            message: "Cập nhật danh mục thất bại",
            error
        });
    }
};

export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const product = await Product.findOneAndDelete(filter).exec();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Xóa danh mục không thành công",
            error
        });
    }
};