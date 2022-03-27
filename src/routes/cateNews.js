import { Router } from "express";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";
import { create, list, read, remove, update } from "../controllers/cateNews";

const router = Router();

router.post("/cateNews/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/cateNews/:slug", read);
router.get("/cateNews", list);
router.put("/cateNews/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/cateNews/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById);

export default router;