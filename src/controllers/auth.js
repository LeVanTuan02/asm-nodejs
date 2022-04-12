import User from "../models/user";
import jwt from "jsonwebtoken";

/**
 * @swagger
 * paths:
 *   /api/signin:
 *    post:
 *     tags: [Auth]
 *     summary: Đăng nhập tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *               type: string
 *              password:
 *               type: string
 *             example:
 *              email: admin@gmail.com
 *              password: admin
 *     responses:
 *      200:
 *        description: Trả về thông tin tài khoản đăng nhập
 *      400:
 *        description: Đăng nhập không thành công
*/

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
            res.status(400).json({
                message: "Email không tồn tại"
            });
        } else if (!user.authenticate(password)) {
            res.status(400).json({
                message: "Mật khẩu không chính xác"
            });
        } else {
            const { _doc: { password: hashed_password, __v, ...rest } } = user;
            const token = jwt.sign({ _id: user._id, email: user.email }, "TuanFpoly", { expiresIn: "3h" });
    
            res.json({
                token,
                user: rest
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Lỗi",
        });
    }

};

/**
 * @swagger
 * paths:
 *  /api/signup:
 *    post:
 *      tags: [Auth]
 *      summary: Đăng ký tài khoản
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Users"
 *      responses:
 *        200:
 *          description: Đăng ký thành công
 *        400:
 *          description: Đăng ký không thành công
*/
export const signup = async (req, res) => {
    try {
        const exitsEmail = await User.findOne({ email: req.body.email }).exec();

        if (exitsEmail) {
            res.status(400).json({
                message: "Email đã tồn tại trên hệ thống"
            });
        }

        const { _id, email, fullName, username, phone, role, active, avatar } = await new User(req.body).save();

        res.json({
            _id,
            email,
            fullName,
            username,
            phone,
            role,
            active,
            avatar
        });
    } catch (error) {
        res.status(400).json({
            message: "Đăng ký tài khoản không thành công",
            error
        });
    }
}

export const checkPassword = async (req, res) => {
    const { _id, password } = req.body;

    try {
        const user = await User.findById(_id).exec();
        if (!user) {
            res.status(400).json({
                message: "Không tìm thấy User"
            });
        } else if (!user.authenticate(password)) {
            res.status(400).json({
                message: "Mật khẩu không chính xác"
            });
        } else {
            res.json({
                message: "Mật khẩu chính xác",
                success: true
            });
        }
        
    } catch (error) {
        res.status(400).json({
            message: "Có lỗi xảy ra"
        });
    }
}