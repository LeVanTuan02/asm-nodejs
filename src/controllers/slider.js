import Slider from "../models/slider";

export const create = async (req, res) => {
    try {
        const slider = await new Slider(req.body).save();
        res.json(slider);
    } catch (error) {
        res.status(400).json({
            message: "Thêm slide thất bại",
            error
        });
    }
};

export const read = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const slider = await Slider.findOne(filter).select("-__v").exec();
        res.json(slider);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy slide",
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
        const sliders = await Slider.find({}).select("-__v").sort(sortOpt).exec();
        res.json(sliders);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy slide",
            error
        });
    }
};

export const update = async (req, res) => {
    const filter = { _id: req.params.id };
    const update = req.body;
    const options = { new: true };

    try {
        const slider = await Slider.findOneAndUpdate(filter, update, options).exec();
        res.json(slider);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật slide thất bại",
            error
        });
    }
};

export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const slider = await Slider.findOneAndDelete(filter).exec();
        res.json(slider);
    } catch (error) {
        res.status(400).json({
            message: "Xóa slide không thành công",
            error
        });
    }
};