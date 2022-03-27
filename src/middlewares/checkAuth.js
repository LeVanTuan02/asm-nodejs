import expressJWT from 'express-jwt';

export const requireSignin = expressJWT({
    algorithms: ["HS256"],
    secret: "TuanFpoly",
    requestProperty: "auth",
});

export const isAuth = (req, res, next) => {
    const status = req.profile._id == req.auth._id;

    if (!status) {
        res.status(400).json({
            message: "Bạn không có quyền truy cập"
        });
    } else {
        next();
    }
}

export const isAdmin = (req, res, next) => {
    if (!req.profile.role) {
        res.status(401).json({
            message: "Bạn không phải là Admin"
        });
    } else {
        next();
    }
}