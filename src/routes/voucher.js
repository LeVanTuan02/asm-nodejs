import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/voucher";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/voucher/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/voucher/:id", read);
router.get("/voucher", list);
router.put("/voucher/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/voucher/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById);

export default router;