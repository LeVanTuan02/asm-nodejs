import { Router } from "express";
import { create, list, read, remove, update, getProductByCate } from "../controllers/category";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/category/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/category/:slug", read);
router.get("/category", list);
router.put("/category/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/category/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById)

export default router;