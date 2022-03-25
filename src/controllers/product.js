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

    try {
        const product = await Product.findOne(filter).select("-__v").exec();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy danh mục",
            error
        });
    }
};

export const list = async (req, res) => {
    try {
        const products = await Product.find({}).select("-__v").exec();
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
    const update = req.body;
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