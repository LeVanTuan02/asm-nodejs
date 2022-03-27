import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/size";
import { userById } from "../controllers/user";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/size/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/size/:id", read);
router.get("/size", list);
router.put("/size/:id/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/size/:id/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById)

export default router;