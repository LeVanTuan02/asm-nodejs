import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/comment";
import { userById } from "../controllers/user";
import { isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/comments/:userId", requireSignin, isAuth, create);
router.get("/comments/:id", read);
router.get("/comments", list);
router.put("/comments/:id/:userId", requireSignin, isAuth, update);
router.delete("/comments/:id/:userId", requireSignin, isAuth, remove);

router.param("userId", userById);

export default router;