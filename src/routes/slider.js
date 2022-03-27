import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/slider";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/slider/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/slider/:id", read);
router.get("/slider", list);
router.put("/slider/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/slider/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById)

export default router;