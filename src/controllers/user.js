import User from "../models/user";

export const create = async (req, res) => {
    try {
        const exitsUser = await User.findOne({ email: req.body.email }).exec();
        
        if (exitsUser) {
            res.status(400).json({
                message: "Email đã tồn tại"
            });
        }

        const user = await new User(req.body).save();
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Thêm user không thành công",
            error
        });
    }
};

export const read = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const user = await User.findOne(filter).select("-__v").exec();
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy user",
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
        const users = await User.find({}).select("-__v").sort(sortOpt).exec();
        res.json(users);
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy user",
            error
        });
    }
};

export const update = async (req, res) => {
    const filter = { _id: req.params.id };
    const update = req.body;

    const options = { new: true };

    try {
        const user = await User.findOneAndUpdate(filter, update, options).exec();
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Cập nhật user không thành công",
            error
        });
    }
};

export const remove = async (req, res) => {
    const filter = { _id: req.params.id };

    try {
        const user = await User.findOneAndDelete(filter).exec();
        res.json(user);
    } catch (error) {
        res.status(400).json({
            message: "Xóa user không thành công",
            error
        });
    }
};

export const userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec();

        if (!user) {
            res.status(400).json({
                message: "Không tìm thấy User"
            });
        } else {
            req.profile = user;
            next();
        }
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy User",
            error
        });
    }
}