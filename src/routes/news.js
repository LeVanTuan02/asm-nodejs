import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/news";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/news/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/news/:slug", read);
router.get("/news", list);
router.put("/news/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/news/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById);

export default router;