import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/store";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/store/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/store/:id", read);
router.get("/store", list);
router.put("/store/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/store/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById);

export default router;