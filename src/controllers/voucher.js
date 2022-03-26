import Voucher from "../models/voucher";

export const create = async (req, res) => {
    try {
        const voucher = await new Voucher(req.body).save();
        res.json(voucher);
    } catch (error) {
        res.status(400).json({
            message: "Thêm voucher thất bại",
            error
        });
    }
};

export const read = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const voucher = await Voucher.findOne(filter).select("-__v").exec();
        res.json(voucher);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy voucher",
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
        const vouchers = await Voucher.find({}).select("-__v").sort(sortOpt).exec();
        res.json(vouchers);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy voucher",
            error
        });
    }
};

export const update = async (req, res) => {
    const filter = { _id: req.params.id };
    const update = req.body;
    const options = { new: true };

    try {
        const voucher = await Voucher.findOneAndUpdate(filter, update, options).exec();
        res.json(voucher);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật voucher thất bại",
            error
        });
    }
};

export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const voucher = await Voucher.findOneAndDelete(filter).exec();
        res.json(voucher);
    } catch (error) {
        res.status(400).json({
            message: "Xóa voucher không thành công",
            error
        });
    }
};