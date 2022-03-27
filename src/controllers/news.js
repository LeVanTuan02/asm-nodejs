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

    try {
        const news = await News.findOne(filter).select("-__v").exec();
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

    try {
        const news = await News.find({}).select("-__v").populate(populate).sort(sortOpt).exec();
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