import Topping from "../models/topping";

export const create = async (req, res) => {
    try {
        const topping = await new Topping(req.body).save();
        res.json(topping);
    } catch (error) {
        res.status(400).json({
            message: "Thêm topping thất bại",
            error
        });
    }
};

export const read = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const topping = await Topping.findOne(filter).select("-__v").exec();
        res.json(topping);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy topping",
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
        const toppings = await Topping.find({}).select("-__v").sort(sortOpt).exec();
        res.json(toppings);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy topping",
            error
        });
    }
};

export const update = async (req, res) => {
    const filter = { _id: req.params.id };
    const update = req.body;
    const options = { new: true };

    try {
        const topping = await Topping.findOneAndUpdate(filter, update, options).exec();
        res.json(topping);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật topping thất bại",
            error
        });
    }
};

export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const topping = await Topping.findOneAndDelete(filter).exec();
        res.json(topping);
    } catch (error) {
        res.status(400).json({
            message: "Xóa topping không thành công",
            error
        });
    }
};