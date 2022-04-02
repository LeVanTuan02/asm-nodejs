import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/order";
import { userById } from "../controllers/user";
import { isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/orders", create);
router.get("/orders/:id", read);
router.get("/orders", list);
router.put("/orders/:id/:userId", requireSignin, isAuth, update);
router.delete("/orders/:id", remove);

router.param("userId", userById);

export default router;