import slugify from "slugify";
import CategoryModel from "../models/category";

export const create = async (req, res) => {
    req.body.slug = slugify(req.body.name);

    try {
        const category = await new CategoryModel(req.body).save();
        res.json(category);
    } catch (error) {
        res.status(400).json({
            message: "Thêm danh mục thất bại",
            error
        });
    }
};

export const read = async (req, res) => {
    const filter = { slug: req.params.slug };

    try {
        const category = await CategoryModel.findOne(filter).select("-__v").exec();
        res.json(category);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy danh mục",
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

    try {
        const categories = await CategoryModel.find({}).select("-__v").sort(sortOpt).exec();
        res.json(categories);
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
        const category = await CategoryModel.findOneAndUpdate(filter, update, options).exec();
        res.json(category);
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
        const category = await CategoryModel.findOneAndDelete(filter).exec();
        res.json(category);
    } catch (error) {
        res.status(400).json({
            message: "Xóa danh mục không thành công",
            error
        });
    }
};