import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/rating";
import { userById } from "../controllers/user";
import { isAuth, requireSignin } from "../middlewares/checkAuth";

const router = Router();

router.post("/ratings/:userId", requireSignin, isAuth, create);
router.get("/ratings/:id", read);
router.get("/ratings", list);
router.put("/ratings/:id/:userId", requireSignin, isAuth, update);
router.delete("/ratings/:id/:userId", requireSignin, isAuth, remove);

router.param("userId", userById);

export default router;