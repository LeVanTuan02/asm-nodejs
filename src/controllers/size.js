import Size from "../models/size";

export const create = async (req, res) => {
    try {
        const size = await new Size(req.body).save();
        res.json(size);
    } catch (error) {
        res.status(400).json({
            message: "Thêm size thất bại",
            error
        });
    }
};

export const read = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const size = await Size.findOne(filter).select("-__v").exec();
        res.json(size);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy size",
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
        const sizes = await Size.find({}).select("-__v").sort(sortOpt).exec();
        res.json(sizes);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy size",
            error
        });
    }
};

export const update = async (req, res) => {
    const filter = { _id: req.params.id };
    const update = req.body;
    const options = { new: true };

    try {
        const size = await Size.findOneAndUpdate(filter, update, options).exec();
        res.json(size);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật size thất bại",
            error
        });
    }
};

export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const size = await Size.findOneAndDelete(filter).exec();
        res.json(size);
    } catch (error) {
        res.status(400).json({
            message: "Xóa size không thành công",
            error
        });
    }
};